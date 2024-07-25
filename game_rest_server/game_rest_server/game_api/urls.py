from django.urls import path
from knox import views as knox_views
from game_rest_server.game_api.views import GamesListCreateView, \
    GameGetEditDeleteView, UserGetUpdateDeleteView, RegisterView, LoginAPI, CommentCreateView

urlpatterns = [
    path('games/', GamesListCreateView.as_view(), name='games'),
    path('games/<int:pk>', GameGetEditDeleteView.as_view(), name='single-game'),
    path('user/<int:pk>', UserGetUpdateDeleteView.as_view(), name='user'),
    path('users/register/',  RegisterView.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='api-login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('comments/<int:pk>', CommentCreateView.as_view(), name='comment')
]

