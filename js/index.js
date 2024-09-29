const styleElement = document.createElement('style');
styleElement.textContent = `
body {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.container {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}

.btn-custom {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    color: white;
    border: none;
}

.btn-custom:hover {
    opacity: 0.8;
    color: white;
}
`;
document.head.appendChild(styleElement);

var jpdbBaseUrl = 'http://api.login2explore.com:5577';
var connToken = '90931978|-31949224628781332|90962481';
var StudentDBName = 'Student-Database';
var StudentR = 'Student-Record';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';
$('#rollno').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonObj() {
    var rollno = $('#rollno').val();
    var jsonStr = { rollno: rollno };
    return JSON.stringify(jsonStr);
}

function fillData(JsonObj) {
    saveRecNo2LS(JsonObj);
    var record = JSON.parse(JsonObj.data).record;
    $('#name').val(record.name);
    $('#classes').val(record.classes);
    $('#birthdate').val(record.birthdate);
    $('#address').val(record.address);
    $('#Enrolldate').val(record.Enrolldate);
}

function resetForm() {
    $('#rollno').val('');
    $('#name').val('');
    $('#classes').val('');
    $('#birthdate').val('');
    $('#address').val('');
    $('#Enrolldate').val('');
    $('#rollno').prop('disabled', false);
    $('#save').prop('disabled', true);
    $('#update').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $('#rollno').focus();
}

function saveData() {
    var jsonStrObj = validateData();
    if (!jsonStrObj) { // If data validation fails, return early
        return;
    }

    // Create PUT request using the JsonPowerDB API
    var putRequest = createPUTRequest(connToken, jsonStrObj, StudentDBName, StudentR);

    // Send the PUT request to JsonPowerDB
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});

    console.log(resJsonObj);  // Check the response for errors

    if (resJsonObj.status === 200) {
        alert('Data saved successfully');
        resetForm();
    } else {
        alert('Error in saving data');
    }

    $('#rollno').focus();
}

function changeData() {
    $('#update').prop('disabled', true);
    var jsonChg = validateData();
    if (!jsonChg) { // Validation failed
        return;
    }
    var updateRequest = createPUTRequest(connToken, jsonChg, StudentDBName, StudentR);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rollno').focus();
}

function validateData() {
    var rollno = $('#rollno').val();
    var name = $('#name').val();
    var classes = $('#classes').val();
    var birthdate = $('#birthdate').val();
    var address = $('#address').val();
    var Enrolldate = $('#Enrolldate').val();

    if (!rollno || !name || !classes || !birthdate || !address || !Enrolldate) {
        alert('Please fill out all the fields.');
        return null;
    }

    var jsonStrObj = {
        rollno: rollno,
        name: name,
        classes: classes,
        birthdate: birthdate,
        address: address,
        Enrolldate: Enrolldate
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp() {
    var jsonStrObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, StudentDBName, StudentR, jsonStrObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status == 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#name').focus();
    } else if (resJsonObj.status == 200) {
        $('#rollno').prop('disabled', true);
        fillData(resJsonObj);
        $('#update').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#name').focus();
    }
}

// Attach event listeners to each input field
$('#rollno, #name, #classes, #birthdate, #address, #Enrolldate').on('input', function() {
    checkIfFormIsFilled();
});

function checkIfFormIsFilled() {
    var rollno = $('#rollno').val();
    var name = $('#name').val();
    var classes = $('#classes').val();
    var birthdate = $('#birthdate').val();
    var address = $('#address').val();
    var Enrolldate = $('#Enrolldate').val();

    if (rollno && name && classes && birthdate && address && Enrolldate) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#update').prop('disabled', false);
    } else {
        $('#save').prop('disabled', true);
        $('#reset').prop('disabled', true);
        $('#update').prop('disabled', true);
    }
}
