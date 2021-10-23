const mongoose = require("mongoose");
const logger = require('./config/logger')
const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/";

require("./modules/users")

if (process.env.APP_ENV === "production") {
  URI = process.env.PRODUCTION_CONNECTION_STRING;
}

mongoose.connect(connectionString, { useNewUrlParser: true ,useUnifiedTopology:true,useCreateIndex:true});

mongoose.connection.on("connected", () =>
  logger.info(`connected to mongo database`)
);


mongoose.connection.on("error", (err) => {
  logger.error("mongoose connection error"+ err);
});
mongoose.connection.on("disconnected", () => {
  logger.warn("mongoose disconnected");
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    logger.warn("mongoose disconnected through"+ msg);
    callback;
  });
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});
