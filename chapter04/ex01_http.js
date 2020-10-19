const http = require("http");

//#region 1. http 서버 구동 방식
// const server = http.createServer();

// // 클라이언트의 요청이 있으면 발생
// server.on("request", (req, res) => {
//   res.write("<h1>Welcome ");
//   res.end("to my server");
// });

// server.on("listening", () => console.log("8080 포트에서 대기중"));
// server.listen(8080);
//#endregion

//#region  2. http 서버 구동 방식 축약

// var server = http
//   .createServer((req, res) => {
//     res.write("<h1> Welcome");
//     res.end("to my server");
//   })
//   .listen(8080, () => console.log("8080 포트에서 대기중"));

//#endregion

//#region 3. request, response 메시지

// var server = http
//   .createServer((req, res) => {
//     console.log("req.headers", req.headers);
//     console.log("req.method", req.method);
//     console.log("req.url", req.url);

//     res.statusCode = 200;
//     res.statusMessage = "okay";
//     res.setHeader("Content-Type", "text/html;charset=utf-8");
//     res.writeHead(200, "Okay", { "Content-type": "text/plain;charset=utf-8" });

//     res.end("<h1> Welcome to my server</h1>");
//   })
//   .listen(8080, () => console.log("8080 포트에서 대기중"));

//#endregion

//#region
// var server = http
//   .createServer((req, res) => {
//     res.write("<h1> Welcome");
//     res.end(`<!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//         </head>
//         <body>
//             <h1>안녕하세요 icebear 홈페이지입니다</h1>
//             <img src="https://vignette.wikia.nocookie.net/webarebears/images/3/37/Ice_bear.png/revision/latest?cb=20160619204008" alt="">
//         </body>
//         </html>`);
//   })
//   .listen(8080, () => console.log("8080 포트에서 대기중"));

//#endregion

//#region 5. html 파일을 응답으로 제공

const fs = require("fs");
// var server = http
//   .createServer((req, res) => {
//     fs.readFile("./test.html", (err, data) => {
//       if (err) console.log(err);
//       res.end(data);
//     });
//   })
//   .listen(8080, () => console.log("server is listening on port 8080"));

//#endregion

//#region
var server = http
  .createServer((req, res) => {
    console.log("req.url", req.url);
    if (req.url === "/") {
      fs.readFile("./test.html", (err, data) => {
        if (err) console.log(err);
        res.end(data);
      });
    } else if (req.url === "/second") {
      res.write("<h1>Second Page</h1>");
      res.end(`<h1><a  href='/third'>second page</a>`);
    } else if (req.url === "/third") {
      res.write("<h1>Third Page</h1>");
      res.end(`<h1><a  href='/third'>third page</a>`);
    }
  })
  .listen(8080, () => console.log("server </h1>is listening on port 8080"));

//#endregion
