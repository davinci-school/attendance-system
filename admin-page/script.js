//clear sessionStorage on every page laod
sessionStorage.clear();



// fetch data from local JSON file, function returns data
async function getAllHistoryLogs(date) {
    const endpoint = "data.json";

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


//post user check-in that overwrites database data
async function postUserCheckin(username, year, month, day, hour, minute, second) {
    const endpoint = "/admin_edit/" + username + "/checkin/" + year + "_" + month + "_" + day + "/" + hour + ":" + minute + ":" + second;
    console.log(endpoint);

    $.ajax({
        url: endpoint,
        type: "POST",
        succes: function() {
            console.log("Databse request succesfull.");

        },
        error: function(error) {
            throw error;
        }

    });
    return;
}

//post user check-out that overwrites database data
async function postUserCheckut(username, year, month, day, hour, minute, second) {
    const endpoint = "/admin_edit/" + username + "/checkout/" + year + "_" + month + "_" + day + "/" + hour + ":" + minute + ":" + second;
    console.log(endpoint);

    $.ajax({
        url: endpoint,
        type: "POST",
        succes: function() {
            console.log("Databse request succesfull.");

        },
        error: function(error) {
            throw error;
        }

    });
    return;
}

// postUserCheckin("Jana Trojanová", "2019", "12", "2", "15", "21", "44");¨



//actual code that runs
getAllHistoryLogs()
    .then(function(data) {
        console.log(data);
    });




//format date to JS object (for time in)
function formatDate_timeIn(object) {

    var year = "",
        month = "",
        day = "",
        hour = "",
        minute = "",
        second = "";

    for (let i = 0; i < 4; i++) {
        year = year + object.date[i];
    };
    for (let i = 5; i < 7; i++) {
        month = month + object.date[i];
    };
    for (let i = 8; i < 10; i++) {
        day = day + object.date[i];
    };
    for (let i = 0; i < 2; i++) {
        hour = hour + object.time_in[i];
    }
    for (let i = 3; i < 5; i++) {
        minute = minute + object.time_in[i];
    }
    for (let i = 6; i < 8; i++) {
        second = second + object.time_in[i];
    }

    var date = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second);
    return date;
};

//format date to JS object (for time out)
function formatDate_timeOut(object) {

    var year = "",
        month = "",
        day = "",
        hour = "",
        minute = "",
        second = "";

    for (let i = 0; i < 4; i++) {
        year = year + object.date[i];
    };
    for (let i = 5; i < 7; i++) {
        month = month + object.date[i];
    };
    for (let i = 8; i < 10; i++) {
        day = day + object.date[i];
    };
    for (let i = 0; i < 2; i++) {
        hour = hour + object.time_out[i];
    }
    for (let i = 3; i < 5; i++) {
        minute = minute + object.time_out[i];
    }
    for (let i = 6; i < 8; i++) {
        second = second + object.time_out[i];
    }

    var date = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second);
    return date;
};