class HttpServer {
    msg = require('./lang/messages/en/user');
    http = require('http');
    url = require('url');
    fs = require('fs');
    d = require('./modules/utils');
    constructor(port) {
      this.port = port;
      this.server = this.http.createServer(this.handleRequest.bind(this));
    }
  
    handleRequest(request, response) {
      const q = this.url.parse(request.url, true);
      const q_pathname = q.pathname;
      let split_path = q_pathname.substring(1).split("/");
      let getDate = split_path.shift();
      if (getDate === "getDate") {
        this.handleGetDate(q, response);
      } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end(`${this.msg.RES_404}`);
      }
    }

    handleGetDate(q, response) {
      const q_query = q.query;
      const q_path = q.pathname.substring(1);
      const split_path = q_path.split("/");
      if (split_path.length != 2) {
        response.writeHead(400, { 'Content-Type': 'text/plain' }); 
        response.end(`${this.msg.RES_400}`);
      } else if (q_query.name === undefined) {
        response.writeHead(400, { 'Content-Type': 'text/plain' }); 
        response.end(`${this.msg.RES_400}`);
      } else {
        response.writeHead(200, { 'content-type': 'text/html' });
        response.write(`<div style="color:blue;">${this.msg.GREETING}${q_query.name}${this.msg.USER_MSG}${this.d.dateObj.date}</div>`);
        response.end();
      }
    }
  
    start() {
      this.server.listen(this.port, () => {
        console.log(`listening...`);
      });
    }
}

const server = new HttpServer(8080);
server.start();
