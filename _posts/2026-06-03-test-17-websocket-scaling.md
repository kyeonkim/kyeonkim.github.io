---
layout: post
title: "WebSocket 서버 수평 확장 — sticky session 없이 살아남기"
author: kyeonkim
categories: [ test ]
image: assets/images/jumbotron.jpg
description: "실시간 알림 서버를 여러 대로 늘리는 순간 메시지가 유실되기 시작했다. Redis Pub/Sub으로 서버 간 브로드캐스트를 붙인 이야기."
---

알림 서버를 2대로 늘리자마자 "알림이 안 와요" 문의가 들어왔다. 유저 A의 소켓은 1번 서버에, 이벤트는 2번 서버에 도착하고 있었다.

## 해결: 서버 간 브로드캐스트

각 서버가 Redis Pub/Sub 채널을 구독하고, 이벤트가 어느 서버에 도착하든 전체 서버로 전파하게 했다.

```javascript
sub.subscribe("notifications");
sub.on("message", (channel, msg) => {
  const { userId, payload } = JSON.parse(msg);
  const socket = localSockets.get(userId);
  if (socket) socket.send(payload);
});
```

## 남은 고민

- 전 서버 브로드캐스트라 서버가 늘수록 낭비가 커진다 — 다음 단계는 유저-서버 매핑을 Redis에 두는 방식
- 재연결 시 놓친 메시지 복구는 아직 클라이언트 폴링에 의존한다

sticky session은 결국 안 썼다. 배포 시 연결이 한 서버에 쏠리는 문제가 더 아팠기 때문이다.
