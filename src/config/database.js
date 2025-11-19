require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory",
    logging: false,
  });
} else {
  sequelize = new Sequelize(process.env.NEON_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
  });
}

module.exports = sequelize;