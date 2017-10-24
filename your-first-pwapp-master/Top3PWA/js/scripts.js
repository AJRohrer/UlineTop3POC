function popSubCategory() {
    var jsonFileName = "";
    switch ($('')) {
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