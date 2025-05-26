from db_connection import get_connection
import mariadb  # Añade esta línea

def fetch_users():
    conn = get_connection()
    if not conn:
        return

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuarios")  # Consulta la tabla correcta
        users = cursor.fetchall()
        
        if not users:
            print("La tabla 'usuarios' está vacía")
        else:
            print("\nUsuarios registrados:")
            for user in users:
                print(user)
                
    except mariadb.Error as e:
        print(f"Error al consultar (Código {e.errno}): {e.errmsg}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    fetch_users()