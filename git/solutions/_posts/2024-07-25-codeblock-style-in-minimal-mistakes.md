---
title: "[GitHub Pages] minimal-mistakes 테마에서 코드블럭을 라이트 모드로 바꾸기"
toc: true
toc_label: "index"
toc_sticky: true
tag:
    - minimal-mistakes
    - GitHubPages
comments: true
---

`Minimal-mistakes`로 깃헙 블로그를 만들면 `default` 테마가 적용되는데, 이 테마의 코드 블럭 스타일은 기본적으로 다크모드다... 하지만 나는 다크모드를 별로 좋아하지 않기 때문에 코드 블럭 스타일을 라이트모드로 바꾸기로 했다 🤩

## 1️⃣ 코드 블럭 스타일 바꾸기 `_syntax.scss`
하기 코드를 통째로 복사해서 `_syntax.scss` 파일에 붙여넣기 하면 된다!  
바꾸고 싶은 스타일이 있으면 여기서 커스텀해서 사용하시길 
```scss
/* ==========================================================================
   Syntax highlighting - Light Mode
   ========================================================================== */

div.highlighter-rouge,
figure.highlight {
  position: relative;
  margin-bottom: 1em;
  background: #f5f5f5;
  /* Light background color */
  color: #333;
  /* Dark text color */
  font-family: $monospace;
  font-size: $type-size-6;
  line-height: 1.8;
  border-radius: $border-radius;

  >pre,
  pre.highlight {
    margin: 0;
    padding: 1em;
  }
}

.highlight table {
  margin-bottom: 0;
  font-size: 1em;
  border: 0;

  td {
    padding: 0;
    width: calc(100% - 1em);
    border: 0;

    /* line numbers*/
    &.gutter,
    &.rouge-gutter {
      padding-right: 1em;
      width: 1em;
      color: #999;
      /* Light gray for line numbers */
      border-right: 1px solid #ddd;
      /* Light gray border */
      text-align: right;
    }

    /* code */
    &.code,
    &.rouge-code {
      padding-left: 1em;
    }
  }

  pre {
    margin: 0;
  }
}

.highlight pre {
  width: 100%;
}

.highlight .hll {
  background-color: #e0e0e0;
  /* Light highlight color */
}

.highlight {
  .c {
    /* Comment */
    color: #999;
    /* Light gray for comments */
  }

  .err {
    /* Error */
    color: #a00;
    /* Dark red for errors */
  }

  .k {
    /* Keyword */
    color: #07a;
    /* Blue for keywords */
  }

  .l {
    /* Literal */
    color: #690;
    /* Dark green for literals */
  }

  .n {
    /* Name */
    color: #333;
    /* Dark text color */
  }

  .o {
    /* Operator */
    color: #a67f59;
    /* Brown for operators */
  }

  .p {
    /* Punctuation */
    color: #333;
    /* Dark text color */
  }

  .cm {
    /* Comment.Multiline */
    color: #999;
    /* Light gray for comments */
  }

  .cp {
    /* Comment.Preproc */
    color: #999;
    /* Light gray for comments */
  }

  .c1 {
    /* Comment.Single */
    color: #999;
    /* Light gray for comments */
  }

  .cs {
    /* Comment.Special */
    color: #999;
    /* Light gray for comments */
  }

  .gd {
    /* Generic.Deleted */
    color: #a00;
    /* Dark red for deleted text */
  }

  .ge {
    /* Generic.Emph */
    font-style: italic;
  }

  .gh {
    /* Generic.Heading */
    color: #333;
    /* Dark text color */
    font-weight: bold;
  }

  .gi {
    /* Generic.Inserted */
    color: #690;
    /* Dark green for inserted text */
  }

  .gp {
    /* Generic.Prompt */
    color: #999;
    /* Light gray for prompts */
    font-weight: bold;
  }

  .gs {
    /* Generic.Strong */
    font-weight: bold;
  }

  .gu {
    /* Generic.Subheading */
    color: #07a;
    /* Blue for subheadings */
    font-weight: bold;
  }

  .kc {
    /* Keyword.Constant */
    color: #07a;
    /* Blue for constants */
  }

  .kd {
    /* Keyword.Declaration */
    color: #07a;
    /* Blue for declarations */
  }

  .kn {
    /* Keyword.Namespace */
    color: #a67f59;
    /* Brown for namespaces */
  }

  .kp {
    /* Keyword.Pseudo */
    color: #07a;
    /* Blue for pseudo keywords */
  }

  .kr {
    /* Keyword.Reserved */
    color: #07a;
    /* Blue for reserved keywords */
  }

  .kt {
    /* Keyword.Type */
    color: #a67f59;
    /* Brown for types */
  }

  .ld {
    /* Literal.Date */
    color: #690;
    /* Dark green for dates */
  }

  .m {
    /* Literal.Number */
    color: #690;
    /* Dark green for numbers */
  }

  .s {
    /* Literal.String */
    color: #690;
    /* Dark green for strings */
  }

  .na {
    /* Name.Attribute */
    color: #905;
    /* Dark pink for attributes */
  }

  .nb {
    /* Name.Builtin */
    color: #333;
    /* Dark text color */
  }

  .nc {
    /* Name.Class */
    color: #a67f59;
    /* Brown for classes */
  }

  .no {
    /* Name.Constant */
    color: #a00;
    /* Dark red for constants */
  }

  .nd {
    /* Name.Decorator */
    color: #a67f59;
    /* Brown for decorators */
  }

  .ni {
    /* Name.Entity */
    color: #333;
    /* Dark text color */
  }

  .ne {
    /* Name.Exception */
    color: #a00;
    /* Dark red for exceptions */
  }

  .nf {
    /* Name.Function */
    color: #905;
    /* Dark pink for functions */
  }

  .nl {
    /* Name.Label */
    color: #333;
    /* Dark text color */
  }

  .nn {
    /* Name.Namespace */
    color: #a67f59;
    /* Brown for namespaces */
  }

  .nx {
    /* Name.Other */
    color: #905;
    /* Dark pink for other names */
  }

  .py {
    /* Name.Property */
    color: #333;
    /* Dark text color */
  }

  .nt {
    /* Name.Tag */
    color: #a67f59;
    /* Brown for tags */
  }

  .nv {
    /* Name.Variable */
    color: #a00;
    /* Dark red for variables */
  }

  .ow {
    /* Operator.Word */
    color: #a67f59;
    /* Brown for operators */
  }

  .w {
    /* Text.Whitespace */
    color: #333;
    /* Dark text color */
  }

  .mf {
    /* Literal.Number.Float */
    color: #690;
    /* Dark green for floats */
  }

  .mh {
    /* Literal.Number.Hex */
    color: #690;
    /* Dark green for hex numbers */
  }

  .mi {
    /* Literal.Number.Integer */
    color: #690;
    /* Dark green for integers */
  }

  .mo {
    /* Literal.Number.Oct */
    color: #690;
    /* Dark green for octal numbers */
  }

  .sb {
    /* Literal.String.Backtick */
    color: #690;
    /* Dark green for backtick strings */
  }

  .sc {
    /* Literal.String.Char */
    color: #333;
    /* Dark text color */
  }

  .sd {
    /* Literal.String.Doc */
    color: #999;
    /* Light gray for doc strings */
  }

  .s2 {
    /* Literal.String.Double */
    color: #690;
    /* Dark green for double-quoted strings */
  }

  .se {
    /* Literal.String.Escape */
    color: #690;
    /* Dark green for escape sequences */
  }

  .sh {
    /* Literal.String.Heredoc */
    color: #690;
    /* Dark green for heredoc strings */
  }

  .si {
    /* Literal.String.Interpol */
    color: #690;
    /* Dark green for interpolated strings */
  }

  .sx {
    /* Literal.String.Other */
    color: #690;
    /* Dark green for other strings */
  }

  .sr {
    /* Literal.String.Regex */
    color: #690;
    /* Dark green for regex strings */
  }

  .s1 {
    /* Literal.String.Single */
    color: #690;
    /* Dark green for single-quoted strings */
  }

  .ss {
    /* Literal.String.Symbol */
    color: #690;
    /* Dark green for symbols */
  }

  .bp {
    /* Name.Builtin.Pseudo */
    color: #333;
    /* Dark text color */
  }

  .vc {
    /* Name.Variable.Class */
    color: #a00;
    /* Dark red for class variables */
  }

  .vg {
    /* Name.Variable.Global */
    color: #a00;
    /* Dark red for global variables */
  }

  .vi {
    /* Name.Variable.Instance */
    color: #a00;
    /* Dark red for instance variables */
  }

  .il {
    /* Literal.Number.Integer.Long */
    color: #690;
    /* Dark green for long integers */
  }
}

.gist {

  th,
  td {
    border-bottom: 0;
  }
}
```

## 2️⃣ 복사 버튼 색깔 바꾸기 `_utilities.scss`
```scss
pre {
  &.highlight .clipboard-copy-button {
    color: link-color;
  }
}
```

### ⚡️ 참고
코드 복사 버튼이 보여지게 하고 싶다면 `_config.yml`에서 `enable_copy_code_button` 옵션을 `true`로 설정
```yml
enable_copy_code_button  : true # false (default)
```
