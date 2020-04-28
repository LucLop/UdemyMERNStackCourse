const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log("Connected to mongo !");
})
mongoose.connection.on('error', (err) =>{
    console.log("error connecting", err);
})

require('./models/user') //Not in a variable bc we don't export it
require('./models/post');

app.use(express.json()) //To parse in JSON the incoming request
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


app.listen(PORT, () =>{
    console.log("Server running on ", PORT);
})