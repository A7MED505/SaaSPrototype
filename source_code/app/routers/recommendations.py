from fastapi import APIRouter, Depends, Query

from app.services.recommendation_service import get_recommendations
from app.services.auth_service import get_current_user

router = APIRouter()


@router.get("/", summary="Get personalized product recommendations")
async def recommendations(
    limit: int = Query(6, ge=1, le=20),
    current_user: dict = Depends(get_current_user),
):
    return await get_recommendations(str(current_user["_id"]), limit=limit)
