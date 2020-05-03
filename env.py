import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MODE = os.environ.get('MODE')
MYSQL_CON = ''
if MODE == 'PROD':
    MYSQL_CON = os.environ.get('PROD_MYSQL_CON_URL')

if MODE == 'DEV':
    MYSQL_CON = os.environ.get('DEV_MYSQL_CON_URL')
