---
title: "🛠️ ios / xcode"
layout: category
permalink: /ios/xcode/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - ios
    - xcode
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts_with_ios = site.posts | where: "categories", "ios" %}
{% assign posts_with_ios_and_xcode = posts_with_ios | where: "categories", "xcode" %}

{% for post in posts_with_ios_and_xcode %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}