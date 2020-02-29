let db;
if(window.indexedDB) {
    let openRequest = indexedDB.open('Persons');
    openRequest.onupgradeneeded = function(event) {
        db = openRequest.result;
        if(!db.objectStoreNames.contains('Employee'))
            db.createObjectStore('Employee',{keyPath: 'id'});
    }

    openRequest.onsuccess = function(event) {
        db = openRequest.result;
        db.onversionchange = () => {
            db.close();
            alert('refresh the page');
        }
    }

    openRequest.onerror = function() {
        alert('Error while connecting');
    }

    openRequest.onblocked = function() {
        alert('request blocked');
    }
}

let empId = document.querySelector("#id");
let empName = document.querySelector("#name");
let empEmail = document.querySelector("#email");
let submit = document.querySelector("#btnSubmit");
let view = document.querySelector("#btnView");
let viewContent = document.querySelector('#view');

function validate() {
    return !!empId.value && !!empName.value && !!empEmail.value;
}

function onSubmit(event) {
    if(db && validate()) {
        let transaction = db.transaction('Employee','readwrite');
        let store = transaction.objectStore('Employee');
        let obj = {
            id: empId.value,
            name: empName.value,
            email: empEmail.value
        };
        let addRequest = store.add(obj);
        addRequest.onsuccess = function() {
            alert('Record Successfully added');
        }
        addRequest.onerror = function() {
            alert('Already existing Emp Id');
        }
    }
}

function onView() {
    if(db) {
        viewContent.innerHTML = "";
        let transaction = db.transaction('Employee','readonly');
        let store = transaction.objectStore('Employee');
        let request = store.openCursor();
        request.onsuccess = function() {
            let cursor = request.result;
            if(cursor) {
                let s = `EmpId: ${cursor.value.id}  |  Name: ${cursor.value.name}  |  Email: ${cursor.value.email}`;
                let p = document.createElement('p');
                p.textContent = s;
                //li.classList.add("text-center");
                viewContent.appendChild(p);
                cursor.continue();
            }
        }
    }
}

submit.addEventListener("click", onSubmit);
view.addEventListener("click", onView);
