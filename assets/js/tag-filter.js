(function () {
  var CLAP_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<line x1="4.2" y1="6.2" x2="2.6" y2="4.4"/><line x1="7.8" y1="4.6" x2="7.2" y2="2.3"/><line x1="11.4" y1="4.4" x2="12.2" y2="2.2"/>' +
    '<g transform="translate(4.9,4.9) scale(0.79)"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/>' +
    '<path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></g></svg>';

  var list = document.querySelector('.post-list');
  var sentinel = document.querySelector('.post-list-sentinel');
  var chips = document.querySelectorAll('.tag-chip');
  if (!list || !chips.length) return;

  var originalHTML = list.innerHTML;
  var posts = null;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  function itemHTML(p) {
    var excerpt = p.description || (p.excerpt || '').slice(0, 150);
    return (
      '<article class="post-item"><div class="post-item-body">' +
      '<div class="post-item-date">' + esc(p.date) + '</div>' +
      '<a class="post-item-link" href="' + esc(p.url) + '">' +
      '<h2 class="post-item-title">' + esc(p.title) + '</h2>' +
      '<p class="post-item-excerpt">' + esc(excerpt) + '</p></a>' +
      '<div class="post-item-meta">' +
      '<span class="post-item-claps" data-path="' + esc(p.url) + '" hidden>' + CLAP_SVG +
      '<span class="post-item-clap-count"></span><span class="post-item-meta-dot">&middot;</span></span>' +
      p.readmin + ' min read</div></div>' +
      (p.image
        ? '<a class="post-item-thumb" href="' + esc(p.url) + '"><img src="/' + esc(p.image) + '" alt="" loading="lazy"></a>'
        : '') +
      '</article>'
    );
  }

  function setActive(tag) {
    chips.forEach(function (c) {
      c.classList.toggle('is-active', c.getAttribute('data-tag') === tag);
    });
  }

  function renderFiltered(tag) {
    var filtered = tag
      ? posts.filter(function (p) { return (p.tags || []).indexOf(tag) !== -1; })
      : null;
    if (!filtered) {
      // ALL: 서버가 렌더한 원래 목록 복원 (무한 스크롤 항목 포함 상태 그대로)
      list.innerHTML = originalHTML;
      if (sentinel) sentinel.hidden = false;
    } else {
      list.innerHTML = filtered.map(itemHTML).join('') ||
        '<p class="post-list-empty">이 태그의 글이 없습니다.</p>';
      if (sentinel) sentinel.hidden = true;
    }
    if (window.loadListClaps) {
      list.querySelectorAll('[data-loaded]').forEach(function (el) { el.removeAttribute('data-loaded'); });
      window.loadListClaps(list);
    }
  }

  function apply(tag) {
    setActive(tag);
    if (!tag) { renderFiltered(''); return; }
    if (posts) { renderFiltered(tag); return; }
    fetch('/search.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { posts = data; renderFiltered(tag); })
      .catch(function () {});
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var tag = chip.getAttribute('data-tag');
      var q = tag ? '?tag=' + encodeURIComponent(tag) : location.pathname;
      history.replaceState(null, '', tag ? location.pathname + q : location.pathname);
      apply(tag);
    });
  });

  // URL ?tag= 로 진입 시 (상세 페이지 태그 클릭 등) 필터 적용
  var param = new URLSearchParams(location.search).get('tag');
  if (param) apply(param);
})();
