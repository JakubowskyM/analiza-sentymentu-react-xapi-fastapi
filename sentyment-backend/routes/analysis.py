import time

from fastapi import APIRouter, HTTPException

from schemas.analysis import AnalyzeRequest, AnalyzeResponse, ErrorResponse
from services.analysis_service import run_analysis
from services.apify_service import ApifyNotConfiguredError, ApifyRunError

router = APIRouter()


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    responses={
        502: {"model": ErrorResponse},
        503: {"model": ErrorResponse},
    },
)
def analyze_sentiment(request: AnalyzeRequest):
    started = time.perf_counter()
    try:
        result = run_analysis(request.query, request.limit)
        duration_ms = int((time.perf_counter() - started) * 1000)
        return result.model_copy(
            update={"meta": result.meta.model_copy(update={"duration_ms": duration_ms})}
        )
    except ApifyNotConfiguredError:
        raise HTTPException(
            status_code=503,
            detail={"error": "Apify token is not configured", "code": "APIFY_NOT_CONFIGURED"},
        ) from None
    except ApifyRunError as exc:
        raise HTTPException(
            status_code=502,
            detail={"error": str(exc), "code": "APIFY_FAILED"},
        ) from exc
