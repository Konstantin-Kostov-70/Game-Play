from django.contrib import admin
from game_rest_server.game_api.models import Games, Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(Games)
class GamesAdmin(admin.ModelAdmin):
    pass
