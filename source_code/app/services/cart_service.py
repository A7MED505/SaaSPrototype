from datetime import datetime
from fastapi import HTTPException
from bson import ObjectId

from app.database import get_db
from app.models.schemas import CartItem, CartOut, CartItemOut


async def get_cart(user_id: str) -> CartOut:
    db = get_db()
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart:
        return CartOut(user_id=user_id, items=[], total=0.0)
    return await _build_cart_out(user_id, cart.get("items", []))


async def add_to_cart(user_id: str, item: CartItem) -> CartOut:
    db = get_db()
    try:
        oid = ObjectId(item.product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID")

    product = await db.products.find_one({"_id": oid})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart = await db.carts.find_one({"user_id": user_id})
    if cart:
        items = cart.get("items", [])
        found = False
        for i in items:
            if i["product_id"] == item.product_id:
                i["quantity"] += item.quantity
                found = True
                break
        if not found:
            items.append({"product_id": item.product_id, "quantity": item.quantity})
        await db.carts.update_one({"user_id": user_id}, {"$set": {"items": items}})
    else:
        await db.carts.insert_one({
            "user_id": user_id,
            "items": [{"product_id": item.product_id, "quantity": item.quantity}],
            "updated_at": datetime.utcnow(),
        })

    updated = await db.carts.find_one({"user_id": user_id})
    return await _build_cart_out(user_id, updated.get("items", []))


async def remove_from_cart(user_id: str, product_id: str) -> CartOut:
    db = get_db()
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    items = [i for i in cart.get("items", []) if i["product_id"] != product_id]
    await db.carts.update_one({"user_id": user_id}, {"$set": {"items": items}})
    return await _build_cart_out(user_id, items)


async def checkout(user_id: str) -> dict:
    db = get_db()
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")

    cart_out = await _build_cart_out(user_id, cart["items"])
    order_doc = {
        "user_id": user_id,
        "items": [i.dict() for i in cart_out.items],
        "total": cart_out.total,
        "status": "pending",
        "created_at": datetime.utcnow(),
    }
    result = await db.orders.insert_one(order_doc)
    await db.carts.delete_one({"user_id": user_id})
    return {"order_id": str(result.inserted_id), "total": cart_out.total, "status": "pending"}


async def _build_cart_out(user_id: str, items: list) -> CartOut:
    db = get_db()
    cart_items = []
    total = 0.0
    for item in items:
        try:
            product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
        except Exception:
            continue
        if product:
            subtotal = product["price"] * item["quantity"]
            total += subtotal
            cart_items.append(CartItemOut(
                product_id=item["product_id"],
                name=product["name"],
                price=product["price"],
                quantity=item["quantity"],
                subtotal=subtotal,
            ))
    return CartOut(user_id=user_id, items=cart_items, total=round(total, 2))
