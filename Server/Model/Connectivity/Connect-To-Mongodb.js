require("dotenv").config();
const { env } = require("process");
const { connect } = require("mongoose");

/**
 * ConnectToMongodb is promise that handle the connectivity of server with database both local and remote.
 * @param  {any} password Password for connecting to mongodb at atlas mean cloud based database
 * @param  {any} username Username require only when connecting to cloud based database
 * @param  {any} database Database name must require for accessing the database.
 */
const ConnectToMongodb = async (password, username, database) => {
  let connectionString = `mongodb://0.0.0.0:27017/${database}`;

  return connect(connectionString, (err) => {
    if (err) {
      return console.log([err.name, err.message]);
    }
    console.log("Successful connected to Database");
  });
};

module.exports = ConnectToMongodb;
