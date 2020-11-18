const http = require("http");
const url = require("url");
var querystring = require("querystring");
//#region get방식
var server = http
  .createServer(function (req, res) {
    if (req.method.toLowerCase() === "get") {
      var parsedUrl = url.parse(req.url); // url parsing
      var qs = querystring.parse(parsedUrl.query); // querystring parsing
      if (qs.num1 && qs.num2) {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        var [num1, num2] = [parseInt(qs.num1), parseInt(qs.num2)];
        if (!Number.isNaN(num1) && !Number.isNaN(num2)) {
          res.write(`<html><body><h1>results : ${num1 + num2}</h1><ul>`);
        } else {
          res.write(`<html><body><h1>results : Not a number</h1><ul>`);
        }
      } else {
        showForm(res);
      }
      res.end(`</body></html>`);
    }
  })
  .listen(8080, function () {
    console.log("8080 포트에서 대기중");
  });
//#endregion

//#region 2. post 방식으로 넘어온 두 값(start, end)을 활용하여 두 값 사이의 합계 구하기
var fs = require("fs");

var server = http
  .createServer((req, res) => {
    if (req.method.toLowerCase() === "post") {
      var body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        var data = querystring.parse(body); // num1=1&num2=100 => {'num1':1, 'num2':2}
        var num1 = parseInt(data.num1);
        var num2 = parseInt(data.num2);

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        if (Number.isNaN(num1) || Number.isNaN(num2)) {
          res.end("잘못된 숫자가 입력되어 에러가 발생함.");
        } else {
          var sum = 0;
          for (var i = num1; i <= num2; i++) sum += i;
          res.end(`${num1} ~ ${num2}의 합계: ${sum}`);
        }
      });
    } else {
      if (req.url === "/") {
        fs.readFile("./sum.html", (err, data) => {
          res.end(data);
          return;
        });
      }
    }
  })
  .listen(8080, () => console.log("8080 포트에서 대기중"));
//#endregion

function showForm(res) {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.write(`<html><body><h1>두 숫자 합구하기</h1><ul>`);
  res.write(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
      </head>
      <body>
        <h1>두 숫자 사이의 합계 구하기</h1>
        <form method="get" action="http://localhost:8080">
          <p>start number : <input type="text" name="num1" /></p>
          <p>end number : <input type="text" name="num2" /></p>
          <input type="submit" value="합계 구하기" />
        </form>
      </body>
    `);
  res.end(`</html>`);
}

const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const url = require("url");
const PORT = 8080;

const server = http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }
    var result = 0;
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    fs.createReadStream("./calculator.html").pipe(res);
    var parsedUrl = url.parse(req.url);
    var parsedQuery = querystring.parse(parsedUrl.query, "&", "=");
    if (parsedQuery.operator == "add") {
      result = parseInt(parsedQuery.num1, 10) + parseInt(parsedQuery.num2, 10);
      showForm(res, result);
    } else if (parsedQuery.operator == "subtract") {
      result = parseInt(parsedQuery, num1, 10) - parseInt(parsedQuery.num2, 10);
      showForm(res, result);
    } else if (parsedQuery.operator == "multiply") {
      result = parseInt(parsedQuery, num1, 10) * parseInt(parsedQuery.num2, 10);
      showForm(res, result);
    } else if (parsedQuery.operator == "divide") {
      result = parseInt(parsedQuery, num1, 10) / parseInt(parsedQuery.num2, 10);
      showForm(res, result);
    }
  })
  .listen(PORT, () => {
    console.log("Server listening on port");
  });

const showForm = (res, result) => {
  res.write(`<h1>result : ${result}</h1>`);
  res.end(`<a href='http://localhost:${PORT}>돌아가기</a>`);
};
