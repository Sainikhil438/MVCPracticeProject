$(document).ready(function () {
    ShowEmployeeData();
});


function ShowEmployeeData() {
    $.ajax({
        url: '/Ajax/EmployeeList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr class="text-center">';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.city +'</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="EditRecord(' + item.id + ')">Edit</a>||<a href="#" class="btn btn-danger" onclick="DeleteRecord(' + item.id + ')">Delete</a></td>';
                object += '<tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });
};

$('#addEmpBtn').click(function () {
    ClearTextBox();
    $('#EmpModal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#Editbtn').css('display', 'none');
    $('#empHeading').text('Add Employee');
});


function AddEmployee() {
    
    var objData = {
        Name: $('#Name').val(),
        State: $('#State').val(),
        City: $('#City').val(),
        Salary: $('#Salary').val()
    }

    $.ajax({
        url: '/Ajax/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert('Data Not Saved');
        }
    });

      
}

function HideModalPopUp() {
    $('#EmpModal').modal('hide');
}

function ClearTextBox() {
    $('#EmployeeId').val('');
    $('#Name').val('');
    $('#State').val('');
    $('#City').val('');
    $('#Salary').val('');
}

function DeleteRecord(id) {
    if (confirm('Are you Sure, You want to Delete this Record?'))
    {
        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert("Record Deleted");
                ShowEmployeeData();
            },
            error: function () {
                alert("Record Deleted");
            }
        });
    }
    
}


function EditRecord(id) {
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response)
        {
            $('#EmpModal').modal('show');
            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);
            $('#State').val(response.state);
            $('#City').val(response.city);
            $('#Salary').val(response.salary);
            $('#AddEmployee').css('display', 'none');
            $('#Editbtn').css('display', 'block');
            $('#empHeading').text('Update Record');

        },
        error: function ()
        {
            alert('Data Not Foud');
        }
    });
}

function UpdateRecord() {
    var objData = {
        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        State: $('#State').val(),
        City: $('#City').val(),
        Salary: $('#Salary').val()
    }

    $.ajax({
        url: '/Ajax/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert('Data Not Updated');
        }
    });
}