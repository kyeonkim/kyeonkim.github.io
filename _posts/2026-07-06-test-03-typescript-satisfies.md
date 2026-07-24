---
layout: post
title: "TypeScript satisfies 연산자, 언제 쓰는 게 맞을까"
author: kyeonkim
categories: [ test ]
description: "as const와 타입 어노테이션 사이의 애매한 영역을 satisfies가 어떻게 채우는지 짧게 정리."
---

`satisfies`는 값의 타입을 넓히지 않으면서 타입 체크만 하고 싶을 때 쓴다.

```typescript
const config = {
  port: 3000,
  host: "localhost",
} satisfies ServerConfig;

config.port; // number가 아니라 3000으로 추론된다
```

타입 어노테이션(`: ServerConfig`)을 쓰면 리터럴 타입이 넓혀지고, `as const`만 쓰면 타입 체크가 없다. `satisfies`는 그 중간이다.

설정 객체, 라우트 테이블처럼 "형태는 강제하되 값의 구체적 타입은 유지하고 싶은" 곳에 가장 잘 맞는다.
