// node-static 서드파티 모듈을 사용하여 정적 서버를 만든다.

const static = require("node-static");

//정적 파일들이 저장된 디렉토리 경로들을
var file = new static.Server("./public");

require("http")
  .createServer(function (request, response) {
    request
      .addListener("end", function () {
        //
        // Serve files!
        //
        file.serve(request, response, (err, res) => {
          if (e && e.status === 404) {
            // If the file wasn't found
            fileServer.serveFile("./public/not-found.html", 404, {}, req, res);
          }
        });
      })
      .resume();
  })
  .listen(8080);
