//Criando o servidor
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import carrosRoutes from './routes/carros.js';
import motoristasRouter from './routes/motorista.js';
import corridasRouter from './routes/corridas.js';

const app = express(); 
const PORT = 5000;
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '17122005',
    database: 'personal'
});

db.connect((err) => {
    if(err){
        console.error('Erro: ' + err.stack);
        return;
    }
    console.log('Conectado');
});

app.use(bodyParser.json());

app.use('/carros', carrosRoutes(db));
app.use('/motoristas', motoristasRouter(db));
app.use('/viagens', corridasRouter(db))

app.listen(PORT, () => console.log(`Servidor rodando na porta: http://localhost:${PORT}`));



