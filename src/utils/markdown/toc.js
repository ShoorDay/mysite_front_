const linkL = link => parseInt(link.parentElement.nodeName[1]);

function linkP(link) {
  let level = linkL(link);
  let a = document.createElement("a");
  a.classList.add("toc-link");
  a.setAttribute("href", link.href);
  a.innerHTML = link.parentElement.textContent.slice(1);
  let li = document.createElement("li");
  li.classList.add("toc-item", `toc-level-${level}`);
  li.appendChild(a);
  return [li, level];
}

export function generate(el) {
  let links = document.getElementsByClassName("header-anchor");
  let ol, li, level, li_, level_, ol_;
  for (let i = 0; i < links.length; i++) {
    ol = document.createElement("ui");
    // eslint-disable-next-line no-constant-condition
    while (true) {
      [li, level] = linkP(links[i]);
      [li_, level_] = linkP(links[i + 1]);
      ol.appendChild(li);
      if (level - level_ == 0) {
        ol.appendChild(li);
      }
      break;
    }
    el.appendChild(ol);
  }
}

export function toc(links) {
  let headings = [];
  for (let i = 0; i < links.length; i++) {
    headings.push({
      level: +links[i].parentElement.nodeName[1],
      anchor: links[i].hash,
      content: links[i].parentElement.textContent.slice(1)
    });
  }

  let indent = 0;
  let list = headings.map(function(heading) {
    let res = [];
    if (heading.level > indent) {
      let diff = heading.level - indent;
      for (let i = 0; i < diff; i++) {
        res.push(`<ul class="toc">`);
        indent++;
      }
    } else if (heading.level < indent) {
      let diff = indent - heading.level;
      for (let i = 0; i < diff; i++) {
        res.push("</ul>");
        indent--;
      }
    }
    res = res.concat([
      `<li class = "toc-item toc-level-${heading.level}">`,
      `<a class="toc-link" href="${heading.anchor}">`,
      heading.content,
      "</a></li>"
    ]);
    return res.join("");
  });
  return list.join("") + new Array(indent + 1).join("</ul>");
}
