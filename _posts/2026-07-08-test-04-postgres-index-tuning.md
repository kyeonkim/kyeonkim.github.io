---
layout: post
title: "PostgreSQL 인덱스 튜닝으로 쿼리 12초를 80ms로 줄인 이야기"
author: kyeonkim
categories: [ test ]
image: assets/images/1.jpg
description: "EXPLAIN ANALYZE를 읽는 법부터 부분 인덱스와 커버링 인덱스 적용까지, 실제 슬로우 쿼리 하나를 끝까지 추적한 기록. 실행 계획에서 Seq Scan을 발견하고 이를 Index Only Scan으로 바꾸기까지의 전 과정을 담았다."
---

주문 내역 조회 API가 특정 조건에서 12초씩 걸린다는 제보를 받았다.

## 범인 찾기

```sql
EXPLAIN ANALYZE
SELECT id, status, created_at FROM orders
WHERE user_id = 42 AND status = 'pending'
ORDER BY created_at DESC LIMIT 20;
```

실행 계획을 보니 `Seq Scan on orders`가 떡하니 있었다. 3천만 행을 전부 훑고 있었던 것.

## 1차 시도: 복합 인덱스

```sql
CREATE INDEX idx_orders_user_status ON orders (user_id, status, created_at DESC);
```

12초가 300ms로 줄었다. 하지만 아직 `Index Scan` 후 heap fetch가 남아 있었다.

## 2차 시도: 커버링 인덱스

조회 컬럼이 세 개뿐이라 INCLUDE로 커버링 인덱스를 만들었다.

```sql
CREATE INDEX idx_orders_covering
ON orders (user_id, status, created_at DESC)
INCLUDE (id);
```

`Index Only Scan`으로 바뀌며 80ms까지 내려왔다.

## 배운 것

- 인덱스는 WHERE 절 순서가 아니라 **선택도(selectivity)** 순서로 설계한다
- `pending` 상태만 자주 조회한다면 부분 인덱스(`WHERE status = 'pending'`)가 더 작고 빠르다
- 인덱스를 추가하면 쓰기 비용이 늘어난다는 것을 항상 기억할 것
