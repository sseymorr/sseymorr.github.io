---
title: "[GitHub Pages] minimal-mistakes 테마에서 카테고라이징 하기"
excerpt: "jekyll minimal-mistakes 테마에서 카테고리를 이중으로 분류해보자!"
toc: true
toc_label: "index"
toc_sticky: true
category:
    - git
    - solutions
tag:
    - minimal-mistakes
    - GitHubPages
comments: true
---

### 1️⃣ 목표
jekyll minimal-mistakes 테마에서 이중으로 카테고리를 분류해보기
> 이렇게! 😀
<p align="center"><img src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/3d031327-de10-4d8e-9b6e-9612778a99bd"></p>

### 2️⃣ 기본 세팅
#### 1. index.html
```md
---
layout: home
author_profile: true
sidebar:
    nav: "sidebar-category" ⬅️ 추가된 부분
---
```
#### 2. _config.yml
```yml
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: # true
      share: true
      related: true
      sidebar:
        nav: "sidebar-category" # 추가된 부분
```

### 3️⃣ 카테고리 설정하기 
#### 1. _data/navigation.yml
 ```yml
 sidebar-category:
  - title: "🖤 flutter"
    children:
      - title: "🚫 errors"
        url: "flutter/errors/"
      - title: "😎 solutions"
        url: "flutter/solutions/"
  - title: "🖤 ios"
    children:
      - title: "✨ swift"
        url: "ios/swift/"
      - title: "🚫 errors"
        url: "ios/errors/"
      - title: "😎 solutions"
        url: "ios/solutions/"
 ```
#### 2. _pages 폴더
_pages 폴더 하위에 카테고리에 맞춰 폴더 생성 뒤 각 카테고리를 선택했을 때 보여줄 화면 추가
- 폴더 구조

<p align="center"><img src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/67f70570-b8f2-43f0-ab31-8d25ec42f9cb"></p>

- 예를 들어 ios/solutions 카테고리를 클릭했을 때 보여질 화면의 코드

ios 카테고리에도 포함되고, solutions 카테고리에도 포함된 글들만 가져오는 liquid문을 추가
{: .notice--info}
```md
{% raw %}
{% assign posts_with_flutter = site.posts | where: "categories", "flutter" %}
{% assign posts_with_flutter_and_solutions = posts_with_flutter | where: "categories", "solutions" %}

{% for post in posts_with_flutter_and_solutions %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
{% endraw %}
```
```md
---
title: "😎 flutter / solutions"
layout: category
permalink: /flutter/solutions/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - flutter
    - solutions
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% raw %}
{% assign posts_with_flutter = site.posts | where: "categories", "flutter" %}
{% assign posts_with_flutter_and_solutions = posts_with_flutter | where: "categories", "solutions" %}

{% for post in posts_with_flutter_and_solutions %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
{% endraw %}

```
#### 3. _posts 폴더
루트 폴더에 하위에 카테고리에 맞춰 폴더 추가한 뒤 해당 카테고리 하위에 _posts 폴더 추가
- 예를 들어 ios/solutions에 해당하는 카테고리에 글을 추가하는 경우 다음과 같이 폴더를 만든 뒤 _post에 **yyyy-mm-dd-글제목.md** 형태로 글을 추가

<p align="center"><img src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/fde6c4c7-3a5f-4673-ae7e-e79c8698f4c8"></p>

### 4️⃣ 결과물
flutter/solutions 카테고리를 클릭했을 때 1) flutter 2) solutions **두 개의 카테고리가 모두 설정된 글들만** 선택되어 노출
<p align="center"><img src="https://github.com/sseymorr/sseymorr.github.io/assets/169756711/b80ce01c-7cfa-47f5-8854-977dd2096989"></p>