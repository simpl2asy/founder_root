
# 🧭 Founder 프로젝트 모음

이 저장소는 [휘테커 파운더 프로젝트]의 모든 실습 및 개발 결과물을 모아둔 **모노레포(Monorepo)**입니다.  
초기 창업자의 비즈니스 정보 입력, 추천 시스템 구현, 회원 인증까지 전반적인 기능을 Express.js 기반으로 구성하며, 기능별로 폴더를 나누어 관리합니다.

---

## 📂 폴더 구조

```bash
founder_root/
├── warm-up/              # Express.js 기본 구조 학습 및 CRUD 실습
├── work_signup-login/    # 사용자 인증 기능(회원가입/로그인) 구현
├── README.md             # 루트 프로젝트 개요 설명
├── SUMMARY.md            # 전체 프로젝트 구조 목차 문서
````

---

## 🛠 기술 스택

* **Backend**: Node.js, Express
* **DB**: MongoDB (Mongoose ODM)
* **Frontend**: EJS (Embedded JavaScript Templates)
* **기타**: Git, GitHub, RESTful API 설계

---

## 📌 프로젝트별 설명

### 1. warm-up/

* 사업 정보를 입력하고, 목록을 조회/수정할 수 있는 CRUD 애플리케이션
* RESTful API 및 MongoDB 연동 연습
* 클라이언트단 폼 제출 → 서버 처리 → DB 저장 → 결과 렌더링 흐름 이해

### 2. work\_signup-login/

* 사용자 계정 생성, 로그인, 세션 유지
* 입력 검증 및 에러 처리, 보안 기초 학습

---

## 🚀 실행 방법

1. 각 폴더(warm-up, work\_signup-login)로 이동

2. 의존성 설치:

   ```bash
   npm install
   ```

3. 서버 실행:

   ```bash
   node app.js
   ```

4. 기본 접속 주소:

   ```
   http://localhost:3005
   ```

---

## 📄 라이센스

MIT License
Copyright ⓒ 2025

````

---

### 📚 루트용 `SUMMARY.md` (founder_root/SUMMARY.md)

```markdown
# 📚 SUMMARY.md

이 문서는 Founder 프로젝트 모노레포 구조를 정리한 요약 문서입니다.

---

## 1. warm-up/

Express 기반 CRUD 애플리케이션.  
MongoDB와 연동하여 사업 정보를 입력, 수정, 조회하는 기능이 구현되어 있습니다.

````

warm-up/
├── models/
│   └── business.js         # 사업 정보 스키마 (Mongoose)
├── public/
│   └── js/
│       └── input.js        # 클라이언트측 JS (폼 제출 처리)
├── views/
│   ├── input.ejs           # 사업 정보 입력 폼
│   ├── business\_list.ejs   # 사업 목록 페이지
│   └── business\_edit.ejs   # 사업 수정 페이지
├── app.js                  # 서버 진입점, DB 연결, 라우팅
├── package.json            # 의존성 정보
├── package-lock.json       # 락 파일

```

---

## 2. work_signup-login/

회원가입 및 로그인 기능 구현용 폴더입니다.  
기초 인증 로직 학습, 세션 기반 로그인 및 POST 요청 처리 방식 실습 예정입니다.

```

work\_signup-login/
├── models/                 # 사용자 스키마 정의
├── routes/                 # 인증 라우터 구성
├── views/                  # EJS 로그인/가입 템플릿
├── controllers/            # 인증 로직 처리 컨트롤러
├── app.js                  # 메인 서버 파일
├── package.json

```
