---
title: "[swift] 데이터 타입 고급 (튜플, 컬렉션, 열거형)"
excerpt: "튜플, 컬렉션(배열, 딕셔너리, 세트), 열거형 데이터 타입에 대해서 알아보기"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - ios
    - swift
tag:
comments: true
---

### 1️⃣ 들어가기 전에...
#### 1) 변수와 상수의 차이
**(1) 변수: 값이 변경될 수 있는 저장소**
  - 프로그램 실행 중 언제든지 변수에 새로운 값 할당 가능
  - 타입 추론 가능

```swift
var currentTemperature = 25.0
currentTemperature = 30.0 
print(currentTemperature) // 30.0
```
**(2) 상수: 값이 변경될 수 없는 저장소**
  - 한번 값이 할당되면 더 이상 변경할 수 없음
  - 타입 추론 가능

```swift
let maximumLoginAttempts = 3
let welcomeMsg = "welcome!"

// 컴파일 오류
// maximumLoginAttempts = 4
// welcomeMsg = "hello!"
```
#### 2) 값 타입 vs 참조 타입
**(1) 값 타입: 데이터를 복사하여 전달하는 방식**
  - 변수에 할당하거나 함수에 인수로 전달할 때 복사가 이루어짐
  - 데이터의 독립성과 불변성을 유지
  - **튜플, 컬렉션(배열, 딕셔너리, 세트), 열거형은 값 타입에 해당**
  - 튜플
    - 구조체와 유사하게 동작
    - 변수에 할당하거나 함수에 전달할 때 값이 복사됨
  - 컬렉션 (배열, 딕셔너리, 세트)
    - 구조체로 구현되어 있음
    - 변수에 할당하거나 함수에 전달할 때 값이 복사되나 내부적으로는 copy-on-write 매커니즘이 사용됨 
    > copy-on-write: 수정이 발생할 때에만 복사가 이루어지도록 함 

**(2) 참조 타입: 데이터를 참조(주소)로 전달**
  - 변수에 할당하거나 함수에 인수로 전달할 시에 데이터가 **복사되는 게 아니라 동일한 원본 인스턴스를 참조**
  - **클래스는 참조 타입에 해당**

### 2️⃣ 튜플
#### 1. 개념
- 프로그래머 맘대로 만드는 타입
- typealias와 사용하면 가독성 높아짐

#### 2. 활용 
🤩 **예제: API 응답 처리**
{: .notice--info}
```swift
typealias User = (id: Int, name: String, email: String)

let user: User = (id: 1, name: "John Doe", email: "john@example.com")

func printUserDetails(_ user: User) {
    print("User ID: \(user.id)")
    print("Name: \(user.name)")
    print("Email: \(user.email)")
}

printUserDetails(user)
```
### 3️⃣ 컬렉션
#### 1. Array 
##### 1) 개념
- 동일한 타입의 값들을 순서대로 저장하는 컬렉션 타입

##### 2) 배열 다루기
(1) 선언 및 초기화
- 빈 배열 생성하기
```swift
var emptyList: [Int] = []
var emptyList2: Array<Int> = []
var emptyList3 = [Int]()
var emptyList4 = Array<Int>()
```
- 초기값을 가진 배열 생성하기
```swift
var numbers = [1, 2, 3, 4, 5]
var fruits = ["Apple", "Banana", "Cherry"]
```
(2) 배열 요소 접근 및 수정
  - 요소 접근
```swift
let firstNumber = numbers[0] // 1
let firstFruit = fruits[0]   // "Apple"
```
  - 요소 수정
```swift
numbers[0] = 10
print(numbers) // [10, 2, 3, 4, 5]
```

(3) 배열 크기 및 추가/제거
- 배열의 크기 확인 `numbers.count`
- **요소 추가**
  - 배열의 끝에 요소 추가 `numbers.append(6)`
  - 여러 요소를 한번에 추가 `numbers.append(contentsOf: [7, 8])`
- 배열의 특정 위치에 **요소 삽입** `numbers.insert(0, at: 0)`
- 배열의 특정 위치의 **요소를 제거** `numbers.remove(at: 0)`
- 배열의 **마지막 요소를 제거** `numbers.removeLast()`
- **모든 요소 제거** `numbers.removeAll()`

