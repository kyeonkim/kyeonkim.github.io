---
layout: post
title: "멀티레포에서 모노레포로 — 6개월간의 마이그레이션 기록"
author: kyeonkim
categories: [ test ]
image: assets/images/jumbotron.jpg
featured: true
description: "레포 12개를 하나로 합치면서 겪은 CI 시간 폭발, 코드 오너십 충돌, 그리고 그걸 해결한 도구 선택 이야기."
---

레포 12개로 쪼개진 코드베이스를 하나의 모노레포로 합쳤다. 결론부터 말하면 만족하지만, 과정은 순탄하지 않았다.

## 왜 합쳤나

- 공통 라이브러리 버전이 레포마다 달라 배포마다 호환성 이슈가 터졌다
- 하나의 기능 변경이 PR 4개로 쪼개지는 일이 잦았다
- 신규 입사자가 개발 환경을 갖추는 데 이틀이 걸렸다

## 어떻게 합쳤나

git 히스토리를 보존하기 위해 `git subtree`로 각 레포를 서브디렉토리로 이식했다.

```bash
git subtree add --prefix=packages/auth git@github.com:org/auth.git main
```

빌드 도구는 Turborepo를 선택했다. Nx와 비교했을 때 러닝커브가 낮고 기존 npm scripts를 거의 그대로 쓸 수 있다는 점이 결정적이었다.

## 가장 아팠던 것: CI 시간

합치자마자 CI가 40분을 넘겼다. 해결책은 affected 기반 빌드였다.

> 모노레포의 CI는 "전부 빌드"가 아니라 "바뀐 것만 빌드"가 기본값이어야 한다.

변경된 패키지와 그 의존 그래프만 빌드하도록 바꾼 뒤 평균 CI 시간은 8분으로 내려왔다.

## 남은 숙제

코드 오너십 경계가 흐려지는 문제는 CODEOWNERS 파일로 어느 정도 막았지만, "누구나 고칠 수 있다"와 "아무도 책임지지 않는다" 사이의 균형은 여전히 고민 중이다.
