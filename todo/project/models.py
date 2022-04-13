from django.db import models
from usersapp.models import User


class Project(models.Model):

    is_active = models.BooleanField(default=True)
    name = models.CharField(max_length=64,unique=True)
    repository  = models.URLField(blank=True)
    users  = models.ManyToManyField(User)


class ToDo(models.Model):

    is_active = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT)