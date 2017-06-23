$(document).ready(function() {
  console.log('doc ready yea yea');

 //Set Up VARIABLES
 var authKey = "8b5829de8d0d4d038ab015d4d89a435d";

 //Search Parameters
 var queryTerm = "";
 var numResults = 5;

 //URL Base
 var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
     authKey + "&q=";

 var articleCounter = 0;

 //FUNCTIONS
 //============================================

 function runQuery(numArticles, queryURL) {

   //AJAX function
   $.ajax({
     url: queryURL,
     method: "GET"
   }).done(function(NYTData) {

   console.log("---------------------")
   console.log("URL: " + queryURL);
   console.log("---------------------")
   console.log(numArticles);
   console.log(NYTData);

   //loop through and provide the correct number of articles
   for (var i = 0; i < numArticles; i++) {

     //Add to the article counter to make sure to show the right number
     articleCounter++;

     //create the HTML well (section) and add the article content for each
     var wellSection = $("<div>");
     wellSection.addClass("well");
     wellSection.attr("id", "article-well-" + articleCounter);
     $("#News").append(wellSection);

     //confirm that the specific JSON for the article isng missing any details
     //if the article has a headline include the headline in the HTML
     if (NYTData.response.docs[i].headline !== "null") {
       $("#article-well-" + articleCounter)
         .append(
           "<h6 class='articleHeadline'><span class='label label-primary'>" +
           articleCounter + "</span><strong> " +
           NYTData.response.docs[i].headline.main + "</strong></h6>"
         );
       console.log(NYTData.response.docs[i].headline.main);
     }

     //if the article has a byline include the headline in the HTML
     if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
       $("#article-well-" + articleCounter)
         .append("<h6>" + NYTData.response.docs[i].byline.original + "</h6>");

         //log the first article's Author to console
         console.log(NYTData.response.docs[i].byline.original);
     }

     //then display the remaining fields in the hTML (Section name, date, URL)
     $("#articleWell-" + articleCounter)
       .append("<h6>Section: " + NYTData.response.docs[i].section_name + "</h6>");
     $("articleWell-" + articleCounter)
       .append("<h6>" + NYTData.response.docs[i].pub_date + "</6>");
     $("#articleWell-" + articleCounter)
       .append(
         "<a href='" + NYTData.response.docs[i].web_url + "'>" +
         NYTData.response.docs[i].web_url + "</a>"
       );

       //log the remainig fields to console as well
       console.log(NYTData.response.docs[i].pub_date);
       console.log(NYTData.response.docs[i].section_name);
       console.log(NYTData.response.docs[i].web_url);

     }
   });

 }

 //METHODS
 //=============================================================

 //on click function associated with search button
 $("#add-news").on("click", function(event) {
   //this line allow us to take d=advantage of the html submit property
   //this way we can hit enter on the keyboard and it registers the search
   //in addition to clicks
   event.preventDefault();

   //initially sets the articleCounter to 0
   articleCounter = 0;

   //empties the region associated with the articles
   $("News").empty();

   //grabbing text the user typed into search input
   searchTerm = $("#news-input").val().trim();
   var queryURL = queryURLBase + searchTerm;

   //then we will pass the final queryURL and the number of results to
   //include to the runQuery function
   runQuery(numResults, queryURL);
 });



 var interval = setInterval(arrow, 1000 * 10);
    var basePrice = 0
    var stock = ""

    $("#add-stocks").on("click", function(event) {
      event.preventDefault()
      console.log("calling")
      stock = $("#stock-input").val().trim().toUpperCase()
      var symbols = $("#stock-input").val().trim().toUpperCase()
      var queryURL = "https://crossorigin.me/http://marketdata.websol.barchart.com/getQuote.json?key=3a7c2bc136b9027743e077f17c788f0c&symbols=" + symbols;


      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);

        var name = response.results[0].name;
        var symbol = response.results[0].symbol;
        var exchange = response.results[0].exchange;
        var last = response.results[0].lastPrice;
        // basePrice = response.results[0].lastPrice;
        basePrice = 20
        var open = response.results[0].open;
        var close = response.results[0].close;
        var netChange = response.results[0].netChange;
        var percentChange = response.results[0].percentChange;
        var volume = response.results[0].volume;

        var stock_title_div = $("<div>").addClass("stock-title");
        var stock_title = $(stock_title_div).html("Company: " + name + " (" + symbol + ") ");


        var stock_data_div = $("<div>").addClass("stock-data");
        var stock_data = $(stock_data_div).html("Exchange: " + " (" + exchange + ") " + "<br/>"
          + "Current Price: $" + last + "  |  Volume: $" + volume + "<br/>"
          + "Open: $" + open + "  |   Close: $" + close + "<br/>"
          + "Change($): $" + netChange + "  |   Change(%): " + percentChange + "%")


        $("#stockInfo").append(stock_title);
        $("#stockInfo").append(stock_data);

        console.log(stock)

      });
    });

    var value = 1

    function arrow(){
      console.log("arrow pt 1")
      var queryURL = "https://crossorigin.me/http://marketdata.websol.barchart.com/getQuote.json?key=3a7c2bc136b9027743e077f17c788f0c&symbols=" + stock;

      if (value === 1){

              $.ajax({
              url: queryURL,
              method: "GET"
              }).done(function(response) {
                console.log("arrow pt 3")
                // var currentPrice = response.results[0].lastPrice;
                var currentPrice = 15
                console.log("current price: " + currentPrice)

            if (basePrice > currentPrice) {
              var down = 100 - ((currentPrice / basePrice) * 100)
              console.log("down: " + down + "%")
            }
            else if (basePrice < currentPrice) {
              var up = 100 - ((basePrice / currentPrice) * 100)
              console.log("up: " + up + "%")
            }
            else if (basePrice === currentPrice) {
              console.log("even")
            }
            else {
              console.log("error")
            };
            console.log("arrow pt 4")
            value = 0
            return;
        });
      }
      else {
        //alert("You're .")
      };
    };

      $("#add-weathers").on("click", function(event) {
         event.preventDefault()
         console.log("weather")
         var apiKey = "api/5b12c8b5120a5684"
         var state = $("#state-input").val().trim().toUpperCase()
         var city = $("#city-input").val().trim().toUpperCase()
         var queryURL = "http://api.wunderground.com/" + apiKey + "/conditions/q/" + state + "/" + city + ".json"


         $.ajax({
           url: queryURL,
           method: "GET"
         }).done(function(response) {
           console.log(response);
           var weatherDiv = $("<div>");
           weatherDiv = $(weatherDiv).addClass("weatherDiv");

           var temp_f = response.current_observation.temp_f;
           var feelslike_f = response.current_observation.feelslike_f;
           var wind_mph = response.current_observation.wind_mph;
           var relative_humidity = response.current_observation.relative_humidity;
           var weather = response.current_observation.weather;
           var precip_today_string = response.current_observation.precip_today_string;
           var city = response.current_observation.display_location.city;
           var state_name = response.current_observation.display_location.state_name;
           var state = response.current_observation.display_location.state;
           var country = response.current_observation.display_location.country;
           var elevation = response.current_observation.display_location.elevation;

           var weather_title_div = $("<div>").addClass("weather-title")
           var weather_title = $(weather_title_div).html(city + ", " + state_name + " (" + state + ") " + country + " (" + temp_f + " f)" + "<br/>")

           var opening_div = $("<div>").addClass("opening");
           var weather_opening = $(opening_div).html("Wow! Looks like it's a " + weather + " day in " + city + ". That wild wind's a whistlin' at " + wind_mph + "MPH. " + "<br/>" + "How about a drum roll for precipitation... It's rained " + precip_today_string + " today!!! Wow." + "<br/>" + "Check out the some other statistics below:" + "<br/>");

           var statistics_div = $("<div>").addClass("statistics");
           var weather_statistics = $(statistics_div).html(
             "Temperature: " + temp_f + "  | Feels Like: " + feelslike_f + " f" + "<br/>" +
             "Wind Speed: " + wind_mph + " mph" + "  | Rain Today: " + precip_today_string + "<br/>" +
             "Humidity: " + relative_humidity + "  | Elevation: " + elevation + " ft");

           $("#weatherInfo").append(weather_title);
           $("#weatherInfo").append(weather_opening);
           $("#weatherInfo").append(weather_statistics);
         });
       });
});
