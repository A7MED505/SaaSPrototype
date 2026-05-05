from typing import Optional
from fastapi import APIRouter, Query, Depends

from app.models.schemas import ProductCreate
from app.services.product_service import (
    get_all_products,
    get_product_by_id,
    create_product,
    get_categories,
)
from app.services.auth_service import get_current_user

router = APIRouter()


@router.get("/", summary="List all products")
async def list_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    return await get_all_products(category=category, search=search, skip=skip, limit=limit)


@router.get("/categories", summary="Get all product categories")
async def list_categories():
    return await get_categories()


@router.get("/{product_id}", summary="Get product by ID")
async def get_product(product_id: str):
    return await get_product_by_id(product_id)


@router.post("/", summary="Create a new product (admin)")
async def add_product(
    data: ProductCreate,
    current_user: dict = Depends(get_current_user),
):
    return await create_product(data)
