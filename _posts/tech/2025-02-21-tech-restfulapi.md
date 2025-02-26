---
title: "RESTful API 설계 원칙"
excerpt: "해당 글을 통해 RESTful API의 핵심 원칙을 정리하자!"

categories:
  - Tech
tags:
  - [tech, API, RESTful, RESTful API]

permalink: /tech/restfulapi/

toc: true
toc_sticky: true

date: 2025-02-21
last_modified_at: 2025-02-25
---

API를 만들다보면 URL을 어떻게 설계해야 할지 고민되는 순간이 많다.
_/getUserInfo?id=1_ 같은 URL을 써도 될까?
_POST /users/search_ 같은 API는 RESTful할까?
이런 고민이 들었다면 RESTful 설계 원칙을 한 번 점검해볼 필요가 있다.

RESTful API는 단순히 URL을 깔끔하게 만드는 것이 아니라, **일관성 있고 확장 가능한 설계**를 가능하게 해준다.
해당 글을 통해 RESTful API의 핵심 원칙을 정리해보자.

## RESTful API란?

우선 REST의 의미를 알아보자. REST를 풀어보면 **RE**presentational **S**tate **T**ransfer의 약자로 자원을 URI로 '**표현(REpresentational)**'하고, 해당 자원의 '**상태(State)**'를 HTTP를 통해 '**주고받는(Transfer)**' 방식이다.

조금 복잡하게 애기했지만 간단하게 **웹에서 데이터를 주고받는 규칙적인 방법**이라고 말할 수 있다.

규칙적인 방법을 지켜 만든 API를 우린 'RESTful API'라고 부른다. 
바로 RESTful API의 핵심 규칙 6가지를 알아보자.

> **자원(Resource)**이란? API를 통해 접근하고 조작할 수 있는 모든 데이터 단위. 
예를 들어, Velog와 같은 블로그 서비스에서 자원은 사용자(users), 게시글(posts), 댓글(comments) 등이 있다.

## RESTful API의 핵심 규칙 6가지

1. **Uniform Interface(균일한 인터페이스)**
동일한 자원에 대한 모든 API 요청은 중고등학교 때 교복(Uniform)을 입은 것처럼 동일한 방식으로 서버에 접근할 수 있도록 설계하는 것을 말한다. 동일하게 맞출 수 있는 부분은 HTTP 메서드, URI 구조, 응답 형식이 있다.
예를 들어, URI의 구조로 보자.
   - **❌RESTful하지 못한 URI 구조**
  ```bash
  GET /getUser?id=1
  POST /createUser
  DELETE /removeUser?id=1
  ```
      - URI를 보면 API의 동작을 URI에 그대로 노출하고 있어 URI의 구조가 일관적이지 못하다. 

   - **✅RESTful한 URI 구조**
  ```bash
  GET /users/1
  POST /users
  DELETE /users/1
  ```
        - URI는 자원(users)을 나타내고, 조작은 HTTP(GET, POST, DELETE)로 수행하고 있다.
        - 다른 자원도 동일한 구조를 가지므로 사용자는 URI만 보고 API를 쉽게 이해하고 사용할 수 있다.

2. **Client-Server Architecture(클라이언트-서버의 분리 구조)**
클라이언트와 서버는 서로 완전히 독립적이다. 클라이언트에서 알 수 있는 유일한 정보는 요청할 자원의 URI다. 서버도 HTTP를 통해 요청된 자원을 클라이언트에 전달하는 것 외에는 클라이언트를 수정해서는 안된다.

3. **Stateless(무상태성)**
서버는 클라이언트 요청과 관련된 데이터를 저장할 수 없다. 즉, 각 요청에는 처리에 필요한 모든 정보가 포함되어야 한다. 예를 들어, JWT 같은 토큰 기반 인증을 사용한다면 요청 헤더에는 다음과 같은 정보가 포함된다.
 ```http
 Authorization: Bearer <JWT_TOKEN>
 ```
   
4. **Cacheable (캐시 가능성)**
가능한 경우 클라이언트나 서버 측에서 리소스를 캐시할 수 있어야 한다. 서버 응답에는 전달된 리소스에 대해 캐싱이 가능한지에 대한 여부의 정보도 표함되어야 한다. 목표는 클라이언트 측의 성능을 향상시키는 동시에 서버 측의 확장성을 높이는 것이다.

5. **Layered System (계층화 구조)**
클라이언트는 자신이 직접 통신하는 서버 외에는 알 필요가 없게 설계되어야 한다. 즉, 실제 서버에 직접 연결되었는지, 또는 중간 서버(로드 밸런싱이나 공유 캐시 기능을 사용한 서버)를 거쳐서 연결되었는지 알 필요가 없다. 요청이나 응답이 특정 서버에서 실행되더라도 다른 서버에 영향을 주지 않는다.

6. **Code on Demand (선택사항)**
서버는 일반적으로 정적 리소스(HTML, JSON, XML 등)를 클라이언트로 전송하지만 선택적으로 서버가 클라이언트에게 실행 가능한 코드(JavaScript, Java 애플릿, WebAssembly 등)를 보내고, 클라이언트가 이를 실행할 수 있다. 이는 클라이언트의 기능을 확장하거나, 동적인 기능을 추가할 때 유용하게 활용될 수 있다.

    예를 들어, 서버에서 다음과 같이 코드를 보낸다면
    ```html
    <script src="https://example.com/validateForm.js"></script>
    ```
    클라이언트는 위에 `validateForm.js`를 실행한 후 결과값을 서버로 전송한다.

    다만, 위의 규칙들을 보면 REST는 클라이언트가 서버와 독립적으로 동작해야 하지만 클라이언트가 서버에서 받은 코드에 의해 동작할 수 있으므로 규칙에 어긋난다. 또한, 보안적으로도 문제가 발생할 수 있기에 일반적으로 잘 사용되지 않는다.


## 마무리

RESTful API는 일관성, 확장성, 성능 최적화, 보안 강화 등 다양한 이점을 제공하는 강력한 설계 방식이다.
특히, 웹, 모바일, 마이크로서비스 등 다양한 환경에서 효율적으로 동작할 수 있어 현대적인 서비스 개발에 필수적이다.

하지만, RESTful API를 제대로 설계하려면 URI 구조, HTTP 메서드 활용, 응답 코드, 보안 등 여러 가지 원칙을 신경 써야 한다.

좋은 API 설계는 협업과 유지보수성을 높여준다. RESTful 원칙을 지키면서 효율적인 API를 만들어보자.

## 참조
[https://www.ibm.com/kr-ko/topics/rest-apis](https://www.ibm.com/kr-ko/topics/rest-apis)  
[https://namu.wiki/w/REST](https://namu.wiki/w/REST)  
[https://ko.wikipedia.org/wiki/REST](https://ko.wikipedia.org/wiki/REST)  
[https://aws.amazon.com/ko/what-is/restful-api/](https://aws.amazon.com/ko/what-is/restful-api/)
