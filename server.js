const express = require("express");
const session = require("express-session");
const socketio = require("socket.io");
const { User } = require("./models");

const PORT = process.env.PORT || 3000;
const router = require("./routers");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "rahasia",
    resave: true,
    saveUninitialized: false,
  })
);

//IMPORT SWAGGER
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("./docs/swagger.json");
app.use("/api/v0/documentation", swaggerUI.serve, swaggerUI.setup(swaggerJson));
// END SWAGGER

// test route
app.get("/", (request, response) => {
  response.json({
    message: "success connect!",
  });
});

app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const io = socketio(server)

io.on('connection', (socket)=>{
  console.log('a user connected')
  socket.on('chat message', async(msg)=>{
    // example message {"id":2,"message":"apakah barang ada ?"}
    let parse = JSON.parse(msg)
    
    const idExist = await User.findOne({
      where:{
        id: parse.id
      },
      raw: true,
    });
    
    if (idExist) {
      io.emit(parse.id, msg) // add this line from implement broadcast
      console.log(`message : ${msg}`)
    }else{
      console.log('akun tidak ada')
    }
  })

  socket.on('disconnect',()=>{
    console.log(`user disconnect`)
  })
})
