//sequelize-의 설정

"use strict";

const Sequelize = require("sequelize");
let config = require(__dirname + "/../config/config.js");
console.log(config);
const env = process.env.NODE_ENV || "development";
//development || production || undefined //추가
console.log("env", env);
console.log("NODE_ENV", process.env.NODE_ENV);
config = config[env];
console.log("config: ", config);
const db = {};

let sequelize = new Sequelize(
  config.database, //sesac
  config.username, //sesac
  config.password, //1234
  config
);

db.sequelize = sequelize;
//설정 정보를 sequelize라는 키 안에 넣어주는 중
// {
//   sequelize: sequelize;
// }

db.Sequelize = Sequelize;
//sequelize 모듈을 Sequelize라는 키 안에 넣어주는 중
// {
//   sequelize: sequelize;
//   sequelize: Sequelize;
//  }

db.Visitor = require("./Visitor")(sequelize, Sequelize);
// {
//   sequelize: sequelize;
//   sequelize: Sequelize;
//   Visitor: visitor.model
// }

module.exports = db; //app.js에서 사용
