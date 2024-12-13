const { INTEGER } = require("sequelize");

const Visitor = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "visitor",
    {
      id: {
        // id not null primary key auto_increment
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        //name varchar(10) not null
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      comment: {
        //comment mediumtext
        type: DataTypes.TEXT("medium"),
      },
    }, //column 정의
    {
      timestamps: false,
      //데이터 수정/추가 컬럼을 자동으로 만들어서 기록
      freezeTableName: true,
      //기본 값: false
      //first 인자로 전달해준 모델 이름 그때로, tableName 고정
    }
  );

  return model;
};

module.exports = Visitor; //models/index.js에서 사용할 예정
