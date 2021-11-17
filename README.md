# ToDo aplication test

the only requirement you will need is to have docker and docker-compose correctly installed on your computer. Follow the next steps:

## Installation

0. install dependencies into todo.react and todo.api folders

```sh
cd todo.api
npm install
cd todo.react
npm install
```

1. run the following command in your terminal

```sh
docker-compose -f "docker-compose.yml" up -d --build
```

2. Enter this url in your browser

```sh
http://localhost:3000/
```
