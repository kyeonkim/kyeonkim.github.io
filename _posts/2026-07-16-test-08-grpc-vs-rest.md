---
layout: post
title: "내부 API에 gRPC를 도입하며 배운 것들"
author: kyeonkim
categories: [ test ]
image: assets/images/1.jpg
featured: true
description: "REST로 잘 돌아가던 내부 통신을 gRPC로 바꿀 가치가 있었나? 스키마 강제, 스트리밍, 디버깅 난이도까지 1년 운영 후 솔직한 평가."
---

마이크로서비스 간 내부 통신을 gRPC로 전환한 지 1년이 됐다. 솔직한 평가를 남긴다.

## 좋았던 것

**스키마가 곧 문서다.** proto 파일이 단일 진실 공급원이 되면서 "이 필드 타입이 뭐죠?" 같은 질문이 사라졌다.

```protobuf
service OrderService {
  rpc GetOrder (GetOrderRequest) returns (Order);
  rpc WatchOrders (WatchRequest) returns (stream OrderEvent);
}
```

**서버 스트리밍**이 생각보다 유용했다. 주문 상태 변경을 폴링하던 코드가 스트림 구독 한 줄로 바뀌었다.

## 아쉬웠던 것

- `grpcurl` 없이는 눈으로 요청을 확인할 방법이 없어 디버깅 진입장벽이 있다
- 로드밸런싱이 L4에서 안 되고 클라이언트 사이드 LB가 필요했다
- proto 레포의 버전 관리 규칙을 정하는 데 팀 간 협의가 오래 걸렸다

## 결론

트래픽이 많고 서비스 간 계약이 자주 바뀌는 조직이라면 도입할 가치가 있다. 서비스가 서너 개뿐이라면 REST + OpenAPI로 충분하다.
