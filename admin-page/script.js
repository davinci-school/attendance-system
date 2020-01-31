//clear sessionStorage on every page laod
sessionStorage.clear();

// fetch data from local JSON file, function returns data
async function getAllHistoryLogs(date) {
    const endpoint = "status.json";

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

function appendUser(data, divId) {
    let newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.className = "statusWrap";
    document.getElementById("attendance").appendChild(newDiv);

    var name = data.user_name;
    var status = "";

    if (data.time_in && data.time_out) {
        status = "O";
    } else if (data.time_in) {
        status = "P"
    } else if (!data.time_in && !data.time_out) {
        status = "No status" //status has no value
    }

    console.log(status, name);

    let node = document.createElement("p");
    node.classname = "userName";
    var textNode = document.createTextNode(name);
    node.appendChild(textNode);
    document.getElementById(divId).appendChild(node);

    node = document.createElement("p");
    node.classname = "userStats";
    var textNode = document.createTextNode(status);
    node.appendChild(textNode);
    document.getElementById(divId).appendChild(node);

    //also add more icon (adding this note for later)
};



//actual code that runs
getAllHistoryLogs()
    .then(function(data) {
        console.log(data);
        appendUser(data[0], "div1");
        appendUser(data[1], "div1");
        appendUser(data[2], "div1");
    });

























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