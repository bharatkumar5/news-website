#!/usr/bin/env node

/**
 * Module dependencies.
 */
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });
const app = require("./app");
const debug = require("debug")("news-app:server");
const http = require("http");

//DataBase connection Setup//
const DBREMOTE = process.env.DATABASE;
const DBLOCAL = process.env.DATABASE_LOCAL;
const mongourl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qapkskq.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

mongoose
  .connect(mongourl)
  // .connect(DBLOCAL)
  .then(() => {
    console.log("database connection successful");
  });

/**
 * * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || 9000);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  // debug('Listening on ' + bind);
  console.log("Listening on ", bind);
}

// "start": "NODE_ENV=production MONGO_USER=bharatkumar MONGO_PASSWORD=774226 MONGO_DEFAULT_DATABASE=publication node www.js",
