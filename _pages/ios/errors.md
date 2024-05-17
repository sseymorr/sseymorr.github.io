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

{% assign posts_with_ios = site.posts | where: "categories", "ios" %}
{% assign posts_with_ios_and_errors = posts_with_ios | where: "categories", "errors" %}

{% for post in posts_with_ios_and_errors %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
