use sesac;
CREATE TABLE visitor (
    id INT  PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    comment MEDIUMTEXT 
);

DESC visitor;
INSERT INTO visitor VALUES(1, '홍길동', '내가 왔다');
INSERT INTO visitor VALUES(2, '이찬혁', '으리차차');
INSERT INTO visitor VALUES(NULL, '삭제 예정', '으리차차');
SELECT * FROM visitor;
--data 수정
UPDATE visitor SET comment="야호~~~" WHERE id=2;
--data 삭제
DELETE FROM visitor WHERE id=3;

##########DCL 제어어
--MySQL 사용자 생성
CREATE USER 'sesac'@'%' IDENTIFIED BY '1234';
--권한 부여
GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;
ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

SELECT * FROM mysql.user;
SHOW GRANTS for 'sesac'@'%';

show TABLEs;
