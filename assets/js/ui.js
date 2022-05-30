var selectedRecord = null;
var selectedRecordID = null;
var baseUrl = "http://localhost:3000/receivers";


// Add Receiver
function addReceiverRecordToTable(data) {
    var allus = document.getElementById("allus").getElementsByTagName("tbody")[0];
    var newRecord =allus.insertRow(allus.length);

    
    var cell1 = newRecord.insertCell(0);
    cell1.innerHTML = data["_id"];
    var cell2 = newRecord.insertCell(1);
    cell2.innerHTML = data["latitude"];
    var cell3 = newRecord.insertCell(2);
    cell3.innerHTML = data["longitude"];
    var cell4 = newRecord.insertCell(3);
    cell4.innerHTML = data["coverage"];
    var cell5 = newRecord.insertCell(4);
    cell5.innerHTML = '<a onClick="onReceiverDelete(this)">Delete</a>';   
}

function addUser(data) {
    var postData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: baseUrl + "/",
        dataType: 'json',
        data: postData,
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(data);
            // addUserRecordToTable(data);
            // window.location.href = "./loginbiller.html";
            
        },
        headers:{
            Accept:"application/json; charset=utf-8",
            Content_Type:"application/json; charset=utf-8",
        }
       
        
    });
}

function onReceiverDetailsSubmit() {
  console.log("Function called : add user");
  //document.getElementById("loginbox").style.display = "none";
    var formData = {};
    formData["latitude"] = document.getElementById("Latitude").value;
    formData["longitude"] = document.getElementById("Longitude").value;
    formData["coverage"] = document.getElementById("Coverage").value;
   
    addUser(formData);
   
    clearReceiverForm();

}

// Get all receivers
$(document).ready(function () {
    //document.getElementById("loginbox").style.display = "none";
    $.ajax({
        type: "GET",
        url: baseUrl + "/",
        cache: false,
        success: function (response) {
            var data = response;
            data.forEach((user) => {
                addReceiverRecordToTable(user);
            });
        }
    });
});

// Delete receiver
function onReceiverDelete(td) {
    if (confirm('Are you sure you want to delete this record')) {
        var row = td.parentElement.parentElement;
        deleteReceiverData(row);
        
        
    }

}

function deleteReceiverData(row){
    $.ajax({
        type: "GET",
        url: baseUrl + "/delete/" + row.cells[0].innerHTML,
        cache: false,
        success: function (response) {
            console.log(response.message);
            console.log(selectedRecordID);
        }
    });

}

function clearReceiverForm() {
    document.getElementById("Latitude").value = "";
    document.getElementById("Longitude").value = "";
    document.getElementById("Coverage").value = "";
    
}
