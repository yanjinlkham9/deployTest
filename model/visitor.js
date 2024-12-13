const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "sesac",
  password: "1234",
  database: "sesac",
});

//1. 전체 목록 조회
exports.getVisitors = (cb) => {
  conn.query(`SELECT * FROM visitor`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("Visitor.js:", rows);
    /*  select  문의 결과 rows
    [
      RowDataPacket { id: 1, name: '홍길동', comment: '내가 왔다' },
      RowDataPacket { id: 2, name: '이찬혁', comment: '야호~~~' }
    ] */
    cb(rows);
  });
};

//2. 특정 데이터 조회
//id-r 조회 hh bolohor 매개변수로 id를 받아줌
exports.getVisitor = (id, cb) => {
  conn.query(`SELECT * FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("model/visitor data 하나 조회:", rows);
    cb(rows[0]);
  });
};

//3. 데이터 등록
//visitor 테이블에 데이터 삽입
exports.postVisitor = (data, cb) => {
  //data = req.body 객체 형태로 받아옴. comment name 있는 객체
  conn.query(
    //문자열은 "" 안에 써야 함
    `INSERT INTO visitor VALUES(null, '${data.name}', '${data.comment}')`,
    (err, rows) => {
      if (err) throw err;
      console.log("model post:", rows);
      /* 
      OkPacket {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 5, //현재 넣어진 ID
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      }
      */
      cb(rows.insertId);
    }
  );
};

//4. 데이터 등록
//visitor 테이블에서 데이터 삭제
exports.deleteVisitor = (id, cb) => {
  conn.query(`DELETE FROM visitor WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    console.log("model/visitor.js 특정 데이터 삭제: ", rows);
    /* 
    OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
    */
    cb();
  });
};

//5. 데이터 수정
//data = id, name, comment
exports.patchVisitor = (data, cb) => {
  console.log("model: ", data);
  conn.query(
    `UPDATE visitor SET name="${data.name}", comment='${data.comment}' WHERE id=${data.id}`,
    (err, rows) => {
      if (err) throw err;
      console.log("Visitor.js 수정: ", rows);
      /* 
      OkPacket {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      serverStatus: 2,
      warningCount: 0,
      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
      protocol41: true,
      changedRows: 1
    }
      */
      cb();
    }
  );
};
