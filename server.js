const auth = require("./routes/Ashwin");
const vpost = require("./routes/Shifa");
const bid = require("./routes/Suvan");
const cpost = require("./routes/Nithiin");
const upost = require("./routes/Shivesh");

const express = require("express");   //Backend framework express
const cors = require("cors");  // Cross origin resource sharing 
const mongoose = require("mongoose"); //MongoDB ODM - Object Data Model
const app = express(); // Instance of express
const bodyParser = require("body-parser"); 
const connect = require("./mongo/conn"); //importing the connection file
const User = require("./models/User"); //importing the user schema (DB)
app.use(cors()); 
app.use(bodyParser.json());

const PORT = process.env.PORT||3002;  //Port number is 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    }
);

app.use("/auth",auth)
app.use("/vpost",vpost)

app.use("/bid",bid)
app.use("/cpost",cpost)
app.use("/upost",upost)


//Connecting to MongoDB with a function called "connect"
connect((err) => {
    if (err) {
      console.log("Error connecting to MongoDB");
    } else {
      console.log("Connected to MongoDB");
    }
});


// Get
app.get("/", (req, res) => {
    res.send("XML backend service");
});

app.post("/", (req,res) => {
  const text = req.body.text;
  try{
    res.send(text);
  }
  catch(err){
    res.status(400).send(err.body);
  }
})


