from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.models.schemas import UserRegister, Token
from app.services.auth_service import register_user, login_user, get_current_user

router = APIRouter()


@router.post("/register", response_model=Token, summary="Register a new user")
async def register(data: UserRegister):
    return await register_user(data)


@router.post("/login", response_model=Token, summary="Login and get access token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    from app.models.schemas import UserLogin
    return await login_user(UserLogin(email=form_data.username, password=form_data.password))


@router.get("/me", summary="Get current user info")
async def me(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "created_at": current_user["created_at"],
    }
