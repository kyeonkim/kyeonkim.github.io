---
layout: post
title: "GitHub Actions 빌드 12분을 3분으로 줄이기"
author: kyeonkim
categories: [ test ]
description: "캐시 전략과 잡 분리만으로 CI 시간을 75% 줄였다."
---

CI가 12분씩 걸리니 아무도 자잘한 커밋을 안 올리게 됐다. 캐시와 병렬화로 3분까지 줄였다.

## 적용한 것

**1. 의존성 캐시 키 개선** — lock 파일 해시를 키로 쓰되, restore-keys로 부분 히트를 허용했다.

{% raw %}
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: npm-
```
{% endraw %}

**2. 잡 분리** — lint, test, build를 별도 잡으로 쪼개 병렬 실행.

**3. 테스트 샤딩** — 느린 통합 테스트를 4개 샤드로 분할.

체감상 가장 효과가 컸던 건 의외로 잡 분리였다. 12분짜리 직렬 파이프라인이 가장 긴 잡 기준 3분으로 내려왔다.
