if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;
// const connectionString = process.env.MONGODB_URI|| 'mongodb://127.0.0.1:27017/test';

module.exports = async () => {
  try {
    console.log("Database is connecting");
    mongoose.set("strictQuery", false);
    await mongoose.connect(connectionString, {});
    mongoose.connection.on(`error`, (err) => {
      console.error(`Database error`);
      console.error(err);
    });
  } catch (err) {
    console.log(err);
    console.error(`Error during connection to the database`);
    console.log(
      "Please, check do you have .env file with variable MONGODB_URI! It must contains the connection string to the database!"
    );
    process.exit(1);
  }
};
