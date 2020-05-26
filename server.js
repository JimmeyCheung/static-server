var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
  process.exit(1);
}



var server = http.createServer((request, response) => {
    var parsedUrl = url.parse(request.url, true);
    var pathWithQuery = request.url ;
    var queryString = '';
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')); }
    var path = parsedUrl.pathname;
    
      /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery);

    response.statusCode = 200;
    // 默认首页
    var filePath = path === '/' ? '/index.html' : path;
    var index = filePath.lastIndexOf('.');
    // suffix 是后缀
    var suffix = filePath.substring(index);
    var fileTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.png':'image/png',
        '.jpg':'image/jpg',
        '.jpeg':'image/jpeg',
    };
    response.setHeader('Content-Type', 
        `${fileTypes[suffix] || 'text/html'};charset=utf-8`);
    let content ;
    try{
        content = fs.readFileSync(`./public${filePath}`);
    }catch(error){
        content = '文件不存在'
        response.statusCode = 404;
    }
    response.write(content);
    response.end();

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port);