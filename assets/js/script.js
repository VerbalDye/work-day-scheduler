// set the current date for the header
var date = moment().format('dddd, MMMM Do');
$("#currentDay").text(date);

var taskSchedule = {};

var setupTask = function() {
    if (localStorage.getItem("taskSchedule")) {
        taskSchedule = JSON.parse(localStorage.getItem("taskSchedule"));
        for (var i = 8; i < 18; i++) {
            $("#" + i).val(taskSchedule[i]);
        }
    } else {
        for (var i = 8; i < 18; i++) {
            taskSchedule[i] = "";
        }
        localStorage.setItem("taskSchedule", JSON.stringify(taskSchedule));
    }
}

var updateLocal = function() {
    localStorage.setItem("taskSchedule", JSON.stringify(taskSchedule));
}


// goes through each hour and colors it according to it's relation to the current time
var colorTimes = function() {
    $(".summary").each(function() {

        // removes any previous color classes
        $(this).removeClass("past present future");

        // gets the time this element represents from the id
        var labelTime = $(this).attr("id").trim();

        // get the current time and current date with the label's hour
        var currentHour = moment().startOf("hour");
        var sectionHour = moment().startOf("hour").set("hour", labelTime);

        // checks the time values and set the class containing the right colors
        if (sectionHour.isBefore(currentHour)) {
            $(this).addClass("past");
        } else if (sectionHour.isAfter(currentHour)) {
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    });
}

$(".time-block").on("click", "button", function() {
    var textId = $(this).prev().attr("id");
    var textVal = $(this).prev().val().trim();
    console.log(textId);
    console.log(textVal);
    taskSchedule[textId] = textVal;
    updateLocal();
});

// set the color function to run every 30 seconds and update accordingly
setInterval(function() {
    colorTimes();
}, 30000);

colorTimes();
setupTask();