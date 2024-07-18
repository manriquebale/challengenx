const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const newNames = new Map();
const time = 10 * 1000; //Equivale a 10 seg, reemplazar por 10 * 60 * 1000 que equivale a 10 min

app.post('/names', (req, res) => {
    const { name, lastName } = req.body;

    if (!name || !lastName) {
        return res.status(400).json({ error: 'Faltan campos: nombre y apellido son requeridos' });
    }

    const key = `${name}-${lastName}`;
    const now = Date.now();

    for (const [key, timestamp] of newNames.entries()) {
        if (now - timestamp > time) {
            newNames.delete(key);
        }
    }

    if (newNames.has(key)) {
        return res.status(409).json({ error: 'El nombre y apellido ya han sido registrados recientemente' });
    }
    newNames.set(key, now);

    res.json({ message: `Nombre: ${name}, Apellido: ${lastName}` });
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:${3000}`);
});

module.exports = { app, newNames, time };