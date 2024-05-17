---
title: "😎 ios / solutions"
layout: category
permalink: /ios/solutions/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - ios
    - solutions
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts_with_ios = site.posts | where: "categories", "ios" %}
{% assign posts_with_ios_and_solutions = posts_with_ios | where: "categories", "solutions" %}

{% for post in posts_with_ios_and_solutions %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}