var store = [{
        "title": "[Flutter Web] 이미지를 받아와 크롭하기",
        "excerpt":"1️⃣ 목표 flutter 라이브러리를 사용하여 파일 시스템에서 이미지를 받아온 뒤 이미지를 자른 후 화면에 노출시키기 2️⃣ 사용한 라이브러리 image_picker_web: https://pub.dev/packages/image_picker_web image_cropper: https://pub.dev/packages/image_cropper 3️⃣ 기본 세팅 1. pubspec.yaml 1 2 3 4 5 6 dependencies: flutter: sdk: flutter image_picker_web: ^3.1.1 http: ^0.13.5 image_cropper: ^3.0.1 2. web/index.html 1 2 3 4 5...","categories": ["flutter","solutions"],
        "tags": [],
        "url": "/flutter/solutions/image-crop-in-flutter-web/",
        "teaser": null
      },{
        "title": "[GitHub Pages] minimal-mistakes 테마에서 카테고라이징 하기",
        "excerpt":"1️⃣ 목표 jekyll minimal-mistakes 테마에서 이중으로 카테고리를 분류해보기 이렇게! 😀 2️⃣ 기본 세팅 1. index.html 1 2 3 4 5 6 --- layout: home author_profile: true sidebar: nav: \"sidebar-category\" ⬅️ 추가된 부분 --- 2. _config.yml 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15...","categories": ["git","solutions"],
        "tags": ["minimal-mistakes","GitHubPages"],
        "url": "/git/solutions/categorize-in-minimal-mistakes/",
        "teaser": null
      },{
        "title": "[Xcode] 개발용 인증서를 만들고 실제 기기에서 테스트 해보기",
        "excerpt":"안드로이드 개발해본 사람은 알겠지만 안드로이드 네이티브는 실제 기기를 통해 테스트하며 디버깅하는 과정이 매우 간단함 그냥 컴퓨터에 폰을 연결하면 끝 👍 안드로이드 스튜디오가 알아서 기기를 인식하기 때문에 코드를 바로 해당 기기에서 실행할 수 있음 그런데 ios는 안드로이드처럼 그냥 컴퓨터에 기기 연결해서 바로바로 디버깅을 할 수 없음 처음엔 이게 너무 당황스러웠음... “아니...","categories": ["ios","xcode"],
        "tags": ["xcode","앱 배포"],
        "url": "/ios/xcode/xcode-development-certificate/",
        "teaser": null
      },{
        "title": "[Dart] Dart의 비동기 프로그래밍",
        "excerpt":"지금 하고 있는 프로젝트에서 백그라운드에서 일정 시간마다 위치 정보를 가져와 API를 호출하는 기능을 구현해야 하는데 일단 “돌아가게만 해보자!” 하는 심정으로 있는 써드 파티 라이브러리는 다 적용해봤단 말임? 근데 마땅한 해결책이 나오지 않아서 답답해 미치겠는 와중에 공부하는 겸 일단 비동기부터 정리하는 게 낫겠다 싶어서 공식 문서부터 차근차근 읽어보기로 함 잘못된 부분은...","categories": ["flutter","dart"],
        "tags": [],
        "url": "/flutter/dart/concurrency-in-dart-1/",
        "teaser": null
      },{
        "title": "[Dart] Dart에서 Isolates(아이솔레이트) 사용하기",
        "excerpt":"1️⃣ 개요 현재 진행하고 있는 프로젝트에서 1. 위치 정보를 가져옴 2. 가져온 위치정보를 Request로 API를 호출한 뒤 특정 화면에 진입하는 로직이 있음 그런데 이 위치 정보를 가져오는 과정이 오래 걸려서 (사실 난 잘 모르겠지만 어쨌든) 이 작업을 메인 UI 스레드가 아닌 백그라운드 스레드로 동작시키라는 업무를 지시 받음 결론은 성능에 큰...","categories": ["flutter","dart"],
        "tags": [],
        "url": "/flutter/dart/isolates-example-in-dart/",
        "teaser": null
      },{
        "title": "[Flutter] Execution failed for task ':app:compileDebugKotlin' 에러 해결",
        "excerpt":"Flutter 프로젝트를 빌드하다보면 가끔씩 코틀린 컴파일 관련 오류를 만나게 된다. 1. build.gradle에서 코틀린 버전 바꾸기 일단 오류 위의 로그를 살펴보면 이런 오류를 확인할 수 있음 Class ‘kotlin.Unit’ was compiled with an incompatible version of Kotlin. The binary version of its metadata is 1.9.0, expected version is 1.7.1. 코틀린 버전을 1.9.0으로...","categories": ["flutter","errors"],
        "tags": [],
        "url": "/flutter/errors/complieDebugKotlin-error/",
        "teaser": null
      },{
        "title": "[Xcode] 배포용 인증서를 만들고 앱스토어에 앱 배포하기",
        "excerpt":"이전에 Xcode에서 배포용 인증서와 관련한 포스팅을 작성했었는데 최근에 진행한 프로젝트의 앱 배포를 드디어 진행하게 되어서 배포용 인증서와 관련된 포스팅을 작성해보려고 한다! 실제 앱을 배포하는 과정을 제외하면 개발용 인증서를 만드는 방법과 비슷함 1️⃣ 배포용 인증서 만들기 1. CSR 파일 만들기 이 부분은 이전에 배포용 인증서 포스팅에서 언급했으니 참고해서 만드시면 됨 2....","categories": ["ios","xcode"],
        "tags": ["xcode","앱 배포"],
        "url": "/ios/xcode/xcode-distribution-certificate/",
        "teaser": null
      },{
        "title": "[Flutter] java.lang.RuntimeException: Unknown feature SUPPRESS_ERROR_PAGE 에러 해결",
        "excerpt":"프로젝트에서 웹뷰를 쓸 일이 있어 웹뷰 관련 라이브러리를 사용중인데, 잘 빌드되던 프로젝트가 앱이 시작될 때 멈추면서 java.lang.RuntimeException: Unknown feature SUPPRESS_ERROR_PAGE 오류를 뱉고 벽돌이 되는 오류 발생 1. build.gradle에서 configurations 추가하기 1 2 3 4 5 6 7 allprojects { configurations.all { resolutionStrategy { force 'androidx.webkit:webkit:1.8.0' } } } 2. pubspec.yaml에서...","categories": ["flutter","errors"],
        "tags": [],
        "url": "/flutter/errors/suppress-error-page/",
        "teaser": null
      },{
        "title": "[Flutter] Riverpod으로 상태를 관리하는 간단한 예제",
        "excerpt":"목표 10초마다 위치 정보를 받아오는 provider를 만들고, 위치 정보가 바뀌면 특정 화면 UI에 경도와 위도 값을 표시해주고 싶음 Riverpod Flutter/Dart를 위한 반응형 캐싱 프레임워크(Reactive caching framework)로 getX, provider 등과 같은 플러터의 상태 관리 패키지 중 하나 프로젝트 세팅 라이브러리 세팅 pubspec.yaml 1 2 3 dependencies: flutter_riverpod: ^2.5.1 geolocator: ^12.0.0 riverpod...","categories": ["flutter","solutions"],
        "tags": [],
        "url": "/flutter/solutions/riverpod-example-1/",
        "teaser": null
      },{
        "title": "[iOS] 앱 스토어 심사 리젝 (Guideline 1.2 - Safety - User-Generated Content) 대응",
        "excerpt":"앱이 심사에서 거부됐다 ㅠ 애플이 리젝 사유를 설명하면서 스크린샷을 같이 줬는데, 술 사진이 올라온 채팅방 캡쳐였다. 이게 뭐가 문젠가 싶어서 검색해보니 대략적으로 신고 기능을 추가해야한다는 얘기였는데, 앱에는 사용자를 개별로 차단할 수 있는 기능이 이미 구현된 상태였다. 이미 우리는 사용자를 차단할 수 있는 기능이 있다는 것을 애플에게 어필해서 어떻게든 심사에 넘겨볼까...","categories": ["ios","solutions"],
        "tags": [],
        "url": "/ios/solutions/app-store-rejected-safety/",
        "teaser": null
      },{
        "title": "[GitHub Pages] minimal-mistakes 테마에서 코드블럭을 라이트 모드로 바꾸기",
        "excerpt":"Minimal-mistakes로 깃헙 블로그를 만들면 default 테마가 적용되는데, 이 테마의 코드 블럭 스타일은 기본적으로 다크모드다… 하지만 나는 다크모드를 별로 좋아하지 않기 때문에 코드 블럭 스타일을 라이트모드로 바꾸기로 했다 🤩 1️⃣ 코드 블럭 스타일 바꾸기 _syntax.scss 하기 코드를 통째로 복사해서 _syntax.scss 파일에 붙여넣기 하면 된다! 바꾸고 싶은 스타일이 있으면 여기서 커스텀해서 사용하시길...","categories": ["git","solutions"],
        "tags": ["minimal-mistakes","GitHubPages"],
        "url": "/git/solutions/codeblock-style-in-minimal-mistakes/",
        "teaser": null
      }]
