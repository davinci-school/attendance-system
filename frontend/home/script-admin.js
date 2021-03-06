var dateElement = document.getElementById("dateOnPage");
d = new Date();
dateElement.innerHTML = "Dnes je " + d.getDate() + ". " + parseInt(d.getMonth() + 1) + ". " + d.getFullYear();

LoadUserNameToPage();

//clear sessionStorage on every page laod
sessionStorage.clear();

// fetch data from local JSON file, function returns data
async function getAllHistoryLogs() {
    date = new Date();
    date = date.toISOString().substr(0, 19);

    // const endpoint = "status.json";
    var endpoint = "/api/admin_data/" + date.split("T")[0];
    // endpoint = "/api/admin_data/2020-04-26"

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

    const userID = data.id;
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
        status = "N" //status has no value
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

    var divClickFunction = "divClick('" + divNumber + "')";
    node.setAttribute("onclick", divClickFunction);

    document.getElementById(divId).appendChild(node);

    //-----  append JUNCTION  ------------------------------------------------
    //modal holding div with content
    newDiv = document.createElement("div");
    newDiv.id = divId + "ModalJunction";
    var modalID = newDiv.id;
    newDiv.className = "invisible modal";
    document.getElementById("attendance").appendChild(newDiv);

    //modal content
    newDiv = document.createElement("div");
    newDiv.id = divId + "Junction";
    newDivId = newDiv.id;
    newDiv.className = "overlayJunction modal-content junction-container";
    document.getElementById(modalID).appendChild(newDiv);

    newDivObject = document.getElementById(newDivId);

    var text = "&times;"
    node = node = document.createElement("span");
    node.className = "close"
    node.setAttribute("onclick", divClickFunction);
    node.innerHTML = text;
    newDivObject.appendChild(node);

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
    newDiv = document.createElement("div");
    newDiv.id = divId + "ModalOverlayP";
    var modalID = newDiv.id;
    newDiv.className = "invisible modal";
    // console.log(modalID);
    document.getElementById("attendance").appendChild(newDiv);

    var overlayDivId = divId + "OverlayP";
    newDiv = document.createElement("div");
    newDiv.id = overlayDivId;
    newDiv.className = "popupWrap modal-content";
    document.getElementById(modalID).appendChild(newDiv);

    var text = "&times;"
    node = node = document.createElement("span");
    node.className = "close";
    node.setAttribute("onclick", "overlayClick('" + userID + "','" + userName + "','P'," + inputId + "," + modalID + ",'cancel')");
    node.innerHTML = text;
    newDiv.appendChild(node);

    text = userName + " - zapsat příchod"
    node = document.createElement("H4");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Vyberte čas příchodu:"
    node = document.createElement("p");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    var d = new Date()
    node = document.createElement("input");
    var inputId = overlayDivId + "Input";
    node.id = inputId;
    node.type = "time";
    var h = ("0" + d.getHours()).slice(-2);
    var m = ("0" + d.getMinutes()).slice(-2);
    node.value = h + ":" + m;
    document.getElementById(overlayDivId).appendChild(node);

    node = document.createElement("button");
    node.innerHTML = "Zrušit";
    // console.log(modalID);
    functionName = "overlayClick('" + userID + "','" + userName + "','P'," + inputId + "," + modalID + ",'cancel')";
    node.setAttribute("onclick", functionName);
    document.getElementById(overlayDivId).appendChild(node);

    node = document.createElement("button");
    node.innerHTML = "Potvrdit příchod";
    functionName = "overlayClick('" + userID + "','" + userName + "','P'," + inputId + "," + modalID + ",'confirm')";
    node.setAttribute("onclick", functionName);
    document.getElementById(overlayDivId).appendChild(node);


    //---- append OVERLAY O ------------------------------------------------
    newDiv = document.createElement("div");
    newDiv.id = divId + "ModalOverlayO";
    var modalID = newDiv.id;
    newDiv.className = "invisible modal";
    // console.log(modalID);
    document.getElementById("attendance").appendChild(newDiv);

    var overlayDivId = divId + "OverlayO";
    newDiv = document.createElement("div");
    newDiv.id = overlayDivId;
    newDiv.className = "popupWrap modal-content";
    document.getElementById(modalID).appendChild(newDiv);

    var text = "&times;"
    node = node = document.createElement("span");
    node.className = "close";
    node.setAttribute("onclick", "overlayClick('" + userID + "','" + userName + "','P'," + inputId + "," + modalID + ",'cancel')");
    node.innerHTML = text;
    newDiv.appendChild(node);

    text = userName + " - zapsat odchod"
    node = document.createElement("H4");
    node.className = "userNameCheckIn";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Vyberte čas odchodu:"
    node = document.createElement("p");
    node.className = "userNameCheckOut";
    textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById(overlayDivId).appendChild(node);

    var d = new Date()
    node = document.createElement("input");
    var inputId = overlayDivId + "Input";
    node.id = overlayDivId + "Input";
    node.type = "time";
    var h = ("0" + d.getHours()).slice(-2);
    var m = ("0" + d.getMinutes()).slice(-2);
    node.value = h + ":" + m;
    document.getElementById(overlayDivId).appendChild(node);

    text = "Zrušit";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userID + "','" + userName + "','O'," + inputId + "," + modalID + ",'cancel')";
    node.setAttribute("onclick", functionName);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Potvrdit odchod";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userID + "','" + userName + "','O'," + inputId + "," + modalID + ",'confirm')";
    node.setAttribute("onclick", functionName);
    document.getElementById(overlayDivId).appendChild(node);


    //---- append OVERLAY N ------------------------------------------------
    newDiv = document.createElement("div");
    newDiv.id = divId + "ModalOverlayN";
    var modalID = newDiv.id;
    newDiv.className = "invisible modal";
    // console.log(modalID);
    document.getElementById("attendance").appendChild(newDiv);

    var overlayDivId = divId + "OverlayN";
    newDiv = document.createElement("div");
    newDiv.id = overlayDivId;
    newDiv.className = "popupWrap modal-content";
    document.getElementById(modalID).appendChild(newDiv);

    var text = "&times;"
    node = node = document.createElement("span");
    node.className = "close";
    node.setAttribute("onclick", "overlayClick('" + userID + "','" + userName + "','P'," + inputId + "," + modalID + ",'cancel')");
    node.innerHTML = text;
    newDiv.appendChild(node);

    text = userName + " - zapsat absenci"
    node = document.createElement("H4");
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
    functionName = "overlayClick('" + userID + "','" + userName + "','N'," + inputId + "," + modalID + ",'cancel')";
    node.setAttribute("onclick", functionName);
    document.getElementById(overlayDivId).appendChild(node);

    text = "Potvrdit absenci";
    node = document.createElement("button");
    node.innerHTML = text;
    functionName = "overlayClick('" + userID + "','" + userName + "','N'," + inputId + "," + modalID + ",'confirm')";
    node.setAttribute("onclick", functionName);
    document.getElementById(overlayDivId).appendChild(node);

};


