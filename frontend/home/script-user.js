LoadUserNameToPage();
sessionStorage.clear();
//get name of day based on date
function getDayName(data) {
    dayOrder = data.getDay();
    dayList = ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"];
    dayName = dayList[dayOrder];
    return dayName;
};

function displayRightButton() {
    let buttonIn = document.getElementById("checkIn")
    let buttonOut = document.getElementById("checkOut")
    console.log(sessionStorage.getItem("isIn"));


    if (sessionStorage.getItem("isIn") == true) {
        buttonIn.style.display = "none";
        buttonOut.style.display = "initial";
        console.log("uzivatel tu je");

    } else if (sessionStorage.getItem("isIn") == false) {
        buttonIn.style.display = "initial";
        buttonOut.style.display = "none";
    } else {
        console.log("ty darebáku!");
        // buttonIn.style.display = "none";
        // buttonOut.style.display = "none";
        document.getElementById("errorMessage").style.display = "initial"
    }
}

//add History Log
function appendHistoryLog(data, divId) {

    var newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.className = "logBoxWrap";
    document.getElementById("history").appendChild(newDiv);

    time_in = new Date(data.time_in);
    time_out = new Date(data.time_out);

    // get individual informations from input data and combine them with wording
    var sessionDate = getDayName(time_in) + ", " + time_in.getDate() + ". " + (time_in.getMonth() + 1) + ". " + time_in.getFullYear();
    var arrival = "přišel jsi v " + time_in.getHours() + ":" + time_in.getMinutes();
    var departure = "odešel jsi v " + time_out.getHours() + ":" + time_out.getMinutes();

    // get duration of stay, then format it
    let duration = time_out - time_in;
    duration = new Date(duration);
    duration = "doba " + duration.getHours() + ":" + duration.getMinutes() + " hodin";


    //create list of future rows for easier access
    var historyLogList = [sessionDate, arrival, departure, duration];

    // loop through individual informations, append them in different rows
    for (let index = 0; index < historyLogList.length - 1; index++) {
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

// function, that gets history logs from database or local storage (if possible)
//returns unformated data
async function getHistoryLogs() {

    sessionStorage.clear();
    //this will change in future to /user_data_past_month
    //const endpoint = "historyLogsData.json";
    const endpoint = "/api/user_data_past_month";

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
            },
            error: function(error) {
                throw error;
            }
        });
    } else {
        let data = JSON.parse(sessionStorage.getItem("dataFromJson"));
        console.log("Using sessionStorage, no need for GET request.");

        return data;
    };
};

// function that posts attendance to database, check-in to be specific
// this may change in the future as I dont have functional back-end avaliable
async function checkIn() {
    const endpoint = "/api/user_check_in"

    $.ajax({
        url: endpoint,
        type: "POST",
        success: function() {
            console.log("Check-in was succesfull.");
            pageRefresh();
        },
        error: function(error) {
            console.log(error);

        }
    });
};

// function that posts attendance to database, check-out to be specific
// this may change in the future as I dont have functional back-end avaliable
async function checkOut() {
    const endpoint = "/api/user_check_out"

    $.ajax({
        url: endpoint,
        type: "POST",
        success: function() {
            console.log("Check-out was succesfull.");
            pageRefresh();
        },
        error: function(error) {
            console.log(error);
        }

    });
};

function LoadUserNameToPage() {
    return $.ajax({
        url: "/api/username",
        type: "GET",
        success: function(data) {
            document.getElementById("AcountUserName").innerHTML = "Přihlášen jako žák, " + data[0].username;
        },
        error: function(error) {
            throw error;
        }

    });
};

function pageRefresh() {
    setTimeout(function() {
        window.location.reload();
    }, 500)

    sessionStorage.clear();
};

// actual code, that runs
// get data from file and save them to sessionStorage, then log it to console, then append data to HTML

getHistoryLogs()
    .then(function(data) {
        sessionStorage.setItem("isIn", false)
        for (i = 0; i < data.length; i++) {
            //prevent appending unfinished log (on this day)
            if (data[i].time_out != null) {
                if (i == 0) {
                    sessionStorage.setItem("isIn", "left")
                }
                appendHistoryLog(data[i], "session" + i);
            } else if (data[i].time_out == null && i == 0) {
                //save info, if user is in, but has not checked out
                sessionStorage.setItem("isIn", true)
            };
        };
        // displayRightButton();
    });