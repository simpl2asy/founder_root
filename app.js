// 25.07.24(목) 랄프님의 코딩 미션
//📜1. app.js 딥스터디 ✅
//📜2. 포스트맨에서 http://localhost:3005/ 하면 왜 Html로 나오는지 ✅
//📜3. script 공부 (진행중)

// 25.07.25(금) 랄프님의 코딩 미션
//📜4. app.js api 문서 작성 -> github 올리기

// ⚫ 1) 초기설정
//require: node.js 환경에서 라이브러리 가져오기
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Business = require("./models/business");

/*  business Mongoose 모델 객체
🔗 객체:https://opentutorials.org/module/3549/21143
- Business: Mongoose에서 만든 모델 클래스; 테이블 X 테이블에 들어갈 하나하나의 데이터 구조(설계도)
(배열: 순서대로 정보 저장 - 고유한 식별자(숫자[]) 객체: 역할; 순서 없는 정보 저장 - 식별(이름.))
  - 조회: Business.find(), Business.findById(...)
  - 생성: new Business(...), business.save()
  - 수정: Business.findByIdAndUpdate(...)
  - 삭제: Business.findByIdAndDelete(...)
*/

// 익스프레스 라우터 객체: api 엔드포인트 별로 모듈화(기능 분리 및 관리)
const router = express.Router();

// ⚫ 2) MongoDB 연결
mongoose
  .connect("mongodb+srv://simpl2asy:jhudnrzk7@cluster0.hh8vok0.mongodb.net/")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/*📌 app.js 안에 app과 router를 굳이 나눈 이유는?
  - app.js 서버의 전체적 구조 설계, 필수 규칙 설정, 환경설정 및 서버 실행
  - router는 기능별 요청 처리 담당
    (1)유지 보수 쉬움: if '사업 정보 생성' 기능에 버그 -> 서버 설정이나 DB 연결 코드가 있는 app.js 볼 필요 X - 사업 정보 라우팅 파일만 보면 됨: 에러 해결을 위해 봐야하는 코드 줄어듦
    - *라우팅: 응용 프로그램의 끝점 (URI)이 클라이언트 요청에 응답하는 방법; 각 URI와 HTTP Method가 다른 클라이언트 요청을 다르게 동작할 수 있도록 만든 것
    (2)확장성: 나중에 다른 기능이 추가된다면 파일이 수천줄이 되어 관리 불가능 <-> router 폴더 안에 js 파일을 각각 만들어 기능별로 코드 분리하면 협업 가능
*/

// ⚫ 3) 미들웨어: 요청 -[미들]- 응답 중간에 있으면서 요청 처리 & 원하는 형태 응답 수정 함수: 서버가 응답을 하기 전에 데이터를 가공하거나, 검사하거나, 변환하는 역할
app.use(express.json()); // 클라이언트가 보낸 요청의 본문(body): JSON 형식일 때 이를 해석해서 req.body 객체에 넣음.
app.use(express.urlencoded({ extended: true }));
/* 📌📌 이 미들웨어는 어떤 역할을 하는가? 📌📌
  🔥🔥🔥 이 두줄이 문자열을 객체로 변환해주는 도구: "만약 사용자가 form 형식으로 데이터를 보내면, 그걸 잘 해석해서 req.body 객체에 담아줘" >> 뭔말인지 모르겠음 🔥🔥🔥
  - 클라이언트가 서버에 보낸 데이터(본문 body)를 서버가 객체로 해석해서 req.body에 담아주도록 미리 설정하는 코드
  -  form 형식: 브라우저에서 HTML <form> 태그를 사용해 보낼 때 기본적으로 사용하는 형식이 **x-www-form-urlencoded*
  - 이게 없다면: req.body는 undefined (데이터를 못 읽음)
    이게 있다면: req.body = { name: 'jeang', email: 'abc@abc.com' } 로 자동 파싱됨
  - GET 요청에는 바디가 없기 때문에 urlencoded 설정은 아무 영향 X
"
  "랄프님 코딩과외"

   “클라이언트가 form이나 JSON으로 데이터를 보내면 그건 그냥 문자열이야.
   서버에서 그걸 객체로 바꾸려면 미들웨어 두 개 (express.json, express.urlencoded)가 꼭 필요해.
   그래야 우리가 req.body.title, req.body.name 이렇게 객체처럼 다룰 수 있어.”
  | 구분                     | 설명                                     | 사수 표현 요약                                |
  | ---------------------- | -------------------------------------- | --------------------------------------- |
  | `express.json()`       | JSON 요청 본문을 객체로 파싱                     | “문자열로 온 JSON을 객체로 바꿔서 req.body에 넣어줌”    |
  | `express.urlencoded()` | form 형식 데이터(x-www-form-urlencoded)를 파싱 | “문자 전송된 걸 객체로 변환해서 req.body로 사용 가능하게 함” |
  | `req.body`             | 파싱된 객체가 저장되는 공간                        | “이 안에 다 들어감. 없으면 비어있다”                  |

    🔸 express.json()
    JSON 형식(예: {"name":"jeang"})의 요청 body를 자동으로 JS 객체로 변환

    req.body에 넣어줌

    예:
    클라이언트가 POST로 { "name": "jeang" } 보내면
    서버에서는 req.body.name으로 접근 가능

    🔸 express.urlencoded({ extended: true })
    HTML form에서 전송된 x-www-form-urlencoded 형식을 파싱해 JS 객체로 변환

    기본적으로 문자열로 온 데이터를 key-value 객체로 만들어 req.body에 넣어줌

    예:
    name=jeang&age=25 → { name: 'jeang', age: '25' }로 파싱됨

    🧠 사수의 핵심 요지
    “이 두 개가 없으면 데이터를 받아도 req.body가 비어 있음”
    “이 두 개가 있어야 요청 본문(body) 안의 데이터를 객체 형태로 접근할 수 있다”
    “문자열을 → 객체로 바꾸는 역할이다”
    “이게 안 되면 form 전송값이나 JSON을 읽을 수 없다”
*/

