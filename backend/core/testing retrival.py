import vertexai
from vertexai.preview.language_models import TextEmbeddingModel
import chromadb


project_id = "project-a46bff91-9ff5-47ac-81d"
location = "us-central1"

db_path = r"D:\Users\Documents\Symbiosis\TensorSmiths\GSA\backend\chroma_db"  


vertexai.init(project=project_id, location=location)
embed_model = TextEmbeddingModel.from_pretrained("text-embedding-004")   


client = chromadb.PersistentClient(path=db_path)
collection = client.get_collection(name="museum_collection")  


question = "How did Tanaji capture Sinhagad?"   #query for testing

query_vec = embed_model.get_embeddings([question])[0].values   

search_result = collection.query(
    query_embeddings=[query_vec],
    n_results=3
)

print("\nTop Matches:\n")

docs = search_result["documents"][0]
metas = search_result["metadatas"][0]

for i in range(len(docs)):
    print(f"Result {i+1}:")
    print("Document:", docs[i])
    print("Metadata:", metas[i])
    print("-" * 50)