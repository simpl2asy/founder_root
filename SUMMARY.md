
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

