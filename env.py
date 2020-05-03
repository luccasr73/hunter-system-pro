import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


class Config:
    MODE = os.environ.get('MODE')
    DB_HOST = ''
    DB_PORT= ''
    DB_DBNAME = ''
    DB_USER= ''
    DB_PASS = ''
    DB_TYPE= ''
    DB_CONECTOR = ''
    if MODE == 'PROD':
        DB_PORT= ''
        DB_DBNAME = ''
        DB_USER= ''
        DB_PASS = ''
        DB_TYPE= ''
        DB_CONECTOR = ''

    if MODE == 'DEV':
        DB_PORT= ''
        DB_DBNAME = ''
        DB_USER= ''
        DB_PASS = ''
        DB_TYPE= ''
        DB_CONECTOR = ''
