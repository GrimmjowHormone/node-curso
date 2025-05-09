const http = require('node:http')

// commonJS -> modulos clasicos de node

const json = require('./pokemon/ditto')
const proccessRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(json))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')

          return res.end('<h1>404</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon':
          {
            let body = ''

            req.on('data', (chunk) => {
              body += chunk.toString()
            })

            req.on('end', () => {
              const data = JSON.parse(body)
              // llamar a una bd para guardar la info

              res.writeHead(201, {
                'Content-Type': 'application/json; charset=utf-8'
              })
              data.timestamp = Date.now()
              res.end(JSON.stringify(data))
            })
          }
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')

          return res.end('404 Not Found')
      }
  }
}

const server = http.createServer(proccessRequest)

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})
