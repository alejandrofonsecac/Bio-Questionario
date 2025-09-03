from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore

# --- carregar .env ---
load_dotenv()

# --- inicializar Flask ---
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173","http://127.0.0.1:5173"]}})

# --- rota de teste /health ---
@app.route("/health")
def health():
    return jsonify({"ok": True})

# --- inicializar Firebase Admin ---
FIREBASE_CRED = os.getenv("FIREBASE_CRED")
if not FIREBASE_CRED or not os.path.exists(FIREBASE_CRED):
    raise RuntimeError("Defina FIREBASE_CRED no .env com o caminho da chave JSON de serviço do Firebase")

cred = credentials.Certificate(FIREBASE_CRED)
firebase_admin.initialize_app(cred)
db = firestore.client()

# --- rota /salvar_resultado ---
@app.route("/salvar_resultado", methods=["POST"])
def salvar_resultado():
    raw_body = request.get_data(as_text=True)  # para debug
    try:
        dados = request.get_json(silent=True) or {}
    except Exception:
        dados = {}

    print("DEBUG salvar_resultado")
    print("Content-Type:", request.headers.get("Content-Type"))
    print("raw_body:", raw_body)
    print("dados:", dados)

    nome = str(dados.get("nome", "")).strip()
    try:
        score = int(dados.get("score"))
    except Exception:
        score = None
    try:
        duration = float(dados.get("durationSeconds"))
    except Exception:
        duration = None

    if not nome:
        return jsonify({"sucesso": False, "erro": "nome obrigatório"}), 400
    if score is None:
        return jsonify({"sucesso": False, "erro": "score deve ser número"}), 400
    if duration is None:
        return jsonify({"sucesso": False, "erro": "durationSeconds deve ser número"}), 400

    doc = {
        "name": nome,
        "score": score,
        "durationSeconds": duration,
        "total": int(dados.get("total") or 0),
        "startedAt": dados.get("startedAt"),
        "finishedAt": dados.get("finishedAt"),
        "createdAt": firestore.SERVER_TIMESTAMP,
    }

    ref = db.collection("quizResults").add(doc)
    return jsonify({"sucesso": True, "id": ref[1].id, "echo": dados})

# --- handlers de erro para sempre devolver JSON ---
@app.errorhandler(404)
def nf(e): return jsonify({"sucesso": False, "erro": "Rota não encontrada"}), 404

@app.errorhandler(405)
def mm(e): return jsonify({"sucesso": False, "erro": "Método não permitido"}), 405

@app.errorhandler(500)
def se(e): return jsonify({"sucesso": False, "erro": "Erro interno"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