app.use(express.static(path.join(__dirname, "public"))); // public 폴더를 정적 파일(CSS, 클라이언트 JS, 이미지 등)을 제공하는 폴더로 지정; 별도 로직없이 그대로 클라이언트 전송

app.set("view engine", "ejs"); //Express app 설정;  HTML을 동적으로 생성할 템플릿 엔진으로 EJS를 사용하겠다고 설정
app.set("views", path.join(__dirname, "views")); // 템플릿 파일들(EJS 파일)이 모여있는 폴더가 views 폴더라고 알려줌

app.use("/", router); // 라우터를 앱의 기본 경로(우선'/')에 연결
/* 🔥 app에 라우터들을 연결해놓지 않으면 기능별로 API 엔드 포인트 등록한지 모름
- 라우터만 선언해 놓고 app.use(...)로 연결하지 않으면 클라이언트는 요청을 보낼 수 없고 Express는 해당 요청에 어떤 반응을 해야 할지 모름.
*/

// ⚫ 4) 라우터

// 🔗 동기/비동기: https://velog.io/@khy226/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%9E%80-Promise-asyncawait-%EA%B0%9C%EB%85%90

// (1) 라우터 설정

// (1) GET /business (목록): 데이터베이스에 있는 모든 사업 정보 목록을 조회하여, HTML 페이지로 만들어 클라이언트에게 뷰
router
  .route("/") //라우터의 루트(/business) 경로에서 두 가지 메서드를 처리
  .get(async (req, res) => {
    try {
      const businesses = await Business.find();
      //🔥 await, find(): Mongoose 모델의 find() 메서드를 사용해 businesses 컬렉션의 모든 문서를 가져옴. await는 DB 조회가 끝날 때까지 기다림.

      console.log("📋 Business List:", businesses); // 가져온 데이터를 콘솔에 찍어보는거
      res.render("business_list", { businesses }); //🔥 render():템플릿 엔진(EJS 등)으로 HTML을 생성해 보여줌
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching businesses"); //에러 발생 시 500(서버 에러)로 응답하고 콘솔에 에러 출력
    }
  })

  /* 📜 왜 포스트맨으로 get 요청을 보내면 데이터가 아니라 html이 보일까?, 만약 데이터를 보고 싶으면 어떻게 해야할까? 📜
    - 현욱: 데이터는 json형태가 아니라 render 형태로 보여지기에 클라이언트가 보는 페이지는 html / 지금 data가 json형태로 적재 되어있으니 res.json 응답과 데이터만 줘야함
    - AI: 이 라우트는 데이터(JSON)를 주는 게 아니라 HTML 웹페이지를 만들어서 브라우저처럼 보여주는 것이 목적; Postman에서 JSON 요청을 했더라도 서버는 이 라우트에서 무조건 HTML을 줌 / 
    */

  /* 🔥 API, API 문서, 포스트맨
        - API: 서로다른 시스템(프론트 <-> 백엔드)이 데이터를 주고 받기 위해 약속한 통신 규칙: 데이터를 요청하고 응답받는 기능 자체
        - 각 경로(path)와 메서드(GET, POST 등)로 특정 동작이 정해져 있음.
        - API는 보통 Express의 라우터(router) 안에서 정의됨 
          "router.get("/business", async (req, res) => {
            const businesses = await Business.find();
            res.json(businesses);"
            });
        - 포스트맨: API 문서대로 요청을 보내보고, 응답을 확인하는 툴
        */

  /* 🔥 res.render({ businesses }); 생기는 오류
    - TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received an instance of Object
      "path" 인수는 문자열 타입이어야 합니다. Object 인스턴스를 받았습니다.
    - render():템플릿 엔진(EJS 등)으로 HTML을 생성해 보여줌 
  */

  // (2) POST /business — 생성: 클라이언트(입력 폼)로부터 받은 정보로 새로운 사업 정보를 생성하고 데이터베이스에 저장
  .post(async (req, res) => {
    // 클라이언트가 form을 제출했을 때, 이 POST 요청을 처리
    try {
      // 무조건 try 실행하고 그 예외는 catch로 진행
      const business = new Business(req.body); // 요청의 본문(req.body)에 담겨 온 입력값으로 새로운 Business 모델 객체를 메모리에 생성
      /*  
        - Business: Mongoose에서 만든 모델 클래스; 테이블 X 테이블에 들어갈 하나하나의 데이터 구조(설계도)
        - business: Business 모델로부터 새로 만들어낸 하나의 객체(instance)
        - new: js에서 “객체를 새로 만든다” 키워드
        - req.body: 클라이언트가 form에 입력해서 보낸 값들이 담겨 있는 객체
          => req.body로부터 사용자가 입력한 내용을 받아서 > Business 모델을 이용해 새로운 사업 정보 객체를 하나 만들고 > 그걸 business라는 변수에 저장
        */

      console.log("business_sendform", business); // 요청 본문이 담긴 변수를 콘솔에 찍어서 보여줌
      await business.save(); // save(): mongoose 제공 인스턴스 저장 메서드 - MongoDB에 실제로 데이터를 저장하려면 → 네트워크를 타고 저장 요청을 보내고, 응답을 기다려야함
      //await(): ⚙️ “이 저장 작업이 끝날 때까지 기다렸다가, 다음 코드 실행해!” - 없으면:  저장 안 됐는데 응답 보내는 일 생김

      res.status(201).json(business);
      // 방금 DB에 저장 성공하면 상태코드와 함께, 데이터(business)를 JSON 형태로 반환해서 콘솔에 보여준다
      // json: 프론트엔드에서 그 결과를 화면에 다시 보여준다거나, 다음 화면으로 넘길 때 사용, REST에서는 POST로 새로운 리소스를 만들었을 때, 그 리소스를 그대로 응답하는 걸 권장
      /* ❔ 질문 ❔
          - 왜 입력하고 에러가 발생할까? 그리고 다시 저장 완료가 뜨는 이유는? 
          */
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create business" });
    }
  });

