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

{% assign posts_with_flutter = site.posts | where: "categories", "flutter" %}
{% assign posts_with_flutter_and_solutions = posts_with_flutter | where: "categories", "solutions" %}

{% for post in posts_with_flutter_and_solutions %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
