# Summary

## 1. 프로젝트 소개
- [README](README.md)  
  → 프로젝트 개요, 실행 방법, 기술 스택 등 설명

## 2. 서버 구성

- [app.js](app.js)  
  → 서버 설정, 미들웨어 등록, MongoDB 연결, 라우팅 연결 등 핵심 로직 포함

- [package.json](package.json)  
  → 프로젝트 의존성 및 실행 스크립트 정의

- [package-lock.json](package-lock.json)  
  → 설치된 패키지 버전 기록 (자동 생성 파일)

## 3. 데이터 모델

- [models/business.js](models/business.js)  
  → Mongoose 스키마 정의 및 데이터 구조 설계

## 4. 클라이언트 화면 (View & Script)

- [views/input.ejs](views/input.ejs)  
  → 사업 정보 등록 폼 페이지 (입력화면)

- [views/business_edit.ejs](views/business_edit.ejs)  
  → 사업 정보 수정 폼 페이지

- [views/business_list.ejs](views/business_list.ejs)  
  → 전체 사업 리스트 출력 화면

- [public/js/input.js](public/js/input.js)  
  → 클라이언트 측 스크립트, 폼 제출 이벤트 처리