/* 전체 흐름
POST /business
    ↓
req.body로 입력값 받음
    ↓
new Business(req.body)
    ↓
await business.save()
    ├── 성공 → res.status(201).json(business)
    └── 실패 → catch(err)
                 ├─ console.error(err)
                 └─ res.status(500).json({ error: "Failed to create business" }
*/

// GET /api/biz — 목록 (JSON API)
router.get("/api/biz", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json({ businesses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
});

// (3) GET /new_biz — 입력 폼 페이지 라우트
router.get("/new_biz", async (req, res) => {
  res.render("input"); // render(): HTML 페이지를 만들어서 브라우저에 보여주는 메서드 / input: views/input.ejs라는 파일을 찾아서 화면에 렌더링함
});

// (3) GET /business/:id/edit — 수정 페이지 렌더링
router.get("/business/:id/edit", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id); //  Business.findById(...): 해당 ID에 해당하는 사업 정보를 DB에서 가져옴 / req.params.id: URL 경로에 포함된 :id 값 추출
    if (!business) {
      // 해당 ID로 DB를 찾았는데 결과가 없으면, 404 응답 (Not Found)
      return res.status(404).send("해당 정보를 찾을 수 없습니다.");
    }
    // views/business_edit.ejs 템플릿에 business 데이터를 넘겨서 화면에 표시
    res.render("business_edit.ejs", { business });
  } catch (err) {
    console.error(err);
    res.status(500).send("페이지를 불러오는 중 오류가 발생했습니다.");
  }
});

// (4) PUT /business/:id — 실제 수정 요청 처리
router.put("/business/:id", async (req, res) => {
  try {
    const updated = await Business.findByIdAndUpdate(req.params.id, req.body, {
      // req.params.id: URL에서 사업 ID 추출 / req.body: 수정된 데이터 (폼에서 제출된 새 값)
      //findByIdAndUpdate(...): 이 ID의 문서를 찾아서 req.body 값으로 업데이트
      new: true, // 업데이트 후의 최신 데이터를 반환하라는 옵션
    });
    res.json(updated); //수정된 결과를 JSON으로 클라이언트에 반환
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update business" });
  }
});

// (5) DELETE /business/:id — 삭제
router.delete("/business/:id", async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id); //해당 ID의 데이터를 MongoDB에서 삭제
    res.json({ success: true }); //삭제 완료를 알리는 JSON 응답
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete business" });
  }
});

// ⚫ 5) 서버 실행
app.listen(3005, () => {
  console.log("서버가 실행 중 http://localhost:3005/");
});
