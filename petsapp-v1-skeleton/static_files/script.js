// jQuery convention for running when the document has been fully loaded:
//napsat Martinovi

function insertIntoTable(data) {
console.log(document.querySelector(".table"));
}
insertIntoTable("HELLO");

$(document).ready(() => {
  console.log($(".table"));
  var table = $(".table");
  table.after("<tr><td>HELLO</td></tr> ");
  $('#readButton').click(() => {
    const requestURL = 'users/' + $('#nameBox').val();
    console.log('making ajax request to:', requestURL);
    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      success: (data) => {
        console.log('You received some data!', data);

      },

    });
  });
});
