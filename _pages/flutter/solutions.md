---
title: "flutter / solutions"
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

{% assign posts = site.posts where_exp: "post", "post.categories contains 'flutter' and post.categories contains 'solutions'" %}

{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}