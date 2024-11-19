export const cadastrarMotorista = (req, res, db) => {
    const { id, nome, cpf, dataNas, cnh } = req.body;
  
    const query =
      "INSERT INTO motorista (IdMotorista, Nome, CPF, DataNas, CNH) VALUES (?, ?, ?, ?, ?)";
    const values = [id, nome, cpf, dataNas, cnh];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar: " + err.stack);
        return res.status(400).send("Erro ao cadastrar o motorista");
      }
      res.status(201).send("Motorista cadastrado!");
    });
  };
  
  export const excluirMotorista = (req, res, db) => {
    const { id } = req.params;
  
    const query = "DELETE FROM motorista WHERE IdMotorista = ?";
    const value = [id];
  
    db.query(query, value, (err, result) => {
      if (err) {
        console.error("Erro ao excluir: " + err.stack);
        return res.status(400).send("Erro ao excluir o motorista");
      }
      res.status(200).send("Motorista excluído!");
    });
  };
  
  export const buscarTodosMotoristas = (req, res, db) => {
    db.query("SELECT * FROM motorista", (err, result) => {
      if (err) {
        console.error("Erro ao buscar: " + err.stack);
        return res.status(400).send("Erro ao buscar todos os motoristas");
      }
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Nenhum motorista cadastrado");
      }
    });
  };
  
  export const buscarMotorista = (req, res, db) => {
    const { id } = req.params;
  
    const query = "SELECT * FROM motorista WHERE IdMotorista = ?";
    const value = [id];
  
    db.query(query, value, (err, result) => {
      if (err) {
        console.error("Erro ao buscar: " + err.stack);
        return res.status(400).send("Erro ao buscar o motorista");
      }
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Motorista não encontrado");
      }
    });
  };
  
  export const alterarMotorista = (req, res, db) => {
    const { id } = req.params;
    const { nome, cpf, dataNas, cnh } = req.body;
  
    const fields = [];
    const values = [];
  
    if (nome) {
      fields.push("Nome = ?");
      values.push(nome);
    }
    if (cpf) {
      fields.push("CPF = ?");
      values.push(cpf);
    }
    if (dataNas) {
      fields.push("DataNas = ?");
      values.push(dataNas);
    }
    if (cnh) {
      fields.push("CNH = ?");
      values.push(cnh);
    }
  
    if (fields.length === 0) {
      return res.status(400).send("Nenhuma informação para atualizar");
    }
  
    values.push(id);
  
    db.query(
      `UPDATE motorista SET ${fields.join(", ")} WHERE IdMotorista = ?`,
      values,
      (err, result) => {
        if (err) {
          console.error("Erro ao atualizar: " + err.stack);
          return res.status(400).send("Erro ao atualizar o motorista");
        }
        if (result.affectedRows === 0) {
          res.status(404).send("Motorista não encontrado");
        } else {
          res.send("Informações do motorista alteradas");
        }
      }
    );
  };
  