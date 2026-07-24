(function () {
  var sentinel = document.querySelector('.post-list-sentinel');
  var list = document.querySelector('.post-list');
  if (!sentinel || !list || !('IntersectionObserver' in window)) return;

  var nextUrl = sentinel.dataset.next || null;
  var busy = false;

  function loadNext() {
    if (!nextUrl || busy) return;
    busy = true;
    fetch(nextUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('no more pages');
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('.post-list .post-item').forEach(function (item) {
          list.appendChild(document.importNode(item, true));
        });
        if (window.loadListClaps) window.loadListClaps(list);
        var nextSentinel = doc.querySelector('.post-list-sentinel');
        nextUrl = (nextSentinel && nextSentinel.dataset.next) || null;
        busy = false;
        if (!nextUrl) observer.disconnect();
      })
      .catch(function () {
        nextUrl = null;
        observer.disconnect();
      });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) loadNext();
    });
  }, { rootMargin: '300px 0px' });

  if (nextUrl) observer.observe(sentinel);
})();
