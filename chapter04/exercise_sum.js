const http = require("http");
const url = require("url");
var querystring = require("querystring");
//#region
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
