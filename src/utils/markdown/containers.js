// import "./containers.css";

export default [
  {
    name: "tip",
    options: {
      render: function(tokens, idx) {
        const token = tokens[idx];
        const info = token.info
          .trim()
          .slice(3)
          .trim();
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `<div class="tip custom-block"><p class="custom-block-title">${info ||
            "提示"}</p>\n`;
        } else {
          // closing tag
          return "</div>\n";
        }
      }
    }
  },
  {
    name: "warning",
    options: {
      render: function(tokens, idx) {
        const token = tokens[idx];
        const info = token.info
          .trim()
          .slice(7)
          .trim();
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `<div class="warning custom-block"><p class="custom-block-title">${info ||
            "注意"}</p>\n`;
        } else {
          // closing tag
          return "</div>\n";
        }
      }
    }
  },
  {
    name: "danger",
    options: {
      render: function(tokens, idx) {
        const token = tokens[idx];
        const info = token.info
          .trim()
          .slice(6)
          .trim();
        if (tokens[idx].nesting === 1) {
          // opening tag
          return `<div class="danger custom-block"><p class="custom-block-title">${info ||
            "警告"}</p>\n`;
        } else {
          // closing tag
          return "</div>\n";
        }
      }
    }
  }
];
