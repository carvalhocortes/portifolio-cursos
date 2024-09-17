import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const portNumber = Number(process.env.APP_PORT);

app.listen(portNumber, () => {
  console.log(`Servidor executando em http://localhost:${portNumber}`);
})
