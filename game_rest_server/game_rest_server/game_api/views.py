from django.contrib.auth import login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from knox.views import LoginView as KnoxLoginView

from game_rest_server.game_api.models import Games, Comment, Profile
from game_rest_server.game_api.serializers import GamesSerializer, \
    UserSerializer, RegisterUserSerializer, CommentSerializer


class GamesListCreateView(APIView):
    def get(self, request):
        games = Games.objects.all()
        get_game_serializer = GamesSerializer(games, many=True)
        return Response(get_game_serializer.data)

    def post(self, request):
        post_game_serializer = GamesSerializer(data=request.data)
        if post_game_serializer.is_valid():
            post_game_serializer.save()
            return Response(post_game_serializer.data, status=status.HTTP_200_OK)
        return Response({'message': "not correct data"}, status=status.HTTP_400_BAD_REQUEST)


class CommentCreateView(APIView):
    def get(self, request, pk):
        try:
            game = Games.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)
        all_comments = Comment.objects.all().filter(game=game)
        get_all_comments_serializer = CommentSerializer(all_comments, many=True)
        for x in get_all_comments_serializer.data:
            user_id = x['user']
            x['username'] = Profile.objects.get(id=user_id).username
        return Response(get_all_comments_serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        user_id = request.data['user']
        user = Profile.objects.get(id=user_id)

        post_comment_serializer = CommentSerializer(data=request.data)
        if post_comment_serializer.is_valid():
            post_comment_serializer.save()
            serialized_data = post_comment_serializer.data
            serialized_data['username'] = user.username
            return Response(serialized_data, status=status.HTTP_200_OK)
        return Response({'message': 'not valid_data'}, status=status.HTTP_400_BAD_REQUEST)


class GameGetEditDeleteView(APIView):
    def get(self, request, pk):
        try:
            game = Games.objects.get(pk=pk)
            get_game_serializer = GamesSerializer(game)
            return Response(get_game_serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            game = Games.objects.get(pk=pk)
            put_game_serializer = GamesSerializer(game, data=request.data)
            if put_game_serializer.is_valid():
                put_game_serializer.save()
                return Response(put_game_serializer.data, status=status.HTTP_200_OK)
            return Response({'message': put_game_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            game = Games.objects.get(pk=pk)
            game.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_204_NO_CONTENT)


class UserGetUpdateDeleteView(APIView):
    def get(self, request, pk):
        try:
            user = Profile.objects.get(pk=pk)
            games = Games.objects.filter(owner=user)
            get_user_serializer = UserSerializer(user)
            get_user_games_serializer = GamesSerializer(games, many=True)
            response_data = {
                'user': get_user_serializer.data,
                'user_games': get_user_games_serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            user = Profile.objects.get(pk=pk)
            put_user_serializer = UserSerializer(user, data=request.data)
            if put_user_serializer.is_valid():
                put_user_serializer.save()
                return Response(put_user_serializer.data, status=status.HTTP_200_OK)
            return Response({'message': put_user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, pk):
        try:
            user = Profile.objects.get(pk=pk)
            user.delete()
            return Response({'message': 'User is deleted'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'message': 'not found'}, status=status.HTTP_204_NO_CONTENT)


class RegisterView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterUserSerializer


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({
                'user_info': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
            }, status=status.HTTP_200_OK)
        return Response({'error': 'not authenticated'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        _, token = AuthToken.objects.create(user)
        # return super(LoginAPI, self).post(request, format=None)
        return Response({
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            },
            'token': token
        })


