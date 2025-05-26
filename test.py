import mariadb
import sys

def test_connection():
    print("=== PRUEBA CON CONECTOR MARIA DB ===")
    
    try:
        # Configuración para MariaDB
        conn = mariadb.connect(
            user="root",
            password="",
            host="localhost",
            port=3306,
            database="ruana"
        )
        
        print("✅ ¡Conexión exitosa a MariaDB!")
        
        # Verificación adicional
        cursor = conn.cursor()
        cursor.execute("SELECT VERSION()")
        print(f"Versión del servidor: {cursor.fetchone()[0]}")
        
        cursor.execute("SHOW TABLES")
        tables = [table[0] for table in cursor.fetchall()]
        print(f"Tablas disponibles: {tables}")
        
    except mariadb.Error as e:
        print(f"❌ Error de conexión (Código {e.errno}): {e.errmsg}", file=sys.stderr)
    except Exception as e:
        print(f"💥 Error inesperado: {type(e).__name__}: {str(e)}", file=sys.stderr)
    finally:
        if 'conn' in locals():
            conn.close()
            print("🔌 Conexión cerrada")
        print("=== PRUEBA FINALIZADA ===")

if __name__ == "__main__":
    test_connection()