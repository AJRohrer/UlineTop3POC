function popSubCategory() {
    var jsonFileName = "";

    switch ($('#projectCategory').find(":selected").text()) {
        case "Enhancement":
            jsonFileName = "../data/Enhcategory.json";
            break;
        case "Admin":
            jsonFileName = "../data/Admin.json";
            break;
        case "Project":
            jsonFileName = '../data/Project.json';
            break;
        case "Service Request":
            jsonFileName = "../data/ServiceRequest.json";
            break;
        default:
            break;
    }

    $('#projectSubCategory').find('option').remove();

    $.getJSON(jsonFileName, function (data) {
        var options = data.options

        $.each(options, function (key, value) {
            $('#projectSubCategory').append('<option value="">' + value.option + '</option>')
        })
    });
}

$(document).ready(function () {
    var hourList = ["0.25", "0.5", "0.75", "1.0",
        "1.25", "1.5", "1.75", "2.0",
        "2.25", "2.5", "2.75", "3.0",
        "3.25", "3.5", "3.75", "4.0",
        "4.25", "4.5", "4.75", "5.0",
        "5.25", "5.5", "5.75", "6.0",
        "6.25", "6.5", "6.75", "7.0",
        "7.25", "7.5", "7.75", "8.0"];
    var options = '';
    for (var i = 0; i < hourList.length; i++) {
        options += '<option value="' + hourList[i] + '">' + hourList[i] + '</option>';
    }
    $('#hours').append(options);
});

$(document).ready(function () {
    var dateString = '';
    dateString = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    $('#itemDate').val(dateString);

    var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Top 3 Time Allocation"
		},
		legend: {
			maxWidth: 350,
			itemWidth: 120
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			legendText: "{indexLabel}",
			dataPoints: [
				{ y: 1, indexLabel: "Service Request" },
				{ y: 3, indexLabel: "Enhancement-WEB" },
				{ y: 1, indexLabel: "PTO" },
				{ y: 1, indexLabel: "General Admin"}
			]
		}
		]
	});
	chart.render();
});


(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () { console.log('Service Worker Registered'); });
    }
})();

//Assign an event function to the form variable.
var form = document.getElementById("top3Form");
form.onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();

    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
        var input = form[i];
        if (input.name) {
            data[input.name] = input.value;
        }
    }

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    var blah = xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        // done
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            $('#alertSuccess').html(xhr.response)
            $('#alertSuccess').show()
            $.getJSON("/data/Top3List.json", function (data) {
                $('#top3container').html(data.Top3s.map(Top3Item).join(''));
            });
        }
    };

};

const Top3Item = ({ itemDate, rank, projectCategory, projectSubCategory, hours, originalDueDate, description }) => `
    <div class="container  my-2" >
        <div class="card card-body bg-light">
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4">
                    <span class="label">Date: </span>
                    <span id="itemDate">${itemDate.substr(0,10)}</span>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                    <span class="label">Rank:</span>
                    <span id="rank">${rank}</span>
                </div>
                <div class="col-12 col-sm-12 col-md-4">
                    <span class="label">Project:</span>
                    <span id="projectCategory">${projectCategory}</span> -
                                            <span id="projectSubCategory">${projectSubCategory}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-6 col-md-4">
                    <span class="label">Hours: </span>
                    <span id="hours">${hours}</span>
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                    <span class="label">Due Date: </span>
                    <span id="originalDueDate">${originalDueDate.substr(0, 10)}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-12">
                    <span class="label">Description: </span>
                    <span id="description">${description}</span>
                </div>
            </div>
        </div>
   </div >

`;
(function () {
    $.getJSON("/data/Top3List.json", function (data) {
        $('#top3container').html(data.Top3s.map(Top3Item).join(''));
    });
})();