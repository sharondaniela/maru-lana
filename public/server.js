const express = require('express');
const path = require('path');
const app = express();

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ mensaje: "¡Backend funcionando!" });
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});