from rest_framework.serializers import HyperlinkedModelSerializer
from project.models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        exclude = ('is_active',)


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        exclude = ('is_active',)
