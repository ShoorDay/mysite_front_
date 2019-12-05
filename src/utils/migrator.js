const pattern = /---.*?---/s;

function load(s) {
  let result = {
    hasFM: false,
    FM: {
      title: "",
      categoriy: "",
      tags: [],
      allow_comment: true,
      is_public: true,
      excerpt: ""
    },
    content: ""
  };
  let match = s.match(pattern)[0];
  if (match) {
    result.hasFM = true;
    result.FM.title = match.match("title: ?(.*?)\n")[1] || "";
    result.FM.categoriy = match.title || "";
    result.content = s.slice(s.search(pattern) + match.length);
  } else {
    result.content = s;
  }
  return result;
}
