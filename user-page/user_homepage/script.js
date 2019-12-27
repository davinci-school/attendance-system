//rows 4-103 are time functions
//rows 103 - 

//get name of day based on date
function getDayName(data) {
    dayOrder = getJsTimeFormat(data).getDay();
    dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday,", "Friday", "Saturday"];
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
    //                                                  minutes *1 to make sure its integer and not string
    var minutesStayed = ((getHourOutNumber(data) * 60) + getMinuteOutNumber(data) * 1) - ((getHourInNumber(data) * 60) + getMinuteInNumber(data) * 1);
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
    var arrival = "Arrived at " + getHourInNumber(data) + ":" + getMinuteInNumber(data);
    var departure = "Departured at " + getHourOutNumber(data) + ":" + getMinuteOutNumber(data);
    var duration = "Stayed for " + durationOfStay(data);

    //create list of future rows for easier access
    var historyLogList = [sessionDate, arrival, departure, duration];

    for (let index = 0; index < historyLogList.length; index++) {
        let text = historyLogList[index];

        let node = document.createElement("P");

        //to add only class to first <p> - to make it bolder
        if (index === 0) {
            node.className = "sessionName";
        };

        var textNode = document.createTextNode(text);
        node.appendChild(textNode);
        document.getElementById(divId).appendChild(node);
    };
};

async function getHistoryLogs() {
    const endpoint = "historyLogsData.json";
    const key = "historyLogsData"

    return $.ajax({
        url: endpoint,
        success: function(data) {

            //is this really a good idea? how else can i store it?
            // data = JSON.parse(JSON.stringify(data))
            sessionStorage.setItem("dataFromJson", data);
            return data
        }
    });
};



getHistoryLogs().then(function(gottenData) {
        console.log(gottenData);
        data = gottenData;
    })
    //after get request is succes, append data to page
    .then(function() {
        for (let index = 0; index < 10; index++) {
            appendHistoryLog(data[index], "session" + index);
        }
    })
    .then(function() {
        let storedData = sessionStorage.getItem("dataFromJson");
        storedData = JSON.parse(JSON.stringify(storedData));
        console.log(storedData);

    })