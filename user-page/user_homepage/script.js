var data = {
    "date": "2019-12-13",
    "time_in": "15-01-00",
    "time_out": "16-20-00"
};

// var time = data.time_in;
// var date = data.date;

// console.log(date);
// console.log(time);






console.log(getDayName(data));

//get name of day based on date
function getDayName(data) {
    dayOrder = getJsTimeFormat(data).getDay();
    dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday,", "Friday", "Saturday"];
    dayName = dayList[dayOrder];
    return dayName;
};

function getJsTimeFormat(data) {
    var monthName = getMonthName(data);
    var day = getDayNumber(data);
    var year = getYearNumber(data);
    var x = new Date(monthName + " " + day + ", " + year);
    return x;
};

function getYearNumber(data) {
    var year = "";
    for (let i = 0; i < 4; i++) {
        year = year + data.date[i];
    };
    return year;
};

function getMonthNumber(data) {
    var month = "";
    for (let i = 5; i < 7; i++) {
        month = month + data.date[i];
    };
    return month;

};

function getMonthName(data) {
    var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = ""; //set month as empty string

    // go through data and extract numbers that corespond with month
    //data dor month are on 5th and 6th place, therefore i starts at 5 and ends with 6
    for (let i = 5; i < 7; i++) {
        month = month + data.date[i];
    };
    month = month - 1; //substract one because first index of list is 0 not 1
    month = monthList[month]; //find name of month that equals to the number
    return month;
}

//get date of day (output = 15, only the number, not 'th of 'rd)
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
    }
    return hour
}

//get hour of departure from data
function getHourOutNumber(data) {
    var hour = "";
    for (let i = 0; i < 2; i++) {
        hour = hour + data.time_out[i];
    }
    return hour
}

//get minute of arrival from data
function getMinuteInNumber(data) {
    var minute = "";
    for (let i = 3; i < 5; i++) {
        minute = minute + data.time_in[i];
    }
    return minute
}

// get minute of departure from data
function getMinuteOutNumber(data) {
    var minute = "";
    for (let i = 3; i < 5; i++) {
        minute = minute + data.time_out[i];
    }
    return minute
}


// function that ads content to page
function addLog(jsonInput) {

    var x = document.createElement("P");
    var t = document.createTextNode("Adding placeholder");
    x.appendChild(t);

    document.getElementById("history").appendChild(x);
};