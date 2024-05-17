---
title: "✨ ios / swift"
layout: category
permalink: /ios/swift/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - ios
    - swift
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts = site.posts where_exp: "post", "post.categories contains 'ios' and post.categories contains 'swift'" %}

{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}