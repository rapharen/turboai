from django.urls import path, include
from rest_framework_nested import routers
from .views import CategoryViewSet, NoteViewSet, RegisterView, LoginView

router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')

categories_router = routers.NestedDefaultRouter(router, r'categories', lookup='category')
categories_router.register(r'notes', NoteViewSet, basename='category-notes')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(categories_router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
