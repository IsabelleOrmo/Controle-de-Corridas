import express from 'express';

const router = express.Router();

const carrosRoutes = (db) => {
    
router.post('/cadastrar', (req, res) => {
        const { placa, marca, modelo, anoFab } = req.body;
        db.query('INSERT INTO carro (Placa, Marca, Modelo, AnoFab) VALUES (?, ?, ?, ?)', [placa, marca, modelo, anoFab], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar: ' + err.stack);
                res.status(400).send('Erro ao cadastrar o carro');
                return;
            }
            res.status(201).send('Carro cadastrado!');
        });
});

router.delete('/excluir/:placa', (req, res) => {
        const { placa } = req.params;
       db.query('DELETE FROM carro WHERE Placa = ?', [placa], (err, result)=>{
        if(err){
            console.error('Erro ao excluir: ' + err.stack);
            res.status(400).send('Erro ao excluir o carro');
            return;
        }
        res.status(201).send('Carro excluído!');
        });  
});

router.get('/buscar/:placa', (req, res)=>{
        const { placa } = req.params;
        db.query('SELECT * FROM carro WHERE Placa = ? ', [placa], (err, result)=>{
            if (err){
                console.error('Erro ao buscar: ' + err.stack);
                res.status(400).send('Erro ao buscar o carro');
                return;
            }
            if (result.length > 0) {
                //caso o resultado não seja vazio
                res.status(200).json(result[0]);
            } else {
                res.status(404).send('Carro não encontrado');
            }
        });
});
    
router.get('/buscar', (req, res)=>{
    db.query('SELECT * FROM carro', (err, result)=>{
        if (err) {
            console.error('Erro ao buscar: ' + err.stack);
            res.status(400).send('Erro ao buscar todos os carros');
            return;
            }
        if(result.length>0){
            res.status(200).json(result);
        } else {
            res.status(404).send('Nenhum carro cadastrado');
            }
        });
});
    
router.patch('/alterar/:placa', (req, res) => {
        const currentlyPlaca = req.params.placa;  
        const { placa: novaPlaca, marca, modelo, anoFab } = req.body;
    
        // fields = substitui o set no db.query 
        const fields = [];
        const values = [];
    
        if (novaPlaca) {
            fields.push('Placa = ?'); // push adicona o elemento no array
            values.push(novaPlaca);
        }
        if (marca) {
            fields.push('Marca = ?');
            values.push(marca);
        }
        if (modelo) {
            fields.push('Modelo = ?');
            values.push(modelo);
        }
        if (anoFab) {
            fields.push('AnoFab = ?');
            values.push(anoFab);
        }
    
        
        if (fields.length === 0) {
            res.status(400).send('Nenhuma informação para atualizar');
            return;
        }
    
        values.push(currentlyPlaca);

        db.query(`UPDATE carro SET ${fields.join(', ')} WHERE Placa = ?`, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar: ' + err.stack);
                res.status(400).send('Erro ao atualizar o carro');
                return;
            }
    
            if (result.affectedRows === 0) {
                res.status(404).send('Carro não encontrado');
            } else {
                res.send(`Carro da placa ${currentlyPlaca} foi alterado para ${novaPlaca || currentlyPlaca}`);
            }
        });
});

return router;
};

export default carrosRoutes;