(4) 배열 순회 
  - for-in 루프
```swift
for fruit in fruits {
    print(fruit)
}
```
  - forEach 메소드
```swift
fruits.forEach { fruit in
    print(fruit)
}
```

(5) 그 외 유용한 메소드
  - 정렬
```swift
let sortedNumbers = [5, 3, 1, 4, 2].sorted()
print(sortedNumbers) // [1, 2, 3, 4, 5]
```
- 필터링
```swift
let evenNumbers = numbers.filter { $0 % 2 == 0 }
print(evenNumbers) // 짝수만 포함된 배열
```
- 맵핑
```swift
let squaredNumbers = [1, 2, 3, 4, 5].map { $0 * $0 }
print(squaredNumbers) // [1, 4, 9, 16, 25]
```

##### 3) 배열은 값 타입 특성
  - 데이터가 복사되는 값 타입 특성이지만 내부 매커니즘은 copy-on-write

```swift
var originalList = [1, 2, 3]
var copiedList = originalList
copiedList.append(4)

print(originalList) // [1, 2, 3]
print(copiedList) // [1, 2, 3, 4]
```

#### 2. Dictionary 
##### 1) 개념
- 키:값 쌍으로 데이터를 저장하고 관리하는 컬렉션 타입

##### 2) 딕셔너리 다루기
(1) 선언 및 초기화
- 빈 딕셔너리 만들기
```swift
var emptyDic: [String: Int] = [:]
var emptyDic2: Dictionary<String, Int> = [:]
var emptyDic3 = [String: Int]()
var emptyDic4 = Dictionary<String, Int>()
```
- 초기값을 가진 딕셔너리 생성
```swift
var ages = ["Alice": 25, "Bob": 30, "Charlie": 35]
```

(2) 요소 접근
```swift
let aliceAge = ages["Alice"]
print(aliceAge) // Optional(25)
```
- 존재하지 않는 키에 접근하면 nil 반환
```swift
let unknownAge = ages["David"]
print(unknownAge) // nil
```

(3) 요소 수정
```swift
ages["Alice"] = 26
ages["David"] = 28
print(ages) // ["Alice": 26, "Bob": 30, "Charlie": 35, "David": 28]
```

(4) 크기 확인
```swift
let count = ages.count
print(count) // 4
```

(5) 요소 추가
`ages["sseymorr"] = 25`

(6) 요소 제거
- 특정 키의 요소 제거
```swift
ages["David"] = nil
print(ages) // ["Alice": 26, "Bob": 30, "Charlie": 35]
```
- 옵셔널 바인딩을 사용하여 제거 (권장)
```swift
if let removedValue = ages.removeValue(forKey: "Charlie") {
    print("Removed value: \(removedValue)")
} else {
    print("No value found for key 'Charlie'")
}
print(ages) // ["Alice": 26, "Bob": 30]
```
- 모든 요소 제거
```swift
ages.removeAll()
print(ages) // [:]
```

(7) 순회
- for-in 루프
```swift
let ages = ["Alice": 26, "Bob": 30, "Charlie": 35]
for (name, age) in ages {
    print("\(name) is \(age) years old")
}
```

- 키 또는 값만 순회 

```swift
for name in ages.keys {
    print("Name: \(name)")
}

for age in ages.values {
    print("Age: \(age)")
}
```

(8) 그 외 유용한 메소드
- 업데이트: `updateValue(_:, forKey:)` 값을 업데이트한 뒤 이전 값 반환 
```swift
if let oldValue = ages.updateValue(27, forKey: "Alice") {
    print("Old value: \(oldValue)")
}
print(ages) // ["Alice": 27, "Bob": 30, "Charlie": 35]
```

- 병합

```swift
var ages = ["Alice": 25, "Bob": 30]
let moreAges = ["Bob": 32, "Charlie": 35]

ages.merge(moreAges) { (current, new) in
    return current
}
print(ages) // ["Alice": 25, "Bob": 30, "Charlie": 35]
```

