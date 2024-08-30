import express from 'express';

const router = express.Router();

const corridasRouter = (db) => {
//corrida: Placa DataPedido HoraPedido IdMotorista LocalPartida LocalDestino
router.post('/cadastrar', (req, res) => {
    const { placa, dataPedido, hora, id, localP, localD } = req.body;
    
    const query = 'INSERT INTO corrida (Placa, DataPedido, HoraPedido, IdMotorista, LocalPartida, LocalDestino) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [ placa, dataPedido, hora, id, localP, localD ];
    
    db.query(query, values, (err, result) => {
        if (err) {
            res.status(400).send('Erro ao cadastrar a viagem');
            return;
        }
        res.status(201).send('viagem cadastrado!');
    });
});

return router;
};

export default corridasRouter;