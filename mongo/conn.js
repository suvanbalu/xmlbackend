const mongoose = require("mongoose"); //importing mongoose
const connectionString = //We use this string to Connect with cloud (MongoDB Atlas). 
  "mongodb+srv://DB0:12345@cluster0.bwneo81.mongodb.net/?retryWrites=true&w=majority";
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

module.exports = connect;
