const EventEmitter = require('events')

let Listener = new EventEmitter()

Listener.on('Saute', function(){
    console.log("J'ai sauté")
})

Listener.emit('saute')

let http = require('http')
let fs = require('fs')
let url = require('url')

let server = http.createServer()

server.on('request', function(request, response){
    
    let query = url.parse(request.url, true).query
    let name = query.name ===undefined ? 'anonyme' : query.name

    fs.readFile('text.html', function(err, data){
        if(err){

            response.writeHead(404)

            response.end("Ce fichier n'existe pas")
            return;
        } 

        response.writeHead(200, {
            'Content-type': 'text/html; charset=utf8'
        })
        
        data = data.replace('{{ name }}', name)
        response.end(data)
    })
    
})

server.listen(8080);
