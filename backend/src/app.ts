import express from 'express';
import router from './routes';
import 'reflect-metadata';
import cors from 'cors';
import AppDataSource from './config/dataSource';

const app = express();

const corsOptions = {
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

router(app);

AppDataSource.initialize()
  .then(async () => {
    console.log('Banco de dados conectado');
  })
  .catch((erro) => { console.log(erro); });

export default app;
