#From json to embeddings stored in chromadb locally 

import json
import time
import vertexai
from vertexai.preview.language_models import TextEmbeddingModel
import chromadb


project_id = "project-a46bff91-9ff5-47ac-81d"
location = "us-central1"  #change if limiting

data_file = r"D:\Users\Documents\Symbiosis\TensorSmiths\GSA\Data\rawdata.json"
db_path = r"D:\Users\Documents\Symbiosis\TensorSmiths\GSA\backend\chroma_db" 
#change for others

batch_size = 5
wait_time = 12


vertexai.init(project=project_id, location=location)
model = TextEmbeddingModel.from_pretrained("text-embedding-004")  #can change (try others)


with open(data_file, "r", encoding="utf-8") as f:
    records = json.load(f)

print("Total records found:", len(records))    


client = chromadb.PersistentClient(path=db_path)

collection = client.get_or_create_collection(
    name="museum_collection"                   #change for other projects
)


count = 0

for start in range(0, len(records), batch_size):
    current_batch = records[start:start + batch_size]

    text_list = []
    id_list = []
    meta_list = []

    for item in current_batch:
        text_list.append(item["content"])
        id_list.append(item["id"])
        meta_list.append({
            "title": item["title"],
            "category": item["category"]
        })
    #change for others

    embed_output = model.get_embeddings(text_list)
    vector_list = [e.values for e in embed_output]

    collection.add(
        documents=text_list,
        embeddings=vector_list,
        ids=id_list,
        metadatas=meta_list
    )

    #same as the above

    count += 1
    print("Batch", count, "added") 

    if start + batch_size < len(records):
        time.sleep(wait_time)

print("Done inserting everything.") 