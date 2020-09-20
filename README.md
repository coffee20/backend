# ☕ 취향기반 음료 추천 앱 (Back-end)

#### [AWS주소](http://ec2-3-34-96-202.ap-northeast-2.compute.amazonaws.com/), [API문서](./docs/API.md) 

## Install

#### 기본 설치 : [git](https://git-scm.com/downloads), [node](https://nodejs.org/ko/download/), [yarn](https://yarnpkg.com/getting-started/install#global-install)(필수는 아님)

```
// git clone
mkdir <dir_name>
cd <dir_name>
git clone https://github.com/s4ng/coffee.git
```

### install dependencies
```
// 1. npm
npm i

//2. yarn
yarn
```

## start
```
// dev
yarn dev

//start
yarn start
```

## AWS 명령어

```
// git pull
cd backend/
// git remote add origin https://github.com/masillab/backend.git
git fetch
// git pull -u origin master
git pull 

// kill running process
ps -ef
sudo kill -9 <running node process ID>

// run new app
sudo nohup node app.js &

// exit
exit
```
