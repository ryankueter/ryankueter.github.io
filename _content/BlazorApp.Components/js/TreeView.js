/**
 * Author: Ryan A. Kueter
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

 /*
 Tv_Load(<json>, <treeview id>, <checkboxes>, <sort order>);

 Examples:
 Tv_Load('departments.json', 'x-tv', true, 'asc');
 Tv_Load('departments.json', 'x-tv', false, null);
 */

/*
 var someData = [
  {"id":1,"name":"Information Technology","parentId":null},
  {"id":2,"name":"Human Resources","parentId":null},
  {"id":3,"name":"Customer Service","parentId":null},
  {"id":4,"name":"Accounting","parentId":null},
  {"id":5,"name":"Melvin Jefferson","parentId":16},
  {"id":6,"name":"Adrienne Stanley","parentId":16},
  {"id":7,"name":"Laurence Shelton","parentId":2},
  {"id":8,"name":"Erin Weber","parentId":2},
  {"id":9,"name":"Albert Rhodes","parentId":3},
  {"id":10,"name":"Christine Floyd","parentId":3},
  {"id":11,"name":"Sally Wallace","parentId":4},
  {"id":12,"name":"Karen Mathis","parentId":4},
  {"id":13,"name":"Marianne Wong","parentId":3},
  {"id":14,"name":"Camille Paul","parentId":15},
  {"id":15,"name":"Development","parentId":1},
  {"id":16,"name":"Infrastructure","parentId":1}
];

Tv_Load(someData, 'x-tv', false, 'asc');
*/


function Tv_Load(json, id, chkbox, sort) {
  try {
    /* Construct the tree structure */
    var root = Tv_Construct(json, sort);

    /* Create the Treeview */
    Tv_CreateUI(root, document.getElementById(id), id, chkbox);
    
    /* Add the event listeners */
    Tv_AddEvents();
  } 
  catch (error) {
    console.log(error);
  }  
}

function Tv_Construct(jsonString, sort) {
  var tree = [],
    object = {},
    parent,
    child,
    json = JSON.parse(jsonString);

  for (var i = 0; i < json.length; i++) {
    parent = json[i];

    object[parent.id] = parent;
    object[parent.id]["children"] = [];
    }    

  for (var id in object) {
    if (object.hasOwnProperty(id)) {
      child = object[id];

      if (child.parentId && object[child["parentId"]]) {
        let children = object[child["parentId"]]["children"];
        children.push(child);

        /* Sort the child nodes */
        if (sort !== null) {
          children = Tv_Sort(children, 'name', sort);
        }
      } 
      else {
        tree.push(child);
      }
    }
}

  /* Sort the root nodes */
  if (sort !== null) {
    tree = Tv_Sort(tree, 'name', sort);
    }
  return tree;
}

// here is how you build your UL treeview recursively
function Tv_CreateUI(items, parent, id, chkbox){
	var ul = document.createElement("ul");
	if (parent) {
		parent.appendChild(ul);
	}
	
	items.forEach(function(x) {
        let li = document.createElement("li");

        /* Add the node label */
        let label = document.createElement('label');
        label.setAttribute('for', '');
    
        /* Add a checkbox */
        if (chkbox == true)
        {
          let n = document.createElement('input');
          n.setAttribute('type', 'checkbox');
          n.setAttribute('id', '');
          n.setAttribute('value', '');
          /*n.setAttribute('onclick', 'WriteToConsole()');*/
          n.className = "";

          label.appendChild(n);
        }

        /* Add a span to the label */
        let span = document.createElement("span");
        span.innerHTML = x.name;
        label.appendChild(span);  
    
        li.appendChild(label);
    
		if (x.children && x.children.length > 0) {
		    label.className = "caret";
            Tv_CreateUI(x.children, li, id, chkbox);
        }
        else {
          label.className = "indent";
        }

		// If the parent is th container, assign the id
		// else give it a nested class
		if (ul.parentElement.id == id)
		{
            ul.id = "root";
		}
		else
		{
          ul.className = 'nested';
        }
        ul.append(li);
  });
}

function Tv_AddEvents() {
    // Add events
    var toggler = document.getElementsByClassName("caret");
    var i;
    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
}

function Tv_Sort(obj, prop, sort) {
  return obj.sort(function(a, b) {
      if (sort === 'asc') {
          return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } 
      else {
          return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
  });
}