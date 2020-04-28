//clear sessionStorage on every page laod
sessionStorage.clear();

// fetch data from local JSON file, function returns data
async function getAllHistoryLogs() {
    date = new Date();
    date = date.toISOString().substr(0, 19);

    // const endpoint = "status.json";
    var endpoint = "/api/admin_data/" + date.split("T")[0];
    endpoint = "/api/admin_data/2020-04-26"

    // if there are no data at sessionStorage, use get request, 
    // else, use those stored data, to avoid unnecceseary load on server and processing time
    if (sessionStorage.getItem("dataFromJson") == null) {
        return $.ajax({
            url: endpoint,
            type: "GET",
            success: function(data) {

                //store data to sessionStorage for later use
                sessionStorage.setItem("dataFromJson", JSON.stringify(data));
                console.log("Using GET request, no local data found. Loading from: " + endpoint);
            },
            error: function(error) {
                throw error;
            }

        });
    } else {
        let data = JSON.parse(sessionStorage.getItem("dataFromJson"));
        console.log("Using sessionStorage, no need for GET request.");

        // console.log(data);
        return data;

    };
};

//apend user to page
function appendUser(data, divIdInput) {

    const divId = divIdInput

    var divNumber = divId

    let newDiv = document.createElement("div");
    newDiv.id = divId;

    newDiv.className = "statusWrap";
    document.getElementById("attendance").appendChild(newDiv);

    var userName = data.username;
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
    var textNode = document.createTextNode(userName);
    node.appendChild(textNode);
    document.getElementById(divId).appendChild(node);


    //append button with status
    node = document.createElement("button");
    node.innerHTML = status
    node.id = divId + "button"
    node.className = "userStatus";


    //create and set function for toggle, activated by button
    var toggleJunctionFunction = "togglePopup('" + divNumber + "Junction')";
    var toggleOverlayIfNeeded = "checkForOverlayAndToggle('" + divNumber + "')";
    var divClickFunction = "divClick('" + divNumber + "')";


    node.setAttribute("onclick", divClickFunction);

    document.getElementById(divId).appendChild(node);

    //-----  append JUNCTION  ------------------------------------------------
    newDiv = document.createElement("div");
    newDiv.id = divId + "Junction";
    newDivId = newDiv.id;

    //set clas also to invisible
    newDiv.className = "overlayJunction invisible";
    document.getElementById("attendance").appendChild(newDiv);

    newDivObject = document.getElementById(newDivId);

    //buttons that trigger next popup to post attendance
    functionNameP = "junctionClick(" + divNumber + ",'P')";
    functionNameO = "junctionClick(" + divNumber + ",'O')";
    functionNameN = "junctionClick(" + divNumber + ",'N')";

    var text = "P - přítomen"
    node = node = document.createElement("button");
    node.setAttribute("onclick", functionNameP);
    node.innerHTML = text;
    newDivObject.appendChild(node);

    text = "O - odchod"
    node = document.createElement("button");
    node.setAttribute("onclick", functionNameO);
    node.innerHTML = text;
    newDivObject.appendChild(node);

    text = "N - absence"
    node = document.createElement("button");
    node.setAttribute("onclick", functionNameN);
    node.innerHTML = text;
    newDivObject.appendChild(node);

    //---- append OVERLAY P ------------------------------------------------
    var overlayDivId = divId + "OverlayP";
    newDiv = document.createElement("div");
    newDiv.id = overlayDivId;
    newDiv.className = "popupWrap invisible";
    document.getElementById("attendance").appendChild(newDiv);

    text = name + " - zapsat příchod"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Vyberte čas příchodu"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    var d = new Date()
    node = document.createElement("input");
    var inputId = overlayDivId + "Input";
    node.id = inputId
    node.type = "time";
    var h = ("0" + d.getHours()).slice(-2);
    var m = ("0" + d.getMinutes()).slice(-2);
    node.value = h + ":" + m;
    document.getElementById(overlayDivId).appendChild(node);

    node = document.createElement("button");
    node.innerHTML = "Zrušit";
    functionName = "overlayClick('" + userName + "','P'," + inputId + "," + overlayDivId + ",'cancel')";
    node.setAttribute("onclick", functionName)
    document.getElementById(overlayDivId).appendChild(node);

    node = document.createElement("button");
    node.innerHTML = "Potvrdit příchod";
    functionName = "overlayClick('" + userName + "','P'," + inputId + "," + overlayDivId + ",'confirm')";
    node.setAttribute("onclick", functionName)
    document.getElementById(overlayDivId).appendChild(node);


    //---- append OVERLAY O ------------------------------------------------
    var overlayDivId = divId + "OverlayO";
    newDiv = document.createElement("div");
    newDiv.id = overlayDivId;

    newDiv.className = "popupWrap invisible";
    document.getElementById("attendance").appendChild(newDiv);

    text = name + " - zapsat odchod"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Vyberte čas odchodu"
    node = document.createElement("p");
    node.className = "userNameCheckOut";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    var d = new Date()
    node = document.createElement("input");
    node.type = "time";
    node.id = overlayDivId + "Input";
    var h = ("0" + d.getHours()).slice(-2);
    var m = ("0" + d.getMinutes()).slice(-2);
    node.value = h + ":" + m;
    document.getElementById(overlayDivId).appendChild(node);

    text = "Zrušit";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userName + "','O'," + inputId + "," + overlayDivId + ",'cancel')";
    node.setAttribute("onclick", functionName)
    document.getElementById(overlayDivId).appendChild(node);

    text = "Potvrdit odchod";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userName + "','O'," + inputId + "," + overlayDivId + ",'confirm')";
    node.setAttribute("onclick", functionName)
    document.getElementById(overlayDivId).appendChild(node);


    //---- append OVERLAY N ------------------------------------------------
    var overlayDivId = divId + "OverlayN";
    newDiv = document.createElement("div");
    newDiv.id = overlayDivId;
    newDiv.className = "popupWrap invisible";
    document.getElementById("attendance").appendChild(newDiv);

    text = name + " - zapsat absenci"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Žák dnes nepřišel..."
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Zrušit";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userName + "','N'," + inputId + "," + overlayDivId + ",'cancel')";
    node.setAttribute("onclick", functionName)
    document.getElementById(overlayDivId).appendChild(node);

    text = "Potvrdit absenci";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userName + "','N'," + inputId + "," + overlayDivId + ",'confirm')";
    node.setAttribute("onclick", functionName)
    document.getElementById(overlayDivId).appendChild(node);

};


