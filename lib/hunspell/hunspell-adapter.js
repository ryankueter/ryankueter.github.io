(function (global) {
    'use strict';
    let sharedFactoryPromise = null;
    const getFactory = () => {
        if (!sharedFactoryPromise) {
            if (!global.HunspellAsm || typeof global.HunspellAsm.loadModule !== 'function') {
                return Promise.reject(new Error(
                    'HunspellSpellChecker: window.HunspellAsm was not found. Include the hunspell-asm ' +
                    '<script> tag and the loader script above before this one.'));
            }
            sharedFactoryPromise = global.HunspellAsm.loadModule();
        }
        return sharedFactoryPromise;
    };
    class HunspellSpellChecker {
        constructor(options = {}) {
            const dictionary = options.dictionary
                || (global.HunspellDictionaries && global.HunspellDictionaries.en_US);
            if (!dictionary || !dictionary.aff || !dictionary.dic) {
                throw new Error(
                    'HunspellSpellChecker: no dictionary supplied and window.HunspellDictionaries.en_US ' +
                    'was not found. Fetch a dictionary from a CDN and set window.HunspellDictionaries.en_US ' +
                    '(see the setup below) before the editor loads.');
            }
            this._hunspell = null;
            this._ignored = new Set();
            this._ready = this._load(dictionary).catch((error) => {
                console.error('HunspellSpellChecker: failed to load the Hunspell WASM engine or dictionary.', error);
                throw error;
            });
        }
        async _load(dictionary) {
            const factory = await getFactory();
            const encoder = new TextEncoder();
            const affPath = factory.mountBuffer(encoder.encode(dictionary.aff), 'index.aff');
            const dicPath = factory.mountBuffer(encoder.encode(dictionary.dic), 'index.dic');
            this._hunspell = factory.create(affPath, dicPath);
        }
        get ready() { return this._ready; }
        async checkWord(word) {
            await this._ready;
            if (this._ignored.has(String(word).toLowerCase())) return true;
            return this._hunspell.spell(word);
        }
        async suggest(word) { await this._ready; return this._hunspell.suggest(word); }
        addWord(word) { if (word) this._ready.then(() => this._hunspell.addWord(word)).catch(() => {}); }
        ignoreWord(word) { if (word) this._ignored.add(String(word).toLowerCase()); }
    }
    global.HunspellSpellChecker = HunspellSpellChecker;
})(typeof window !== 'undefined' ? window : this);
