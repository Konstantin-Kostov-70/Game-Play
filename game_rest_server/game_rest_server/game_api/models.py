from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinLengthValidator


class Profile(AbstractUser):
    image = models.URLField(
        blank=True
    )
    rank = models.CharField(
        max_length=20,
        choices=(
            ('Gamer', 'Gamer'),
            ('Super Gamer', 'Super Gamer'),
            ('Top Gamer', 'Top Gamer'),
            ('Genius', 'Genius'),
        ),
        blank=True
    )
    social_media = models.URLField(
        blank=True,
    )
    story = models.TextField(
        blank=True,
    )


class Games(models.Model):
    title = models.CharField(
        max_length=30
    )
    category = models.CharField(
        max_length=20
    )
    maxLevel = models.IntegerField()
    imageUrl = models.URLField()
    summary = models.TextField()
    created_on = models.DateTimeField(
        auto_now_add=True
    )
    owner = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title


class Comment(models.Model):
    comment = models.TextField(
        validators=(
            MinLengthValidator(10),
        )
    )
    date_of_creation = models.DateField(
        auto_now_add=True
    )
    game = models.ForeignKey(
        to=Games,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        to=Profile,
        on_delete=models.CASCADE
    )
