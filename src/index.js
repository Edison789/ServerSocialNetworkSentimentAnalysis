const express = require ("express");
const routes =  require ("./routes/facebookRoutes");

const app = express()
const PORT = process.env.PORT || 3000;

app.use("/api/facebook", routes);

app.listen(PORT, ()=> {console.log('Server listening on port:',PORT)});