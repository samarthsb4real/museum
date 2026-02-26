# Backend Setup

## 1. Authenticate with Google Cloud
```bash
gcloud auth application-default login
```

## 2. Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

## 3. Run the API server
```bash
python api.py
```

The API will run on http://localhost:5000

## 4. Run the frontend
```bash
cd ..
npm run dev
```

The frontend will run on http://localhost:3000
