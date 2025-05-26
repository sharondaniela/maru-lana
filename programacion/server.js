const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api', (req, res) => {
    res.json({ mensaje: "¡Backend conectado correctamente!" });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor Node.js corriendo en: http://localhost:${PORT}`);
});