---
layout: post
title: "Terraform state 꼬임 사고와 복구, 그리고 재발 방지"
author: kyeonkim
categories: [ test ]
description: "두 사람이 동시에 apply를 돌리다 state가 꼬였다. state 잠금, 모듈 분리, plan 리뷰 문화까지 이어진 재발 방지책 정리."
---

동료와 내가 같은 워크스페이스에 동시에 `terraform apply`를 돌렸고, state가 꼬이면서 로드밸런서 설정이 날아갔다.

## 복구

다행히 S3 백엔드의 버전닝이 켜져 있었다. 이전 버전 state를 내려받아 복원했다.

```bash
aws s3api get-object --bucket tf-state --key prod/terraform.tfstate \
  --version-id <previous-version> restored.tfstate
```

## 재발 방지

1. DynamoDB 기반 state lock 활성화 — 애초에 이게 없었던 게 문제
2. 거대한 단일 state를 네트워크/컴퓨트/데이터 3개 모듈로 분리
3. apply는 CI에서만, 로컬에서는 plan까지만

사고 이후 로컬 apply를 막는 게 가장 큰 변화였다. 불편해졌지만 사고는 다시 없었다.
