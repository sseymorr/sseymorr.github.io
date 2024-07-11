---
title: "[Flutter] Riverpod으로 상태를 관리하는 간단한 예제"
excerpt: "Riverpod provider를 사용해 10초마다 위치 정보를 받아와 화면에 업데이트하기"
toc: true
toc_label: "index"
toc_sticky: true
tag:
comments: true
---
## 목표
10초마다 위치 정보를 받아오는 provider를 만들고, 위치 정보가 바뀌면 특정 화면 UI에 경도와 위도 값을 표시해주고 싶음 

## Riverpod
Flutter/Dart를 위한 반응형 캐싱 프레임워크(Reactive caching framework)로 getX, provider 등과 같은 플러터의 상태 관리 패키지 중 하나

## 프로젝트 세팅
### 라이브러리 세팅 `pubspec.yaml`
```yaml
dependencies:
  flutter_riverpod: ^2.5.1
  geolocator: ^12.0.0
```

### riverpod 세팅
- riverpod provider을 사용하기 위해서는 앱의 루트를 `ProviderScope`로 감싸주어야 함 
 
```dart
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: MyApp()));
}
```
- 화면을 `ConsumerStatefulWidget`으로 감싸면 provider를 참조할 수 있도록 하는 `ref` 객체를 사용할 수 있게 됨  

```dart
class LocationInfoPage extends ConsumerStatefulWidget {
  const LocationInfoPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => LocationInfoState();
}

class LocationInfoState extends ConsumerState<LocationInfoPage> {
  @override
  Widget build(BuildContext context) {
    // 코드 작성...
  }
}
```

### provider 생성 `location_provider.dart`
- locationProvider를 전역으로 생성해 어디서든지 해당 provider를 참조할 수 있도록 함

```dart
final locationProvider = ChangeNotifierProvider<LocationProvider>((ref) {
  return LocationProvider();
});
```

## 전체 코드
### `main.dart`
```dart
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<MyApp> createState() => _MyAppState();
}

class _MyAppState extends ConsumerState<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Location updated?',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const LocationInfoPage(),
    );
  }
}
```

### `location_provider.dart`
```dart
class LocationData {
  final double latitude;
  final double longitude;

  LocationData({required this.latitude, required this.longitude});
}

final locationProvider = ChangeNotifierProvider<LocationProvider>((ref) {
  return LocationProvider();
});

class LocationProvider extends ChangeNotifier {
  LocationData? _currentLocation;

  LocationData? get currentLocation => _currentLocation;

  late Timer locationTimer;

  // 위치 업데이트 메서드
  Future<void> updateLocation() async {
    try {
      // 10초마다 위치 업데이트
      locationTimer =
          Timer.periodic(const Duration(seconds: 10), (timer) async {
        debugPrint("==== locationProvider... updateLocation ====");

        Position position = await Geolocator.getCurrentPosition();
        _currentLocation = LocationData(
            latitude: position.latitude, longitude: position.longitude);

        notifyListeners(); // Provider에게 상태 변경을 알림
      });
    } catch (e) {
      debugPrint('Error updating location: $e');
    }
  }

  @override
  void dispose() {
    super.dispose();
    locationTimer.cancel();
  }
}
```

### `location_info.dart`
```dart
class LocationInfoPage extends ConsumerStatefulWidget {
  const LocationInfoPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => LocationInfoState();
}

class LocationInfoState extends ConsumerState<LocationInfoPage> {
  @override
  void initState() {
    super.initState();
    requestLocationPermission();
  }

  // 위치 권한 받아오기
  Future<void> requestLocationPermission() async {
    LocationPermission permission;

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        debugPrint("location permission is denied.");
        return;
      } else {
        ref.read(locationProvider).updateLocation();
      }
    } else {
      ref.read(locationProvider).updateLocation();
    }
  }

  @override
  Widget build(BuildContext context) {
    final locationData = ref.watch(locationProvider); // provider의 값을 얻어 변화를 모니터링

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
                "🏃‍♀️ latitude: ${locationData.currentLocation?.latitude ?? ''}"),
            Text(
                "🏃‍♀️ longitude: ${locationData.currentLocation?.longitude ?? ''}"),
          ],
        ),
      ),
    );
  }
}
```

## 결과물
<p align="center"><img src="https://github.com/sseymorr/sseymorr.github.io/assets/171218718/f2a91076-a259-4a9a-abe5-14373cd005b9"></p>