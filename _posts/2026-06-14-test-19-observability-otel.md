---
layout: post
title: "OpenTelemetry 도입 3개월 — 트레이스가 문화를 바꿨다"
author: kyeonkim
categories: [ test ]
image: assets/images/1.jpg
description: "로그 grep으로 장애를 추적하던 팀에 분산 트레이싱을 도입했다. 계측 전략, 샘플링 설정, 그리고 예상 못 한 조직 차원의 변화."
---

장애가 나면 서버 5대의 로그를 grep으로 이어 붙이던 팀이었다. OTel 도입 후 가장 크게 바뀐 건 도구가 아니라 대화 방식이었다.

## 계측 전략

처음부터 수동 계측을 하지 않았다. 자동 계측(HTTP, DB, Redis)만 켜고 시작했는데, 이것만으로 전체 요청 흐름의 80%가 보였다.

```yaml
# collector 설정 — tail sampling으로 에러와 느린 요청만 보존
processors:
  tail_sampling:
    policies:
      - name: errors
        type: status_code
        status_code: { status_codes: [ERROR] }
      - name: slow
        type: latency
        latency: { threshold_ms: 1000 }
```

## 예상 못 한 변화

장애 회의에서 "내 서버는 정상이었는데요"라는 말이 사라졌다. 트레이스 하나가 서비스 경계를 넘어 전체 흐름을 보여주니, 책임 공방 대신 병목 지점을 같이 보게 됐다.
