from flask import Flask, request, jsonify
from flask_cors import CORS
import chromadb
import os

app = Flask(__name__)
CORS(app)

db_path = os.path.join(os.path.dirname(__file__), "chroma_db")

try:
    client = chromadb.PersistentClient(path=db_path)
    collection = client.get_collection(name="museum_collection")
    use_rag = True
except:
    use_rag = False

FIGURE_RESPONSES = {
    "gandhi": "As Mahatma Gandhi, I believe in non-violence and truth. ",
    "ambedkar": "As Dr. B.R. Ambedkar, I fought for social justice and equality. ",
    "bose": "As Subhas Chandra Bose, I led the revolutionary struggle for freedom. ",
    "nehru": "As Jawaharlal Nehru, I worked to build a modern, democratic India. ",
    "patel": "As Sardar Vallabhbhai Patel, I unified India through strong leadership. ",
    "azad": "As Maulana Abul Kalam Azad, I championed education and secularism. "
}

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('message', '')
    figure_id = data.get('figure', 'gandhi')
    
    response_text = FIGURE_RESPONSES.get(figure_id, FIGURE_RESPONSES["gandhi"])
    response_text += f"Regarding your question about '{question}', let me share my perspective based on my life's work and principles."
    
    return jsonify({"response": response_text})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
