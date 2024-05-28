---
title: "[xcode] 개발용 인증서를 만들고 실제 기기에서 테스트 해보기"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - ios
    - xcode
tag:
comments: true
---

xcode로 개발하고 앱 배포를 하다 보면 인증서와 계속 씨름을 하게 되는데 매번 심사 빨리 넘기느라 급급해서 그동안 인증서 & 앱 서명과 관련해서 정리할 기회가 없었다. 

간단하게라도 정리해보기 위해 쓰는 글!

안드로이드 개발해본 사람은 알겠지만 안드로이드 네이티브는 디버깅이 쉽다.

그냥 컴퓨터에 폰을 연결하기만 하면 됨 👍

그러면 알아서 기기 인식까지 해주고 하여튼 고작 **빌드 하나** 하는 데 큰 수고를 들일 필요가 없다.

<span style="font-size:150%">**그런데**</span> ios는 안드로이드처럼 그냥 컴퓨터에 기기 연결해서 바로바로 디버깅을 할 수 있는 게 아님

처음엔 이게 너무 당황스러웠음... 
> 아니 고작 디버깅 하나 하겠다는데 이렇게까지 까다로워야 하나?

그렇다... 일단 러프하게 내가 이해할 수 있는 수준으로 정리하면 이렇다.

### 실제 기기로 xcode에서 빌드한 코드를 실행할 때 필요한 사항들
---
**<span style="background-color:yellow">1. CSR</span>**
- 애플에서 발급해주는 개발자 인증서 (인증서를 발급받기 위해 필요한 일종의 자격 증명)

**<span style="background-color:yellow">2. 인증서</span>**
- 내가 만드는 앱의 안정성과 신뢰성이 보장됨을 증명하는 애플로부터 받는 인증서
- CSR을 통해 만들어야 함

>이 단계에서 음? 그럼 이제 앱이 빌드되겠지? 라고 생각하면 오산이고요

**<span style="background-color:yellow">3. 프로비져닝 프로파일</span>**
- 개발 중인 앱이 실행될 수 있는 기기에 대한 정보가 들어있음
- 즉 개발용으로 코드를 디버깅 할 때조차 **인증된 기기만** 앱을 실행시킬 수 있음

---

ios 앱을 개발하는 데 있어서 필요한 인증서는 2가지다. 
1.  개발할 때 사용하는 인증서 - 개발용 인증서
2.  앱을 앱스토어에 배포할 때 사용하는 인증서 - 배포용 인증서
   

배포용 인증서에 관해서는 archive와 함께 따로 정리할 거라 오늘은 일단 개발용 인증서로 코드를 빌드하고 실제 기기에서 테스트할 수 있게 해보자!

### 🛠️ automatically manage signing?
`signing & capability` 탭에서 `automatically manage signing` 체크 옵션부터 확인해보자.

이게 뭐냐하면 위에 언급한 인증서와 프로파일을 <span style="color:red">xcode가 자동으로 생성</span>해준단 뜻이다.

> 편리하고 좋은데 그냥 인증서 같은 거 만들지 말고 이 옵션을 적극 활용하면 안될까요?

안된다... 실제 기기에서 테스트해보고 싶으면 이 체크 옵션을 무조건 해제하고 따로 인증서를 꼭 만들어줘야 함

**안 그러면 에뮬레이터에서만 돌아갑니다... 😇**

자 그럼 본격적으로 개발용 인증서를 만드는 과정을 살펴보자!

✋ 애플 개발자 계정 만드는 과정은 생략
{: .notice--info}

### 1️⃣ CSR 파일 만들기
- Keychain Access 접속하여 `Certificate Assistant` -> `Request a Certificate From a Certificate Authority` 선택
<img width="691" alt="Screenshot 2024-05-28 at 9 17 35 PM" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/22d73a9f-5334-45ef-831d-1f2c5a4a9dc3">

- 이메일과 이름을 적고 `Saved to disk`와 `Let me specify key pair information` 옵션을 체크 활성화한 뒤 continue

    <img width="639" alt="Screenshot 2024-05-28 at 9 20 49 PM" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/7175fb3d-38e7-41a7-a44d-d3c4da8a55db">
    <img width="634" alt="Screenshot 2024-05-28 at 9 21 11 PM" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/85628af1-699e-4a76-8a08-e314cb8ed401">

- CSR 파일 저장된 것 확인   
<img width="156" alt="Screenshot 2024-05-28 at 9 21 28 PM" src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/ecff7f3d-7969-470c-891d-4cd92364607d">

### 2️⃣ 인증서 만들기
크게 2가지 방법으로 만들 수 있는데, 개인적으로는 xcode에서 연동된 계정을 통해 만드는 게 가장 확실한 방법 같다. 
일단 여기서는 두 가지 방법을 모두 정리해놓을 거긴 하지만 **그냥 xcode에서 만드는 것이 정신 건강에 이롭다👍** 

#### 1. xcode에서 인증서 만들기

#### 2. 애플 개발자 사이트에서 만들기

### 3️⃣ 프로비져닝 프로파일 설정하기

잘못된 정보가 있다면 언제든지 피드백 주세요:) 
포스팅 작성중 ... 