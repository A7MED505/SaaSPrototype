from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# ── Auth Schemas ──────────────────────────────────────────────
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ── Product Schemas ───────────────────────────────────────────
class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: str
    price: float = Field(..., gt=0)
    category: str
    image_url: Optional[str] = None
    stock: int = Field(default=0, ge=0)
    tags: Optional[List[str]] = []


class ProductOut(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str]
    stock: int
    tags: List[str]
    rating: Optional[float] = 0.0
    created_at: datetime


# ── Cart Schemas ──────────────────────────────────────────────
class CartItem(BaseModel):
    product_id: str
    quantity: int = Field(..., gt=0)


class CartItemOut(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    subtotal: float


class CartOut(BaseModel):
    user_id: str
    items: List[CartItemOut]
    total: float


# ── Order Schemas ─────────────────────────────────────────────
class OrderOut(BaseModel):
    id: str
    user_id: str
    items: List[CartItemOut]
    total: float
    status: str
    created_at: datetime


# ── Review Schemas ────────────────────────────────────────────
class ReviewCreate(BaseModel):
    product_id: str
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None


class ReviewOut(BaseModel):
    id: str
    user_id: str
    product_id: str
    rating: int
    comment: Optional[str]
    created_at: datetime
