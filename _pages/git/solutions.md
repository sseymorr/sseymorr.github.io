---
title: "😎 git / solutions"
layout: category
permalink: /git/solutions/
author_profile: true
sidebar_main: true
types: posts
taxonomy:
  category:
    - git
    - solutions
sidebar:
  nav: "sidebar-category"
  enabled: true
---

{% assign posts_with_git = site.posts | where: "categories", "git" %}
{% assign posts_with_git_and_solutions = posts_with_git | where: "categories", "solutions" %}

{% for post in posts_with_git_and_solutions %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}