---
title: "[플러터 웹] 이미지를 받아와 크롭하기"
excerpt: "플러터 웹에서 이미지를 가져와 크롭해보자!"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - flutter
    - solutions
tag:

---
### 1️⃣ 목표
flutter 라이브러리를 사용하여 파일 시스템에서 이미지를 받아온 뒤 이미지를 자른 후 화면에 노출시키기

### 2️⃣ 사용한 라이브러리
1. image_picker_web: [https://pub.dev/packages/image_picker_web](https://pub.dev/packages/image_picker_web)
2. image_cropper: [https://pub.dev/packages/image_cropper](https://pub.dev/packages/image_cropper)

### 3️⃣ 기본 세팅
#### 1. pubspec.yaml
```yaml
dependencies:
  flutter:
    sdk: flutter
  image_picker_web: ^3.1.1
  http: ^0.13.5
  image_cropper: ^3.0.1
```
#### 2. web/index.html
```html
<head>
  <!-- Croppie -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.css" />
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js"></script>
</head>
```
### <img width="25" alt="star1" src="https://user-images.githubusercontent.com/78655692/151471925-e5f35751-d4b9-416b-b41d-a059267a09e3.png"> 주의 사항
플러터 웹에서 로컬 파일 시스템에 직접 접근하는 것(File 형태로)은 보안상의 이유로 허용되지 않으므로 blob 형태의 url로 변환해야 함.
{: .notice--warning}
### 4️⃣ 전체 소스 코드 (main.dart)
```dart
import 'dart:html' as html;

import 'package:flutter/material.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:image_picker_web/image_picker_web.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(title: 'Image cropper! 🍏'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String croppedBlobUrl = '';
  String fileName = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.all(15.0),
                child: SizedBox(
                  width: 300,
                  height: 300,
                  child: croppedBlobUrl != ''
                      ? CircleAvatar(
                          radius: 50, // 원하는 크기 지정
                          backgroundColor: Colors.transparent,
                          backgroundImage: NetworkImage(croppedBlobUrl),
                        )
                      : const Icon(Icons.disabled_by_default_rounded),
                ),
              ),
              ElevatedButton.icon(
                  onPressed: () async {
                    pickAndCropImage(context);
                  },
                  icon: const Icon(Icons.image),
                  label: const Text('pick an image from gallery'))
            ],
          ),
        ),
      ), 
    );
  }

  Future<void> pickAndCropImage(BuildContext context) async {
    html.File? imageFile = (await ImagePickerWeb.getMultiImagesAsFile())?[0];

    setState(() {
      if (imageFile != null) {
        fileName = imageFile.name;
        if (context.mounted) {
          cropImage(imageFile, context);
        }
      }
    });
  }

  Future<void> cropImage(html.File imageFile, context) async {
    final imageUrl = html.Url.createObjectUrlFromBlob(imageFile);
    final croppedFile = await ImageCropper().cropImage(
      sourcePath: imageUrl,
      aspectRatioPresets: [
        CropAspectRatioPreset.square,
        CropAspectRatioPreset.ratio3x2,
        CropAspectRatioPreset.original,
        CropAspectRatioPreset.ratio4x3,
        CropAspectRatioPreset.ratio16x9
      ],
      uiSettings: [WebUiSettings(context: context)],
    );

    html.Url.revokeObjectUrl(imageUrl);

    setState(() {
      if (croppedFile != null) {
        croppedBlobUrl = croppedFile.path;
      }
    });
  }
}
```

### 5️⃣ 동작 확인
```powershell
flutter build web
flutter run -d chrome
```

### 6️⃣ 결과물
<center><img width='600' src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/edf9762b-b855-4ff4-ae31-65321a69490d"></center>