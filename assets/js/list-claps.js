(function () {
  var API = 'https://abacus.jasoncameron.dev/get/kyeonkim-blog/';

  function keyFor(prefix, path) {
    return (prefix + path).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+$/, '');
  }

  function fetchValue(key) {
    return fetch(API + key)
      .then(function (res) {
        if (res.status === 404) return { value: 0 };
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        return data && typeof data.value === 'number' ? data.value : null;
      });
  }

  function show(el, countSelector, value) {
    if (value !== null && value > 0) {
      el.querySelector(countSelector).textContent = String(value);
      el.hidden = false;
    }
  }

  function loadCount(el, prefix, countSelector) {
    el.setAttribute('data-loaded', '');
    var path = el.getAttribute('data-path');
    if (!path) return;
    fetchValue(keyFor(prefix, path))
      .then(function (value) { show(el, countSelector, value); })
      .catch(function () {});
  }

  function loadClapCount(el) {
    el.setAttribute('data-loaded', '');
    var path = el.getAttribute('data-path');
    if (!path) return;
    Promise.all([fetchValue(keyFor('clap', path)), fetchValue(keyFor('clapdn', path))])
      .then(function (values) {
        if (values[0] === null) return;
        show(el, '.post-item-clap-count', values[0] - (values[1] || 0));
      })
      .catch(function () {});
  }

  function loadListClaps(root) {
    var scope = root || document;
    scope.querySelectorAll('.post-item-claps:not([data-loaded])').forEach(function (el) {
      loadClapCount(el);
    });
    scope.querySelectorAll('.post-item-views:not([data-loaded])').forEach(function (el) {
      loadCount(el, 'view', '.post-item-view-count');
    });
  }

  window.loadListClaps = loadListClaps;
  loadListClaps(document);
})();
