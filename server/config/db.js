const { Sequelize } = require("sequelize");

require("dotenv").config();

const username = process.env.DBUser;
const password = process.env.DBPassword;

console.log("user & password", username, password);

const sequelize = new Sequelize("webapppattern", username, password, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTION ESTABLISHED SUCCESSFULLY");
  })
  .catch((err) => {
    console.error("UNABLE TO CONNECT DATABASE", err);
  });

module.exports = sequelize;
