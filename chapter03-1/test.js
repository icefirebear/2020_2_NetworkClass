var http = require('http')
var url = require('url')
var querystring = require('querystring')
var fs = require('fs')

const server = http.createServer((req, res) => {
    if (req.method.toLowerCase() == "get") {
        var parsedUrl = url.parse(req.url)
        var qs = querystring.parse(parsedUrl.query)
        if (qs.num1 && qs.num2) {
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8"})
            var [num1, num2] = [parseInt(qs.num1), parseInt(qs.num2)]
            if (!Number.isNaN(num1) && !Number.isNaN(num2)){
                res.write(`<h1>results : ${num1 + num2}</h1>`)
            } else {
                res.write(`<h1>results: Bad request(Not a Number)</h1>`)
            }
        } else {
            
        }
    }
})