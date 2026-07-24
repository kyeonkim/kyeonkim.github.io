---
layout: post
title: "Redis 캐시 전략 삽질기 — Cache Stampede를 만나다"
author: kyeonkim
categories: [ test ]
image: assets/images/1.jpg
description: "트래픽이 몰리는 순간 캐시가 동시에 만료되면서 DB가 죽었다. Cache Stampede 문제를 진단하고 jitter와 락으로 해결한 과정을 정리한다."
---

서비스 트래픽이 늘면서 캐시 만료 시점에 DB CPU가 급격히 튀는 현상이 반복됐다. 원인은 전형적인 Cache Stampede였다.

## 문제 상황

인기 상품 목록 캐시의 TTL이 60초로 고정되어 있었고, 만료 순간 수백 개의 요청이 동시에 DB로 몰렸다.

```python
def get_popular_items():
    cached = redis.get("popular_items")
    if cached:
        return json.loads(cached)
    # 만료 순간 모든 요청이 여기로 들어온다
    items = db.query_popular_items()
    redis.setex("popular_items", 60, json.dumps(items))
    return items
```

## 해결

두 가지를 적용했다.

1. **TTL Jitter** — 만료 시각을 `60 + random(0, 15)`초로 분산
2. **분산 락** — 캐시 미스 시 한 요청만 DB를 조회하고 나머지는 짧게 대기

```python
def get_popular_items():
    cached = redis.get("popular_items")
    if cached:
        return json.loads(cached)
    if redis.set("lock:popular", 1, nx=True, ex=5):
        items = db.query_popular_items()
        ttl = 60 + random.randint(0, 15)
        redis.setex("popular_items", ttl, json.dumps(items))
        redis.delete("lock:popular")
        return items
    time.sleep(0.05)
    return get_popular_items()
```

> 캐시는 "붙이면 빨라지는 것"이 아니라 만료 시나리오까지 설계해야 하는 시스템이다.

적용 후 캐시 만료 시점의 DB 쿼리 수가 300여 건에서 1건으로 줄었다.
