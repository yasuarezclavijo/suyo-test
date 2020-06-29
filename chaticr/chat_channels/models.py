from django.db import models
from django.contrib.auth import get_user_model

Users = get_user_model()

class Message(models.Model):
    author = models.ForeignKey(Users, related_name='author_message', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username