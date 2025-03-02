---
title: "쿠폰 발급 시 동시성 문제 해결 및 처리량 증가 – 분산 락과 카프카 적용"
excerpt: "대규모 트래픽 처리를 위한 MSA기반 온라인 쇼핑몰 프로젝트에서 나온 트러블슈팅을 정리한 글입니다."

categories:
  - Projects
tags:
  - [projects, troubleshooting, lock, kafka]

permalink: /projects/projects-troubleshooting-1/

toc: true
toc_sticky: true

date: 2025-02-21
last_modified_at: 2025-02-21
---

# 문제 정의

분산 서버 환경인 쇼핑몰에서 쿠폰 발급 기능을 구현할 때, 쿠폰 수량이 공유 자원이기 때문에 동시성 이슈가 발생했다. 락을 사용하여 해결하려고 했고 낙관적 락과 비관적 락을 찾아보았다.

낙관적 락과 비관적 락을 비교해보니

**낙관적 락**의 경우, version으로 관리하고 락을 걸지 않기에 성능이 좋아 **데이터 충돌이 적은** 곳에서 사용되고,

**비관적 락**의 경우, DB에 직접 락을 걸기에 **데이터 충돌이 잦은** 곳에서 **데이터 일관성을 보장**할 수 있었다.

쿠폰 발급의 경우, 고객들이 짧은 시간 안에 많은 요청이 몰릴 수 있으므로 데이터 충돌이 잦았고 **비관적 락을 통해 동시성 이슈를 해결**할 수 있었다.

# 기존 해결책의 한계

비관적 락을 통해 동시성 이슈를 해결할 수 있었지만 **대규모 트래픽 상황**에서 쿠폰 발급 시 락을 걸다보니 요청이 몰리게 되면 **트랜잭션에 지연이 발생**하여 요청이 많아지면 많아질수록 **성능이 매우 저하**되었다.

또한, 쿠폰 DB를 **분산 서버 환경** 으로 확장할 경우, **복잡성이 크게 증가**하였다.

# 새로운 해결 방법

분산 서버 환경에는 비관적 락을 사용하는게 아니라 인메모리 서버(redis)를 통해 **분산 락 환경**을 구성하고

**카프카**를 사용하여 **쿠폰 발급 처리량을 향상**시키려고 한다.

# 개선 효과 및 비교

테스트 환경 - 쿠폰 1000개 발급 요청(100명의 사용자가 10번씩 요청)

- 기존  
![image (5) (2)](https://github.com/user-attachments/assets/04a4c8ed-5baa-4f0a-a23e-3cbda6d7a31b)

- 개선   
![image (2) (1)](https://github.com/user-attachments/assets/7fc8b240-942e-4480-ac63-74d58233672c)


분산락과 Kafka 도입 후 쿠폰 발급 API에 많은 요청이 발생해도 동시성 이슈가 발생하지 않으며
처리량이 50/sec > 222/sec 으로 약 **340%** 이상 향상
