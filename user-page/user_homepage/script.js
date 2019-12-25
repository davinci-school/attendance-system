console.log("Hello World!");

var data = {
    "date": "2019-12-13",
    "time_in": "15-01-00",
    "time_out": "16-20-00"
}

// console.log(data.date)

function addLog(inputJson) {

    var x = document.createElement("P");
    var t = document.createTextNode("Adding placeholder");
    x.appendChild(t);

    document.getElementById("history").appendChild(x);
}








function getYear(date) {
    var year = "";
    for (let i = 0; i < 4; i++) {
        year = year + date.date[i];
    };
    return year;
};

function getMonth(date) {
    var month = "";
    for (let i = 5; i < 7; i++) {
        month = month + date.date[i];
    };
    return month;

};

function getDay(date) {
    var day = "";
    for (let i = 8; i < 10; i++) {
        day = day + date.date[i];
    };
    return day;
};