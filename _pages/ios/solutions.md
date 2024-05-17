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

{% assign posts = site.posts where_exp: "post", "post.categories contains 'ios' and post.categories contains 'solutions'" %}

{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}