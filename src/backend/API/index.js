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
  crm: Number,
  cpf: Number,
  tipoUsuario: String,
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
  return res.send(user);
});

//Informações da Triagem

const Triagem = mongoose.model("Tria", {
  dor: String,
  tempo: Number,
  tempo2:String,
  intensidade: String,
  pressao: Number,
  pressao2: Number,
  Temperatura: Number,
  Hospital: String,
  descricao: String,
});

app.post("/tri", async (req, res) => {
  const Tria = new Triagem({
    dor: req.body.dor,
    tempo: req.body.tempo,
    tempo2: req.body.tempo2,
    intensidade: req.body.intensidade,
    pressao: req.body.pressao,
    pressao2: req.body.pressao2,
    Temperatura: req.body.Temperatura,
    Hospital: req.body.Hospital,
    descricao: req.body.descricao,
  });

  await Tria.save();
  return res.send(Tria);
});

app.get("/t", async (req, res) => {
  const triagem = await Triagem.find();
  res.send(triagem);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://IgorFlores:agua3006@fasthelth.iq0umfk.mongodb.net/?retryWrites=true&w=majority&appName=FastHelth"
  );

  console.log("App Running");
});
