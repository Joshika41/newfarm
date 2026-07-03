from sqlalchemy import create_engine, text
engine = create_engine('mysql+pymysql://root:Josh_070604@localhost/tutorial_db')
with engine.connect() as conn:
    print(conn.execute(text("SELECT title, assigned_to FROM tasks WHERE id='t_035104d7'")).fetchall())
