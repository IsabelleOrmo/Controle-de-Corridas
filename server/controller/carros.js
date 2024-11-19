export const cadastrarCarro = (req, res, db) => {
  const { placa, marca, modelo, anoFab } = req.body;
  db.query(
    "INSERT INTO carro (Placa, Marca, Modelo, AnoFab) VALUES (?, ?, ?, ?)",
    [placa, marca, modelo, anoFab],
    (err, result) => {
      if (err) {
        console.error("Erro ao cadastrar: " + err.stack);
        return res.status(400).send("Erro ao cadastrar o carro");
      }
      res.status(201).send("Carro cadastrado!");
    }
  );
};

export const excluirCarro = (req, res, db) => {
  const { placa } = req.params;
  db.query("DELETE FROM carro WHERE Placa = ?", [placa], (err, result) => {
    if (err) {
      console.error("Erro ao excluir: " + err.stack);
      return res.status(400).send("Erro ao excluir o carro");
    }
    res.status(200).send("Carro excluído!");
  });
};

export const buscarCarro = (req, res, db) => {
  const { placa } = req.params;
  db.query("SELECT * FROM carro WHERE Placa = ?", [placa], (err, result) => {
    if (err) {
      console.error("Erro ao buscar: " + err.stack);
      return res.status(400).send("Erro ao buscar o carro");
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send("Carro não encontrado");
    }
  });
};

export const buscarTodosCarros = (req, res, db) => {
  db.query("SELECT * FROM carro", (err, result) => {
    if (err) {
      console.error("Erro ao buscar: " + err.stack);
      return res.status(400).send("Erro ao buscar todos os carros");
    }
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Nenhum carro cadastrado");
    }
  });
};

export const alterarCarro = (req, res, db) => {
  const currentlyPlaca = req.params.placa;
  const { placa: novaPlaca, marca, modelo, anoFab } = req.body;

  const fields = [];
  const values = [];

  if (novaPlaca) {
    fields.push("Placa = ?");
    values.push(novaPlaca);
  }
  if (marca) {
    fields.push("Marca = ?");
    values.push(marca);
  }
  if (modelo) {
    fields.push("Modelo = ?");
    values.push(modelo);
  }
  if (anoFab) {
    fields.push("AnoFab = ?");
    values.push(anoFab);
  }

  if (fields.length === 0) {
    return res.status(400).send("Nenhuma informação para atualizar");
  }

  values.push(currentlyPlaca);

  db.query(
    `UPDATE carro SET ${fields.join(", ")} WHERE Placa = ?`,
    values,
    (err, result) => {
      if (err) {
        console.error("Erro ao atualizar: " + err.stack);
        return res.status(400).send("Erro ao atualizar o carro");
      }

      if (result.affectedRows === 0) {
        res.status(404).send("Carro não encontrado");
      } else {
        res.send(
          `Carro da placa ${currentlyPlaca} foi alterado para ${
            novaPlaca || currentlyPlaca
          }`
        );
      }
    }
  );
};
