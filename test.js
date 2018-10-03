if (localStorage.getItem("things")) {
        todos = JSON.parse(localStorage.getItem("things")); //to get saved list from storage so the user can carry on where they left off
        for (i=0; i<todos.length; i++) {
            let li = document.createElement("li");
            let delBut = document.createElement("button"); 
            let ul = document.getElementById("list");
                            //creates all elements needed to populate the page with data from storage
            li.innerHTML = '<input type="checkbox" id="comp"><label for = "comp">'+ todos[i] +'</label>';
            delBut.className="fa fa-trash";
            delBut.addEventListener('click', removeTask);

            li.appendChild(delBut);
            ul.appendChild(li);
        }
    } else {
        todos = [];
    }
function somethingNew() {
    let inputV = document.getElementById("new-item").value;
    if (inputV.length < 2) {
        alert("Invalid entry");
        document.getElementById("new-item").value = "";
    } else {
        let li = document.createElement("li");//creates list item to put into ul later
        let delBut = document.createElement("button"); //button to delete task
        let ul = document.getElementById("list");//gets the whole list
        
        li.innerHTML = '<input type="checkbox" id="comp"><label for = "comp">'+ inputV +'</label>';
        delBut.className="fa fa-trash"; //font-awesome classname for bin icon
        delBut.addEventListener('click', removeTask);

        li.appendChild(delBut);
        ul.appendChild(li);
        todos.push(inputV);
        localStorage.setItem("things", JSON.stringify(todos));  //when added need to save to storage immediately
    
        document.getElementById("new-item").value = ""; //so the user doesnt have to manually remove the previous text
    }
}
function removeTask() {
    if (confirm("Are you sure?")) {
        let listItem = this.parentNode;
        let uList = listItem.parentNode;
        uList.removeChild(listItem);
        
        localStorage.removeItem("things");   //removes all data from the storage for list
        todos = []; //so i can repopulate it with updated list

        newList = document.getElementsByTagName("li");  //get new list without the deleted one in from page
        for (i=0; i< newList.length; i++) {
            todos[i] = newList[i].innerText //repopulate todos with remaining li's in new order so can save to storage
            localStorage.setItem("things", JSON.stringify(todos));
        }
    } else {
        return;
    }
}