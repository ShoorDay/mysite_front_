import escapeHtml from "escape-html";
// import "./highlight.css";

const languages = {
  "c++": "clike",
  "c#": "clike",
  less: "css",
  js: "javascript",
  vue: "javascript",
  "objective-c": "objectivec",
  py: "python",
  shell: "bash",
  // 准确
  markup: "markup",
  css: "css",
  clike: "clike",
  javascript: "javascript",
  bash: "bash",
  c: "c",
  csharp: "csharp",
  cil: "cil",
  cmake: "cmake",
  dart: "dart",
  docker: "docker",
  fortran: "fortran",
  git: "git",
  go: "go",
  graphql: "graphql",
  haskell: "haskell",
  ini: "ini",
  java: "java",
  json: "json",
  julia: "julia",
  kotlin: "kotlin",
  latex: "latex",
  lisp: "lisp",
  lua: "lua",
  makefile: "makefile",
  markdown: "markdown",
  matlab: "matlab",
  nginx: "nginx",
  objectivec: "objectivec",
  pascal: "pascal",
  perl: "perl",
  php: "php",
  powershell: "powershell",
  python: "python",
  ruby: "ruby",
  scheme: "scheme",
  sql: "sql",
  stylus: "stylus",
  vim: "vim",
  visualbasic: "visual-basic",
  yaml: "yaml",
  diff: "diff"
};

function wrap(code, lang) {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<pre class="line-numbers language-${lang}"><code>${code}</code></pre>`;
}

export default (str, lang) => {
  lang = lang.toLowerCase();
  if (languages[lang]) {
    return wrap(str, languages[lang]);
  }
  return wrap(str, "text");
};
