class HttpServer {
    http = require('http');
    url = require('url');
    fs = require('fs');
    msg = require('./lang/messages/en/user');
    constructor(port) {
      this.port = port;
      this.server = this.http.createServer(this.handleRequest.bind(this));
    }
  
    handleRequest(request, response) {
      const q = this.url.parse(request.url, true);
      const q_pathname = q.pathname;

      let split_path = q_pathname.substring(1).split("/");
      let rw = split_path.shift();
      if (rw === "getDate") {
        this.handleGetDate(q, response);
      } else if (rw === "readFile") {
        this.handleRead(q, response);
      } else if (rw === "writeFile") {
        this.handleWrite(q, response);
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
  
    handleRead(q, response) {
      const q_path = q.pathname.substring(1);
      const split_path = q_path.split("/");
      if (split_path.length != 2) {
        response.writeHead(400, { 'Content-Type': 'text/plain' }); // 400 for bad request
        response.end(`${this.msg.RES_400}`);
        return;
      }
      const filename = split_path.pop();
      this.fs.readFile(`./${filename}`, function (err, data) {
        if (err) {
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end(`${this.msg.RES_404}(${filename})`);
        } else {
          response.writeHead(200, {'Content-Type': 'text/plain'}); 
          response.end(data.toString()); // Send the file content as a string
        }
      }.bind(this)); // Doesn't inherit surrouding this context, must be binded
    }

    handleWrite(q, response) {
      const q_query = q.query;
      const q_path = q.pathname.substring(1);
      const split_path = q_path.split("/");
      if (split_path.length != 2) {
        response.writeHead(400, { 'Content-Type': 'text/plain' }); 
        response.end(`${this.msg.RES_400}`);
        return;
      }
      if (q_query.text === undefined) {
        response.writeHead(400, { 'Content-Type': 'text/plain' }); 
        response.end(`${this.msg.RES_400}`);
        return;
      }
      this.fs.writeFile("./file.txt", `\n${q_query.text}`, { flag: 'a+' }, function (err) {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain' }); // 500 for internal server error
          response.end(`${this.msg.RES_500}... ${err.message}`);
          return;
        } else {
          response.writeHead(200, { 'Content-Type': 'text/plain' });
          response.end(`${this.msg.RES_200_W}`);
        }
      }.bind(this));
    }

    start() {
      this.server.listen(this.port, () => {
        console.log(`listening...`);
      });
    }
}

const server = new HttpServer(8080);
server.start();
