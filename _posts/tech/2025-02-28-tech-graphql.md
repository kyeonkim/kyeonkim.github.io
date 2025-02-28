---
title: "GraphQL이란? RESTful API와의 차이점부터 기본 개념까지 정리!"
excerpt: "GraphQL은 RESTful API와 무엇이 다른지 비교하고 GraphQL의 핵심 개념인 Query, Mutation, Subscription을 쉽게 정리!"

categories:
  - Tech
tags:
  - [tech, graphql, Mutation, Subscription, RESTful API]

permalink: /tech/graphql/

toc: true
toc_sticky: true

date: 2025-02-28
last_modified_at: 2025-02-28
---

## GraphQL이란?

먼저, GraphQL이 어떻게 등장하게 되었는지 살펴보자.

GraphQL(Query Language) 은 페이스북(Facebook)이 2012년 내부 프로젝트로 개발한 후, 2015년에 오픈소스로 공개한 API 쿼리 언어다.

페이스북은 처음에 RESTful API를 활용해 데이터를 제공했지만, 안드로이드, iOS 등 다양한 클라이언트마다 필요한 데이터의 형태가 달랐다.

이로 인해 각 클라이언트에 맞춰 개별적인 API를 개발해야 했고, 시간이 지날수록 API 엔드포인트가 증가하면서 유지보수 비용도 급격히 증가했다.

이 문제를 해결하기 위해, 클라이언트가 원하는 형태로 데이터를 요청하고 수정할 수 있는 쿼리 언어인 GraphQL이 탄생했다.

그렇다면, GraphQL은 RESTful API와 어떤 차이점이 있을까?

## Query, Mutation, Subscription 개념

## GraphQL vs RESTful API

차이점을 표로 한번 정리해봤다.

| 비교 항목         | GraphQL                             | REST API                             |
|------------------|----------------------------------|----------------------------------|
| **데이터 요청 방식** | 원하는 데이터만 요청 가능              | 정해진 구조의 데이터 반환              |
| **엔드포인트 개수** | 1개 (단일 엔드포인트)              | 여러 개 (리소스별 엔드포인트)          |
| **Over-fetching 문제** | ❌ 해결됨 (필요한 데이터만 요청)       | ✅ 발생 가능 (불필요한 데이터 포함)      |
| **Under-fetching 문제** | ❌ 해결됨 (한 번 요청으로 필요한 데이터 가져옴) | ✅ 발생 가능 (추가 요청 필요)       |
| **버전 관리**      | 필요 없음 (단, 이전 버전 API와 호환성 필요)          | 필요함 (API 버전 v1, v2 등)          |
| **오류 검사**  | 잘못된 요청은 스키마 구조로 거부(이로 인해 오류 메시지 자동 생성) | 클라이언트 측에서 반환된 데이터 유효성 검사 필요     |

## GraphQL vs RESTful API 예제

## GraphQL vs REST API, 어떤 걸 선택할까?

## 참조
[https://www.youtube.com/watch?v=xiE9-S7s9rs](https://www.youtube.com/watch?v=xiE9-S7s9rs)
[https://chanhuiseok.github.io/posts/gql-1/](https://chanhuiseok.github.io/posts/gql-1/)
