from flask import Flask, request, jsonify, send_from_directory
import smtplib
from email.message import EmailMessage
from email.utils import formataddr
import os
from dotenv import load_dotenv

os.system("cls" if os.name == 'nt' else 'clear')

load_dotenv()
EMAIL = os.getenv('EMAIL')
SENHA = os.getenv('SENHADEAPP')
DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'

app = Flask(__name__, static_folder='../Assets', static_url_path='/Assets')

# Serve o HTML principal
@app.route('/')
def index():
    return send_from_directory('../', 'Index.html')  # ou use: return app.send_static_file('Index.html')

# Rota da API que envia o e-mail
@app.route('/api/enviar-email', methods=['POST'])
def enviar_email():
    dados = request.json
    nome = dados.get('nome')
    email = dados.get('email')
    mensagem = dados.get('mensagem')

    corpo = f"Nome: {nome}\nEmail: {email}\nMensagem:\n{mensagem}"

    try:
        msg = EmailMessage()
        msg.set_content(corpo)
        msg['Subject'] = "Portfólio"
        msg['From'] = formataddr((nome, EMAIL))
        msg['To'] = EMAIL      
        msg['Reply-To'] = email

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL, SENHA)
            smtp.send_message(msg)

        return jsonify({'status': 'ok'})
    except Exception as e:
        if DEBUG:
            return jsonify({'status': 'erro', 'mensagem': str(e)}), 500
        return jsonify({'status': 'erro', 'mensagem': 'Erro ao enviar email. Tente novamente mais tarde.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=DEBUG)