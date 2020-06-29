from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class Welcome(TemplateView):
    def get(self, request, *args, **kwargs):
        return render(request, 'chat/index.html')

class Chat(TemplateView):
    def get(self, request, *args, **kwargs):
        return render(request, 'chat/room.html', {'room_name': kwargs['room_name']})