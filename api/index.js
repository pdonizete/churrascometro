require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
var cors = require("cors");

const app = express();

const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:4201"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url, req.params, req.body);
  next();
});

let blacklistedToken = [];

app.post("/login", (req, res) => {
  const { login, senha } = req.body;
  const { DEFAULT_LOGIN, DEFAULT_PASSWORD, JWT_SECRET, ADMIN_LOGIN, ADMIN_PASSWORD } = process.env;
  if (login === DEFAULT_LOGIN && senha === DEFAULT_PASSWORD) {
    const token = jwt.sign({ user: `${DEFAULT_LOGIN}` }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      user: `${DEFAULT_LOGIN}`,
      perfil: 'normal',
      token: token,
    });
  } else if (login === ADMIN_LOGIN && senha === ADMIN_PASSWORD) {
    const token = jwt.sign({ user: `${ADMIN_LOGIN}` }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      user: `${ADMIN_LOGIN}`,
      perfil: 'admin',
      token: token,
    });
  }
  res.sendStatus(401);
  res.end();
});

const jwtValidation = (req, res, next) => {
  try {
    const { JWT_SECRET } = process.env;
    const auth = req.headers.authorization;
    const token = auth.replace("Bearer ", "");
    if (auth && !blacklistedToken.includes(token)) {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.locals = { user: decoded.user };
      console.info(
        "JWT Middleware - validated token for user: " + decoded.user
      );
    } else throw new Error("token not found");
  } catch (err) {
    console.info("JWT Middleware - error validating token\n" + err);

    if(err.message === "jwt expired") {
      res.sendStatus(403);
    } else {
      res.sendStatus(401);
    }
    return res.end();
  }
  next();
};

app.use(jwtValidation);

app.get("/logout", (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    blacklistedToken.push(token);
    res.status = 200;
    res.end();
  } catch (error) {
    console.error("Error during logout:", error);
  }
});

// CARNES

let carnes = [];

app.get("/carnes", (req, res) => {
  res.json(carnes);
  res.end();
});

app.post("/carnes", (req, res) => {
  const {
    nome,
    tipo,
    preco_kg,
    consumo_medio_adulto_g,
    consumo_medio_crianca_g,
    id,
  } = req.body;
  if (
    nome &&
    tipo &&
    preco_kg &&
    consumo_medio_adulto_g &&
    consumo_medio_crianca_g &&
    !id
  ) {
    const id = carnes.length + 1;
    const carne = {
      nome,
      tipo,
      preco_kg,
      consumo_medio_adulto_g,
      consumo_medio_crianca_g,
      id: id,
    };
    carnes.push(carne);
    res.status(201).json(carne);
  } else return res.sendStatus(400);
});

const validateAndLogAlterationOrDeletion = (req, res, next) => {
  console.info('params', req.params);
  const urlID = req.params.id;
  const dateTime = new Date().toLocaleString("pt-br");

  if (!urlID) return res.sendStatus(400);

  const carne = carnes.find((x) => x.id == urlID);
  if (!carne) return res.sendStatus(404);

  if (req.method === "PUT") {
    console.info('body', req.body);
    const {
      nome,
      tipo,
      preco_kg,
      consumo_medio_adulto_g,
      consumo_medio_crianca_g
    } = req.body;
    if (!(nome && tipo && preco_kg && consumo_medio_adulto_g && consumo_medio_crianca_g)) return res.sendStatus(400);
    console.info(`${dateTime} - carne ${urlID} - ${carne.nome} - Alterar`);
  } else if (req.method === "DELETE") {
    console.info(`${dateTime} - carne ${urlID} - ${carne.nome} - Remover`);
  } else if (req.method === "GET") {
    console.info(`${dateTime} - carne ${urlID} - ${carne.nome} - Pesquisar`);
  }

  next();
};

app.use("/carnes/:id", validateAndLogAlterationOrDeletion);

app.get("/carnes/:id", (req, res) => {
  const urlID = req.params.id;
  const carne = carnes.find((x) => x.id == urlID);
  res.json(carne);
});

