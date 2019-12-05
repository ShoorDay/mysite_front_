// let defaultRenders = require("markdown-it")().renderer.rules;
// // let vimeoRE = /^https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
// let renders = defaultRenders;

// renders.image = function(tokens, idx, options, env, self) {
//   var token = tokens[idx],
//     aIndex = token.attrIndex("src");
//   console.log(token);
//   if (vimeoRE.test(token.attrs[aIndex][1])) {
//     var id = token.attrs[aIndex][1].match(vimeoRE)[2];

//     return (
//       '<div class="embed-responsive embed-responsive-16by9">\n' +
//       '  <iframe class="embed-responsive-item" src="//player.vimeo.com/video/' +
//       id +
//       '"></iframe>\n' +
//       "</div>\n"
//     );
//   }
//   // 传递 token 给默认的渲染器。
//   return defaultRenders.image(tokens, idx, options, env, self);
// };

// renders.link_open = function(tokens, idx, options, env, self) {
//   // 如果你确认其他的插件不能添加 `target` - 放弃以下检查：
//   var aIndex = tokens[idx].attrIndex("target");

//   if (aIndex < 0) {
//     tokens[idx].attrPush(["target", "_blank"]); // 添加新属性
//   } else {
//     tokens[idx].attrs[aIndex][1] = "_blank"; // 替换已经存在的属性值
//   }

//   // 传递 token 到默认的渲染器。
//   return defaultRenders.link_open(tokens, idx, options, env, self);
// };

// export default renders;
