# founder_root
휘테커 파운더 프로젝트

---

# 📘 Business Management RESTful API

> Express.js + MongoDB(Mongoose) 기반의 사업 정보 등록/수정/삭제용 API 문서입니다.
> REST 원칙에 따라 각 HTTP 메서드와 리소스를 명확히 구분하였으며, 클라이언트는 JSON 또는 HTML을 통해 상호작용할 수 있습니다.

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
      "companyName": "에브릿데이",
      "businessItem": "스마트 간식 서비스",
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
  "companyName": "에브릿데이",
  "businessItem": "간식 큐레이션",
  "problem": "사무실 공급 문제",
  "solution": "스마트 매칭",
  "targetMarket": "B2B",
  "competitiveAdvantage": "물류 자동화",
  "businessStage": "시드",
  "desiredInvestment": "5천만 원",
  "industry": ["IT", "Education"]
}
```

* **응답**

```json
{
  "_id": "64c4bc3e2d...",
  "companyName": "에브릿데이",
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

## 🧠 설계 포인트

* 모든 데이터 조작(POST, PUT, DELETE)은 JSON 기반으로 처리
* `/api` 경로는 프론트 없이 외부 시스템 연동용 API 전용
* `/new_biz`, `/business/:id/edit`은 HTML 화면 제공용
* REST 원칙에 따라 리소스 중심 URI 구성

---
