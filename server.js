const auth = require("./routes/Ashwin");
const bid = require("./routes/Suvan");
const cpost = require("./routes/Nithiin");

const express = require("express");   //Backend framework express
const cors = require("cors");  // Cross origin resource sharing 
const mongoose = require("mongoose"); //MongoDB ODM - Object Data Model
const app = express(); // Instance of express
const bodyParser = require("body-parser"); 
const User = require("./models/User"); //importing the user schema (DB)
app.use(cors()); 
app.use(bodyParser.json());

const PORT = process.env.PORT||3002;  //Port number is 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    }
);

app.use("/auth",auth)
app.use("/bid",bid)
app.use("/cpost",cpost)

//We use this string to Connect with cloud (MongoDB Atlas). 
const connectionString =
  "mongodb+srv://suvan:yk8aSW26njv.LZ-@cluster0.ldaw2fl.mongodb.net/?retryWrites=true&w=majority";


//Connecting to MongoDB with a function called "connect"
const connect = (callBack) => {
    // mongoose.set("strictQuery", false); 
    mongoose  //Connecting mongoDB and JS
      .connect(connectionString, {
        useNewUrlParser: true, // default syntax for connecting the backend
        useUnifiedTopology: true, 
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(err);
        return callBack(err);
      });
  };

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


