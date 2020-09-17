from django.urls import path
from . import views

urlpatterns = [
    path('', views.AjaxView.as_view())
]
