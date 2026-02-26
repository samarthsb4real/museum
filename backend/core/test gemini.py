import vertexai
from vertexai.generative_models import GenerativeModel

vertexai.init(
    project="project-a46bff91-9ff5-47ac-81d", #change for others
    location="us-central1"
)

model = GenerativeModel("gemini-2.0-flash") #try others too

while True:
    response = model.generate_content(input("Ask: "))
    print("Response: ", response.text)
    if input("Ask: ") == "exit":
        break