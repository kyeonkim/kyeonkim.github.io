(function () {
  var API = 'https://abacus.jasoncameron.dev/get/kyeonkim-blog/';

  function keyFor(prefix, path) {
    return (prefix + path).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+$/, '');
  }

  // Abacus는 IP당 10초에 30요청 제한 — 동시 요청을 4개로 묶어 한도 소진을 방지
  var queue = [];
  var active = 0;
  var CONCURRENCY = 4;
  function drain() {
    while (active < CONCURRENCY && queue.length) {
      var job = queue.shift();
      active += 1;
      job().then(function () { active -= 1; drain(); }, function () { active -= 1; drain(); });
    }
  }
  function enqueue(fn) {
    return new Promise(function (resolve) {
      queue.push(function () { return fn().then(resolve, function () { resolve(null); }); });
      drain();
    });
  }

  function fetchValue(key) {
    return enqueue(function () {
      return fetch(API + key)
        .then(function (res) {
          if (res.status === 404) return { value: 0 };
          if (!res.ok) return null;
          return res.json();
        })
        .then(function (data) {
          return data && typeof data.value === 'number' ? data.value : null;
        });
    });
  }

  function show(el, countSelector, value) {
    if (value !== null && value > 0) {
      el.querySelector(countSelector).textContent = String(value);
      el.hidden = false;
    }
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
  }

  window.loadListClaps = loadListClaps;
  loadListClaps(document);
})();
