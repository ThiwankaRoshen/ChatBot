from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note,Chat


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "response", "question", "created_at", "author","pdf_file"]
        extra_kwargs = {"author": {"read_only": True}}

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["response", "question","author", "file"]
        extra_kwargs = {"file": {"read_only": True}}