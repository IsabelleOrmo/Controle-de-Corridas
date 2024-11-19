//Criando o servidor
import express from 'express';
import bodyParser from 'body-parser';
import carrosRoutes from './routes/carros.js';
import motoristasRouter from './routes/motoristas.js';
import corridasRouter from './routes/corridas.js';
import { db } from "./connect.js";

const app = express(); 
const PORT = 5000;
app.use(bodyParser.json());

app.use("/carros", carrosRoutes(db));
app.use('/motoristas', motoristasRouter(db));
app.use('/viagens', corridasRouter(db))

app.listen(PORT, () => console.log(`Servidor rodando na porta: http://localhost:${PORT}`));



