import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from datetime import timedelta
from django.utils import timezone
from .models import Message
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self, data):
        this_hour = timezone.now()
        one_hour_before = this_hour + timedelta(hours=-1)
        messages = Message.objects.order_by('timestamp').filter(timestamp__range=(one_hour_before, this_hour))
        history = [self.message_to_json(msg) for msg in messages]
        content = {
            'messages': history
        }
        self.push_messages(content)
    
    def new_message(self, data):
        usernameAuthor = data['from']
        try:
            author = User.objects.get(username=usernameAuthor)
        except ObjectDoesNotExist:
            author = User.objects.create_user(usernameAuthor)
            author.is_superuser = False
            author.is_staff = True
            author.save()
        message = Message.objects.create(
            author=author,
            content=data['message']
        )
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_message_chat(content)
    
    def message_to_json(self, msg):
        return {
            'id': msg.id,
            'author': msg.author.username,
            'content': msg.content,
            'timestamp': str(msg.timestamp)
        }

    commander = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        
    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message'] if 'message' in data else ''
        command = data['command']
        self.commander[command](self, data)

    def send_message_chat(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def push_messages(self, messages):
         self.send(text_data=json.dumps({
            'command': 'messages',
            'messages': messages['messages']
        }))

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'command': 'new_message',
            'message': message['message']
        }))
