---
title: "[Xcode] 개발용 인증서를 만들고 실제 기기에서 테스트 해보기"
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
<p align="center"><img width=300 height=300 src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/2f7c3653-d46e-4c4c-8042-15d4ee3a3a15"></p>

안드로이드 개발해본 사람은 알겠지만 안드로이드 네이티브는 실제 기기를 통해 테스트하며 디버깅하는 과정이 매우 간단함

그냥 컴퓨터에 폰을 연결하면 끝 👍  
안드로이드 스튜디오가 알아서 기기를 인식하기 때문에 코드를 바로 해당 기기에서 실행할 수 있음

<span style="font-size:150%">**그런데**</span> ios는 안드로이드처럼 그냥 컴퓨터에 기기 연결해서 바로바로 디버깅을 할 수 없음

<center>처음엔 이게 너무 당황스러웠음... </center>
> "아니 고작 디버깅 하나 하겠다는데 이렇게까지 까다로워야 하나?"

싶겠지만... 일단 애플은 개발 중인 앱이더라도 이 앱의 안전성이 증명된 후 인증된 기기에서만 실행이 가능하다는 것만 염두에 두고 시작해보자!

## 1️⃣ 필요한 준비물
**<span style="background-color:yellow">1. CSR</span>**
- 애플에서 발급해주는 개발자 인증서 
- 인증서를 발급받기 위해 필요한 일종의 자격 증명  

📌 참고: 이 파일을 통해 인증서를 만들어 keychain access에 저장하게 되면 공개키 - 개인 키 쌍이 자동으로 생성되는데 이 개인키는 개발하는 개발자들끼리 공유하여 사용하게 됨 (개인 키가 없으면 인증서 사용 불가)
{: .notice--primary}

**<span style="background-color:yellow">2. 인증서</span>**
- 내가 만드는 앱의 안전성과 신뢰성이 보장됨을 증명하는 애플로부터 받는 인증서
- CSR을 통해 만들 수 있음

>이 단계에서 "음? 그럼 이제 앱이 빌드되겠지?" 라고 생각하면 오산이고요

아까 안드로이드는 **아무 기기**나 컴퓨터에 연결해서 바로 디버깅을 해볼 수 있다 했으니 iOS는 뭔가 다르겠죠?  
바로 **앱을 실행할 수 있는 기기 정보에 대한 파일이 따로 필요**함

**<span style="background-color:yellow">3. 프로비져닝 프로파일</span>**
- 개발 중인 앱이 실행될 수 있는 기기에 대한 정보(+α)가 들어있음
- 개발용으로 코드를 디버깅 할 때 **인증된 기기만** 앱을 실행시킬 수 있기 때문

---

ios 앱을 개발하는 데 있어서 필요한 인증서는 2가지!
1.  개발용 인증서: 개발 시 실제 기기에서 디버깅 할 때 필요
2.  배포용 인증서: 앱스토어에 앱을 배포할 때 필요
   

배포용 인증서에 관해서는 Archive와 함께 따로 정리할 거라 오늘은 일단 개발용 인증서로 코드를 빌드하고 실제 기기에서 테스트할 수 있도록 하는 것이 목표임!!!

## 2️⃣ Automatically manage signing이란?
Xcode에서 앱 서명은 `signing & capability` 탭에서 관리하는데, 이 탭에서 `Automatically manage signing` 체크 옵션부터 확인해보자.
   
이 옵션을 활성화하면 위에 언급한 인증서와 프로파일을 <span style="color:red">Xcode가 자동으로 생성</span>해준다.

> "편리하고 좋은데 그냥 인증서 같은 거 만들지 말고 이 옵션을 적극 활용하면 안될까요?"

여러번 언급했지만 **실제 기기에서** 테스트해보고 싶으면 이 체크 옵션을 무조건 해제하고 따로 인증서를 꼭 만들어줘야 함  
**안 그러면 에뮬레이터에서만 돌아감... 😇** 

## 3️⃣ 개발용 인증서 만들기

✋ 애플 개발자 계정 만드는 과정은 생략
{: .notice--info}

### 1. CSR 파일 만들기
- `Keychain Access` → `Certificate Assistant` → `Request a Certificate From a Certificate Authority` 
    <img width="694" alt="Screenshot 2024-05-29 at 7 11 08 PM" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/0e7bf735-3b96-44c4-bdc7-cb908604c8eb">
- 이메일과 이름을 적고 `Saved to disk`와 `Let me specify key pair information` 옵션을 체크 활성화한 뒤 continue  
    <img width="634" alt="Screenshot 2024-05-29 at 16 45 50" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/c251da85-4637-4683-94cc-97606aa084b7">
    <img width="634" alt="Screenshot 2024-05-29 at 16 46 27" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/c9947596-8268-4b83-8d45-04592076ec05">

- CSR 파일 저장된 것 확인 `.CertificateSigningRequest`

### 2. 인증서 만들기
2가지 방법을 통해 만들 수 있는데, 개인적으로는 Xcode에서 연동된 계정을 통해 만드는 게 가장 확실한 방법 같다.  
모두 정리해놓을 거긴 하지만 **그냥 xcode에서 만드는 것이 정신 건강에 이롭다👍** 

#### 1) xcode에서 인증서 만들기
- `Xcode` → `Accounts` → 애플 개발자 계정으로 로그인  
    ![Screenshot 2024-05-29 at 14 49 17](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/b52ddf4a-b3a7-46a7-9e6c-8965b948e96c)  
- 좌측 하단 `+` 버튼 → `Apple Development` 클릭
    ![Screenshot 2024-05-29 at 14 51 55](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/d248ed12-7a9b-4b18-810c-de9203380b2a)  
    ![Screenshot 2024-05-29 at 14 53 16](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/35229249-38e8-443a-8e7d-bc1ea6cb6bdb)
- 애플 개발자 계정 → `Certificates, Identifiers & Profiles`에 새 인증서가 추가된 것을 확인
    ![photo_2024-05-29 19 24 16](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/034f5e74-acc7-437e-bd2d-8c577b00710d)

#### 2) 애플 개발자 사이트에서 인증서 만들기
- 애플 개발자 계정 → `Certificates, Identifiers & Profiles` → `+` 버튼 클릭
![photo_2024-05-29 19 24 24](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/17d31a7e-f072-4a43-8e98-cb4dc11d7398)

### 3. 프로비져닝 프로파일 설정하기

잘못된 정보가 있다면 언제든지 피드백 주세요:) 
포스팅 작성중 ... 