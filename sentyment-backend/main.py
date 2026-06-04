from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analysis import router as analysis_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    analysis_router,
    prefix="/sentiment",
    tags=["Sentiment Analysis"]
)

@app.get("/")
def root():
    return {
        "message": "Tweet Sentiment Analyzer API"
    }

@app.get("/health")
def health():
    return {
        "status": "ok"
    }