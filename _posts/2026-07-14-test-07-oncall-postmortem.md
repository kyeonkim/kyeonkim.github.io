---
layout: post
title: "새벽 3시의 온콜 — 커넥션 풀 고갈 장애 회고"
author: kyeonkim
categories: [ test ]
description: "장애의 원인은 코드 한 줄이 아니라 그 코드가 통과된 과정이었다. 새벽 장애 대응 타임라인과 재발 방지책을 남긴다. 비난 없는 회고(blameless postmortem)를 지향하며 썼다."
---

## 타임라인

- **03:12** — 결제 API 5xx 알림 발생
- **03:20** — 온콜(나) 기상, DB 커넥션 풀 고갈 확인
- **03:41** — 원인 커밋 특정: 트랜잭션 안에서 외부 API를 호출하는 코드
- **03:55** — 롤백 완료, 지표 정상화

## 원인

트랜잭션을 잡은 채 외부 결제사 API를 호출하고 있었다. 결제사 응답이 평소 200ms에서 8초로 느려지자, 커넥션이 8초씩 물려 있으면서 풀이 말라버렸다.

```java
@Transactional
public void confirmPayment(Order order) {
    order.setStatus(CONFIRMED);
    paymentGateway.confirm(order); // 트랜잭션 안에서 외부 호출!
}
```

## 재발 방지

1. 트랜잭션 안 외부 호출을 잡아내는 ArchUnit 테스트 추가
2. 외부 호출 타임아웃을 3초로 강제
3. 커넥션 풀 사용률 80% 알림 추가

> 사람을 탓하면 배울 게 없다. 이 코드가 리뷰를 통과할 수 있었던 구조를 고쳐야 한다.