##### 3) 딕셔너리는 값 타입 특성
- 데이터가 복사되는 값 타입 특성이지만 내부 매커니즘은 copy-on-write

```swift
var originalDict = ["Alice": 25]
var copiedDict = originalDict
copiedDict["Alice"] = 26

print(originalDict) // ["Alice": 25]
print(copiedDict) // ["Alice": 26]
```

#### 3. Set
##### 1) 개념
- 고유한 값의 컬렉션을 저장하는 데 사용되는 컬렉션 타입
- 순서가 없으며 모든 요소가 unique

##### 2) Set 다루기 
(1) 선언 및 초기화
- 빈 Set 생성
```swift
var emptySet1: Set<Int> = []
var emptySet2 = Set<Int>()
```

- 초기값을 가진 Set 생성
```swift
var fruits: Set<String> = ["Apple", "Banana", "Cherry"]
```

(2) 요소 접근 및 수정
- 요소 추가
```swift
fruits.insert("Orange")
print(fruits) // Set에 "Orange" 추가
```

- 요소 제거
```swift
fruits.remove("Banana")
print(fruits) // Set에서 "Banana" 제거
```

- 요소 존재 여부 확인 
```swift
if fruits.contains("Apple") {
    print("Apple exists in the set")
} else {
    print("Apple does not exist in the set")
}
```

(3) 다양한 메소드
- 크기 확인
```swift
let count = fruits.count
print(count) // Set에 포함된 요소의 개수
```

- 요소 순회
```swift
for fruit in fruits {
    print(fruit)
}
```

##### 3) Set은 값 타입 특성
- 데이터가 복사되는 값 타입 특성이지만 내부 매커니즘은 copy-on-write

```swift
var originalSet: Set<Int> = [1, 2, 3]
var copiedSet = originalSet
copiedSet.insert(4)

print(originalSet) // 원래 Set: [1, 2, 3]
print(copiedSet)   // 복사된 Set: [1, 2, 3, 4]
```

### 4️⃣ 열거형 (enum)
#### 1) 개념
- 관련된 값의 그룹을 정의하고 이 값들에 의미 있는 이름을 부여하는 타입

#### 2) 원시값
```swift
enum Direction {
    case north
    case south
    case east
    case west
}

var currentDirection: Direction = .north
currentDirection = .west
```
#### 3) 연관값 
```swift
enum NetworkResponse {
    case success(data: String)
    case failure(error: String)
}

let response = NetworkResponse.success(data: "Response data")
switch response {
case .success(let data):
    print("Success with data: \(data)")
case .failure(let error):
    print("Failure with error: \(error)")
}
```

#### 4) 열거형 초기화
(1) 외부 데이터와 상호작용
- 외부 소스 (json, db, 사용자 입력 등)로부터 받은 값을 사용하여 열거형 인스턴스를 생성할 때 사용 

```swift
enum Direction: String {
    case north = "N"
    case south = "S"
    case east = "E"
    case west = "W"
}

let directionInput = "N"
if let direction = Direction(rawValue: directionInput) {
    print("The direction is \(direction).")
} else {
    print("Invalid direction input.")
}

// 출력: The direction is north.
```

(2) 저장된 데이터 복원
- 저장된 데이터를 사용하여 열거형 값을 복원할 때 사용

```swift
enum StatusCode: Int {
    case success = 200
    case notFound = 404
    case serverError = 500
}

let savedStatusCode = 404
if let status = StatusCode(rawValue: savedStatusCode) {
    print("The status is \(status).")
} else {
    print("Unknown status code.")
}

// 출력: The status is notFound.
```

(3) 디폴트 값 사용
- 원시값을 통해 열거형 인스턴스를 생성할 때 잘못된 원시 값이 들어올 겨우 디폴트 값 설정할 때 사용 

```swift
enum Beverage: String {
    case coffee
    case tea
    case juice
}

let beverageInput = "soda"
let selectedBeverage = Beverage(rawValue: beverageInput) ?? .coffee
print("Selected beverage: \(selectedBeverage).")

// 출력: Selected beverage: coffee.
```