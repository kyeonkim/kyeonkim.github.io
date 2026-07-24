(function () {
  var API = 'https://abacus.jasoncameron.dev/get/kyeonkim-blog/';

  function keyFor(prefix, path) {
    return (prefix + path).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+$/, '');
  }

  function loadCount(el, prefix, countSelector) {
    el.setAttribute('data-loaded', '');
    var path = el.getAttribute('data-path');
    if (!path) return;
    fetch(API + keyFor(prefix, path))
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (data && typeof data.value === 'number' && data.value > 0) {
          el.querySelector(countSelector).textContent = String(data.value);
          el.hidden = false;
        }
      })
      .catch(function () {});
  }

  function loadListClaps(root) {
    var scope = root || document;
    scope.querySelectorAll('.post-item-claps:not([data-loaded])').forEach(function (el) {
      loadCount(el, 'clap', '.post-item-clap-count');
    });
    scope.querySelectorAll('.post-item-views:not([data-loaded])').forEach(function (el) {
      loadCount(el, 'view', '.post-item-view-count');
    });
  }

  window.loadListClaps = loadListClaps;
  loadListClaps(document);
})();
