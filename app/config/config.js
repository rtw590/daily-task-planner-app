module.exports = {
  port: 8081,
  db: {
    databse: "dailyPlanner",
    user: "dailyPlanner",
    password: "dailyPlanner",
    options: {
      dialect: "sqlite",
      host: "localhost",
      storage: "./dailyPlanner.sqlite"
    }
  },
  authentication: {
    jwtSecret: "secret"
  }
};
