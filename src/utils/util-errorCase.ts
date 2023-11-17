export const utilErrorCase = (status: number) => {
  switch (status) {
    case 400:
      alert("BAD REQUEST: 잘못된 요청");
      break;
    case 409:
      alert("CONFLICT: 요청이 서버의 현재 상태와 충돌");
      break;
    case 422:
      alert("UNPROCESSABLE ENTITY: 유효하지 않은 요청");
      break;
    case 428:
      alert("PRECONDITION REQUIRED: 선행 조건 오류");
      break;
    case 500:
      alert("INTERNAL SERVER ERROR: 서버 연결 오류");
      break;
    default:
      alert("알 수 없는 오류");
  }
};
