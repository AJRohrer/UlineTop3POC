function popSubCategory() {
    var jsonFileName = "";
    
    switch ($('#mainCategory').find(":selected").text()) {
        case "Enhancement":
            jsonFileName = "./data/Enhcategory.json";
            break;
        case "Admin":
            jsonFileName = "./data/Admin.json";
            break;
        case "Project":
            jsonFileName = "./data/Project.json";
            break;
        case "Service Request":
            jsonFileName = "./data/ServiceRequest.json";
            break;
        default:
            break;
    }

    $.getJSON(jsonFileName, function(json){

        for (var i = 0; i < json.length; i++){
            //do something
        }

        $.each(json, function(index,item) {
            $("#subcatselect").append("<option value=" + index + ">" + item + "</option>"); 
        });
    });
}

$(document).ready(function(){
    var hourList = ["0.25", "0.5", "0.75", "1.0", 
                    "1.25", "1.5", "1.75", "2.0", 
                    "2.25", "2.5", "2.75", "3.0", 
                    "3.25", "3.5", "3.75", "4.0",
                    "4.25", "4.5", "4.75", "5.0",
                    "5.25", "5.5", "5.75", "6.0",
                    "6.25", "6.5", "6.75", "7.0",
                    "7.25", "7.5", "7.75", "8.0"];
    var options = '';
    for (var i = 0; i < hourList.length; i++){
        options += '<option value="'+ hourList[i] + '">' + hourList[i] + '</option>';
    }
    $('#hours').append(options);
});

$(document).ready(function(){
    var dateString = '';
    dateString = new Date().getMonth();
    dateString += '/' + new Date().getDay();
    dateString += '/' + new Date().getFullYear();
    $('#date').attr("value", dateString);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () { console.log('Service Worker Registered'); });
}
})();