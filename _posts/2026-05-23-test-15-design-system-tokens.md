---
layout: post
title: "디자인 토큰 도입기 — 색상 하드코딩 470곳을 지우며"
author: kyeonkim
categories: [ test ]
image: assets/images/1.jpg
description: "다크 모드 요구사항이 떨어지고 나서야 색상 하드코딩의 빚을 갚기 시작했다. 토큰 계층 설계와 점진적 마이그레이션 전략."
---

"다크 모드 지원해주세요" 한 마디에 코드베이스를 뒤져보니 `#333` 같은 하드코딩이 470곳이었다.

## 토큰 계층

토큰을 세 층으로 나눴다.

- **Primitive**: `gray-900`, `blue-500` — 원시 값
- **Semantic**: `text-primary`, `surface-elevated` — 의미
- **Component**: `button-bg-hover` — 컴포넌트 전용

컴포넌트 코드는 semantic 층만 참조하게 강제했다. 다크 모드는 semantic 토큰의 매핑만 바꾸면 끝난다.

## 마이그레이션

한 번에 다 바꾸는 대신 stylelint 커스텀 룰로 신규 하드코딩만 막고, 기존 코드는 화면 단위로 갈아탔다. 8주 걸렸다.

> 디자인 토큰의 가치는 색상 관리가 아니라 "디자인 결정을 코드로 추적 가능하게 만드는 것"에 있다.
