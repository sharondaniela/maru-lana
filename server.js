const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const app = express();


app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api', (req, res) => {
    res.json({ mensaje: "¡Backend funcionando!" });
});


app.get('/test', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Prueba Backend</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #2c3e50; }
                p { color: #7f8c8d; }
            </style>
        </head>
        <body>
            <h1>¡Backend activo! ✅</h1>
            <p>Fecha del servidor: ${new Date()}</p>
            <p>Prueba también <a href="/api">/api</a></p>
        </body>
        </html>
    `);
});

app.post('/registro', (req, res) => {
    const { nombre, email, password } = req.body;
    

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    console.log('Datos recibidos:', { nombre, email, password });
    res.json({ 
        success: true,
        message: "Usuario registrado correctamente",
        user: { nombre, email } 
    });
});

app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Ruta no encontrada</h1>
        <p>La ruta ${req.url} no existe en este servidor</p>
    `);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Rutas disponibles:`);
    console.log(`- GET  /api       (API de prueba)`);
    console.log(`- GET  /test      (Página HTML de prueba)`);
    console.log(`- POST /registro  (Registro de usuarios)\n`);
});