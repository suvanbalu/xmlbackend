const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const User = require("./models/User");
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT||3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    }
);

const connectionString =
  "mongodb+srv://suvan:yk8aSW26njv.LZ-@cluster0.ldaw2fl.mongodb.net/?retryWrites=true&w=majority";

const connect = (callBack) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
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

app.get("/", (req, res) => {
    res.send("XML backend service");
});


