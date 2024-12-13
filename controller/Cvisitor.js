// const Visitor = require("../model/Visitor");
const { where } = require("sequelize");
const models = require("../models/index");
const { errorlogs } = require("../utils/common");
// console.log(Visitor.getVisitors());

/* / GET */
exports.main = (req, res) => {
  res.render("index");
};

/* /visitors GET */
exports.getVisitors = (req, res) => {
  // [DB 연결전]
  // res.render("visitors", { data: Visitor.getVisitors() });

  // [DB 연결후, Sequelize 전]
  // Visitor.getVisitors((result) => {
  //   console.log("전체목록 Cvisitor.js", result);
  //   res.render("visitors", { data: result });
  // });

  // [Sequelize 이후]
  // `SELECT * FROM visitor`
  models.Visitor.findAll()
    .then((result) => {
      console.log("findAll>>", result);
      // findAll의 결과는 배열
      // res.send(result);
      res.render("visitors", { data: result });
    })
    .catch((err) => {
      console.log("getVisitors Controller Err", err);
      res.status(500).send("server err!");
    });
};

/* /visitor/:id GET*/
exports.getVisitor = async (req, res) => {
  console.log(req.params); // {id:'1'}
  console.log(req.params.id); // '2'
  // [Sequelize 이전]
  // Visitor.getVisitor(req.params.id, (result) => {
  //   console.log("한 개의 데이터 Cvisitor.js", result);
  //   res.send(result);
  // });

  // [Sequelize 이후]
  // `SELECT * FROM visitor WHERE id=${req.params.id}`
  try {
    const result = await models.Visitor.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("findOne >> ", result);
    res.send(result);
    /* 
    visitor {
  dataValues: { id: 3, name: 'nickname', comment: '수정한 댓글입니다.1' },
  _previousDataValues: { id: 3, name: 'nickname', comment: '수정한 댓글 입니다.1' },
  uniqno: 1,
  _changed: Set(0) {},
  _options: {
    isNewRecord: false,
    _schema: null,
    _schemaDelimiter: '',
    raw: true,
    attributes: [ 'id', 'name', 'comment' ]
  },
  isNewRecord
    */
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Internal Server Error");
  }
};

/* /visitor POST, 등록*/
exports.postVisitor = (req, res) => {
  console.log("req.body", req.body);

  // Visitor.postVisitor(req.body, (result) => {
  //   console.log("Cvisitor.js", result);
  //   res.send({
  //     id: result,
  //     comment: req.body.comment,
  //     name: req.body.name,
  //   });
  // });
  // models.Visitor.create({
  //   name: req.body.name,
  //   comment: req.body.comment,
  // })
  //   .then((result) => {
  //     console.log(result);
  //     res.send("response");
  //   })
  //   .catch((err) => {
  //     console.log("Err", err);
  //     res.status(500).send("server error");
  //   });
  models.Visitor.create({
    name: req.body.name,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("server err");
    });
};

/* /visitor DELETE, 삭제 */
exports.deleteVisitor = async (req, res) => {
  // console.log(req.body); // { id: '3' }
  // console.log(req.body.id); // '3'
  // Visitor.deleteVisitor(req.body.id, () => {
  //   res.send(req.body.id + "번 id 삭제완료");
  // });
  try {
    const result = await models.Visitor.destroy({
      where: { id: req.body.id },
    });
    console.log(result); //1(삭제 성공), 0(삭제 실패)
    // 1: true 0: false
    if (Boolean(result)) {
      res.send(req.body.id + "번 id 삭제");
    } else {
      res.send("잘못된 접근");
    }
  } catch (err) {
    console.log("err", err);
    res.send("internal server error");
  }
};

/* /visitor PATCH, 수정 */
exports.patchVisitor = async (req, res) => {
  console.log(req.body);
  // Visitor.patchVisitor(req.body, () => {
  //   res.send("수정 완료");
  // });
  // res.send("response patch!");

  // `UPDATE visitor SET name="${data.name}", comment='${data.comment}' WHERE id=${data.id}
  try {
    const [result] = await models.Visitor.update(
      {
        name: req.body.name,
        comment: req.body.comment,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    console.log(result); //[1], [0]
    // const [number] = result;
    // console.log(number);
    if (Boolean(result)) {
      res.send("수정 완료");
    } else {
      res.send("잘못된 접근");
    }
  } catch (err) {
    errorlogs(err, "patch controller 내부");
  }
};
