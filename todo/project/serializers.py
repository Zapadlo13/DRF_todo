from rest_framework.serializers import  ModelSerializer
from project.models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        exclude = ('is_active',)


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('__all__')
