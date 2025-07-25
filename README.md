# 📜 warm up misson 
<img width="1440" height="1221" alt="휘테커_misson" src="https://github.com/user-attachments/assets/35d2dada-6d1e-4913-83d2-64d6c67511c6" />

📆 25.07.23(수) 랄프님의 코딩 미션
  - 📜0. crud, 수정 페이지

📆 25.07.24(목) 랄프님의 코딩 미션
  - 📜1. app.js 딥스터디 ✅
  - 📜2. 포스트맨에서 http://localhost:3005/ 하면 왜 Html로 나오는지 ✅
  - 📜3. script 공부 (진행중)

📆 25.07.25(금) 랄프님의 코딩 미션
  - 📜4. app.js api 문서 작성 -> github 올리기 ✅

---

# 📘 Business Management RESTful API

> Express.js + MongoDB(Mongoose) 기반의 사업 정보 등록/수정/삭제용 API 문서입니다.

---

## 🌐 Base URL

```
http://localhost:3005

```

---

## 📦 주요 리소스

* **Business**: 창업자의 사업 정보를 표현하는 단위

---

## 🧭 RESTful API 설계 개요

| 메서드    | 경로                   | 기능             | 설명                      |
| ------ | -------------------- | -------------- | ----------------------- |
| GET    | `/api/biz`           | 전체 사업 목록(JSON) | JSON 응답 전용              |
| GET    | `/business`          | 전체 사업 목록(HTML) | EJS 렌더링                 |
| GET    | `/new_biz`           | 신규 사업 등록 폼 페이지 | EJS 렌더링                 |
| POST   | `/business`          | 신규 사업 등록       | JSON 또는 form-urlencoded |
| GET    | `/business/:id/edit` | 특정 사업 수정 폼 페이지 | EJS 렌더링                 |
| PUT    | `/business/:id`      | 사업 정보 수정       | JSON 전송                 |
| DELETE | `/business/:id`      | 사업 정보 삭제       | 없음                      |

---

## 📘 상세 API 명세

---

### 1. \[GET] `/api/biz` – 전체 사업 목록(JSON)

* **설명**: DB에 등록된 모든 사업 정보를 JSON으로 반환
* **응답 예시**

```json
{
  "businesses": [
    {
      "_id": "64c4bc3e2d...",
      "companyName": "파운더",
      "businessItem": "초기 창업자 교육 플랫폼",
      "industry": ["IT", "Education"]
    }
  ]
}
```

---

### 2. \[GET] `/business` – 전체 목록 (HTML 뷰)

* **설명**: 사업 정보 리스트를 `views/business_list.ejs`를 통해 HTML로 렌더링

---

### 3. \[GET] `/new_biz` – 등록 폼 페이지

* **설명**: 신규 사업 등록용 EJS 템플릿 렌더링
* **사용 목적**: 브라우저 기반 등록 폼 제공

---

### 4. \[POST] `/business` – 신규 등록

* **요청 헤더**

```http
Content-Type: application/json
```

* **요청 Body**

```json
{
  "companyName": "파운더",
  "businessItem": "초기 창업자 교육 플랫폼",
  "problem": "사무실 공급 문제",
  "solution": "스마트 매칭",
  "targetMarket": "B2B",
  "competitiveAdvantage": "AI 기반 맞춤형 진단 및 교육 추천 시스템",
  "businessStage": "시드",
  "desiredInvestment": "5천만 원",
  "industry": ["IT", "Education"]
}
```

* **응답**

```json
{
  "_id": "64c4bc3e2d...",
  "companyName": "파운더",
  ...
}
```

---

### 5. \[GET] `/business/:id/edit` – 수정 폼 페이지

* **설명**: 특정 사업 정보를 수정할 수 있는 HTML 폼
* **파라미터**: `:id` = 사업 ID
* **응답**: `views/business_edit.ejs` 렌더링

---

### 6. \[PUT] `/business/:id` – 사업 수정 요청

* **요청 헤더**

