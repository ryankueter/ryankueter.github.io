
function DisableElement(id) {
    document.getElementById(id).disabled = true;
}

function ShowToast(id) {
    const toastLiveExample = document.getElementById(id)
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

function ExpandMenu(id) {
    var element = document.getElementById(id)
    element.classList.add("show");
}

function OpenSidePanel() {
    try {
        var element = document.getElementById("app-sidepanel");
        element.classList.remove("sidepanel-hidden");
        element.classList.add("sidepanel-visible");
    }
    catch (error) {
        console.log(error);
    }
}

function CloseSidePanel() {
    try {
        var element = document.getElementById("app-sidepanel");
        element.classList.remove("sidepanel-visible");
    }
    catch (error) {
        console.log(error);
    }
}

function ChangeTheme(theme) {
    let body = document.body;
    body.className = '';
    body.classList.add(theme);
    updateMetaThemeColor(theme);
}

function ChangeThemeWithStorage(theme) {
    if (theme === 'Auto') {
        localStorage.removeItem('appTheme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        ChangeTheme(prefersDark ? 'DarkTheme' : 'BlueTheme');
    } else {
        localStorage.setItem('appTheme', theme);

        var editor1 = document.getElementById("editor1");
        if (editor1) {
            if (editor1.classList.contains('fluent')) {
                editor1.classList.remove('fluent');
            }
            if (editor1.classList.contains('fluent-dark')) {
                editor1.classList.remove('fluent-dark');
            }
            if (editor1.classList.contains('synthwave')) {
                editor1.classList.remove('synthwave');
            }
            switch (theme)
            {
                case 'DarkTheme':
                    editor1.classList.add('fluent-dark');
                break;
                case 'BlueTheme':
                    editor1.classList.add('fluent');
                    break;
                default:
                    editor1.classList.add('fluent');
                    break;
            }
        }

        ChangeTheme(theme);
    }
}

function InitTheme() {
    const saved = localStorage.getItem('appTheme');
    if (saved) {
        ChangeTheme(saved);
        return saved;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'DarkTheme' : 'BlueTheme';
    ChangeTheme(theme);
    return theme;
}

function updateMetaThemeColor(theme) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
    }
    meta.content = theme === 'DarkTheme' ? '#1e293b' : '#ffffff';
}

function SelectSidebarButton(id) {
    var items = document.getElementsByClassName("nav-link");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

    var items = document.getElementsByClassName("submenu-link");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

    var element = document.getElementById(id);
    element.classList.add("active");
}

// Scroll-to-top button visibility
window.addEventListener('scroll', function () {
    const btn = document.getElementById('scroll-top-btn');
    if (btn) {
        btn.style.opacity = window.scrollY > 300 ? '1' : '0';
        btn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// React to OS theme changes when no explicit preference saved
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('appTheme')) {
            ChangeTheme(e.matches ? 'DarkTheme' : 'BlueTheme');
        }
    });
}