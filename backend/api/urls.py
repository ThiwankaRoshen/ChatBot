from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("notes/ask/<int:pk>/", views.ask, name="ask-note"),    
    path("chats/", views.ChatListCreate.as_view(), name="note-list"),
    path("chats/delete/<int:pk>/", views.ChatDelete.as_view(), name="delete-note"),
    path("chats/ask/<int:pk>/", views.Chatask, name="ask-note"),    

]