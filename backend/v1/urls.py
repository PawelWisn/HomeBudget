from rest_framework import routers
from . import views
from django.conf.urls import include, url

router = routers.DefaultRouter()

router.register(r'budget', views.BudgetViewSet)
router.register(r'entry', views.EntryViewSet)
router.register(r'category', views.CategoryViewSet)

urlpatterns = [
    url('', include(router.urls)),
]
