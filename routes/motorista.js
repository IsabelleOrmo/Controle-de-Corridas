import express from 'express';

const router = express.Router();

const motoristasRouter = (db) => {
//motorista: IdMotorista Nome CPF DataNas CNH 
router.post('/cadastrar', (req, res) => {
    const { id, nome, cpf, dataNas, cnh } = req.body;
    
    const query = 'INSERT INTO motorista (IdMotorista, Nome, CPF, DataNas, CNH) VALUES (?, ?, ?, ?, ?)';
    const values = [id, nome, cpf, dataNas, cnh];
    
    db.query(query, values, (err, result) => {
        if (err) {
            res.status(400).send('Erro ao cadastrar o motorista');
            return;
        }
        res.status(201).send('Motorista cadastrado!');
    });
});

router.delete('/excluir/:id', (req, res)=>{
    const { id } =  req.params;
    const query = 'DELETE FROM motorista WHERE IdMotorista = ?';
    const value = [id];

    db.query(query, value, (err, result) => {
        if (err) {
            res.status(400).send('Erro ao excluir o motorista');
            return;
        }
        res.status(201).send('Motorista excluido');
    });
});

router.get('/buscar', (req, res)=>{
    db.query('SELECT * FROM motorista', (err, result)=>{
        if (err) {
            console.error('Erro ao buscar: ' + err.stack);
            res.status(400).send('Erro ao buscar todos os motoristas');
            return;
        }
        if(result.length>0){
            res.status(200).json(result);
        } else {
            res.status(404).send('Nenhum motorista cadastrado');
        }
    });
});

router.get('/buscar/:id', (req, res)=>{
    const { id } = req.params;
    const query = 'SELECT * FROM motorista WHERE IdMotorista = ?';
    const value = [id];

    db.query(query, value, (err, result)=>{
        if (err) {
            console.error('Erro ao buscar: ' + err.stack);
            res.status(400).send('Erro ao buscar o motorista');
            return;
        }
        if(result.length>0){
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Motorista não encontrado');
        }
    });
});

router.patch('/alterar/:id', (req, res)=>{
    //motorista: IdMotorista Nome CPF DataNas CNH 
    const { id } = req.params;
    const { nome, cpf, dataNas, cnh } = req.body;

    const fields = [];
    const values = [];

    if(nome){
        fields.push('Nome = ?');
        values.push(nome);
    }
    if(cpf){
        fields.push('CPF = ?');
        values.push(cpf);
    }
    if(dataNas){
        fields.push('DataNas = ?');
        values.push(dataNas);
    }
    if(cnh){
        fields.push('CNH = ?');
        values.push(cnh);
    }

    values.push(id);

    if(fields.length === 0 ){
        res.status(400).send('Nenhuma informação para atualizar');
        return;
    }

    db.query(`UPDATE motorista SET ${fields.join(', ')} WHERE IdMotorista = ?`, values, (err, result) =>{
        if (err) {
            console.error('Erro ao atualizar: ' + err.stack);
            res.status(400).send('Erro ao atualizar o motorista');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Motorista não encontrado');
        } else {
            res.send("Informações do motorista alteradas");
        }
    });

});


return router;
};

export default motoristasRouter;