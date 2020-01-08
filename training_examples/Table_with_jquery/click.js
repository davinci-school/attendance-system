
  $( document ).ready(function() {

      $("#viewfile").click(function () {
          var rdr = new FileReader();
          rdr.onload = function (e) {
            //get the rows into an array
            var therows = e.target.result.split("\n");

            //loop through the rows
            for (var row = 0; row < therows.length; row++  ) {

              //build a new table row
              var newrow = "";
              //get the columns into an array
              var columns = therows[row].split(",");

              //get number of columns
              var colcount=columns.length;
              console.log("colcount=",colcount)
              if(colcount!=4) {
                  //incorrect number of columns
                  newrow="<tr class='badrowcount'><td>incorrect number of columns</td><td></td><td></td><td></td></tr>";
              } else {
                 newrow=   "<tr><td>"  + columns[0]
                         + "</td><td>" + columns[1]
                         + "</td><td>" + columns[2]
                         + "</td>";

                 if($.isNumeric(columns[3])) {
                      newrow  += "<td>"  + columns[3] +  "</td></tr>";
                 } else {
                      newrow  += "<td class='notnumeric'>" +  columns[3] +  "</td></tr>";
                 }
                 }

    $("#tableMain").append(newrow);
    }
          }
          rdr.readAsText($("#inputfile")[0].files[0]);
      });})
