import express from 'express'
import * as Path from 'node:path'

const server = express()

server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use(
    '/assets',
    express.static(Path.resolve(__dirname, '../dist/assets'))
  )
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve(__dirname, '../dist/index.html'))
  })
}

export default server
