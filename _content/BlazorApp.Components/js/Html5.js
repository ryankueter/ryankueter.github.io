function TopnavCompactMenuExpand() {
    var x = document.getElementById("TopnavCompactMenu");
    if (x.className === "TopnavCompactMenu") {
        x.classList.add("responsive");
    } else {
        x.classList.remove("responsive");
    }
}

function ToggleTopnavLeftSidebar(SidebarId, ContentId) {
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

    var BodyContent = c.querySelector('.BodyContent');
    if (BodyContent.classList.contains("Overlay")) {
        BodyContent.classList.remove("Overlay");
    }
    else {
        BodyContent.classList.add("Overlay");
    }
}

function CloseLeftSidebar(SidebarId, ContentId) {
    var s = document.getElementById(SidebarId);
    var c = document.getElementById(ContentId);
    var Overlay = c.querySelector('.Overlay');

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        Overlay.classList.remove("Overlay");

        if (s.classList.contains("Hide")) {
            s.classList.remove("Hide");
            c.classList.remove("Hide");
        }
        else {
            s.classList.add("Hide");
            c.classList.add("Hide");
        }
    }
}

function ToggleSidebarButton(ButtonId, caret) {
    var s = document.getElementById(ButtonId);
    s.classList.toggle("MainButtonActive");
    var panel = s.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }

    if (caret != null) {
        var c = document.getElementById(caret);
        if (c.classList.contains("down")) {
            c.classList.remove("down");
            c.classList.add("up");
        }
        else {
            c.classList.remove("up");
            c.classList.add("down");
        }
    }
}

function ToggleTopnavDropdown(dropdown, caret) {
    var d = document.getElementById(dropdown);
    if (d.classList.contains("ShowTopnavDropdownContent")) {
        d.classList.remove("ShowTopnavDropdownContent");
    }
    else {
        CloseDropdowns();
        d.classList.add("ShowTopnavDropdownContent");
    }

    if (caret != null) {
        var c = document.getElementById(caret);
        if (c.classList.contains("down")) {
            c.classList.remove("down");
            c.classList.add("up");
        }
        else {
            c.classList.remove("up");
            c.classList.add("down");
        }
    }
}

// Toolbar functions
function ToggleToolbarSidebar(SidebarId, ContentId) {
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

    var BodyContent = c.querySelector('.ToolbarBodyContent');
    if (BodyContent.classList.contains("ToolbarOverlay")) {
        BodyContent.classList.remove("ToolbarOverlay");
    }
    else {
        BodyContent.classList.add("ToolbarOverlay");
    }
}

function CloseToolbarSidebar(SidebarId, ContentId) {
    var s = document.getElementById(SidebarId);
    var c = document.getElementById(ContentId);
    var Overlay = c.querySelector('.ToolbarOverlay');

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches && Overlay.classList.contains("ToolbarOverlay")) {
        Overlay.classList.remove("ToolbarOverlay");

        if (s.classList.contains("Hide")) {
            s.classList.remove("Hide");
            c.classList.remove("Hide");
        }
        else {
            s.classList.add("Hide");
            c.classList.add("Hide");
        }
    }
}

function ToggleToolbarSidebarButton(ButtonId) {
    var s = document.getElementById(ButtonId);
    s.classList.toggle("ToolbarMainButtonActive");
    var panel = s.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

function ToggleToolbarDropdown(dropdown, caret) {
    var d = document.getElementById(dropdown);
    if (d.classList.contains("ShowToolbarDropdownContent")) {
        d.classList.remove("ShowToolbarDropdownContent");
    }
    else {
        CloseDropdowns();
        d.classList.add("ShowToolbarDropdownContent");
    }

    if (caret != null) {
        var c = document.getElementById(caret);
        if (c.classList.contains("up")) {
            c.classList.remove("up");
            c.classList.add("down");
        }
        else {
            c.classList.remove("down");
            c.classList.add("up");
        }
    }
}

// End Toolbar functions

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    // Close open dropdowns
    if (!event.target.matches('.TopnavDropdownButton') && !event.target.matches('.ToolbarDropdownButton')) {
        CloseDropdowns();
    }

    // Close the open Modal
    if (event.target == Modal) {
        Modal.style.display = "none";
    }
}

