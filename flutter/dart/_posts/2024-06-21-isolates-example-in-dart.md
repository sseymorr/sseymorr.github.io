---
title: "[Dart] Dart에서 Isolates(아이솔레이트) 사용하기"
excerpt: "Dart에서 Isolates(아이솔레이트)를 사용하여 위치 정보를 가져오는 작업을 수행하기"
toc: true
toc_label: "index"
toc_sticky: true
tag:
comments: true
---
## 1️⃣ 개요
현재 진행하고 있는 프로젝트에서 1. 위치 정보를 가져옴 2. 가져온 위치정보를 Request로 API를 호출한 뒤 특정 화면에 진입하는 로직이 있음

그런데 이 위치 정보를 가져오는 과정이 오래 걸려서 ~~(사실 난 잘 모르겠지만 어쨌든)~~ 이 작업을 메인 UI 스레드가 아닌 백그라운드 스레드로 동작시키라는 업무를 지시 받음

**결론은 성능에 큰 차이는 없었고** (내가 보기엔 너무 작은 태스크라서 그런 것 같다) 체감상 더 느려진 것 같은 기분이었는데, 아직도 이 부분을 더 좋은 코드로 빠르게 동작시키려면 어떻게 해야하는 지 고민이 필요함... 

> 참고로 Dart에서 비동기 프로그래밍에 관한 포스팅은 [여기를 클릭](https://sseymorr.github.io/flutter/dart/concurrency-in-dart-1/)하시면 확인할 수 있음!

## 2️⃣ pubspec.yaml 세팅
위치 정보를 가져오기 위해 geolocator 라이브러리를 사용 [Flutter geolocator](https://pub.dev/packages/geolocator)  
```yaml
dependencies:
    geolocator: ^12.0.0
```

## 3️⃣ 아이솔레이트 클래스 생성
백그라운드 스레드 작업을 수행해야하는 화면에서 private으로 아이솔레이트 클래스를 생성  
```dart
class _IsolateData {
    final RootIsolateToken token;
    final Function fuction;
    final SendPort answerPort;

    _IsolateData({
        required this.token,
        required this.function,
        required this.answerPort,
    })
}

Future<dynamic> computeIsolate(Future Function() function) async {
  final receivePort = ReceivePort();
  var rootToken = RootIsolateToken.instance!;
  await Isolate.spawn<_IsolateData>(
    _isolateEntry,
    _IsolateData(
      token: rootToken,
      function: function,
      answerPort: receivePort.sendPort,
    ),
  );
  return await receivePort.first;
}

void _isolateEntry(_IsolateData isolateData) async {
  BackgroundIsolateBinaryMessenger.ensureInitialized(isolateData.token);
  final answer = await isolateData.function();
  isolateData.answerPort.send(answer);
}
```
  
## 4️⃣ 아이솔레이트 작업 수행
```dart
Position position = await computeIsolate(_getCurrentPosition);

static Future<Position> _getCurrentPosition() async {
    final position = await LocationManager.instance.getCurrentPosition();
    return position;
}
```  
```dart
class LocationManager {
  LocationManager._();

  static final LocationManager _instance = LocationManager._();

  static LocationManager get instance => _instance;

  Future<bool> checkLocationPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return false;
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.always ||
        permission == LocationPermission.whileInUse) {
      return true;
    } else {
      return false;
    }
  }

  Future<Position> getCurrentPosition() async {
    return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.best);
  }
}
```

## 🔗 참고 링크
- [Flutter Isolates: The BackgroundIsolateBinaryMessenger.instance value is invalid until BackgroundIsolateBinaryMessenger.ensureInitialized is executed](https://stackoverflow.com/questions/75950122/flutter-isolates-the-backgroundisolatebinarymessenger-instance-value-is-invalid)