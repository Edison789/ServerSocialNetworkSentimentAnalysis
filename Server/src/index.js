const express = require ("express");
const routes =  require ("./routes/facebookRoutes");
//Cors habilita las peticiones de diferentes dominios
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3001;
app.use("/api/facebook",cors(), routes);

app.listen(PORT, ()=> {console.log('Server listening on port:',PORT)});