//ACTUAL CODE that runs//----------------------------------------------------
getAllHistoryLogs()
    .then(function(data) {
        // console.log(data);
        for (i = 0; i < data.length; i++) {
            appendUser(data[i], "div" + i)
        };
    });


function togglePopup(elementId) {

    let element = document.getElementById(elementId);

    // console.log(element)

    if (element.classList.value.includes("invisible") === true) {
        element.classList.remove("invisible");
    } else {
        element.classList.add("invisible");
    };
};

function divClick(elementId) {
    overlayIds = [elementId + "ModalOverlayP", elementId + "ModalOverlayO", elementId + "ModalOverlayN"];

    for (const overlayId of overlayIds) {
        let element = document.getElementById(overlayId);
        if (element.classList.value.includes("invisible") === false) {
            togglePopup(overlayId);
        };
    };
    togglePopup(elementId + "ModalJunction");
};

function junctionClick(input, actionType) {
    if (actionType === "P") {
        togglePopup(input.id + "ModalOverlayP");
        togglePopup(input.id + "ModalJunction");
        // console.log("togglePopup('" + input.id + "ModalJunction" + "')");

    } else if (actionType === "O") {
        togglePopup(input.id + "ModalOverlayO");
        console.log(input.id + "ModalOverlayO")
        togglePopup(input.id + "ModalJunction");
    } else if (actionType === "N") {
        togglePopup(input.id + "ModalOverlayN");
        togglePopup(input.id + "ModalJunction");
    } else {
        console.loge("error in juctionClick: unsupported actionType");
    };

};

function overlayClick(userID, userName, actionType, inputId, overlayDivId, button) {
    togglePopup(overlayDivId.id);

    var d = new Date();
    var month = parseInt(("0" + d.getMonth()).slice(-2)) + 1;
    var dayNumber = ("0" + d.getDate()).slice(-2);
    var date = d.getFullYear() + "-" + month + "-" + dayNumber;
    var time = 0;
    time = inputId.value + ":00";

    // console.log(time);
    // console.log(inputId.value);

    // console.log(date);

    // console.log(userName);
    // console.log(actionType);
    // console.log(button);

    if (button === "confirm") {
        if (actionType === "P") {
            editTimeIn(userID, date, time);
            console.log("Editing time_in of:", userName, "-", time);
        } else if (actionType === "O") {
            editTimeOut(userID, date, time);
            console.log("Editing tim_out of:", userName, "-", time);
        } else if (actionType === "N") {
            editTimeErase(userID, date)
            console.log("Erasing attendance -", userName);

        }
    }
};
//post user time_out that overwrites database data
async function editTimeIn(userID, date, time) {
    const endpoint = "/api/admin_edit"
    dataToSend = {
        "id_user": userID,
        "date": date,
        "time_in": time,
    };
    // console.log(dataToSend);

    // console.log(dataToSend);

    $.ajax({
        url: endpoint,
        type: "POST",
        data: dataToSend,
        succes: function() {
            console.log("Databse request succesfull.");
            pageRefresh();
        },
        error: function(error) {
            throw error;
        }
    });
    pageRefresh();
    return;
};

//post user check-out time that overwrites database data
async function editTimeOut(userID, date, time) {
    const endpoint = "/api/admin_edit"
    dataToSend = {
        "id_user": userID,
        "date": date,
        "time_out": time
    };

    $.ajax({
        url: endpoint,
        type: "POST",
        data: dataToSend,
        succes: function() {
            console.log("Databse request succesfull.");
            pageRefresh();
        },
        error: function(error) {
            throw error;
        }
    });
    pageRefresh();
    return;
};

//erase user time_out and time_in from databse
async function editTimeErase(userID, date) {
    const endpoint = "/api/admin_edit"
    dataToSend = {
        "id_user": userID,
        "date": date,
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
    pageRefresh();
    return;
};

//set timeout so i can read console logs
function pageRefresh() {
    setTimeout(function() {
        window.location.reload();
    }, 50000)

    sessionStorage.clear();
};

function LoadUserNameToPage() {
    return $.ajax({
        url: "/api/username",
        type: "GET",
        success: function(data) {
            document.getElementById("AcountUserName").innerHTML = "Přihlášen jako admin, " + data[0].username;
        },
        error: function(error) {
            throw error;
        }

    });
};