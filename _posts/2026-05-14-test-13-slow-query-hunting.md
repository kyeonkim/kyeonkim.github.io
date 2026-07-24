---
layout: post
title: "슬로우 쿼리 사냥 일지 — pg_stat_statements로 범인 찾기"
author: kyeonkim
categories: [ test ]
image: assets/images/jumbotron.jpg
description: "API p99가 3초를 넘던 서비스에서 pg_stat_statements로 상위 쿼리를 추적하고, N+1과 누락된 인덱스를 잡아 p99를 400ms로 내린 기록. 도구 사용법보다 '무엇부터 볼 것인가'의 순서를 남긴다."
---

API p99가 3초를 넘었다. APM만 보고는 원인을 못 찾아서 DB 레벨로 내려갔다.

## pg_stat_statements 상위 쿼리부터

```sql
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

`total_exec_time` 기준으로 정렬하는 게 핵심이다. 한 번에 느린 쿼리보다, 빠르지만 수만 번 불리는 쿼리가 진짜 범인인 경우가 많다.

## 발견한 것

1. ORM이 만든 N+1 — 목록 API 한 번에 같은 쿼리가 200회 호출
2. `WHERE status = 'active' AND created_at > ?` 에 복합 인덱스 누락

둘을 고치자 p99가 3.2초에서 400ms로 내려왔다.

> 느린 API의 원인은 대부분 "느린 쿼리 하나"가 아니라 "빠른 쿼리 수백 개"다.
