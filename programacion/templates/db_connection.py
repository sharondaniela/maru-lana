import mariadb

def get_connection():
    try:
        conn = mariadb.connect(
            user="root",
            password="",
            host="localhost",
            port=3306,
            database="ruana"
        )
        return conn
    except mariadb.Error as e:
        print(f"Error de conexión (Código {e.errno}): {e.errmsg}")
        return None