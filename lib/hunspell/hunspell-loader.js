(function (global) {
    'use strict';
    const randomId = (length) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let out = '';
        for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
        return out;
    };
    const isMounted = (FS, path, type) => {
        try {
            const stat = FS.stat(path);
            const check = type === 'dir' ? FS.isDir : FS.isFile;
            return !!stat && check(stat.mode);
        } catch (_) { return false; }
    };
    const constructModule = () => {
        const ret = { __asmModuleInitialized__: false, onRuntimeInitialized: null };
        ret.initializeRuntime = (timeout) => {
            if (ret.__asmModuleInitialized__) return Promise.resolve(true);
            return new Promise((resolve) => {
                const timeoutId = timeout ? setTimeout(() => resolve(false), timeout) : null;
                ret.onAbort = (reason) => {
                    if (!ret.__asmModuleInitialized__) {
                        if (timeoutId) clearTimeout(timeoutId);
                        throw reason instanceof Error ? reason : new Error(reason);
                    }
                };
                ret.onRuntimeInitialized = () => {
                    if (timeoutId) clearTimeout(timeoutId);
                    ret.__asmModuleInitialized__ = true;
                    resolve(true);
                };
            });
        };
        return ret;
    };
    const wrapHunspellInterface = (cwrap) => ({
        create: cwrap('Hunspell_create', 'number', ['number', 'number']),
        destroy: cwrap('Hunspell_destroy', null, ['number']),
        spell: cwrap('Hunspell_spell', 'number', ['number', 'number']),
        suggest: cwrap('Hunspell_suggest', 'number', ['number', 'number', 'number']),
        free_list: cwrap('Hunspell_free_list', null, ['number', 'number', 'number']),
        add_dic: cwrap('Hunspell_add_dic', 'number', ['number', 'number']),
        add: cwrap('Hunspell_add', 'number', ['number', 'number']),
        add_with_affix: cwrap('Hunspell_add_with_affix', 'number', ['number', 'number', 'number']),
        remove: cwrap('Hunspell_remove', 'number', ['number', 'number'])
    });
    const hunspellLoader = (asmModule) => {
        const { cwrap, FS, _free, allocateUTF8, _malloc, getValue, UTF8ToString } = asmModule;
        const hunspellInterface = wrapHunspellInterface(cwrap);
        const memPathId = `/${randomId(24)}`;
        FS.mkdir(memPathId);
        const usingParamPtr = (...args) => {
            const params = [...args];
            const fn = params.pop();
            const paramsPtr = params.map((param) => allocateUTF8(param.normalize()));
            const ret = fn(...paramsPtr);
            paramsPtr.forEach((ptr) => _free(ptr));
            return ret;
        };
        return {
            mountBuffer: (contents, fileName) => {
                const file = fileName || randomId(24);
                const mountedFilePath = `${memPathId}/${file}`;
                if (!isMounted(FS, mountedFilePath, 'file')) {
                    FS.writeFile(mountedFilePath, contents, { encoding: 'binary' });
                }
                return mountedFilePath;
            },
            unmount: (mountedPath) => {
                if (isMounted(FS, mountedPath, 'file') && mountedPath.indexOf(memPathId) > -1) {
                    FS.unlink(mountedPath);
                    return;
                }
                if (isMounted(FS, mountedPath, 'dir')) {
                    FS.unmount(mountedPath);
                    FS.rmdir(mountedPath);
                }
            },
            create: (affPath, dictPath) => {
                const affPathPtr = allocateUTF8(affPath);
                const dictPathPtr = allocateUTF8(dictPath);
                const hunspellPtr = hunspellInterface.create(affPathPtr, dictPathPtr);
                return {
                    dispose: () => {
                        hunspellInterface.destroy(hunspellPtr);
                        _free(affPathPtr);
                        _free(dictPathPtr);
                    },
                    spell: (word) => !!usingParamPtr(word, (wordPtr) => hunspellInterface.spell(hunspellPtr, wordPtr)),
                    suggest: (word) => {
                        const suggestionListPtr = _malloc(4);
                        const suggestionCount = usingParamPtr(word, (wordPtr) =>
                            hunspellInterface.suggest(hunspellPtr, suggestionListPtr, wordPtr));
                        const suggestionListValuePtr = getValue(suggestionListPtr, '*');
                        const ret = suggestionCount > 0
                            ? Array.from(Array(suggestionCount).keys()).map((idx) =>
                                UTF8ToString(getValue(suggestionListValuePtr + idx * 4, '*')))
                            : [];
                        hunspellInterface.free_list(hunspellPtr, suggestionListPtr, suggestionCount);
                        _free(suggestionListPtr);
                        return ret;
                    },
                    addDictionary: (dictPath) => usingParamPtr(dictPath, (dictPathPtr) =>
                        hunspellInterface.add_dic(hunspellPtr, dictPathPtr)) !== 1,
                    addWord: (word) => usingParamPtr(word, (wordPtr) => hunspellInterface.add(hunspellPtr, wordPtr)),
                    addWordWithAffix: (word, affix) => usingParamPtr(word, affix, (wordPtr, affixPtr) =>
                        hunspellInterface.add_with_affix(hunspellPtr, wordPtr, affixPtr)),
                    removeWord: (word) => usingParamPtr(word, (wordPtr) => hunspellInterface.remove(hunspellPtr, wordPtr))
                };
            }
        };
    };
    const loadModule = async (initOptions) => {
        const timeout = (initOptions && initOptions.timeout) || 20000;
        if (typeof global.Module !== 'function') {
            throw new Error('HunspellAsm.loadModule: window.Module was not found. Include the hunspell-asm <script> tag before this one.');
        }
        const constructedModule = constructModule();
        const asmModule = global.Module(constructedModule);
        const result = await asmModule.initializeRuntime(timeout);
        if (!result) throw new Error('HunspellAsm.loadModule: timed out initializing the WebAssembly runtime.');
        return hunspellLoader(asmModule);
    };
    global.HunspellAsm = { loadModule };
})(typeof window !== 'undefined' ? window : this);
