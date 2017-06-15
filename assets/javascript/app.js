$(document).ready(function() {
  console.log('doc ready');

  $("#submit").click(function() {
    var searchTerm = {
      q: "architecture"
    };
    search(searchTerm);

  });

});

function search(searchTerm) {
  console.log("searching for ");
  console.dir(searchTerm);

  $.ajax({
    url: "https://api.twitter.com/1.1/search/tweets.json?" + $.param(searchTerm ),
    dataType: "jsonp",
    success: function(data) {
      console.dir(data);

      for (item in data['results']) {
        $("#tweets").append(
          "<li>" + data['results'][item]['text'] + "</li>");
      }

    }

  })


}
