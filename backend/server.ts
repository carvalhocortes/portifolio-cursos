import app from './src/app.js'

const portNumber = 5000

app.listen(portNumber, () => {
  console.log(`Servidor executando em http://localhost:${portNumber}`)
})
