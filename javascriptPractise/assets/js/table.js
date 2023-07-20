const btn = document.getElementsByClassName("")

let val = "Hai Bro ";

function save() {
    document.getElementById("text").style.color = "red";
    document.getElementById("text").innerHTML = val;
}


//--------------------------------------------------------------------------------//




const studentsSec = document.querySelector(".student-form");
const gridSec = document.querySelector(".grid");

const btnEd = document.querySelector("#btnEdit");
const btnDl = document.querySelector("#btnDelete");
const btnAdd = document.querySelector("#btnAdd");
const btnSubmit = document.querySelector("#btnSubmit");
const btnCancel = document.querySelector("#btnCancel");

btnEd.addEventListener("click", editStudent);
btnDl.addEventListener("click", deleteStudent);
btnAdd.addEventListener("click", addStudent);
btnSubmit.addEventListener("click", saveStudent);
btnCancel.addEventListener("click", cancelStudent);

let isEdit = false;

///// Staticcccc List Of objects;
const StudentList =
    [{ name: "Hari", age: 23, loc: "ark", id: 1 },
    { name: "sai", age: 22, loc: "cpd", id: 2 },
    { name: "raju", age: 21, loc: "knr", id: 3 }]

let selection = [];
renderStudents();


// Desplaing Data
function renderStudents() {
    selection = [];
    let tbody = document.querySelector("#tbStudents");
    tbody.innerHTML = "";
    StudentList.forEach(function (item) {
        tbody.innerHTML += renderRow(item)
    });
    tbody.querySelectorAll("input").forEach(function (element) {
        element.addEventListener("click", handleSelection);
    })
    console.log(StudentList);
}

// selecting singlerecord 
function handleSelection(event) {
    const selectedEle = event.target;
    const id = selectedEle.dataset.id;
    if (selectedEle.checked) {
        selection.push(id);
    }
    else {
        const idx = selection.indexOf(id);
        if (idx > -1) {
            selection.splice(idx, 1)
        }
    }
}

function renderRow(student) {
    const _tbrow = `<tr>
<td> ${student.name} </td>
<td> ${student.age} </td>
<td> ${student.loc} </td>
<td><input type="checkbox" data-id="${student.id}" /></td>
</tr>`
    return _tbrow;
}


// Add new record
function addStudent() {
    isEdit = false;
    studentsSec.hidden = false;
    gridSec.hidden = true;
}

// Edit Record
function editStudent() {
    isEdit = true;
    const student = StudentList.find(function (std) {
         return std.id == selection[0] 
        });

    gridSec.hidden = true;
    studentsSec.hidden = false;
    const _forms = document.forms["studentForm"];
    _forms.name.value = student.name;
    _forms.age.value = student.age;
    _forms.loc.value = student.loc;
    renderStudents();
}

// backto table
function cancelStudent() {
    studentsSec.hidden = true;
    gridSec.hidden = false;
    renderStudents();
}


// Save Data 
function saveStudent() {
    const _forms = document.forms["studentForm"];
    const student = {
        id: null,
        name: _forms.name.value,
        age: _forms.age.value,
        loc: _forms.loc.value,
    }

    if (isEdit) {
        StudentList.forEach(function (item) {
            if (item.id == selection[0]) {
                item.name = student.name;
                item.age = student.age;
                item.loc = student.loc;
            }
        })
    } else {
        student.id = StudentList.length + 1;
        StudentList.push(student);
    }
    studentsSec.hidden = true;
    gridSec.hidden = false;
    console.log(StudentList);
    renderStudents();
}

// Deleting Record 
function deleteStudent() {
    if (selection.length > 1 || selection.length === 0) {
        alert("Please select one student");
    }
    else {
        const isConfirm = confirm("Are you sure ? do you really want to delete ?");
        if (isConfirm) {
            const idx = StudentList.findIndex(function (value) { return value.id === selection[0] })
            StudentList.splice(idx, 1);
            renderStudents();
        }
    }
}

