---
title: "[Flutter] Execution failed for task ':app:compileDebugKotlin' 에러 해결"
excerpt: "Execution failed for task ':app:compileDebugKotlin'.
> A failure occurred while executing org.jetbrains.kotlin.compilerRunner.GradleCompilerRunnerWithWorkers$GradleKotlinCompilerWorkAction 에러 해결하기"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - flutter
    - errors
tag:
comments: true
---

Flutter 프로젝트를 빌드하다보면 가끔씩 코틀린 컴파일 관련 오류를 만나게 된다.
![Screenshot 2024-06-21 at 13 19 24](https://github.com/sseymorr/sseymorr.github.io/assets/171218718/0b58b32d-cb50-410a-82d4-32b89720056d)




## 1. `build.gradle`에서 코틀린 버전 바꾸기
일단 오류 위의 로그를 살펴보면 이런 오류를 확인할 수 있음
> <span style="color:red">Class 'kotlin.Unit' was compiled with an incompatible version of Kotlin.  
> The binary version of its metadata is 1.9.0, expected version is 1.7.1.</span>

코틀린 버전을 1.9.0으로 맞춰달라고 하니깐 코틀린 버전부터 바꿔보자!  
나는 [코틀린 공식 사이트](https://kotlinlang.org/docs/releases.html#release-details)에서 버전 확인한 뒤 1.9.24로 맞춰줬음
```gradle
buildscript {
    ext.kotlin_version = '1.7.10' // 1.9.24로 변경
    repositories {
        google()
        mavenCentral()
    }
}
```

## 2. `build.grdle (android/app)`에서 자바 버전 바꾸기
그리고 다시 빌드를 해보면... 또 똑같은 오류 `Execution failed for task ':nb_utils:compileDebugKotlin'.` 발생함 -_- 
> <span style="color:red">Execution failed for task ':nb_utils:compileDebugKotlin'.  
> Inconsistent JVM-target compatibility detected for tasks 'compileDebugJavaWithJavac' (1.8) and 'compileDebugKotlin' (17).</span>

```gradle
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17 // VERSION_17로 변경
        targetCompatibility JavaVersion.VERSION_17 // VERSION_17로 변경
    }

    kotlinOptions {
        jvmTarget = '17' // '17'로 변경
    }
}
```

## 3. `gradle.properties`에 옵션 추가
빌드를 다시 해보면 하란대로 했는데 또 똑같은 오류가 발생... 
> <span style="color:red">Execution failed for task ':nb_utils:compileDebugKotlin'.  
> Inconsistent JVM-target compatibility detected for tasks 'compileDebugJavaWithJavac' (1.8) and 'compileDebugKotlin' (17).</span>

그래서 검색해보니 애초에 이 jvm 관련 오류가 나지 않도록 옵션을 `gradle.properties`에 추가해주면 되는 거였음 
- `kotlin.jvm.target.validation.mode = IGNORE` 옵션 추가
```properties
org.gradle.jvmargs=-Xmx4608m
android.useAndroidX=true
android.enableJetifier=true
android.defaults.buildfeatures.buildconfig=true
android.nonTransitiveRClass=false
android.nonFinalResIds=false
kotlin.jvm.target.validation.mode = IGNORE 
```

## 4. 오류 해결! :) 