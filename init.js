const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then((res)=>{
    console.log("Server is running");

}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


 Chat.insertMany([
    {
    from:"manu",
    to:"Ashi",
    msg:"I am Placed in Google",
    created_at: new Date(),

    },

    {
        from:"tony",
        to:"vidhi",
        msg:"give me your notes",
        created_at: new Date(),
    },

    {
        from:"jatin",
        to:"vanshika",
        msg:"i am going to delhi",
        created_at: new Date(),
    },

    {
        from:"arjun",
        to:"seema",
        msg:"i am in relationship",
        created_at: new Date(),
    },

    {
        from:"prateek",
        to:"saloni",
        msg:"towmarrow is my exam",
        created_at: new Date(),
    },

    {
        from:"akshay",
        to:"puneet",
        msg:"can you call me ??",
        created_at: new Date(),
    },
    {
        from:"lalit",
        to:"gaurave",
        msg:"hello brother ",
        created_at: new Date(),
    },

]).then((res)=>{
    console.log(res);
}).catch(ex=>{console.log(ex)});
