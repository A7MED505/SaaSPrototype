from datetime import datetime
from typing import List, Optional
from fastapi import HTTPException
from bson import ObjectId

from app.database import get_db
from app.models.schemas import ProductCreate, ProductOut


def _serialize(product: dict) -> dict:
    product["id"] = str(product.pop("_id"))
    return product


async def get_all_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
) -> List[dict]:
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
        ]
    cursor = db.products.find(query).skip(skip).limit(limit)
    products = await cursor.to_list(length=limit)
    return [_serialize(p) for p in products]


async def get_product_by_id(product_id: str) -> dict:
    db = get_db()
    try:
        oid = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID")
    product = await db.products.find_one({"_id": oid})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return _serialize(product)


async def create_product(data: ProductCreate) -> dict:
    db = get_db()
    doc = data.dict()
    doc["rating"] = 0.0
    doc["created_at"] = datetime.utcnow()
    result = await db.products.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return doc


async def get_categories() -> List[str]:
    db = get_db()
    return await db.products.distinct("category")
