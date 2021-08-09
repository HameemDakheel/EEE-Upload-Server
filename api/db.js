const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017/";

require("./modules/users") 

if (process.env.APP_ENV === "production") {
  URI = process.env.PRODUCTION_CONNECTION_STRING;
}

mongoose.connect(connectionString, { useNewUrlParser: true });

mongoose.connection.on("connected", () =>
  console.log(`connected to mongo database on ${connectionString}`)
);

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to", connectionString);
});
mongoose.connection.on("error", (err) => {
  console.log("mongoose connection error", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoose disconnected");
});

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log("mongoose disconnected through", msg);
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
