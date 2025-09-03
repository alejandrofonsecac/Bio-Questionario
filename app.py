from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timezone
from flask_cors import CORS



app = Flask(__name__)


# Carregar variáveis do .env
load_dotenv()

# Caminho para o JSON da chave de serviço
FIREBASE_CRED = os.getenv("FIREBASE_CRED")
if not FIREBASE_CRED or not os.path.exists(FIREBASE_CRED):
    raise RuntimeError("Defina FIREBASE_CRED no .env apontando para o JSON da chave privada")


CORS(app,
     resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
     supports_credentials=False,  # geralmente não precisa de cookies
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"])

# Inicializar Firebase
cred = credentials.Certificate(FIREBASE_CRED)
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__, static_folder="static", template_folder="templates")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

@app.errorhandler(404)
def nf(e): return jsonify({"sucesso": False, "erro": "Rota não encontrada"}), 404

@app.errorhandler(405)
def mm(e): return jsonify({"sucesso": False, "erro": "Método não permitido"}), 405

@app.errorhandler(500)
def se(e): return jsonify({"sucesso": False, "erro": "Erro interno"}), 500

COLLECTION = "quizResults"  # "tabela" (coleção) do Firestore

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/salvar_resultado", methods=["POST"])
def salvar_resultado():
    """
    Espera JSON:
    {
      "nome": "Estefam",
      "score": 8,                # acertos
      "durationSeconds": 295.3,  # tempo total em segundos
      "total": 10,               # opcional
      "startedAt": "2025-09-02T23:00:11.123Z",   # opcional
      "finishedAt": "2025-09-02T23:05:06.321Z"   # opcional
    }
    """
    try:
        dados = request.get_json(force=True) or {}
    except Exception:
        return jsonify({"sucesso": False, "erro": "JSON inválido"}), 400

    nome = str(dados.get("nome", "")).strip()
    score = dados.get("score", None)
    duration = dados.get("durationSeconds", None)

    if not nome:
        return jsonify({"sucesso": False, "erro": "nome obrigatório"}), 400
    if not isinstance(score, (int, float)):
        return jsonify({"sucesso": False, "erro": "score deve ser número"}), 400
    if not isinstance(duration, (int, float)):
        return jsonify({"sucesso": False, "erro": "durationSeconds deve ser número"}), 400

    doc = {
        "name": nome,
        "score": int(score),
        "durationSeconds": float(duration),
        "total": int(dados.get("total") or 0),
        "startedAt": dados.get("startedAt") or None,
        "finishedAt": dados.get("finishedAt") or None,
        "createdAt": firestore.SERVER_TIMESTAMP,
    }

    try:
        ref = db.collection(COLLECTION).add(doc)  # add => gera ID
        return jsonify({"sucesso": True, "id": ref[1].id})
    except Exception as e:
        print("Erro ao salvar resultado:", e)
        return jsonify({"sucesso": False, "erro": "erro ao salvar"}), 500


@app.route("/ranking")
def get_ranking():
    """
    Retorna top N ordenando por:
      1) score DESC (mais acertos primeiro)
      2) durationSeconds ASC (em caso de empate, menor tempo primeiro)

    Query string: ?limit=10
    """
    try:
        limit = int(request.args.get("limit", 10))
    except Exception:
        limit = 10

    try:
        # Firestore: duas ordenações exigem índice composto (ver nota abaixo)
        q = (db.collection(COLLECTION)
               .order_by("score", direction=firestore.Query.DESCENDING)
               .order_by("durationSeconds", direction=firestore.Query.ASCENDING)
               .limit(limit))

        docs = q.stream()
        ranking = []
        for d in docs:
            x = d.to_dict()
            ranking.append({
                "id": d.id,
                "nome": x.get("name"),
                "score": x.get("score"),
                "durationSeconds": x.get("durationSeconds"),
                "total": x.get("total"),
                "createdAt": x.get("createdAt").timestamp() if x.get("createdAt") else None
            })

        return jsonify(ranking)
    except Exception as e:
        print("Erro ao buscar ranking:", e)
        # Firestore costuma retornar uma URL de criação de índice
        # se o índice composto ainda não existir.
        return jsonify([]), 500


if __name__ == "__main__":
    app.run(debug=True)


@app.errorhandler(404)
def not_found(e):
    return jsonify({"sucesso": False, "erro": "Rota não encontrada"}), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"sucesso": False, "erro": "Método não permitido"}), 405

@app.errorhandler(500)
def server_error(e):
    return jsonify({"sucesso": False, "erro": "Erro interno no servidor"}), 500