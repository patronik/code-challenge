# Book service 

## Overview

This service implements CRUD for book entity. It's written in Typescript and based on Express.js framework. It uses sqlite database as data storage.

---

### Build and Run

```
$ git clone https://github.com/patronik/code-challenge
$ cd src/problem5
$ npm install
$ node build/src/app.js 
```

### Endpoints 

|HTTP Method|URL|Body|Description|
|---|---|---|---|
|`POST`|http://localhost:3000/book | `{"name":"book name", "author":"book author"}` |Create new book |
|`GET`|http://localhost:3000/book/{bookId} | |Get book by ID |
|`GET`|http://localhost:3000/book?author={authorName}&name={bookName} | |Get All books with optional filtering |
|`PUT`|http://localhost:3000/book/{bookId} | `{"id": "book id", "name":"new name", "author":"new author"}` | Update book by ID |
|`DELETE`|http://localhost:3000/book/{bookId} | |Delete book by ID |
