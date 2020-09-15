## 1. DATA SCHEMA

### 1) User DATA

- email : String
- password : String
- birthYear : Number
- gender : String (male : female)
- stars : Array[{coffeeId : String, points: Number}]
  - 유저가 별점을 준 커피와 그 점수의 리스트
- likes : Array[coffeeId : String]
  - 유저가 나의 메뉴에 등록한 커피 리스트


### 2) Coffee DATA

- coffeeName : String
- cafeId : String
  -커피를 판매하는 카페의 ID
- points : Array[{userId : String, point : Number}]
  -유저가 준 별점 리스트

### 3) Cafe DATA

- cafeName : String

---

## 2. APIS

### 1) User API


### 2) Coffee API


