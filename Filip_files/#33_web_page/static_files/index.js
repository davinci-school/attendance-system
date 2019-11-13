console.log("Hello worlds");

$("#allUsersButton").click(() => {
  $.ajax({
    url: "users",
    type: "GET",
    dataType: "json",
    success: (data) => {
      console.log("You recieved some data!", data);
      $("#allUsers").html("All users:" + JSON.stringify(data));
    },
  });
});
