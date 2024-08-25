import time
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, ChatSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Chat
from django.shortcuts import get_object_or_404
from .RAG import Rag
# Create your views here.


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    



class ChatListCreate(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    


class ChatDelete(generics.DestroyAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(author=user)
    




# def ask(request, pk):
#     note = get_object_or_404(Note, id=pk)
#     print(note.content, note.pdf_file)
#     answer = Rag(note.content, note.pdf_file)
#     time.sleep(10)
#     print("Thiwaa" + answer)
#     return JsonResponse({'status': 'success', 'note_id': pk, 'answer': answer}, status=201)

def ask(request, pk):
    note = get_object_or_404(Note, id=pk)
    try:
        answer = Rag(note.question, note.pdf_file)
        note.response = answer
        note.save()
        return JsonResponse({'status': 'success', 'note_id': pk, 'answer': answer}, status=200)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


#  Try to modify our chat database model more suitable for each pdf
def Chatask(request, pk):
    note = get_object_or_404(Note, id=pk)
    chat = get_object_or_404(Chat, file=note)
    try:
        answer = Rag(chat.question, note.pdf_file)
        chat.response = answer
        chat.save()
        return JsonResponse({'status': 'success', 'note_id': pk, 'answer': answer}, status=200)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
