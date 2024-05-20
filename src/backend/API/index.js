
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

//Informaçoes Cadastros

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  hospital: String,
  endereco: String,
  crm: String,
  cpf: String,
  tipoUsuario: String,
  usuarioLogado:String
});

app.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.send(user);
});

app.post("/", async (req, res) => {
  try {

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      hospital: req.body.hospital,
      endereco: req.body.endereco,
      crm: req.body.crm,
      cpf: req.body.cpf,
      tipoUsuario: req.body.tipoUsuario
    });

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return res.status(500).json({ message: 'Erro ao cadastrar usuário. Por favor, tente novamente.' });
  }
});


//Informações da Triagem

const Triagem = mongoose.model("Tria", {
  dor: String,
  outro:String,
  tempo: Number,
  tempo2:String,
  intensidade: String,
  pressao: Number,
  pressao2: Number,
  Temperatura: Number,
  Hospital: String,
  descricao: String,
  dataAtual:String,
  userId:String,
  name:String
});

app.post("/tri", async (req, res) => {
  const Tria = new Triagem({
    dor: req.body.dor,
    outro: req.body.outro,
    tempo: req.body.tempo,
    tempo2: req.body.tempo2,
    intensidade: req.body.intensidade,
    pressao: req.body.pressao,
    pressao2: req.body.pressao2,
    Temperatura: req.body.Temperatura,
    Hospital: req.body.Hospital,
    descricao: req.body.descricao,
    dataAtual: req.body.dataAtual,
    userId: req.body.userId,
    name: req.body.name
  });

  await Tria.save();
  return res.send(Tria);
});

app.get("/tr", async (req, res) => {
  const userHospital = req.query.hospital; // Obter o nome do hospital da query string

  try {
    const triagem = await Triagem.find({ Hospital: userHospital }); // Filtrar as triagens com base no hospital
    res.send(triagem);
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    res.status(500).json({ message: "Erro ao obter as triagens do hospital." });
  }
});

app.get("/t", async (req, res) => {
  const userId = req.query.userId; // Obter o ID do usuário da query string

  try {
    const triagem = await Triagem.find({ userId: userId }); // Filtrar as triagens com base no ID do usuário
    res.send(triagem);
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    res.status(500).json({ message: "Erro ao obter as triagens do usuário." });
  }
});
app.get("/emails", async (req, res) => {
  try {
    const users = await User.find({ tipoUsuario: "paciente" }, { email: 1 }); // Retorna apenas os e-mails dos usuários do tipo "paciente"
    const emails = users.map(user => user.email); // Mapeia os usuários para obter apenas os e-mails
    res.json(emails);
  } catch (error) {
    console.error("Erro ao obter os e-mails dos pacientes:", error);
    res.status(500).json({ message: "Erro ao obter os e-mails dos pacientes." });
  }
});

app.get("/test/:consultaId", async (req, res) => {
  const consultaId = req.params.consultaId;

  try {
    const consulta = await Triagem.findById(consultaId);
    if (!consulta) {
      return res.status(404).json({ message: "Triagem não encontrada" });
    }
    res.json(consulta);
  } catch (error) {
    console.error("Erro ao obter os dados:", error);
    res.status(500).json({ message: "Erro ao obter os dados da triagem" });
  }
});


app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://IgorFlores:agua3006@fasthelth.iq0umfk.mongodb.net/?retryWrites=true&w=majority&appName=FastHelth"
  );

  console.log("App Running");
});
