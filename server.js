const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *** Importante para Render: Servir la carpeta 'public' correctamente ***
// __dirname se refiere al directorio del archivo server.js
// path.join asegura que la ruta sea correcta en cualquier sistema operativo
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos temporal (archivo JSON)
// Render generalmente permite escribir en el sistema de archivos, pero para bases de datos persistentes
// se recomienda una base de datos externa o un servicio de datos de Render.
// Para este tipo de base de datos simple (database.json), funcionará.
const DB_PATH = path.join(__dirname, 'database.json');
console.log('Ruta de la base de datos:', DB_PATH);

// Inicializar DB si no existe
// Render puede recrear el sistema de archivos en cada despliegue,
// por lo que este archivo podría ser volátil.
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
    console.log('database.json creado con éxito.');
} else {
    console.log('database.json ya existe.');
}

// Rutas
app.post('/registro', (req, res) => {
    const { nombre, email, password } = req.body;
    let db;

    try {
        db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        console.log('Base de datos leída para registro:', db);
    } catch (readError) {
        console.error('Error al leer database.json en registro:', readError);
        return res.status(500).json({ error: 'Error interno del servidor al leer la DB.' });
    }

    // Validar si el usuario ya existe
    if (db.users.some(user => user.email === email)) {
        console.log('Intento de registro de usuario existente:', email);
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Guardar nuevo usuario
    db.users.push({ nombre, email, password });
    console.log('Nuevo estado de la DB antes de escribir:', db);

    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
        console.log('Usuario registrado con éxito y database.json actualizado.');
        res.json({ success: true, redirect: '/login.html' });
    } catch (writeError) {
        console.error('Error al escribir en database.json:', writeError);
        return res.status(500).json({ error: 'Error interno del servidor al guardar en la DB.' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let db;

    try {
        db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        console.log('Intento de login, leyendo DB:', db);
    } catch (readError) {
        console.error('Error al leer database.json durante el login:', readError);
        return res.status(500).json({ error: 'Error interno del servidor al leer la DB.' });
    }

    const user = db.users.find(user => user.email === email && user.password === password);

    if (!user) {
        console.log('Intento de login fallido: credenciales incorrectas para', email);
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    console.log('Login exitoso para usuario:', user.nombre);
    res.json({ success: true, redirect: '/index.html', user: { nombre: user.nombre } });
});

// ¡NUEVA RUTA DE LOGOUT!
app.post('/logout', (req, res) => {
    // En este punto, como no estamos manejando sesiones de servidor complejas (ej. con express-session),
    // el logout es principalmente una confirmación al cliente.
    // El cliente (navbar-ui.js) se encarga de limpiar localStorage.
    console.log('Solicitud de cierre de sesión recibida.');
    res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
});


// *** CAMBIO PRINCIPAL PARA RENDER: Usar process.env.PORT ***
const PORT = process.env.PORT || 3000; // Render provee un puerto en esta variable de entorno
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));