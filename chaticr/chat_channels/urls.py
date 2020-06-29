from django.urls import path

from .views import *

app_name = 'chat'
urlpatterns = [
    path('', Welcome.as_view(), name='index'),
    path('<str:room_name>/', Chat.as_view(), name='room'),
]