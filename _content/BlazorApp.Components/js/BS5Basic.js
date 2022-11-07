
// Close the dropdown menu if the user clicks outside of it
//window.onclick = function (event) {
//    // Close open dropdowns
//    if (!event.target.matches('.dropdown-toggle')) {
//        CloseDropdowns();
//    }
//}
//function ShowToast(id) {
//    const toastLiveExample = document.getElementById(id)
//    const toast = new bootstrap.Toast(toastLiveExample)
//    toast.show()
//}

function CloseDropdowns() {
    /* Toggle the button */
    var dropdowns = document.getElementsByClassName("dropdown-toggle");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        var a = openDropdown.getAttribute("aria-expanded");
        if (a == true) {
            a = false;
        }
    }

    /* Toggle the dropdown */
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

function OpenModal(id) {
    var d = document.getElementById(id);
    if (d.classList.contains("show") == false) {
        d.classList.add("show");
    }
    //else {
    //    CloseDropdowns();
    //    d.classList.add("show");
    //}
}

function ToggleLeftSidebar(SidebarId, ContentId) {
    var s = document.getElementById(SidebarId);
    var c = document.getElementById(ContentId);
    if (s.classList.contains("Hide")) {
        s.classList.remove("Hide");
        c.classList.remove("Hide");
    }
    else {
        s.classList.add("Hide");
        c.classList.add("Hide");
    }
}