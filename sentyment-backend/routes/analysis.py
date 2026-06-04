from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def sentiment(query: str):
    return {
        "query": query,
        "limit": 400,
        "message": "tu będzie sentiment analysis"
    }