---
layout: post
title: "Docker 이미지 1.2GB에서 90MB로 — 멀티스테이지 빌드 실전"
author: kyeonkim
categories: [ test ]
image: assets/images/jumbotron.jpg
description: "Node.js 앱의 도커 이미지를 다이어트한 과정. 멀티스테이지 빌드, distroless 베이스, 레이어 캐시 최적화 순서로 적용했다."
---

배포 시간이 길다는 불만의 근원을 따라가 보니 1.2GB짜리 이미지가 있었다.

## Before

```dockerfile
FROM node:20
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

devDependencies, 소스 전체, npm 캐시까지 모두 이미지에 들어가 있었다.

## After

```dockerfile
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM gcr.io/distroless/nodejs20
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["dist/server.js"]
```

- 빌드 스테이지와 런타임 스테이지 분리
- distroless 베이스로 쉘·패키지 매니저 제거 (보안 보너스)
- `package*.json`을 먼저 COPY해서 의존성 레이어 캐시 유지

결과: **1.2GB → 90MB**, 배포 시간은 절반 이하로.
