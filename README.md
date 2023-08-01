**명명 규칙**
1. 컴포넌트 - Pascal Case
2. 그 외 파일 - Kebab Case (ex. hook-bookmark.ts)
3. const variant - Upper Case
4. 변수명, 타입 - Camel Case
5. 리액트 훅 - React객체를 사용
6. 함수는 화살표 함수 사용
7. 컴포넌트 타입은 React.FC<Props>

**import 순서**
1. 외부 라이브러리
2. 내부 라이브러리
3. 컴포넌트
4. asset 등 기타

**export**
1. 컴포넌트, 커스텀훅만 export default

**비동기**
1. async / await 사용

**컴포넌트 내부 선언 순서**
1. 리액트 훅
2. 라이브러리 훅
3. 커스텀 훅
4. 변수 및 상수
5. 함수
6. useEffect (상태값을 의존성으로 갖는 것 -> 초기 렌더링 순)
7. 파생되는 값

**타입 스크립트 컨벤션**
1. 타입 전역 선언 = 전역 상태값에 대한 타입, 서버 요청 response값에 대한 타입
2. 특정 값에 대한 타입은 type으로 객체에 대한 타입은 interface로
3. any, as 사용 x

**스타일(tailwind CSS) 컨벤션**
1. variant로 선언
```
const StMainSidebar = {
  mainSideBar: "flex flex-col items-center basis-1/3",
  logo: "w-[200px] h-[200px] my-[60px]",
  // ...
}
```
2. 반응형 작업을 위한 스타일 객체 리터럴 선언 (width, height, margin, padding, flex-direction, gap)
```
const width = {
  "w-full": "w-full sm:w-[300px]",
};
```

**폴더 구조**
1. index 사용 x
2. 디자인 시스템은 components/designSystem 폴더 안에 아토믹 패턴으로 구성
3. 페이지별로 폴더 구성

**깃 컨벤션**
1. 깃 이모지 x
2. 커밋 단위는 기능 단위로 (커밋 날렸을 때 정상 동작)
3. FEAT: 새로운 기능 추가
4. FIX: 버그 수정
5. DOCS: 문서 수정
6. REFACTOR: 코드 리팩토링
7. STYLE: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
8. TEST: 테스트 코드, 리팩토링 테스트 코드 추가
9. CHORE: 빌드 업무 수정, 패키지 매니저 수정
10. 브랜치명(병합 후 삭제) - feature/기능명, fix/기능명, chore/기능명

**기타**
1. 스프린트 방식으로 진행
2. 추가 기능은 다음 스프린트 사이클에서 개발

**테스트 코드**
1. 테스트 파일은 units폴더에 작성