function CloseDropdowns() {
    var dropdowns = document.getElementsByClassName("TopnavDropdownContent");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('ShowTopnavDropdownContent')) {
            openDropdown.classList.remove('ShowTopnavDropdownContent');
        }
    }

    var d = document.getElementsByClassName("ToolbarDropdownContent");
    for (var i = 0; i < d.length; i++) {
        var openDropdown = d[i];
        if (openDropdown.classList.contains('ShowToolbarDropdownContent')) {
            openDropdown.classList.remove('ShowToolbarDropdownContent');
        }
    }

    var icons = document.getElementsByClassName("up");
    for (var i = 0; i < icons.length; i++) {
        var caret = icons[i];
        caret.classList.remove('up');
        caret.classList.add('down');
    }
}

// Switch Themes, e.g., "DarkTheme"
function SwitchThemes(theme) {
    var element = document.body;
    element.className = "";
    element.classList.add(theme);
}

// Modals
var Modal;
function OpenModal(name) {
    Modal = document.getElementById(name);
    Modal.style.display = "block";
}

function CloseModal(name) {
    Modal = document.getElementById(name);
    Modal.style.display = "none";
}

// Spinner
var Spinner;
function StartSpinner(name) {
    Spinner = document.getElementById(name);
    Spinner.style.display = "block";
}

function StopSpinner() {
    /* var spinner = document.getElementById(name); */
    Spinner.style.display = "none";
}

// When the user clicks on the button, scroll to the top of the document
function topFunction(id) {
    document.getElementById(id).scrollTop = 0;
}

function VerticalSplitter(leftpane, rightpane, vsplitter) {
    var position;
    const left = document.getElementById(leftpane);
    const right = document.getElementById(rightpane);
    const splitter = document.getElementById(vsplitter);

    function onMouseDown(e) {
        position = {
            e,
            offsetLeft: splitter.offsetLeft,
            offsetTop: splitter.offsetTop,
            firstWidth: left.offsetWidth,
            secondWidth: right.offsetWidth
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        }
    }

    function onMouseMove(e) {
        var delta = {
            x: e.clientX - position.e.clientX,
            y: e.clientY - position.e.clientY
        };

        delta.x = Math.min(Math.max(delta.x, -position.firstWidth),
            position.secondWidth);

        splitter.style.left = position.offsetLeft + delta.x + "px";
        left.style.width = (position.firstWidth + delta.x) + "px";
        right.style.width = (position.secondWidth - delta.x) + "px";
    }

    splitter.onmousedown = onMouseDown;
}

function HorizontalSplitter(toppane, bottompane, hsplitter) {
    var position;
    const top = document.getElementById(toppane);
    const bottom = document.getElementById(bottompane);
    const splitter = document.getElementById(hsplitter);

    function onMouseDown(e) {
        position = {
            e,
            offsetLeft: splitter.offsetLeft,
            offsetTop: splitter.offsetTop,
            firstHeight: top.offsetHeight,
            secondHeight: bottom.offsetHeight
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        }
    }

    function onMouseMove(e) {
        var delta = {
            x: e.clientX - position.e.clientX,
            y: e.clientY - position.e.clientY
        };

        delta.y = Math.min(Math.max(delta.y, -position.firstHeight), position.secondHeight);
        splitter.style.left = position.offsetLeft + delta.y + "px";
        top.style.height = (position.firstHeight + delta.y) + "px";
        bottom.style.height = (position.secondHeight - delta.y) + "px";
    }

    splitter.onmousedown = onMouseDown;
}