---
title: "[Flutter] java.lang.RuntimeException: Unknown feature SUPPRESS_ERROR_PAGE 에러 해결"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - flutter
    - errors
tag:
comments: true
---

프로젝트에서 웹뷰를 쓸 일이 있어 웹뷰 관련 라이브러리를 사용중인데, 잘 빌드되던 프로젝트가 앱이 시작될 때 멈추면서 **java.lang.RuntimeException: Unknown feature SUPPRESS_ERROR_PAGE** 오류를 뱉고 벽돌이 되는 오류 발생

## 1. `build.gradle`에서 configurations 추가하기
```gradle
allprojects {
    configurations.all {
        resolutionStrategy {
            force 'androidx.webkit:webkit:1.8.0'
        }
    }
}
```

## 2. `pubspec.yaml`에서 웹뷰 라이브러리 오버라이딩 하기
`dependencies:`에 있던 `webview_flutter_android` 라이브러리를 따로 빼서 `dependency_overrides:`에 추가하기
```yaml
dependency_overrides:
  webview_flutter_android: 3.16.1
```

## 3. 오류 해결 :)

## 🔗 참고 링크
- [Android issue: Unknown feature SUPPRESS_ERROR_PAGE, webview not displaying at all](https://github.com/pichillilorenzo/flutter_inappwebview/issues/2150)
