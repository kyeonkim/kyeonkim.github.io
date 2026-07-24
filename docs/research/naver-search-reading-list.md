# 사전 조사 읽기 목록 — 네이버 검색

읽고 요약해서 공유하기로 한 목록. 우선순위(★)와 "이 자료에서 뽑아낼 것"을 함께 표기.
1차 자료(네이버 발표/공식)와 2차 자료(언론/커뮤니티)를 구분했다 — 2차 자료는 글에 쓸 때 사실 검증 필요.

## A. 역사·배경 (글 도입부 재료)

| ★ | 자료 | 종류 | 뽑아낼 것 |
|---|---|---|---|
| ★★★ | [나무위키 — 네이버(기업)/역사](https://namu.wiki/w/%EB%84%A4%EC%9D%B4%EB%B2%84(%EA%B8%B0%EC%97%85)/%EC%97%AD%EC%82%AC) | 2차 | 1999년 전후 타임라인, 엠파스 자연어 검색 경쟁, 이준호 교수·서치솔루션 창업 스토리. **사실 검증 필수** |
| ★★★ | [전자신문 — 네이버, 검색기술 자회사 '서치솔루션' 합병 (2021)](https://m.etnews.com/20210721000235) | 2차(언론) | 서치솔루션이 2000년 설립~2021년 합병까지 존재했다는 사실 확인. "자체 검색기술 조직"의 실체 |
| ★★ | [위키백과 — 네이버](https://ko.wikipedia.org/wiki/%EB%84%A4%EC%9D%B4%EB%B2%84) | 2차 | 기본 연혁 팩트체크용 |
| ★★ | [전경련 기업사박물관 — 1999년 네이버/다음 검색포털 서비스 시작](https://www.fki-emuseum.or.kr/main/themeHall/incident_12.do) | 2차 | 1999년 당시 검색포털 시장 맥락 |
| ★ | [AI타임스 — 검색의 역사 프롤로그](https://www.aitimes.com/news/articleView.html?idxno=149847) | 2차 | 검색 기술 전반의 흐름 속에서 네이버 위치 잡기 |

## B. 네이버 검색 아키텍처 (1차 자료 — 글의 뼈대)

| ★ | 자료 | 종류 | 뽑아낼 것 |
|---|---|---|---|
| ★★★ | [DEVIEW — 밑바닥부터 만드는 지도 장소 검색 (PDF)](https://deview.kr/data/deview/session/attach/1400_T4_%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A5%E1%86%BC%E1%84%86%E1%85%B5%E1%86%AB_%E1%84%86%E1%85%B5%E1%87%80%E1%84%87%E1%85%A1%E1%84%83%E1%85%A1%E1%86%A8%E1%84%87%E1%85%AE%E1%84%90%E1%85%A5%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%8C%E1%85%B5%E1%84%83%E1%85%A9%20%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A9%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20(%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A5%E1%84%8C%E1%85%B5%E1%84%83%E1%85%A9%20%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%89%E1%85%A5%E1%84%8E%E1%85%B5).pdf) | 1차 | **우리 클론과 가장 유사한 문제**: 네이버 엔지니어가 색인·검색을 밑바닥부터 만든 과정. 클론 설계에 직접 참고 |
| ★★★ | [DEVIEW — 사용자 의도와 취향을 이해하는 네이버 통합검색 (PDF)](https://deview.kr/data/deview/session/attach/6_%EC%82%AC%EC%9A%A9%EC%9E%90%20%EC%9D%98%EB%8F%84%EC%99%80%20%EC%B7%A8%ED%96%A5%EC%9D%84%20%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94%20%EB%84%A4%EC%9D%B4%EB%B2%84%20%ED%86%B5%ED%95%A9%EA%B2%80%EC%83%89.pdf) | 1차 | 통합검색 구조 — 질의가 어떤 단계를 거치는지 |
| ★★ | [DEVIEW — 검색어 의도 분석 D.I.A.+ (PDF)](https://deview.kr/data/deview/session/attach/1500_T4_%EB%B0%95%EC%A7%80%ED%98%84_%EB%88%88%EC%B9%98%EA%B9%8C%EC%A7%80%20%EC%B1%99%EA%B8%B4%20D.I.A.+%20%EC%8B%9C%EC%8A%A4%ED%85%9C,%20%EC%8B%B9%20%EB%8B%A4%20%EC%B0%BE%EC%95%84%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4(%EA%B2%80%EC%83%89%EC%96%B4%20%EC%9D%98%EB%8F%84%20%EB%B6%84%EC%84%9D%EA%B3%BC%20%EB%AC%B8%EC%84%9C%20%EC%9D%B4%ED%95%B4%20%EA%B8%B0%EC%88%A0,%20%EB%84%A4%EC%9D%B4%EB%B2%84%20%EA%B2%80%EC%83%89%EC%97%90%20%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0).pdf) | 1차 | 랭킹이 키워드 매칭을 넘어 어디까지 가 있는지 (글 "현재 스택" 섹션) |
| ★★ | [DEVIEW 2021 — 네이버 검색 모니터링 시스템 구축기](https://deview.kr/2021/sessions/506) | 1차 | 검색 시스템의 운영 규모 감 — "서비스하려면 무엇이 필요한가" 관점 |
| ★ | [DEVIEW 2021 — 300억 벡터 서빙, ColBERT 벡터 검색](https://deview.kr/2021/sessions/486) | 1차 | 최신 방향(벡터 검색). 글 말미 "지금의 네이버 검색" 재료 |

## C. 한국어 처리 (indexer 모듈 재료)

| ★ | 자료 | 종류 | 뽑아낼 것 |
|---|---|---|---|
| ★★★ | [Elastic 가이드북 — 노리(nori) 한글 형태소 분석기](https://esbook.kimjmin.net/06-text-analysis/6.7-stemming/6.7.2-nori) | 기술문서 | 실전 한글 분석기가 하는 일(복합어 분해, 품사 필터). 우리 "간단 구현"이 무엇을 생략하는지 기준선 |
| ★★ | [GeekNews — Kiwi 지능형 한국어 형태소 분석기](https://news.hada.io/topic?id=18020) | 커뮤니티 | 형태소 분석기 설계 이슈들 |
| ★★ | [이파트 — 형태소 분석기의 한계와 토크나이저의 진화](https://epart.com/%EA%B2%80%EC%83%89-%EC%97%94%EC%A7%84-%EB%B6%84%EC%84%9D%EC%9C%BC%EB%A1%9C-%EC%82%B4%ED%8E%B4%EB%B3%B4%EB%8A%94-%ED%98%95%ED%83%9C%EC%86%8C-%EB%B6%84%EC%84%9D%EA%B8%B0%EC%9D%98-%ED%95%9C%EA%B3%84/) | 2차 | n-gram vs 형태소 분석 vs subword 트레이드오프 — 우리가 택한 n-gram 방식의 위치 |

## D. 검색 엔진 이론·구현 (클론 전체의 교과서)

| ★ | 자료 | 종류 | 뽑아낼 것 |
|---|---|---|---|
| ★★★ | [Stanford — Introduction to Information Retrieval (무료 원서)](https://nlp.stanford.edu/IR-book/) | 교과서 | 역색인(1~5장)·랭킹(6장)·평가(8장). 전부 읽지 말고 해당 모듈 직전에 해당 장만 |
| ★★★ | [ethen8181 — BM25 소개](https://ethen8181.github.io/machine-learning/search/bm25_intro.html) | 튜토리얼 | TF-IDF → BM25 수식 유도. searcher 모듈 직전 필독 |
| ★★ | [mbrenndoerfer — BM25 완전 가이드](https://mbrenndoerfer.com/writing/bm25-search-algorithm-elasticsearch-implementation) | 튜토리얼 | 길이 정규화·포화 파라미터(k1, b) 직관 |
| ★★ | [dev.to — Build a Search Engine from Scratch](https://dev.to/mshojaei77/build-a-search-engine-from-scratch-1jf) | 튜토리얼 | 전체 파이프라인 조감도 — 시작 전 워밍업용 |
| ★ | [gaoalexander/web-search-engine (GitHub)](https://github.com/gaoalexander/web-search-engine) | 코드 | 실전급 구현 예 (varbyte 압축 색인, Common Crawl). 우리 설계와 비교용 |

## 읽는 순서 제안

(글이 "기술 우선" 구성으로 바뀌어 A그룹은 후순위가 됐다 — 역사는 말미 회고 재료)

1. **지금 (아웃라인 확정 전)**: D의 dev.to 조감도 + B의 "밑바닥부터 만드는 지도 장소 검색" → 기술 본론의 뼈대
2. **클론 설계 직전**: B의 통합검색 PDF
3. **모듈 진행하며**: C는 indexer 직전, D의 BM25 두 편은 searcher 직전, IR-book은 모듈별 해당 장만
4. **말미 회고 쓰기 전**: A 전부 — "왜 이 기술이 나왔고 왜 많이 쓰였나" 회고 재료

## 메모

- 네이버 D2(d2.naver.com)와 네이버 검색 공식 블로그는 검색 노출이 약해 직접 둘러보는 게 좋다.
  d2.naver.com에서 "검색", "색인", "형태소" 키워드로 훑어보고 좋은 글 발견하면 이 목록에 추가할 것.
- 나무위키·커뮤니티 자료의 스토리(이준호 교수, 엠파스 경쟁 등)는 글에 쓰기 전 교차 검증 필요.