//ACTUAL CODE that runs//----------------------------------------------------
getAllHistoryLogs()
    .then(function(data) {
        // console.log(data);
        appendUser(data[0], "div1");
        appendUser(data[1], "div2");
    });




function togglePopup(elementId) {

    let element = document.getElementById(elementId);
    // console.log(element.classList.value.includes("invisible"))
    // console.log(elementId);

    if (element.classList.value.includes("invisible") === true) {
        element.classList.remove("invisible");
    } else {
        element.classList.add("invisible");
    };
};

function divClick(elementId) {
    overlayIds = [elementId + "OverlayP", elementId + "OverlayO", elementId + "OverlayN"];

    for (const overlayId of overlayIds) {
        let element = document.getElementById(overlayId);
        if (element.classList.value.includes("invisible") === false) {
            togglePopup(overlayId);
        };
    };

    togglePopup(elementId + "Junction");
};

function junctionClick(input, actionType) {
    if (actionType === "P") {
        togglePopup(input.id + "OverlayP");
        togglePopup(input.id + "Junction");
    } else if (actionType === "O") {
        togglePopup(input.id + "OverlayO");
        togglePopup(input.id + "Junction");
    } else if (actionType === "N") {
        togglePopup(input.id + "OverlayN");
        togglePopup(input.id + "Junction");
    } else {
        console.loge("error in juctionClick: unsupported actionType")
    };

};

function overlayClick(userName, actionType, inputId, overlayDivId, button) {
    togglePopup(overlayDivId.id);

    var d = new Date();
    var month = ("0" + d.getMonth()).slice(-2);
    var dayNumber = ("0" + d.getDate()).slice(-2);
    var date = d.getFullYear() + "-" + month + "-" + dayNumber;
    var time = inputId.value + ":00"

    // console.log(time);
    // console.log(date);

    // console.log(userName);
    // console.log(actionType);
    // console.log(button);

    if (button === "confirm") {
        if (actionType === "P") {
            editTimeIn(userName, date, time);
            console.log("Editing time_in of:", userName, "-", time);
        } else if (actionType === "O") {
            editTimeOut(userName);
            console.log("Editing tim_out of:", userName, "-", time);
        } else if (actionType === "N") {
            editTimeErase(userName, date)
            console.log("Erasing attendance -", userName);

        }
    }
};
//post user time_out that overwrites database data
async function editTimeIn(username, date, time) {
    const endpoint = "/admin_edit"
    dataToSend = {
        "username": username,
        "date": date,
        "time_in": time,
        "time_out": null
    };
    // console.log(typeof dataToSend);

    // console.log(dataToSend);

    $.ajax({
        url: endpoint,
        type: "POST",
        data: dataToSend,
        succes: function() {
            console.log("Databse request succesfull.");
        },
        error: function(error) {
            throw error;
        }
    });
    return;
};

//post user check-out time that overwrites database data
async function editTimeOut(username, date, time) {
    const endpoint = "/admin_edit"
    dataToSend = {
        "username": username,
        "date": date,
        "time_in": time,
        "time_out": null
    };
    // console.log(typeof dataToSend);

    // console.log(dataToSend);

    $.ajax({
        url: endpoint,
        type: "POST",
        data: dataToSend,
        succes: function() {
            console.log("Databse request succesfull.");
        },
        error: function(error) {
            throw error;
        }
    });
    return;
};

//erase user time_out and time_in from databse
async function editTimeErase(username, date) {
    const endpoint = "/admin_edit"
    dataToSend = {
        "username": username,
        "date": date,
        "time_in": null,
        "time_out": null
    };

    $.ajax({
        url: endpoint,
        type: "POST",
        data: dataToSend,
        succes: function() {
            console.log("Databse request succesfull.");
        },
        error: function(error) {
            throw error;
        }
    });
    return;
};

function pageRefresh() {
    window.location.reload()
    sessionStorage.clear();
};