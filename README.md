# 땡그랑
![땡그랑_title-002 (2)](https://github.com/BaeDongWoo/clink_web/assets/114900672/7dfb2a70-1d87-406d-b05f-f0fb3879adb1)

### 땡그랑이란?

> mz세대를 위한 챌린지형 저축 서비스

### 📅개발 기간

> 2023.06.26~2023.08.18

### 😄개발 인원

> 4인

### 🔨기술 스택

---

<div align=left>

### ✔️Frond-End

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">

<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> 

### ✔️Back-End

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

  <br>

### ✔️DB

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
</div>

### 프로젝트 기획 배경

코로나 시대를 겪으면서 자신의 경험가치를 위한 다양한 소비전략(무지출 챌린지, 거지방, 디지털 폐지줍기 등)이 유행하고 있습니다.
땡그랑은 자신만의 목표금액을 설정하고 일일 단위로 해당 목표에 도전하며 자동 저축하는 챌린지형 저축 서비스를 제공합니다.
> ![image (2)](https://github.com/BaeDongWoo/clink_web/assets/114900672/e96a5f3a-a535-441c-a733-fee90ba8e3f0)

### 프로젝트 상세 

#### 💡주요 기능
> 1. 사용자는 저축계좌와 출금계좌, 일일 목표 금액을 설정합니다.
> 2. 목표 금액보다 적은 금액을 사용했을 때에는 챌린지 성공 -> 차액 저축
> 3. 목표 금액보다 많은 금액을 사용했을 때에는 챌린지 실패
> 4. 스트릭과 그래프등 시각 자료를 통해 자신의 소비습관 확인
> 5. 커뮤니티를 통해 금융 뉴스 정보 확인 및 다른 사용자들과 정보 공유

#### 📓서비스 화면

![땡그랑_화면-001](https://github.com/BaeDongWoo/clink_web/assets/114900672/4f277b65-2d7a-4868-9b6e-4be7c664878f)

#### 구현 상세
<h4>시스템 구조</h4>

- 총 4대의 AWS EC2를 사용하여 각각 젠킨스, DB, 스프링 부트, 리액트 서버로 활용했습니다.
- 스프링 부트의 경우 GitHub를 통해 배포하게 되면 젠킨스와 Docker를 사용해 구축한 파이프라인을 통해 스프링 부트 서버로 자동으로 배포하도록 구현했습니다.

![땡그랑_화면-004](https://github.com/BaeDongWoo/clink_web/assets/114900672/c72dbbe2-9143-45b8-a948-274dbba75be9)

<h4>JWT 토큰</h4>

- 사용자 로그인 시 JWT 토큰을 발급
- 서버 호출시 토큰을 사용해 사용자 인증

<h4>Crawling을 통한 실시간 뉴스 정보</h4>

- 오픈 API에서 제공하지 않는 카테고리와 이미지를 직접 가져오고, 실시간으로 변하는 뉴스 정보를 위해 Jsoup 라이브러리를 사용해 뉴스 정보를 직접 크롤링해 정보를 제공합니다.
  
![image (1)](https://github.com/BaeDongWoo/clink_web/assets/114900672/3cf39d10-2925-4ba7-a453-e959b0b4fd59)

<h4>ChatGPT 활용</h4>

1. 뉴스 정보를 크롤링 할때 발생하는 중복 내용을 필터링 하기 위해 자연어 처리 모델인 ChatGPT API를 활용 했습니다.
   - 총 20개의 뉴스 정보를 가져오고 제목을 비교해 최대한 서로 다른 10개의 뉴스 정보를 필터링

2. 구현 시 테스트를 위해 필요한 거래내역을 만들기 위해 가상의 인물 정보와 JSON형식의 반환 타입이 포함된 프롬프트를 작성하고 ChatGPT API를 통해 데이터를 생성했습니다.

<h4>Scheduler 사용</h4>

스프링 부트의 Scheduler를 사용해 정해진 시간마다 데이터를 생성합니다. 

1. 뉴스 정보의 경우 1시간 마다 새로운 뉴스 정보를 크롤링해 저장하고 기존의 정보를 삭제합니다.
2. 매일 오전6시 새로운 가상의 데이터를 생성하고 데이터 베이스에 저장하고, 챌린지 달성 여부를 저장하고 초기화 합니다.

### 서비스 영상

#### 신규 회원

https://github.com/BaeDongWoo/clink_web/assets/114900672/be2aff7b-9748-40c8-b2a9-3f6e4104001a

#### 신규 회원 등록

https://github.com/BaeDongWoo/clink_web/assets/114900672/e23f7445-9fe8-4c87-9368-7bbcb70665ba

#### 기존 회원

https://github.com/BaeDongWoo/clink_web/assets/114900672/88a24486-a622-4757-b5de-61537e1a3833
