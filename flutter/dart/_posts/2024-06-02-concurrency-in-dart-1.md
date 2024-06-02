---
title: "[Dart] Dart에서 비동기 프로그래밍 하기"
excerpt: "동시성에 관한 다트 공식 문서 번역글: async-await, Future, Stream, Isolates"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - flutter
    - dart
tag:
comments: true
---

<p align="center"><img src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/7c4352cd-e25f-4d4d-ac81-487b48ceb5d3"></p>



지금 하고 있는 프로젝트에서 백그라운드에서 일정 시간마다 위치 정보를 가져와 API를 호출하는 기능을 구현해야 하는데 일단 *"돌아가게만 해보자!"* 하는 심정으로 있는 써드 파티 라이브러리는 다 적용해봤단 말임? 

근데 마땅한 해결책이 나오지 않아서 답답해 미치겠는 와중에 공부하는 겸 일단 비동기부터 정리하는 게 낫겠다 싶어서 공식 문서부터 차근차근 읽어보기로 함 

잘못된 부분은 언제든지 피드백 댓글 남겨주세요! 

📌 원본 글: [Concurrency in Dart](https://dart.dev/language/concurrency)
{: .notice--info}
---
이 문서에서는 동시 프로그래밍이 어떻게 동작하는지, 다트에서 제공하는 비동기 API (`async-await`, `Future`, `Stream`)와 프로세스를 분리된 별도의 코어로 이동시킬 수 있는 `Isolates`를 다룸

모든 다트 코드는 isolate에서 실행되고 기본 isolate(main isolate)에서 시작해 개발자가 필요에 따라 백그라운드로 실행하고 싶은 작업을 worker isolate로 만들어 백그라운드 작업을 수행할 수 있음

<span style="background-color:#DCFFE4"> 이렇게 새 isolate를 생성하면 해당 isolate는 **1) 자체 메모리 2) 이벤트 루프**를 가지게 되는데, 이 **이벤트 루프**는 <u>다트에서 비동기 및 동시 프로그래밍을 가능하게 하는 핵심 요소</u>임! </span>

