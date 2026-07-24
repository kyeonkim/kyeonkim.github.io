(function () {
  function inline(node) {
    var out = '';
    node.childNodes.forEach(function (n) {
      if (n.nodeType === 3) { out += n.textContent; return; }
      if (n.nodeType !== 1) return;
      var tag = n.tagName;
      if (tag === 'STRONG' || tag === 'B') out += '**' + inline(n) + '**';
      else if (tag === 'EM' || tag === 'I') out += '*' + inline(n) + '*';
      else if (tag === 'CODE') out += '`' + n.textContent + '`';
      else if (tag === 'A') out += '[' + inline(n) + '](' + n.getAttribute('href') + ')';
      else if (tag === 'IMG') out += '![' + (n.getAttribute('alt') || '') + '](' + n.getAttribute('src') + ')';
      else if (tag === 'BR') out += '\n';
      else out += inline(n);
    });
    return out;
  }

  function codeLang(pre) {
    var el = pre.closest('[class*="language-"]') || pre.querySelector('[class*="language-"]');
    if (!el) return '';
    var m = el.className.match(/language-([\w+-]+)/);
    return m ? m[1] : '';
  }

  function block(node, indent) {
    var tag = node.tagName;
    if (tag === 'H2') return '## ' + inline(node);
    if (tag === 'H3') return '### ' + inline(node);
    if (tag === 'H4') return '#### ' + inline(node);
    if (tag === 'P') return inline(node);
    if (tag === 'HR') return '---';
    if (tag === 'BLOCKQUOTE') {
      return toMarkdown(node).split('\n').map(function (l) { return '> ' + l; }).join('\n');
    }
    if (tag === 'PRE' || (node.querySelector && node.querySelector('pre') && /highlight/.test(node.className))) {
      var pre = tag === 'PRE' ? node : node.querySelector('pre');
      return '```' + codeLang(node) + '\n' + pre.textContent.replace(/\n$/, '') + '\n```';
    }
    if (tag === 'UL' || tag === 'OL') {
      var i = 0;
      return Array.prototype.map.call(node.children, function (li) {
        i += 1;
        var marker = tag === 'OL' ? i + '. ' : '- ';
        return (indent || '') + marker + inline(li).trim();
      }).join('\n');
    }
    if (tag === 'TABLE') {
      var rows = Array.prototype.map.call(node.querySelectorAll('tr'), function (tr) {
        return '| ' + Array.prototype.map.call(tr.children, function (td) {
          return inline(td).trim();
        }).join(' | ') + ' |';
      });
      if (rows.length > 1) {
        var cols = node.querySelectorAll('tr')[0].children.length;
        rows.splice(1, 0, '|' + new Array(cols + 1).join(' --- |'));
      }
      return rows.join('\n');
    }
    if (tag === 'DIV' || tag === 'FIGURE' || tag === 'SECTION') return toMarkdown(node);
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NAV') return '';
    return inline(node);
  }

  function toMarkdown(root) {
    var parts = [];
    root.childNodes.forEach(function (n) {
      if (n.nodeType !== 1) return;
      var md = block(n, '');
      if (md && md.trim()) parts.push(md.replace(/\n{3,}/g, '\n\n'));
    });
    return parts.join('\n\n');
  }

  window.downloadMarkdown = function () {
    var content = document.querySelector('.post-content');
    var title = document.querySelector('.post-title');
    if (!content) return;
    var titleText = title ? title.textContent.trim() : document.title;
    var md = '# ' + titleText + '\n\n' + toMarkdown(content) + '\n';
    var time = document.querySelector('.post-meta time');
    var date = time && time.getAttribute('datetime') ? time.getAttribute('datetime').slice(0, 10).replace(/-/g, '_') : '';
    var name = titleText.replace(/[\/\\:*?"<>|]/g, '').replace(/\s+/g, '_');
    var filename = (date ? date + '-' : '') + name + '.md';
    var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };
})();
