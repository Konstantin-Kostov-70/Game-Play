from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from game_rest_server.game_api.models import Games, Comment, Profile


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'image',
            'rank',
            'social_media',
            'story',
        ]


class RegisterUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #     required=True,
    #     validators=[UniqueValidator(queryset=User.objects.all())]
    # )

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password])
    password2 = serializers.CharField(
        write_only=True,
        required=True)

    class Meta:
        model = Profile
        fields = ('username', 'password', 'password2',)
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True}
        # }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = Profile.objects.create(
            username=validated_data['username'],
            # email=validated_data['email'],
            # first_name=validated_data['first_name'],
            # last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
