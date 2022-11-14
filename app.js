const express =require("express");
const https= require("https");
const app = express();
const bodyparser =  require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    
  res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){

const query = req.body.cityName;
const apikey =  "6de00c71048700a60393ab14f823d066 ";
const unit = "metric";
const url =" https://api.openweathermap.org/data/2.5/weather?q="+query +"&&units="+unit+"&&appid="+apikey;
https.get(url,function(response){
console.log(response.statusCode);
response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp
    const weatherDiscription= weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

    res.write("<p> The weather is currently "+weatherDiscription+"</p>")
    res.write("<h1>The temperature in "+query+" is " +temp +" degree Celsius.")
    res.write("<img src="+imageUrl+">");
    res.send();
})
});
});








app.listen(3000,function(){
    console.log("Server is running on port 3000");
});