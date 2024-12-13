//jsdocs
/**
 * 서버 에러 났을 때 실행될 코드 모음
 * @param {Error} err 실제 에러 전달
 * @param {String} errMsgInServer 서버 콘솔에 뜨워줄 메세지
 * @param {String} errMsgInClient 클라인트 콘솔에 뜨워줄 메세지
 * @param {Number} statusCode 에러의 상태코드
 */
exports.errorlogs = (
  res,
  err,
  errMsgInServer = "ERROR",
  errMsgInClient = "internal server error",
  statusCode = 500
) => {
  console.log(errMsgInServer, err);
  res.status(statusCode).send(errMsgInClient);
};
