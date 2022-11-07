
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
}

function SelectSidebarButton(id) {

    // Deactivate active buttons
    var items = document.getElementsByClassName("nav-link");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

    var items = document.getElementsByClassName("submenu-link");
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }

    // Activate the current button
    var element = document.getElementById(id);
    element.classList.add("active");
}