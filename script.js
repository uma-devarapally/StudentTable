row=null;
ed={};
function fsubmit()
{
    var formdata=read_data();

    if(row==null){
        get_store_data(formdata);
        insert_row(formdata);
    }
    else{
        update(formdata);
    }

}
//getting data i.e entered in form
function read_data() 
{
    var formdata={};
    formdata["sname"]=document.getElementById("sname").value;
    formdata["sid"]=document.getElementById("sid").value;
    formdata["smarks"]=document.getElementById("smarks").value;
    return formdata;
}
  //retriveing existing data from local storage and adding new data
function get_store_data(formdata)
{
    var names=JSON.parse(localStorage.getItem("SNames"));
    names.push(formdata.sname);
    var ids=JSON.parse(localStorage.getItem("SIDs"));
    ids.push(formdata.sid); 
    var marks=JSON.parse(localStorage.getItem("SMarks"));
    marks.push(formdata.smarks);
    storeData(names,ids,marks);
}
function storeData(names,ids,marks) {
    localStorage.setItem("SNames",JSON.stringify(names));
    localStorage.setItem("SIDs",JSON.stringify(ids));
    localStorage.setItem("SMarks",JSON.stringify(marks)); 
}

 //Adding a new row to the table
function insert_row(data)
{
    var table=document.getElementById("std_list").getElementsByTagName('tbody')[0];
    var row=table.insertRow(table.length);
    row.insertCell(0).innerHTML=data.sname;
    row.insertCell(1).innerHTML=data.sid;
    row.insertCell(2).innerHTML=data.smarks;
    row.insertCell(3).innerHTML='<Button onclick="edit(this)" class="ACTbtn">Edit</Button> <Button onclick="remove_row(this)" class="ACTbtn">Delete</Button>';
    reset_Form();
}

function edit(a) {
    row = a.parentElement.parentElement;    
    ed["Name"]=row.cells[0].innerHTML;
    ed["ID"]=row.cells[1].innerHTML;
    ed["marks"]=row.cells[2].innerHTML;
    document.getElementById("sname").value = row.cells[0].innerHTML;
    document.getElementById("sid").value = row.cells[1].innerHTML;
    document.getElementById("smarks").value = row.cells[2].innerHTML;    
}
function update(formData) {
    //updating in HTML document table
   row.cells[0].innerHTML = formData.sname;
    row.cells[1].innerHTML = formData.sid;
    row.cells[2].innerHTML = formData.smarks;
    //updating in local storage
    names=JSON.parse(localStorage.getItem("SNames"));
    ids=JSON.parse(localStorage.getItem("SIDs"));
    marks=JSON.parse(localStorage.getItem("SMarks"));
    ind=names.indexOf(ed.Name);
    names[ind]=formData.sname;
    ids[ind]=formData.sid;
    marks[ind]=formData.smarks;
    storeData(names,ids,marks);
    reset_Form();
}

function remove_row(a) {
    //deleting in HTML document table
    if (confirm('Are you sure to delete this record ?')) {
        row = a.parentElement.parentElement;
        document.getElementById("std_list").deleteRow(row.rowIndex);
        //deleting from local storage
        ed["Name"]=row.cells[0].innerHTML;//retrives the elements to be deleted
        ed["ID"]=row.cells[1].innerHTML;
        ed["marks"]=row.cells[2].innerHTML;

        names=JSON.parse(localStorage.getItem("SNames"));//retrives the local storage data
        ids=JSON.parse(localStorage.getItem("SIDs"));
        marks=JSON.parse(localStorage.getItem("SMarks"));

        ind=names.indexOf(ed.Name);
        if(ind==0){
            //deleting 1st element in array
            names.shift();
            ids.shift();
            marks.shift();
        }
        else{
            //deleting specific element in array
            names.splice(ind,ind);
            ids.splice(ind,ind);
            marks.splice(ind,ind);
        }
        storeData(names,ids,marks);
    }
}
//clear the form
function reset_Form() {
    document.getElementById("sname").value = "";
    document.getElementById("sid").value = "";
    document.getElementById("smarks").value = "";
    row = null;
}