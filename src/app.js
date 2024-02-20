const express = require('express');
const path = require('path');
const fs = require("fs");

const PORT = 8080;
const app = express();

function loadJSONFile() {
    try {
        const fileContent = fs.readFileSync(path.join(__dirname, '../', 'routes', 'productM.json'), 'utf-8');
        return  JSON.parse(fileContent);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}

app.get("/", (req, res) => {
    res.send("<h1>Inicio Pagina</h1>");
});

//localhost:8080/products?limit=5 -> Para pruebas
app.get("/products", (req, res) => {

    let {limit, skip} = req.query;
    let resultadoJson = loadJSONFile()

    if (skip && (skip > 0)) {
        resultadoJson = resultadoJson.slice(skip);
    }

    if (limit && (limit > 0)) {
        resultadoJson = resultadoJson.slice(0, limit);
    }

    res.json(resultadoJson);
})

//http://localhost:8080/products/2 -> para pruebas
app.get("/products/:id", (req, res) => {
    let {id} = req.params;
    id= Number(id);

    if (isNaN(id)) {
        return res.send('<h2>El id debe ser numérico</h2>')
    }

    let resultadoJson = loadJSONFile();

    let resultadoId = resultadoJson.find(r => r.id === id);
    if (!resultadoId) {
        return res.send("<h2>No existe él, id del producto</h2>")
    }

    res.json(resultadoId);
})

app.listen(PORT, () => {
    console.log(`Server Ok en puerto ${PORT}`);
});