```http
Content-Type: application/json
```

* **요청 Body**

```json
{
  "companyName": "수정된 이름",
  "solution": "새로운 솔루션"
}
```

* **응답**

```json
{
  "_id": "64c4bc3e2d...",
  "companyName": "수정된 이름"
}
```

---

### 7. \[DELETE] `/business/:id` – 삭제 요청

* **설명**: 특정 사업 리소스를 삭제
* **응답**

```json
{ "success": true }
```

---

## 🛠 서버 설정 요약

| 설정           | 내용                                                             |
| ------------ | -------------------------------------------------------------- |
| Middleware   | `express.json()` : JSON 파싱<br>`express.urlencoded()` : form 파싱 |
| View Engine  | EJS                                                            |
| 정적 폴더        | `/public`                                                      |
| 라우터 mount 위치 | `app.use("/", router)`                                         |
| DB 연결        | Mongoose + MongoDB Atlas                                       |

---

## ✅ 실행

```bash
node app.js
```

브라우저에서 접속: `http://localhost:3005/`

---

## 📁 프로젝트 구조 설명 (`founder_root/`)

```
founder_root/
├── app.js                    ← 🧠 메인 서버 진입점 (라우팅 + DB 연결 설정)
├── models/
│   └── business.js           ← 🗂️ Mongoose 모델 정의 (Business 데이터 스키마)
├── public/
│   └── js/
│       └── input.js         ← 🧾 클라이언트용 JS (폼 제출 시 동작 처리)
├── views/
│   ├── input.ejs             ← 📝 사업 정보 입력 화면 (HTML form)
│   ├── business_list.ejs     ← 📃 전체 사업 리스트 표시 화면
│   └── business_edit.ejs     ← ✏️ 특정 사업 정보 수정 화면
├── package.json              ← 📦 의존성 및 프로젝트 메타정보
├── package-lock.json         ← 📦 정확한 버전 잠금 파일
└── SUMMARY.md                ← 📄 폴더 및 파일별 설명 목차 파일
```

---

## 🔍 주요 폴더 및 파일 기능 요약

| 경로                        | 설명                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `app.js`                  | Express 서버의 **핵심 진입점**. 서버 실행, 미들웨어 설정, MongoDB 연결 및 라우팅 등록을 처리함                   |
| `models/business.js`      | MongoDB와 연결되는 **Business 모델 정의 파일**. 데이터 구조(schema)를 설계하고 DB에 연동되는 Mongoose 모델을 만듦 |
| `public/js/input.js`      | HTML `form`에서 정보를 수정/제출할 때 동작하는 **클라이언트용 JavaScript**. 서버로 PUT 요청 전송 처리            |
| `views/input.ejs`         | 사용자로부터 사업 정보를 **입력받는 화면 (HTML Form)**                                              |
| `views/business_list.ejs` | 등록된 모든 사업 정보를 **목록 형태로 보여주는 페이지**                                                  |
| `views/business_edit.ejs` | 특정 사업 정보를 수정할 수 있도록 하는 **수정 전용 폼 페이지**                                             |
| `package.json`            | 프로젝트의 **의존성, 스크립트, 이름** 등이 정의됨. npm이 사용하는 메타데이터                                    |
| `package-lock.json`       | 정확한 버전의 패키지를 기록하는 파일 (프로젝트 실행 시 동일한 환경 보장)                                         |
| `SUMMARY.md`              | 📌 각 파일 및 폴더의 **구조 설명 목차**를 정리한 문서 (ReadMe 보조용)                                    |

---

## 📌 전체 흐름 예시

1. 사용자가 `/new_biz`에서 `input.ejs`로 접속 → `form` 작성
2. 제출 시 `input.js`가 JavaScript로 서버에 POST/PUT 요청 전송
3. `app.js`가 요청을 받아서 `models/business.js`의 모델로 DB 처리
4. 결과는 `business_list.ejs` 또는 `business_edit.ejs` 화면에 출력

---