실용적인 예시를 보고 싶다면 [Asynchrous Support](https://dart.dev/language/async), [Isolates](https://dart.dev/language/isolates) 문서를 참고하면 됨~! (요 문서들도 정리할 예정)


# 1️⃣ 이벤트 루프 Event Loop
## 개념
- 개발자가 작성한 프로그램의 코드를 실행하고 이벤트를 실행하는 역할
- **Dart의 런타임 모델은 이 이벤트 루프에 기반**

## 동작 방식
- 모든 이벤트는 **이벤트 큐**에 저장됨
  - 이벤트의 예시: UI를 다시 그림 / 사용자가 화면을 터치 / 파일 입출력 등
- 앱은 이러한 이벤트들이 일어날 순서를 예측할 수 없기 때문에 이벤트들을 큐에 넣어놓고 큐에 들어온 **순서대로** 이벤트를 **하나씩** 처리

![Screenshot 2024-06-02 at 2 31 30 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/062c9d70-c257-4db0-a94c-86d2bf6dc232)

```dart
while (eventQueue.waitForEvent()) {
  eventQueue.processNextEvent();
}
```
## 이벤트 루프 모델의 동기적 특징
앞에서 설명한 동작 방식에 따르면 이벤트 루프 자체는 동기적이며 단일 스레드에서 돌아간다는 것을 알 수 있는데 **그렇지만...** 앱들은 동시에 여러가지 일을 처리해야 함  

<u>사용자가 어떤 버튼을 누르는 이벤트를 처리하는 동시에 http 요청들을 처리해야 하는 경우</u> 이런 비동기적인 처리를 위해서 Dart는 여러가지 비동기 API들을 제공함 ([Futures, Streams, and async-await](https://dart.dev/language/async))
→ 이벤트 루프의 '동기적 특징'을 해결하기 위해 설계됨 

```dart
http.get('https://example.com').then((response) {
  if (response.statusCode == 200) {
    print('Success!')'
  }  
}
```
- 이 코드는 그럼 어떻게 이벤트 루프에서 비동기적으로 동작하는 걸까?
  - 이벤트 루프에서 실행되면 `http.get`을 호출하고 즉시 `Future`을 반환
  - `Future`을 반환하면서 이벤트 루프에게 "http 요청이 처리될 때까지 `then()`에서 기다리라고 알려줌
  - http 요청이 처리되면 처리 결과를 인자로 전달하며 `then()` 내부에 있는 콜백 부분을 실행

![Screenshot 2024-06-02 at 2 43 37 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/73b7787f-8107-4a6d-aef7-3865bd59b9d7)

<center>⬆️ 이러한 모델이 일반적으로 다트에서 비동기 이벤트들을 처리하는 방식임 </center>

# 2️⃣ 비동기 프로그래밍 하는 법 (3가지)

## 1. Futures
- 값 또는 오류가 비동기 처리의 결과일 때 사용
- 아래 코드는 `Future<String>`은 비동기 처리의 결과로 `String`값이 나올 것이라는 걸 나타냄

```dart
Future<String> _readFileAsync(String filename) {
  final file = File(filename);

  // .readAsString() returns a Future.
  // .then() registers a callback to be executed when `readAsString` resolves.
  return file.readAsString().then((contents) {
    return contents.trim();
  });
}
```

## 2. The async-await syntax (async-await 구문)
- `async-await` 키워드는 비동기 함수를 정의하고 비동기의 결과를 사용하겠다고 선언하는 것을 말함
- 예1) 파일 입출력이 완료될 때까지 기다리는 동기적인 코드

```dart
const String filename = 'with_keys.json';

void main() {
  // Read some data.
  final fileData = _readFileSync();
  final jsonData = jsonDecode(fileData);

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}

String _readFileSync() {
  final file = File(filename);
  final contents = file.readAsStringSync();
  return contents.trim();
}
```

- 예2) 예1과 비슷한 코드이지만 비동기적으로 동작한다는 점에서 다름
  - `await` 키워드를 함수의 앞에 붙이면 `main()`함수는 파일 입출력이 일어나는 동안 이벤트 핸들러 같은 다른 Dart 코드들이 실행될 수 있도록 함
  - `await`는 `_readFileAsync()`의 결과로서 리턴 받은 `Future<String>`을 `String`으로 변환시킬 수 있기 때문에 코드에서 contents는 암시적으로 `String`
  - Dart 코드는 `readAsString()`이 런타임 혹은 OS에서 Dart가 아닌 코드를 실행하는 동안 일시 정지 → `readAsString()`이 값을 리턴하면 Dart 코드는 다시 시작  

✏️ `await` 키워드는 함수의 바디 이전에 `async` 키워드를 붙여줘야 동작함
{: .notice--info}


- <span style="color:red"> `await`가 붙은 메소드의 작업이 이뤄질 때 해당 줄에서 다트 코드는 중단되지만 사용자가 버튼을 누르는 등의 이벤트 핸들러 같은 것들은 CPU가 제어권을 가지고 처리할 수 있음 </span>

```dart
const String filename = 'with_keys.json';

void main() async {
  // Read some data.
  final fileData = await _readFileAsync();
  final jsonData = jsonDecode(fileData);

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}

Future<String> _readFileAsync() async {
  final file = File(filename);
  final contents = await file.readAsString();
  return contents.trim();
}
```
  
![Screenshot 2024-06-02 at 4 19 51 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/c6f43188-4816-42a8-80cf-0b5b55b9f6a3)

## 3. Streams
- 스트림의 형태로 비동기를 지원
- 스트림은 미래에 값들을 제공하며 반복적으로 시간에 걸쳐 값을 제공
  - 예를 들어 시간의 흐름에 따라 일련의 정수 값을 제공하는 약속은 `Stream<Int>`의 타입을 가짐
- `Stream.periodic()`으로 생성된 스트림이 반복적으로 정수 값을 매 초마다 만들어내는 코드

```dart
Stream<int> stream = Stream.periodic(const Duration(seconds: 1), (i) => i * i);
```

### await-for & yield
- 새로운 값이 제공될 때마다 반복문의 순차적인 `Iteration` 실행하는 for문의 한 종류
- 스트림에서 값을 반복적으로 뽑아내어 사용
- `yield`는 스트림의 값을 반환하는 함수에서 `return` 대신에 사용

```dart
Stream<int> sumStream(Stream<int> stream) async* {
  var sum = 0;
  await for (final value in stream) {
    yield sum += value;
  }
}
```

🔗 `async-await`, `Streams`, `Futures`과 같은 비동기 키워드들에 대해 더 알고 싶다면 [Asynchronous Programming Codelab](https://dart.dev/codelabs/async-await)
{: .notice--info}

# 3️⃣ 아이솔레이트 Isolates
- 다트는 앞에서 언급했던 비동기 API들에 더해서 isolates를 통해서도 비동기를 지원

## 기존의 멀티스레딩
- 현대에 나오는 기기들은 대부분 멀티코어 CPU를 제공하기 때문에 이 이점을 극대화하기 위해서 개발자는 동시에 실행되는 공유 메모리 스레드를 사용함 
  - 그러나 이러한 **상태를 공유하는** 동시성은 경쟁상태(race condition)를 유발할 가능성이 있고 코드도 복잡해진다는 단점이 있음

## 특징
- 이러한 기존의 멀티스레딩의 단점을 완화하고자 Dart는 isolates를 통해 여러개의 독립적인 태스크를 수행
- 아이솔레이트는 일종의 스레드 혹은 프로세스 같은 개념이지만 **각자의 메모리를 가지면서** 이벤트 루프를 실행하는 단일 스레드
- 각각의 아이솔레이트는 <u>각각의</u> 전역 필드를 가짐: 아이솔레이트에서는 어떠한 필드도 다른 아이솔레이트들에 접근할 수 없음을 보장
  - 아이솔레이트간 공유하는 필드가 없으므로 `Mutexes or lock`, `Data races` 같은 문제들이 일어날 가능성이 적어짐
  - 그러나 **아이솔레이트가 경쟁상태를 완전히 방지할 수 있는 것은 아님**
- 각각의 아이솔레이트는 `Message passing`을 통해서만 서로 소통할 수 있음

🔗 동시성 모델에 대한 정보를 더 얻고 싶다면 [Actor Mode](https://en.wikipedia.org/wiki/Actor_model)에 대한 문서를 참고
{: .notice--info}

⚠️ 오로지 다트 네이티브에서만 isolates를 사용할 수 있음. 다트 웹 플랫폼에서는 웹 동시성을 살펴봐야 함 
{: .notice--warning}

## 메인 아이솔레이트 The Main Isolate
- 대부분의 경우 개발자는 아이솔레이트에 대해서 생각할 필요가 없음
  - 디폴트로 다트 프로그램은 메인 아이솔레이트에서 돌아가기 때문: 프로그램이 시작되어 실행됨 (하나의 아이솔레이트로 구성된 프로그램도 원활하게 동작할 수 있음)

![Screenshot 2024-06-02 at 4 42 20 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/dc2169fc-712e-4c3e-b86c-91c570d2990f)

- 다음 줄의 코드를 실행하기 전에 앱들은 비동기 작업이 완료될 때까지 기다리기 위해서 `async-await`를 사용
- 잘 동작하는 앱은 빠르게 시작하여 가능한 한 빠르게 이벤트 루프에 도달하고 이벤트 큐에 있는 이벤트를 빠르게 처리하며 필요한 경우 비동기 작업을 수행

## 아이솔레이트의 생명주기 The isolate life cycle
- 모든 아이솔레이트들은 `main()`과 같은 일부 다트 코드를 실행함으로써 시작
  - `main()`은 사용자의 입력이나 파일 입출력과 같은 이벤트에 반응하기 위해 일부 이벤트 리스너들을 등록
  - `main()`이 리턴될 때 **기본 아이솔레이트(메인 아이솔레이트)는 프로그램이 종료될 때까지 유지**되며 이벤트 루프에서 이벤트를 처리

![Screenshot 2024-06-02 at 4 49 55 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/c12ab486-9585-440d-aad9-84705da05d07)

## 이벤트 처리하기 Event handling
- 앱에서 메인 아이솔레이트의 이벤트 큐는 UI를 다시 그리라는 요청, 탭 등의 이벤트를 포함할 수 있음
- 이벤트 루프는 큐에서 이벤트를 먼저 들어온 순서대로 처리

![Screenshot 2024-06-02 at 4 54 43 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/75964064-321f-440e-b4ff-841e3873a1cc)

### 단일 아이솔레이트(메인 아이솔레이트)만 사용할 때 나타날 수 있는 문제점
- 이벤트 처리는 `main()`이 리턴된 뒤 메인 아이솔레이트에서 일어남
  - 아래 그림에서 `main()`이 리턴된 다음에 메인 아이솔레이트는 첫번째 repaint 이벤트 → 탭 이벤트 → repaint 이벤트를 처리
- **만약 특정 작업이 너무 오래 걸린다면** 앱은 응답하지 않을 수도 있음
  - 예를 들어 탭을 처리하는 작업이 늦어지면 뒤에 있는 이벤트들이 모두 늦게 처리됨 → 앱 애니메이션이 끊긴다거나 앱이 멈춘 것처럼 보일 수 있음
- <span style="background-color:#DCFFE4">✏️ 클라이언트 앱에서 동기 작업이 너무 오래 수행되면 단일 아이솔레이트만 사용했을 때 앱이 반응이 없거나 애니메이션 끊김 현상이 나타날 수 있음</span>

![Screenshot 2024-06-02 at 4 59 06 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/37a205f4-ccfe-423c-a538-1c36551f8cab)

## 백그라운드 아이솔레이트 Background workers
- 앱이 너무 오래 걸리는 작업(예: 사이즈가 큰 json 파일을 파싱)으로 인해 무반응 상태가 될 가능성이 있다면 해당 작업을 백그라운드 worker라고 불리는 worker 아이솔레이트에게 넘길 수 있음
- 대부분의 경우 그림과 같이 간단한 worker 아이솔레이트를 생성하여 계산을 수행하고 종료
- worker 아이솔레이트는 종료될 때 메세지를 통해 결과를 반환

![Screenshot 2024-06-02 at 5 04 44 PM](https://github.com/sseymorr/sseymorr.github.io/assets/169756711/3c516e33-6fb5-44e5-9e5a-aad82308b516)

- worker 아이솔레이트는 파일 입출력, 타이머 설정과 같은 작업들을 수행
- 자기만의 메모리를 가지며 이 메모리는 메인 아이솔레이트와 공유될 수 없음
  - worker 아이솔레이트가 작업을 수행하거나 중단될 때 메인 아이솔레이트에 영향을 주지 않음 

## 아이솔레이트 사용하기 (2가지)
### 1. `Isolate.run()`  
- 별도의 스레드에서 단일 계산을 수행할 때 사용
- 새로 생성된 아이솔레이트가 실행할 콜백이 인자로 전달

```dart
int slowFib(int n) => n <= 1 ? 1 : slowFib(n - 1) + slowFib(n - 2);

// Compute without blocking current isolate.
void fib40() async {
  var result = await Isolate.run(() => slowFib(40));
  print('Fib(40) = $result');
}
```

### 2. `Isolaste.spawn()`
- 여러 메시지를 처리해야 되는 경우 / 백그라운드 worker을 생성할 때 사용

📌 작업을 장기 수행하는 아이솔레이트에 관해서는 문서 참고: [Isolates](https://dart.dev/language/isolates)
{: .notice--info}

#### 성능 최적화와 아이솔레이트 그룹 
- 아이솔레이트가 `Isolate.spawn()`을 호출할 때, 두 아이솔레이트는 동일한 실행 가능한 코드를 가지며 동일한 아이솔레이트 그룹에 속함
  - <u>다트 코드가 컴파일될 때 `Isolate.spawn(callback)`에서 callback에 해당하는 메소드는 이미 메모리의 코드 영역에 로드가 된 상태이고 새로 생성된 아이솔레이트는 이 로드된 메소드를 호출</u>
  -  → 아이솔레이트 그룹을 사용하면 코드 공유와 같은 성능 최적화가 가능
-  `Isolate.exit()`는 아이솔레이트가 동일한 아이솔레이트 그룹에 있을 때만 작동

> "아이솔레이트는 각각의 메모리를 가진다고 했으면서 코드를 공유한다는 게 이게 뭔 소리야?" 싶었는데 Dart 코드가 컴파일될 때 모든 함수와 클래스가 메모리의 코드 영역에 로드되고, `Isolate.spawn()`를 통해 만들어진 새 아이솔레이트는 이 코드 영역에 로드된 메소드를 사용한다는 뜻이었음. **성능 최적화의 측면에서 아이솔레이트 그룹이라고 표현할 뿐 메모리 자체를 공유한다는 뜻이 아님.**

#### `Isolate.spawnUri()`
- URI에 있는 코드의 복사본을 사용하여 새로운 아이솔레이트를 생성
- 이미 메모리에 로드된 콜백 메소드를 호출하는 게 아니라 새로운 메모리 공간을 할당받기 때문에 `Isolate.spawn()`보다 느림 

```dart
import 'dart:isolate';
import 'dart:async';

void main() async {
  print('Main isolate: ${Isolate.current.debugName}');
  
  // 새로운 아이솔레이트 생성 (동일한 그룹 -> 이미 메모리의 코드 영역에 로드된 runIsolate를 실행)
  await Isolate.spawn(runIsolate, 'Hello from main isolate!');

  // 새로운 아이솔레이트 생성 (다른 그룹 -> 새로 메모리 할당)
  final uri = Uri.parse('data:text/plain,runIsolate');
  await Isolate.spawnUri(uri, ['Hello from main isolate via URI']);
}

void runIsolate(String message) {
  print('New isolate: ${Isolate.current.debugName}, message: $message');
}
```

## Isolates의 한계
### isolates는 스레드가 아님
- 아이솔레이트는 스레드처럼 동작하지 않음
- 각각의 아이솔레이트는 자체적인 전역 필드(상태)들을 가지고 있어서 다른 아이솔레이트에서 접근할 수 없도록 보장된다는 측면에서 스레드와 다름 (자체 메모리에 대한 접근으로 제한)
  - 예) 코드의 전역에서 변수를 선언했다면 이 변수는 아이솔레이트를 새로 생성했다면 별개의 변수처럼 되어버리기 때문에 해당 아이솔레이트에서 이 변수를 변경해도 메인 아이솔레이트에서는 변경되지 않은 상태로 남아있게 됨

## 메시지 타입
- `SendPort`를 통해 보내진 메시지들은 Dart Object의 거의 대부분을 커버할 수 있지만 예외는 있음
  - Objects with native resources, such as Socket.
  - ReceivePort
  - DynamicLibrary
  - Finalizable
  - Finalizer
  - NativeFinalizer
  - Pointer
  - UserTag
  - Instances of classes that are marked with @pragma('vm:isolate-unsendable')
- 예외를 제외하고는 어떠한 오브젝트도 메세지로 전달될 수 있음
- `Isolate.spawn()`과 `Isolate.exit()`은 `SendPort`의 구현을 통해 메세지를 전달하기 때문에 위의 언급한 제한사항들이 적용

🔗 참고: [Dart - SendPort](https://api.dart.dev/stable/3.4.2/dart-isolate/SendPort/send.html)
{: .notice--info}

# 4️⃣ 웹에서의 동시성
- 다트 웹은 이러한 `async-await`, `Future`, `Stream`을 사용할 수 없음 
- `Web worker`라는 걸 사용해야 하는데 이 웹 워커는 아이솔레이트의 기능과 약간 다른데 
- 예) `Web worker`는 스레드 간 데이터를 전송할 때 데이터를 복사
  - 아이솔레이트도 이렇게 데이터를 복사하는 건 똑같지만 메시지를 보관하는 메모리를 더 효율적으로 전송할 수 있는 API가 있다는 점에서 다름 

# 5️⃣ Resources
- 다수의 아이솔레이트를 사용하는 경우 `IsolateNameServer`를 고려
- 🔗 참고 자료
  - [Isolate.exit()](https://api.dart.dev/stable/dart-isolate/Isolate/exit.html)
  - [Isolate.spawn()](https://api.dart.dev/stable/dart-isolate/Isolate/spawn.html)
  - [ReceivePort](https://api.dart.dev/stable/dart-isolate/ReceivePort-class.html)
  - [SendPort](https://api.dart.dev/stable/dart-isolate/SendPort-class.html)

---

읽고 정리해보고 싶은 문서가 몇 개 있는데 요것들도 정리해서 올려보려고 함

1. Dart에서 Isolates를 어떻게 활용하는지에 대한 문서 [Dart - Isolates](https://dart.dev/language/isolates)
2. Flutter에서 이 Isolates로 동시성을 어떻게 해결하는지에 대한 문서 [Flutter - Concurrency and isolates](https://docs.flutter.dev/perf/isolates#message-passing-between-isolates)

궁극적으로는 이 아티클 [Executing Dart in the Background with Flutter Plugins and Geofencing](https://medium.com/flutter/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124)을 이해하고픈 욕심은 있는데 잘 모르겠다... 

플러터는 써드파티 라이브러리가 엄청 많은데 이게 오히려 좋은건지 잘 모르겠음  
어떻게 쓰는지도 모르고 그냥 문서 보고 대충 갖다 붙이는 느낌이라 🤔  
백그라운드 작업 좀 이해해보겠다고 시작하긴 했는데 뭐가 어떻게 도움이 될 지는 잘 모르겠다 
