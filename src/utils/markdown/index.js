import hljs from "./highlight.js";
import containers from "./containers";

const config = {
  html: true,
  xhtmlOut: true,
  breaks: true,
  langPrefix: "language-",
  linkify: false,
  highlight: hljs
};

const anchor_options = {
  level: [1, 2, 3],
  uslugify: s => require("uslug")(s),
  // slugify: string => string,
  permalink: true,
  // renderPermalink: (slug, opts, state, permalink) => {},
  permalinkClass: "header-anchor",
  permalinkSymbol: "#",
  permalinkBefore: true
};

const md = require("markdown-it")(config);

md.use(require("markdown-it-emoji"))
  .use(require("markdown-it-sub"))
  .use(require("markdown-it-sup"))
  .use(require("markdown-it-anchor").default, anchor_options);

let i, len;
for (i = 0, len = containers.length; i < len; i++) {
  md.use(
    require("markdown-it-container"),
    containers[i].name,
    containers[i].options
  );
}

export default md;
