export const actions = {
  bold: {
    prefix: "**",
    placeholder: "粗体",
    suffix: "**"
  },
  italic: {
    prefix: "*",
    suffix: "*",
    placeholder: "斜体"
  },
  header: {
    prefix: "# ",
    suffix: "",
    placeholder: "标题"
  },
  header1: {
    prefix: "# ",
    suffix: "",
    placeholder: "标题2"
  },
  header2: {
    prefix: "## ",
    suffix: "",
    placeholder: "标题2"
  },
  header3: {
    prefix: "### ",
    suffix: "",
    placeholder: "标题3"
  },
  header4: {
    prefix: "#### ",
    suffix: "",
    placeholder: "标题4"
  },
  header5: {
    prefix: "##### ",
    suffix: "",
    placeholder: "标题5"
  },
  header6: {
    prefix: "###### ",
    suffix: "",
    placeholder: "标题6"
  },
  underline: {
    prefix: "++",
    suffix: "++",
    placeholder: "下划线"
  },
  placeholderikethrough: {
    prefix: "~~",
    suffix: "~~",
    placeholder: "强调"
  },
  superscript: {
    prefix: "^",
    suffix: "^",
    placeholder: "上标"
  },
  subscript: {
    prefix: "~",
    suffix: "~",
    placeholder: "下标"
  },
  quote: {
    prefix: "> ",
    suffix: "",
    placeholder: "引用"
  },
  link: {
    prefix: "[](",
    suffix: ")",
    placeholder: "连接"
  },
  imagelink: {
    prefix: "![](",
    suffix: ")",
    placeholder: "图片"
  },
  code: {
    prefix: "```",
    suffix: "\n\n```\n",
    placeholder: "language"
  },
  table: {
    prefix: "",
    suffix: "",
    placeholder:
      "|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n"
  }
};
