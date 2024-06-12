const express = require('express');
const cors = require('cors');
const sequelize = require('../config/database');
const User = require('../models/User');
const Triagem = require('../models/Triagem');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

app.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.delete("/:id", async (req, res) => {
  const user = await User.destroy({ where: { id: req.params.id } });
  return res.sendStatus(204);
});

app.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar usuário. Por favor, tente novamente.' });
  }
});


app.post("/tri", async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.pressao === '') data.pressao = null;
    if (data.pressao2 === '') data.pressao2 = null;
    if (data.Temperatura === '') data.Temperatura = null;

    const triagem = await Triagem.create(data);
    return res.status(201).json(triagem);
  } catch (error) {
    console.error('Erro ao salvar triagem:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar triagem. Por favor, tente novamente.' });
  }
});


app.get("/tr", async (req, res) => {
  try {
    const triagem = await Triagem.findAll({ where: { Hospital: req.query.hospital } });
    res.send(triagem);
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    res.status(500).json({ message: "Erro ao obter as triagens do hospital." });
  }
});

app.get("/t", async (req, res) => {
  try {
    const triagem = await Triagem.findAll({ where: { userId: req.query.userId } });
    res.send(triagem);
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    res.status(500).json({ message: "Erro ao obter as triagens do usuário." });
  }
});

app.get("/emails", async (req, res) => {
  try {
    const users = await User.findAll({ where: { tipoUsuario: "paciente" }, attributes: ['email'] });
    const emails = users.map(user => user.email);
    res.json(emails);
  } catch (error) {
    console.error("Erro ao obter os e-mails dos pacientes:", error);
    res.status(500).json({ message: "Erro ao obter os e-mails dos pacientes." });
  }
});

app.get("/test/:consultaId", async (req, res) => {
  try {
    const consulta = await Triagem.findByPk(req.params.consultaId);
    if (!consulta) {
      return res.status(404).json({ message: "Triagem não encontrada" });
    }
    res.json(consulta);
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    res.status(500).json({ message: "Erro ao obter os dados da triagem" });
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`App Running on port ${port}`);
});
