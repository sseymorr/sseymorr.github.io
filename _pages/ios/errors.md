---
title: "🚫 ios / errors"
layout: category
permalink: /ios/errors/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - ios
    - errors
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts = site.posts where_exp: "post", "post.categories contains 'ios' and post.categories contains 'errors'" %}

{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
