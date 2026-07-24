---
layout: post
title: "Kafka Consumer Lag 알람이 새벽 3시에 울린 이유"
author: kyeonkim
categories: [ test ]
image: assets/images/1.jpg
description: "컨슈머 랙이 급증한 원인은 파티션 리밸런싱 폭풍이었다. max.poll.interval.ms 튜닝과 배치 크기 조정으로 잡은 과정."
---

새벽 3시, 컨슈머 랙이 200만을 넘겼다는 알람이 울렸다. 원인은 리밸런싱 폭풍이었다.

## 증상

특정 컨슈머 그룹에서 리밸런싱이 수 분 간격으로 반복됐고, 그때마다 처리량이 0으로 떨어졌다.

## 원인

배치 하나를 처리하는 데 `max.poll.interval.ms`(기본 5분)를 넘기는 경우가 있었고, 브로커가 해당 컨슈머를 죽은 것으로 판단해 리밸런싱을 트리거했다.

```properties
max.poll.records=100
max.poll.interval.ms=600000
```

배치 크기를 500에서 100으로 줄이고 인터벌을 10분으로 늘리자 리밸런싱이 멈췄고, 랙은 30분 만에 해소됐다.

> 컨슈머 랙 알람은 랙 자체보다 "랙이 줄지 않는 추세"를 봐야 한다.
