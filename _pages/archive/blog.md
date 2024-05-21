---
title: "✏️ archive / blog"
layout: category
permalink: /archive/blog/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - archive
    - blog
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts_with_archive = site.posts | where: "categories", "archive" %}
{% assign posts_with_archive_and_blog = posts_with_archive | where: "categories", "blog" %}

{% for post in posts_with_archive_and_blog %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}