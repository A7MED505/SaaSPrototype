from typing import List
from bson import ObjectId

from app.database import get_db


async def get_recommendations(user_id: str, limit: int = 6) -> List[dict]:
    """
    Simple recommendation logic:
    1. Look at user's order history for categories they bought.
    2. Return top-rated products from those categories.
    3. Fall back to globally top-rated products if no history.
    """
    db = get_db()

    # Gather categories from past orders
    orders = await db.orders.find({"user_id": user_id}).to_list(length=50)
    bought_product_ids = set()
    for order in orders:
        for item in order.get("items", []):
            bought_product_ids.add(item["product_id"])

    category_counts: dict = {}
    for pid in bought_product_ids:
        try:
            product = await db.products.find_one({"_id": ObjectId(pid)})
            if product:
                cat = product.get("category", "")
                category_counts[cat] = category_counts.get(cat, 0) + 1
        except Exception:
            continue

    query = {}
    if category_counts:
        top_categories = sorted(category_counts, key=category_counts.get, reverse=True)[:3]
        query["category"] = {"$in": top_categories}
        # Exclude already bought items
        if bought_product_ids:
            try:
                query["_id"] = {"$nin": [ObjectId(pid) for pid in bought_product_ids]}
            except Exception:
                pass

    cursor = db.products.find(query).sort("rating", -1).limit(limit)
    products = await cursor.to_list(length=limit)

    # Fallback: if not enough results, fill with top-rated products globally
    if len(products) < limit:
        seen_ids = {str(p["_id"]) for p in products}
        fallback_cursor = db.products.find({"_id": {"$nin": [p["_id"] for p in products]}}).sort("rating", -1).limit(limit - len(products))
        fallback = await fallback_cursor.to_list(length=limit)
        products.extend(fallback)

    result = []
    for p in products:
        result.append({
            "id": str(p["_id"]),
            "name": p.get("name"),
            "price": p.get("price"),
            "category": p.get("category"),
            "image_url": p.get("image_url"),
            "rating": p.get("rating", 0.0),
        })
    return result
