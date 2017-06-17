var config = {
        apiKey: "AIzaSyCvKr8XCnaCGcSrSDC5Fy7AyALsa8CToEk",
        authDomain: "projectone-b4271.firebaseapp.com",
        databaseURL: "https://projectone-b4271.firebaseio.com",
        projectId: "projectone-b4271",
        storageBucket: "projectone-b4271.appspot.com",
        messagingSenderId: "469463387856"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
      var interval = setInterval(arrow, 1000 * 100);
      var lastPrice = 0
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
          $("#stockInfo").html(response.results[0].lastPrice);
          console.log("hi");
          var last = $("<div>").html(response.results[0].lastPrice);
          var open = $("<div>").html(response.results[0].open);
          var close = $("<div>").html(response.results[0].close);
          $("#stockInfo").append(open);
          console.log(stock)
        });
      });
      function arrow(){
        console.log("arrow pt 1")
        var queryURL = "https://crossorigin.me/http://marketdata.websol.barchart.com/getQuote.json?key=3a7c2bc136b9027743e077f17c788f0c&symbols=" + stock;
      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log("arrow pt 2")
          var currentPrice = response.results[0].lastPrice;
          var basePrice = {
            basePrice: currentPrice
          };
          database.ref().push(basePrice);
          console.log(basePrice.basePrice)
          console.log(currentPrice)
          if (basePrice > currentPrice) {
            console.log("down")
          }
          else if (basePrice < currentPrice) {
            console.log("up")
          }
          else if (basePrice === currentPrice) {
            console.log("even")
          }
          else {
            console.log("error")
          }
          console.log("arrow pt 3")
          return;
        });
      }
