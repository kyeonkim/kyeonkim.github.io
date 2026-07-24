(function () {
  var content = document.querySelector('.post-content');
  if (!content) return;
  var headings = content.querySelectorAll('h2');
  if (headings.length < 2) return;

  var toc = document.createElement('nav');
  toc.className = 'post-toc';
  toc.setAttribute('aria-label', '목차');
  var list = document.createElement('ul');

  headings.forEach(function (h, i) {
    if (!h.id) {
      h.id = 'toc-' + i + '-' + h.textContent.trim()
        .toLowerCase().replace(/[^\w가-힣]+/g, '-').replace(/^-+|-+$/g, '');
    }
    var li = document.createElement('li');
    li.className = 'post-toc-' + h.tagName.toLowerCase();
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + h.id);
    });
    li.appendChild(a);
    list.appendChild(li);
  });

  toc.appendChild(list);
  document.querySelector('.post').appendChild(toc);

  // 현재 섹션 하이라이트: 기준선(화면 상단 30%)을 지난 마지막 헤딩
  var links = toc.querySelectorAll('a');
  var ticking = false;
  function updateActive() {
    ticking = false;
    var line = window.innerHeight * 0.3;
    var current = null;
    headings.forEach(function (h) {
      if (h.getBoundingClientRect().top <= line) current = h.id;
    });
    if (!current) current = headings[0].id;
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateActive); }
  }, { passive: true });
  updateActive();
})();
