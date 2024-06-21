---
title: "[Xcode] 배포용 인증서를 만들고 앱스토어에 앱 배포하기"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - ios
    - xcode
tag:
    - xcode
    - 앱 배포
comments: true
---
이전에 Xcode에서 [배포용 인증서와 관련한 포스팅](https://sseymorr.github.io/ios/xcode/xcode-development-certificate/)을 작성했었는데 최근에 진행한 프로젝트의 앱 배포를 드디어 진행하게 되어서 배포용 인증서와 관련된 포스팅을 작성해보려고 한다!

실제 앱을 배포하는 과정을 제외하면 개발용 인증서를 만드는 방법과 비슷함 

## 1️⃣ 배포용 인증서 만들기
### 1. CSR 파일 만들기
이 부분은 이전에 배포용 인증서 포스팅에서 언급했으니 참고해서 만드시면 됨
### 2. 인증서 만들기
xcode에서 만드는 방법과 직접 만드는 방법이 있는데, 개인적으로 xcode에서 만드는 방법을 선호하기 때문에 xcode에서 만드는 방법으로 설명해드리겠음
- `Xcode` → `Accounts` → 애플 개발자 계정으로 로그인  
    ![Screenshot 2024-05-29 at 14 49 17](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/b52ddf4a-b3a7-46a7-9e6c-8965b948e96c)  
- 좌측 하단 `+` 버튼 → `Apple Distribution` 클릭
    ![Screenshot 2024-05-29 at 14 51 55](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/d248ed12-7a9b-4b18-810c-de9203380b2a)  
    ![Screenshot 2024-06-21 at 10 28 08](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/0acfd401-3f1d-4f6f-80f2-6d8522d847f6)
- 애플 개발자 계정 → `Certificates, Identifiers & Profiles`에 새 인증서가 추가된 것을 확인
    ![Screenshot 2024-06-21 at 10 30 17](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/4c8287a8-2c49-4e95-b3cf-789321aedfff)

### 3. 프로비져닝 프로파일 설정하기
- `Profiles` 접속 → `+`버튼 → `App Store Connect` 체크 → `continue`
![Screenshot 2024-06-04 at 17 56 52](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/ed4181b2-c723-46f2-9c08-6624eafb2ce7)
- 만든 앱의 번들 id를 선택한 뒤 `continue`
![Screenshot 2024-06-04 at 17 57 04](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/ae73ff66-99f2-4fdc-b741-d0f15e59a2ac)
- 만들었던 인증서를 선택한 뒤 `continue`
![Screenshot 2024-06-04 at 17 57 23](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/3735f026-bd26-4969-bb43-4f903dbcc936)
- 프로파일 이름을 설정한 뒤 `generate`
![Screenshot 2024-06-04 at 18 02 19](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/18214c89-aaf9-492a-9d32-c1af90a73023)
- 만든 프로파일을 다운로드 받은 뒤 Xcode의 `signing & capability`에서 `Import Profile` → 다운로드 받은 프로파일을 선택하면 세팅 끝!
![Screenshot 2024-06-04 at 17 58 07](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/cc74f782-b0c2-40e1-ae31-a40479912ae6)

## 2️⃣ 앱스토어에 배포하기
### 1. 아카이브 하기
- xcode 중간 상단 `Recent` 기기가 `Any iOS Device (arm64)`인지 체크
![Screenshot 2024-06-21 at 10 47 09](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/6833a88d-dfa2-4e64-8233-7c5a5944f3b5)  
- 상단 `Product` → `Archive` 클릭  
![Screenshot 2024-06-21 at 10 48 36](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/0f66d81f-bec8-4ec9-9c63-ad88b67cca53)
- 버전 확인 후 Distribute App
![Screenshot 2024-06-21 at 14 24 07](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/67a00373-1536-4527-b026-02fb115b4278)
- 테스트만 진행할 것이라면 `TestFlight Only` 옵션을, 앱스토어에 배포하고 싶다면 `App Store Connect` 옵션을 선택한 뒤 `Distribute` 
![Screenshot 2024-06-21 at 14 24 17](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/82866c94-f63b-4069-aa33-09274862e39f)

### 2. 테스트 플라이트에서 업데이트 기다리기
- 애플 개발자 계정으로 접속해 `App Store Connect` → `Apps` → `TestFlight`에서 업데이트 된 버전 빌드가 올라오길 기다리기   
  - 처음에는 빈 칸으로만 보이다가 한 5-7분 정도 기다리면 아카이브해서 올린 앱이 보여짐!
  - 테스트용으로만 올렸을 때는 `Testing`, 앱스토어 배포용으로 올렸을 때는 `Ready To Sumbit`으로 노출  

![Screenshot 2024-06-21 at 14 35 41](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/99763f7b-9426-44cc-8b34-8ed56f0a512c)

### 3. `Distribution`에서 앱 배포하기
- `iOS App` 우측 `+` 버튼 눌러 버전 입력하기
- `What's New in This Version`에 새로 업데이트된 내용 작성 
- `Save`한 뒤 `Release This Version` 클릭
![Screenshot 2024-06-05 at 09 20 42](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/29af2189-fd72-4bbc-a74e-55a34a8af7c7)

### 4. 앱 심사 기다리기
여기까지 따라왔다면 이젠 기다리기만 하면 된다!   
애플은 앱 심사가 구글보다 까다로워서 이제부터 물 떠다놓고 빌면 됨... 🙏

>피드백 댓글은 언제나 환영입니다 :) 