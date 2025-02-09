class Server {
    https = require('https');
    url = require('url');
    fs = require('fs');
    endpoint_route = "/api/dictionary";
    Dictionary = require('./js/dictionary.js');
    constructor(port) {
      this.port = port;
      this.server = this.https.createServer(this.handleRequest.bind(this));
      this.dictionary = new this.Dictionary();
      this.requests = 0;
    }
    handleRequest(request, response) {
      ++this.requests;
      response.writeHead(200, {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
      });

      if (request.method == "GET") {
        const q = this.url.parse(request.url, true);
        const definition = this.dictionary.get_definition(q.query.word);
        
        const obj = {
          requests: this.requests,
          word: q.query.word,
          definition: definition
        }
        response.end(JSON.stringify(obj));

      } else if (request.method == "POST" && request.url == this.endpoint_route) {
        let body = "";

        request.on('data', (chunk) => { 
          if (chunk != null ) body += chunk;
        });

        request.on('end', () => { 
          const q = this.url.parse(body, true);
          const entry = this.dictionary.add_entry(q.query.word, q.query.definition);
          const obj = {
            requests: this.requests,
            entry: entry,
            word: q.query.word,
            definition: q.query.definition
          }
          response.end(JSON.stringify(obj));
        });
      }

    }
    start() {
      this.server.listen(this.port, () => {
        console.log(`listening...`);
      });
    }
}

const server = new Server(8080);
server.start();
