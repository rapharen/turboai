from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, NoteViewSet, RegisterView, LoginView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
