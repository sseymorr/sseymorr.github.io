---
title: "🌎 area / english"
layout: category
permalink: /area/english/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - area
    - english
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts_with_area = site.posts | where: "categories", "area" %}
{% assign posts_with_area_and_english = posts_with_area | where: "categories", "english" %}

{% for post in posts_with_area_and_english %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}