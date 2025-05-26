from flask import Flask, render_template, request, redirect, session, flash
import mariadb
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.urandom(24).hex()  # Clave secreta para sesiones

# Configuración de MariaDB
def get_db():
    try:
        return mariadb.connect(
            user="root",
            password="",
            host="localhost",
            port=3306,
            database="ruana"
        )
    except mariadb.Error as e:
        print(f"Error conectando a MariaDB: {e}")
        return None

# Ruta principal
@app.route('/')
def home():
    if 'user_id' in session:
        return render_template('index.html', username=session.get('user_name'))
    return redirect('/login')

# Registro
@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        # Procesar formulario
        nombre = request.form['nombre']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        
        conn = get_db()
        if conn:
            try:
                cur = conn.cursor()
                cur.execute(
                    "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
                    (nombre, email, password)
                )
                conn.commit()
                flash('¡Registro exitoso! Por favor inicia sesión', 'success')
                return redirect('/login')
            except mariadb.Error as e:
                flash(f'Error al registrar: {e}', 'error')
            finally:
                conn.close()
    
    return render_template('registro.html')

# Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        conn = get_db()
        if conn:
            try:
                cur = conn.cursor(dictionary=True)
                cur.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
                user = cur.fetchone()
                
                if user and check_password_hash(user['password'], password):
                    session['user_id'] = user['id']
                    session['user_name'] = user['nombre']
                    return redirect('/')
                else:
                    flash('Credenciales incorrectas', 'error')
            except mariadb.Error as e:
                flash(f'Error al iniciar sesión: {e}', 'error')
            finally:
                conn.close()
    
    return render_template('login.html')

# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)