app.put("/carnes/:id", (req, res) => {
  console.info(req.body);
  const {
    nome,
    tipo,
    preco_kg,
    consumo_medio_adulto_g,
    consumo_medio_crianca_g
  } = req.body;
  const id = req.params.id;
  console.info('id', id);
  const carne = carnes.find((x) => x.id == id);
  carne.nome = nome;
  carne.tipo = tipo;
  carne.preco_kg = preco_kg;
  carne.consumo_medio_adulto_g = consumo_medio_adulto_g;
  carne.consumo_medio_crianca_g = consumo_medio_crianca_g;
  return res.status(200).json(carne);
});

app.delete("/carnes/:id", (req, res) => {
  const urlID = req.params.id;
  carnes = carnes.filter((x) => x.id != urlID);

  console.log(carnes);
  res.json(carnes);
});

// BEBIDAS

let bebidas = [];

app.get("/bebidas", (req, res) => {
  res.json(bebidas);
  res.end();
});

app.post("/bebidas", (req, res) => {
  const {
    nome,
    tipo,
    preco_unidade,
    consumo_medio_adulto_ml,
    consumo_medio_crianca_ml,
    id,
  } = req.body;
  if (
    nome &&
    tipo &&
    preco_unidade &&
    consumo_medio_adulto_ml &&
    !id
  ) {
    const id = bebidas.length + 1;
    const bebida = {
      nome,
      tipo,
      preco_unidade,
      consumo_medio_adulto_ml,
      consumo_medio_crianca_ml,
      id: id,
    };
    bebidas.push(bebida);
    res.status(201).json(bebida);
  } else return res.sendStatus(400);
});

const validateAndLogAlterationOrDeletionBebida = (req, res, next) => {
  const urlID = req.params.id;
  const dateTime = new Date().toLocaleString("pt-br");

  if (!urlID) return res.sendStatus(400);

  const bebida = bebidas.find((x) => x.id == urlID);
  if (!bebida) return res.sendStatus(404);

  if (req.method === "PUT") {
    const {
      nome,
      tipo,
      preco_unidade,
      consumo_medio_adulto_ml
    } = req.body;
    if (!(nome && tipo && preco_unidade && consumo_medio_adulto_ml)) return res.sendStatus(400);
    console.info(`${dateTime} - bebida ${urlID} - ${bebida.nome} - Alterar`);
  } else if (req.method === "DELETE") {
    console.info(`${dateTime} - bebida ${urlID} - ${bebida.nome} - Remover`);
  } else if (req.method === "GET") {
    console.info(`${dateTime} - bebida ${urlID} - ${bebida.nome} - Pesquisar`);
  }

  next();
};

app.use("/bebidas/:id", validateAndLogAlterationOrDeletionBebida);

app.get("/bebidas/:id", (req, res) => {
  const urlID = req.params.id;
  const bebida = bebidas.find((x) => x.id == urlID);
  res.json(bebida);
});

app.put("/bebidas/:id", (req, res) => {
  console.info(req.body);
  const {
    nome,
    tipo,
    preco_unidade,
    consumo_medio_adulto_ml,
    consumo_medio_crianca_ml,
  } = req.body;
  const id = req.params.id;
  const bebida = bebidas.find((x) => x.id == id);
  bebida.nome = nome;
  bebida.tipo = tipo;
  bebida.preco_unidade = preco_unidade;
  bebida.consumo_medio_adulto_ml = consumo_medio_adulto_ml;
  bebida.consumo_medio_crianca_ml = consumo_medio_crianca_ml ? consumo_medio_crianca_ml : 0;
  return res.status(200).json(bebida);
});

app.delete("/bebidas/:id", (req, res) => {
  const urlID = req.params.id;
  bebidas = bebidas.filter((x) => x.id != urlID);

  console.log(bebidas);
  res.json(bebidas);
});

app.listen(5000, () => console.log("listening on http://localhost:5000"));
