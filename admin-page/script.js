// //clear sessionStorage on every page laod
// sessionStorage.clear();

// fetch data from local JSON file, function returns data
async function getAllHistoryLogs(date) {
    const endpoint = "status.json";

    // if there are no data at sessionStorage, use get request, 
    // else, use those stored data, to avoid unnecceseary load on server and processing time
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

//apend user to page
function appendUser(data, divId) {
    // console.log(data);

    var divNumber = divId

    divId = divNumber
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
        status = "null" //status has no value
    }



    //append user name to div
    let node = document.createElement("p");
    node.className = "userName";
    var textNode = document.createTextNode(name);
    node.appendChild(textNode);
    document.getElementById(divId).appendChild(node);


    //append button with status
    node = document.createElement("button");
    node.innerHTML = status
    node.id = divId + "button"
    node.className = "userStatus";


    //create and set function for toggle, activated by button
    var functionName = "togglePopup('" + divNumber + "Junction')"
    node.setAttribute("onclick", functionName)

    document.getElementById(divId).appendChild(node);

    //----------------------------------------------------
    //append pop-up JUNCTION
    newDiv = document.createElement("div");
    newDiv.id = divId + "Junction";
    newDivId = newDiv.id;
    newDiv.className = "overlayJunction" //doplnit class
    document.getElementById("attendance").appendChild(newDiv);

    newDivObject = document.getElementById(newDivId);
    //save user name for late check-in/out
    newDivObject.dataset.userName = data.user_name;
    //make it invisible by default
    newDivObject.style.display = "none"


    var togglePopupFunction = "togglePopup('" + divNumber + "Overlay')";

    //buttons that trigger next popup to post attendance
    var text = "P - příchod"
    node = node = document.createElement("button");

    // console.log(divNumber + "Overlay");

    functionName = "junctionButtonAction(" + divNumber + ")";
    // console.log(functionName);

    node.setAttribute("onclick", functionName);
    node.innerHTML = text;
    newDivObject.appendChild(node);

    text = "O - odchod"
    node = document.createElement("button");
    node.setAttribute("onclick", functionName);
    node.innerHTML = text;
    newDivObject.appendChild(node);

    text = "N - absence"
    node = document.createElement("button");
    node.setAttribute("onclick", functionName);
    node.innerHTML = text;
    newDivObject.appendChild(node);

    //create and set function for toggle, activated by button


    //----------------------------------------------------
    //append pop-up for check-in    
    divId = divId + "Overlay";
    newDiv = document.createElement("div");
    newDiv.id = divId;
    newDiv.className = "popupWrap";
    document.getElementById("attendance").appendChild(newDiv);

    //set display property pf pop-up to 'none'
    document.getElementById(divId).style.display = "none"

    text = name + " - zapsat příchod"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(divId).appendChild(node);

    text = "Vyberte čas příchodu"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(divId).appendChild(node);

    var d = new Date()
    node = document.createElement("input");
    node.type = "time";
    node.value = d.getHours() + ":" + d.getMinutes();
    document.getElementById(divId).appendChild(node);

    text = "Zrušit";
    node = document.createElement("button");
    node.innerHTML = text;
    // console.log(divId);

    document.getElementById(divId).appendChild(node);

    text = "Potvrdit příchod";
    node = document.createElement("button");
    node.innerHTML = text;
    document.getElementById(divId).appendChild(node);





};


//ACTUAL CODE that runs//----------------------------------------------------
getAllHistoryLogs()
    .then(function(data) {
        // console.log(data);
        appendUser(data[0], "div1");
        appendUser(data[1], "div2");
        appendUser(data[2], "div3");
    });




function togglePopup(elementId) {
    let element = document.getElementById(elementId)
    if (element.style.display === "none") {
        element.style.display = "initial"
    } else {
        element.style.display = "none"
    };

    // document.getElementById(elementId).style.display = "initial"

}

//function to toggle Junction and Overlay
function junctionButtonAction(input, ) {
    // togglePopup(divNumber + "Overlay")
    console.log(typeof(input));

    console.log(input.toString());

    togglePopup(input.id + "Overlay");

    togglePopup(input.id + "Junction")
};

function pageRefresh() {
    window.location.reload()
    sessionStorage.clear();
}

//post user check-in that overwrites database data
async function postUserCheckin(username, year, month, day, hour, minute, second) {
    const endpoint = "/admin_edit/" + username + "/checkin/" + year + "_" + month + "_" + day + "/" + hour + ":" + minute + ":" + second;
    //console.log(endpoint);

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


