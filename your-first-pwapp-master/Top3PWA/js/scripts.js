function popSubCategory() {
    var jsonFileName = "";
    $('#mainCategory').empty();
    switch ($('#mainCategory').find(":selected").text()) {
        case "Enhancement":
            jsonFileName = "Enhcategory.json";
            break;
        case "Admin":
            jsonFileName = "Admin.json";
            break;
        case "Project":
            jsonFileName = "Project.json";
            break;
        case "Service Request":
            jsonFileName = "ServiceRequest.json";
            break;
        default:
            break;
    }

    $.ajax({
        url: jsonFileName,
        type: 'POST',
        dataType: 'json',
        success: function (json) {
            var first = true;
            var optionText = "";
            $.each(json, function (i, value) {
                if (first){
                    optionText = "<option selected=\"selected\"";
                }
                else{
                    optionText = "<option>";
                }
                $('#subcatselect').append($(optionText).text(value).attr('value', value));
                first = false;
            });
        }
    });
}

$(document).ready(fuction(){
    var hourList = ["0.25", "0.5", "0.75", "1.0", 
                    "1.25", "1.5", "1.75", "2.0", 
                    "2.25", "2.5", "2.75", "3.0", 
                    "3.25", "3.5", "3.75", "4.0",
                    "4.25", "4.5", "4.75", "5.0",
                    "5.25", "5.5", "5.75", "6.0",
                    "6.25", "6.5", "6.75", "7.0",
                    "7.25", "7.5", "7.75", "8.0"];
    
    for (var i = 0; i < hourList.length; i++){
        $('#subcatselect').append(hourList[i]);
    }

});