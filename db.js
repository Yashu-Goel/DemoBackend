require("dotenv").config(); // Load environment variables from .env file
const { connect } = require("mongoose");

connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("No connection: " + error);
  });
