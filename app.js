const express= require("express");
const Sentiment=require("sentiment");
var sentiment= new Sentiment();
const app= express();

app.use(express.urlencoded({
    extended: true
  }));
app.set('view engine', 'ejs');
app.use(express.static('public'))

score="Neutral";
app.get("/",function(req,res){
    res.render("index",{score:score});
});

app.post("/",function(req,res){

    const result=sentiment.analyze(req.body.sentence)
    if(result.score>1){
        score="Positive";
    }
    else if(result.score<1){
        score="Negative";
    }
    res.render("index",{score:score})
})





app.listen(3000,function(){
    console.log("server Running");
})