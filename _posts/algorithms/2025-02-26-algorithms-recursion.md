---
title: "재귀 호출(Recursion Call) 정리 - 개념부터 실전 활용까지(with Java)"
excerpt: "재귀(Recursion Call)에 대해 알아보자!"

categories:
  - Algorithms
tags:
  - [algorithms, recursion funtion, recursion call, recursion]

permalink: /algorithms/recursion/

toc: true
toc_sticky: true

date: 2025-02-26
last_modified_at: 2025-02-27
---

## 재귀 호출(Recursion Call)이란?

함수란 무엇일까? 함수란 하나의 작업을 수행하기 위해 독립적으로 설계된 프로그램 코드의 집합이다.
재귀 호출(recursion call)은 함수 내부에서 자기 자신을 호출하는 행위를 말한다.

예제 코드를 한번 보자.

```java
public static void recursionFunction(int n) {
  if (n == 0) {
    return;
  }
  System.out.println("Recursion call with n = " + n);
  recursionFunction(n - 1);
}
```
코드를 보면 recursionFunction 함수 안에서 recursionFunction을 부르고 있는 형태를 볼 수 있다.

recursionFunction(3)을 실행해보면 결과값은 다음과 같이 출력 될 것이다.
```
Recursion call with n = 3
Recursion call with n = 2
Recursion call with n = 1
```
n이 0이 되면서 조건문에 걸리므로 0은 출력되지 않는다.

이와 같이 자기 자신을 호출하는 동작을 재귀 호출이라고 하며, 재귀 호출을 포함한 함수를 재귀 함수라고 부른다.


## 기본 조건(Base Case)와 재귀 조건(Recursive Case)

위 예제 코드에서 if 문을 제거하면 어떻게 될까?
함수 내부에서 계속해서 자기 자신을 호출하기 때문에 무한 루프에 빠져 Stack Overflow가 발생할 것이다.

하지만 if 문이 존재하기 때문에 재귀 함수가 종료될 수 있다.

그렇다면 이번엔 if 문을 그대로 두고 n - 1을 n으로 변경해보자.
이 경우, n의 값이 줄어들지 않으므로 Base Case가 절대 만족되지 않아 무한 루프에 빠진다.

즉, n - 1을 통해 n이 점점 줄어들면서 Base Case가 만족될 수 있도록 설계해야 한다.

이처럼, 재귀 함수가 종료되도록 하는 조건을 기본 조건(Base Case)라고 하며,

Base Case에 도달하도록 입력 값을 점진적으로 변화시키는 과정을 재귀 조건(Recursive Case)이라고 부른다.

## 재귀 함수의 기본 예제

- 팩토리얼 (Factorial)
- 피보나치 수열 (Fibonacci)
- 숫자의 합 구하기 (Sum of Digits)

## 재귀 호출을 활용한 알고리즘

- 하노이의 탑 (Tower of Hanoi)
- 이진 탐색 (Binary Search)
- DFS (깊이 우선 탐색)

## 재귀 호출의 장점과 단점

### 장점

### 단점

- 재귀의 성능 문제 (Stack Overflow)

## 재귀 호출의 성능 최적화 방법

- 메모이제이션 (Memoization)
- 동적 계획법 (Dynamic Programming)
- 꼬리 재귀 (Tail Recursion)

## 실전에서 재귀가 활용되는 사례

- 트리(Tree) 탐색
- 그래프(Graph) 탐색
- JSON 파싱
- 컴파일러의 AST 트리 분석

## 참조

[https://www.tcpschool.com/c/c_function_recursive](https://www.tcpschool.com/c/c_function_recursive)
[https://m.blog.naver.com/dlscjs8646/222173331312](https://m.blog.naver.com/dlscjs8646/222173331312)