from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    response = models.CharField(max_length=1000, null=True, blank=True)
    question = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    pdf_file = models.FileField(upload_to='pdfs/', blank=True, null=True)


    def __str__(self):
        return self.created_at
    
class Chat(models.Model):
    response = models.CharField(max_length=1000, null=True, blank=True)
    question = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats")
    file = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="chats")

    def __str__(self):
        return self.question
    

