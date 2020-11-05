//#region 1. cookie 만들기
const http = require("http");

var server = http
  .createServer((req, res) => {
    //#region 1-1. 세션(session) 쿠키 => 세션이 끝날 때 삭제
    res.writeHead(200, { "Set-Cookie": "myCookie=dongyun" });
    res.writeHead(200, {
      "Set-Cookie": ["yummy_cookie=choco", "tasty_cookie=strawberry"],
    });
    //#endregion

    //#region 1-2. 영속적인(permanent) 쿠키 => Max-Age 속성에 명시된 기간 이후에 삭제
    // res.writeHead(200, {'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry', `Permanent=cookies; Max-Age=${60*60*24*30}`]
    // });
    //#endregion

    res.end("<h1>Cookie Test</h1>");
  })
  .listen(8080, () => {
    console.log("8080 포트에서 대기중");
  });
//#endregion
