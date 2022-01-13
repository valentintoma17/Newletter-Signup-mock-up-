const express = require("express");
const request = require("request");
const https = require("https");
// const bodyParser = require('body-parser')

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended:true}));
// app.use(bodyParser.urlencoded({ extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }}
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/69f3df4689";

  // https://us6.api.mailchimp.com/3.0/

  const options = {
    method: "POST",
    headers: {
              Authorization: 'Bearer a142b60281dfee8039ddc68952cdf243-us20'
          }
  };
  // const options = {
  //       method: "POST",
  //       headers: {
  //           Authorization: 'XXXXX: your APIkey'
  //       }
  console.log(jsonData);

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running at port 3000.");
});

// API KEy
// ac3ba8cbf231be401b6576aacad4bb64-us20

// AudienceID
// 69f3df4689
