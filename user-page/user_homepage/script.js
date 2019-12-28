//get name of day based on date
function getDayName(data) {
    dayOrder = getJsTimeFormat(data).getDay();
    dayList = ["neděle", "pondělí", "úterý", "středa", "čtvrtek,", "pátek", "sobota"];
    dayName = dayList[dayOrder];
    return dayName;
};

//get JS standard time format value
function getJsTimeFormat(data) {
    var monthName = getMonthName(data);
    var day = getDayNumber(data);
    var year = getYearNumber(data);
    var x = new Date(monthName + " " + day + ", " + year);
    return x;
};


//get year number based on date
function getYearNumber(data) {
    var year = "";
    for (let i = 0; i < 4; i++) {
        year = year + data.date[i];
    };
    return year;
};

//get month number based on date
function getMonthNumber(data) {
    var month = "";
    for (let i = 5; i < 7; i++) {
        month = month + data.date[i];
    };
    return month;

};

//get month name based on date
function getMonthName(data) {
    var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = getMonthNumber(data); //get number of month from data
    month = month - 1; //substract one because first index of list is 0 not 1
    month = monthList[month]; //find name of month that equals to the number
    return month;
};

//get date of day (exapmle -> output = 15, only the number, not 'th or 'rd)
function getDayNumber(data) {
    var day = "";
    for (let i = 8; i < 10; i++) {
        day = day + data.date[i];
    };
    return day;
};

// get hour of arrival from data
function getHourInNumber(data) {
    var hour = "";
    for (let i = 0; i < 2; i++) {
        hour = hour + data.time_in[i];
    };
    return hour;
}

//get hour of departure from data
function getHourOutNumber(data) {
    var hour = "";
    for (let i = 0; i < 2; i++) {
        hour = hour + data.time_out[i];
    };
    return hour;
}

//get minute of arrival from data
function getMinuteInNumber(data) {
    var minute = "";
    for (let i = 3; i < 5; i++) {
        minute = minute + data.time_in[i];
    };
    return minute;
};

// get minute of departure from data
function getMinuteOutNumber(data) {
    var minute = "";
    for (let i = 3; i < 5; i++) {
        minute = minute + data.time_out[i];
    };
    return minute;
};

function durationOfStay(data) {
    //                                                  Number() to convert str to int
    var minutesStayed = ((getHourOutNumber(data) * 60) + Number(getMinuteOutNumber(data))) - ((getHourInNumber(data) * 60) + Number(getMinuteInNumber(data)));
    var hoursStayed = Math.floor(minutesStayed / 60);
    minutesStayed = minutesStayed - hoursStayed * 60;
    var duration = hoursStayed + ":" + minutesStayed;
    return duration;
};

//add History Log
function appendHistoryLog(data, divId) {
    var newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.className = "logBoxWrap";
    document.getElementById("history").appendChild(newDiv);

    // get individual informations from input data and combine them with wording
    var sessionDate = getDayName(data) + " " + getDayNumber(data) + ". " + getMonthNumber(data) + ". " + getYearNumber(data);
    var arrival = "přišel jsi " + getHourInNumber(data) + ":" + getMinuteInNumber(data);
    var departure = "odešel jsi " + getHourOutNumber(data) + ":" + getMinuteOutNumber(data);
    var duration = "doba " + durationOfStay(data) + " hodin";

    //create list of future rows for easier access
    var historyLogList = [sessionDate, arrival, departure, duration];


    // loop through individual informations, append them in different rows
    for (let index = 0; index < historyLogList.length; index++) {
        let text = historyLogList[index];

        let node = document.createElement("P");
        node.className = "logBoxP"

        //to add only class to first <p> - to make it bolder
        if (index === 0) {
            node.className = "sessionDate logBoxP";
        };

        var textNode = document.createTextNode(text);
        node.appendChild(textNode);
        document.getElementById(divId).appendChild(node);
    };
};

// 
async function getHistoryLogs() {
    const endpoint = "historyLogsData.json";

    // if there are no data at sessionStorage, use get request, 
    // else use those stored data, to avoid unnecceseary load on server and processing time
    if (sessionStorage.getItem("dataFromJson") == null) {
        return $.ajax({
            url: endpoint,
            type: "GET",
            success: function(data) {

                //store data to sessionStorage for later use
                sessionStorage.setItem("dataFromJson", JSON.stringify(data));
                console.log("Using GET request, no local data found.");
            }
        });
    } else {
        let data = JSON.parse(sessionStorage.getItem("dataFromJson"));
        console.log("Using sessionStorage, no need for GET request.");

        return data;
    };

};


//actual code, that runs
//get data from file and save them to sessionStorage, then log it to console, then append data to HTML
getHistoryLogs()
    .then(function(data) {
        for (let index = 0; index < 10; index++) {
            appendHistoryLog(data[index], "session" + index);
        }
    });