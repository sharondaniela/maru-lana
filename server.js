const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Asegúrate de que tu carpeta 'public' exista y contenga tus HTML, CSS, JS

// Base de datos temporal (archivo JSON)
const DB_PATH = path.join(__dirname, 'database.json');
console.log('Ruta de la base de datos:', DB_PATH); // Esto te dirá dónde el servidor busca/crea el JSON

// Inicializar DB si no existe
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2)); // Añadido null, 2 para formato legible
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

    // Guardar nuevo usuario (¡En producción usa bcrypt para la contraseña!)
    db.users.push({ nombre, email, password });
    console.log('Nuevo estado de la DB antes de escribir:', db);

    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2)); // Añadido null, 2 para formato legible
        console.log('Usuario registrado con éxito y database.json actualizado.');
        // ¡Esta es la línea clave que debe enviar el 'redirect'!
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

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));