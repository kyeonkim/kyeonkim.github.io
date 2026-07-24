(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  if (!input || !results) return;

  var posts = null;
  var loading = null;
  var MAX_RESULTS = 7;

  function loadIndex() {
    if (!loading) {
      loading = fetch(input.dataset.src)
        .then(function (res) { return res.json(); })
        .then(function (data) { posts = data; return data; })
        .catch(function () { posts = []; return posts; });
    }
    return loading;
  }

  function close() {
    results.hidden = true;
    results.innerHTML = '';
  }

  function render(matches, query) {
    results.innerHTML = '';
    if (!query) { close(); return; }
    if (matches.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'search-empty';
      empty.textContent = '검색 결과가 없습니다.';
      results.appendChild(empty);
    } else {
      matches.slice(0, MAX_RESULTS).forEach(function (post) {
        var a = document.createElement('a');
        a.className = 'search-result';
        a.href = post.url;
        var title = document.createElement('div');
        title.className = 'search-result-title';
        title.textContent = post.title;
        var date = document.createElement('div');
        date.className = 'search-result-date';
        date.textContent = post.date;
        a.appendChild(title);
        a.appendChild(date);
        results.appendChild(a);
      });
    }
    results.hidden = false;
  }

  function search() {
    var query = input.value.trim().toLowerCase();
    if (!query) { close(); return; }
    loadIndex().then(function (data) {
      if (input.value.trim().toLowerCase() !== query) return;
      var matches = data.filter(function (post) {
        return (post.title || '').toLowerCase().indexOf(query) !== -1 ||
               (post.content || '').toLowerCase().indexOf(query) !== -1;
      });
      render(matches, query);
    });
  }

  input.addEventListener('input', search);
  input.addEventListener('focus', function () {
    if (input.value.trim()) search();
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(); input.blur(); }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.site-search')) close();
  });
})();
