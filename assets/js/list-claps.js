(function () {
  var API = 'https://abacus.jasoncameron.dev/get/kyeonkim-blog/';

  function keyFor(path) {
    return ('clap' + path).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+$/, '');
  }

  function loadListClaps(root) {
    (root || document).querySelectorAll('.post-item-claps:not([data-loaded])').forEach(function (el) {
      el.setAttribute('data-loaded', '');
      var path = el.getAttribute('data-path');
      if (!path) return;
      fetch(API + keyFor(path))
        .then(function (res) {
          if (!res.ok) return null;
          return res.json();
        })
        .then(function (data) {
          if (data && typeof data.value === 'number' && data.value > 0) {
            el.querySelector('.post-item-clap-count').textContent = String(data.value);
            el.hidden = false;
          }
        })
        .catch(function () {});
    });
  }

  window.loadListClaps = loadListClaps;
  loadListClaps(document);
})();
