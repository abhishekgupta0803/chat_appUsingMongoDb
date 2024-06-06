const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');

app.set ("views",path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method')); 

main().then((res)=>{
    console.log("Server is running");

}).catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

//index route ->all chats
app.get("/chats", async (req,res)=>{
   let chats = await Chat.find();
   res.render("index.ejs",{chats});
});

//New Route -> create

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");

});

//add data using post req
app.post("/chats",(req,res)=>{
    let  {from,msg,to} = req.body;
    let newChat = new Chat({
        from : from,
        msg: msg,
        to : to,
        created_at:new Date()

    });

    newChat.save().then((res)=>{
        console.log(res);
    }).catch((ex)=>{
        console.log(ex);
    });
    res.redirect("/chats");

});

//edit request
app.get("/chats/:id/edit", async(req,res)=>{
    let{id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});

});

//put->edit
app.put("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let {msg:newMsg} = req.body;
    console.log(newMsg);
    let updateChat = await Chat.findByIdAndUpdate(
    id,
    {msg: newMsg},
    {runValidators:true, new:true}
);
    console.log(updateChat);
    res.redirect("/chats");
});

//destroy - > delete

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let dlt = await Chat.findByIdAndDelete(id);
   // res.redirect("/chats");
   res.redirect("/chats");
   
});


app.get("/",(req,res)=>{
    res.send("server is ok");
})

app.listen("8080",(req,res)=>{
    console.log("app is listentin");
});


