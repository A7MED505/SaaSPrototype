from fastapi import APIRouter, Depends

from app.models.schemas import CartItem
from app.services.cart_service import get_cart, add_to_cart, remove_from_cart, checkout
from app.services.auth_service import get_current_user

router = APIRouter()


@router.get("/", summary="Get current user's cart")
async def view_cart(current_user: dict = Depends(get_current_user)):
    return await get_cart(str(current_user["_id"]))


@router.post("/add", summary="Add item to cart")
async def add_item(item: CartItem, current_user: dict = Depends(get_current_user)):
    return await add_to_cart(str(current_user["_id"]), item)


@router.delete("/{product_id}", summary="Remove item from cart")
async def remove_item(product_id: str, current_user: dict = Depends(get_current_user)):
    return await remove_from_cart(str(current_user["_id"]), product_id)


@router.post("/checkout", summary="Checkout and create order")
async def do_checkout(current_user: dict = Depends(get_current_user)):
    return await checkout(str(current_user["_id"]))
