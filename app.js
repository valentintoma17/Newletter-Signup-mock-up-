const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const surname = req.body.sName;
  const email = req.body.email;

  const data ={
    members:[
      {email_address: email,
      status: "subscribed",
      merg_fields:{
        FNAME: firstName,
        LNAME: surname
      }}
    ]
  };

  const jsonData= JSON.stringify(data);

  var listID = config.LIST_ID;
  var bearer = config.AUTH_BEARER;

  const url = "https://us20.api.mailchimp.com/3.0/lists/" + listID;
  const options = {
    method: 'POST',
    headers: {
             Authorization: 'Bearer' + bearer 
         }
  };

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function(){
   console.log("Server is running on port 3000.");
});
