const tbody = document.querySelector("tbody");

//방명록 "등록"
//POST /visitor
function createrVisitor() {
  const form = document.forms["visitor-form"];
  if (form.name.value.length === 0 || form.comment.value.length === 0) {
    alert("이름과 방명록을 모두 기입해주세요");
    return;
  }
  //table 생성시 name가 VARCHAR(10) 넘으면 오류기 때문에 유효성검사하고 데이터 전송
  if (form.name.value.length > 10) {
    alert("이름은 10글자 미만으로 작성");
    return;
  }

  axios({
    method: "post",
    url: "/visitor",
    data: {
      name: form.name.value,
      comment: form.comment.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      const { id, comment, name } = res.data;
      const newHtml = `
      <tr id="tr_${id}">
          <td>${id}</td>
          <td>${name}}</td>
          <td>${comment}</td>
          <td>
            <button onclick="editVisitor(${id})">수정</button>
          </td>
          <td>
            <button onclick="deleteVisitor(this, ${id})">
              삭제
            </button>
          </td>
        </tr>`;
      //tbody.append(newHtml);  //문자열 그대로 나옴
      tbody.insertAdjacentHTML("beforeend", newHtml); //문자열을 특정 요소의 맨마지막으로 HTML 추가
      //맨마지막: beforeend
      form.reset();
    })
    .catch((err) => console.error(err));
}

//방명록 삭제
function deleteVisitor(btn, id) {
  console.log(id);
  console.log(btn); //태그
  axios({
    method: "delete",
    url: "/visitor",
    data: {
      id: id,
    },
  })
    .then((text) => {
      console.log(text.data);
      //btn.parentElement.parentElement.remove();  //tr가 부모의 부모라서 찾아서 삭제
      btn.closest(`#tr_${id}`).remove();
      //closest: 가장 가까운 조상값 찾기
    })
    .catch((err) => console.error(err));
}

//수정 버튼 누르면
//GET /visitor/:id
//1. 하나의 데이터를 조회해오고 (수정을 위한 입력창으로 변환)
//   방명력 등록 버튼 --> 수정 버튼으로 변경
function editVisitor(id) {
  const form = document.forms["visitor-form"];
  axios({
    method: "GET",
    url: `/visitor/${id}`,
  })
    .then((res) => {
      console.log(res.data);
      const { name, comment, id } = res.data;
      form.name.value = name;
      form.comment.value = comment;

      const btnContainer = document.getElementById("btn-group");
      const html = `<button type="button" onclick="editDo(${id})">수정하기</button>
      <button type="button" onclick="editCancel() ">수정 취소</button>`;
      btnContainer.innerHTML = html;
    })
    .catch((err) => console.error(err));
}
//2. 실제 수정 데이터를 요청
//수정하기 btn 누르면 들어감
// PATCH /visitor
function editDo(id) {
  const form = document.forms["visitor-form"];
  //유효성 검진
  if (form.name.value.length === 0 || form.comment.value.length === 0) {
    alert("이름과 방명록을 모두 기입해주세요");
    return;
  }
  //table 생성시 name가 VARCHAR(10) 넘으면 오류기 때문에 유효성검사하고 데이터 전송
  if (form.name.value.length > 10) {
    alert("이름은 10글자 미만으로 작성");
    return;
  }

  axios({
    method: "patch",
    url: "/visitor",
    data: {
      id: id,
      comment: form.comment.value,
      name: form.name.value,
    },
  })
    .then((res) => {
      console.log(res.data);
      //   const { id, name, comment } = res.data;
      const tr = document.querySelector(`#tr_${id}`);
      console.log(tr.children);
      const children = tr.children; //[td,td,td,td,td] 배열 td가 5개 있는
      //   console.log(children[1]);
      children[1].textContent = form.name.value; //작성자
      children[2].textContent = form.comment.value; //comment 내용

      editCancel();
    })
    .catch((err) => console.error(err));
}

//수정 취소
function editCancel() {
  //1. form 안에 있는 input 초기화
  const form = document.forms["visitor-form"];
  // form.reset();
  form.name.value = "";
  form.comment.value = "";
  //2.  등록 버튼 보이도록
  const btnContainer = document.getElementById("btn-group");
  btnContainer.innerHTML = `<button type="button" onclick="createrVisitor()">방명록 등록</button>`;
}
