
from rest_framework.viewsets import ModelViewSet

from project.models import Project,ToDo
from .models import User
from .serializers import UserModelSerializer,ProjectModelSerializer,ToDoModelSerializer


class UserModelViewSet(ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer


class ProjectModelViewSet(ModelViewSet):
   queryset = Project.objects.all()
   serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
   queryset = ToDo.objects.all()
   serializer_class = ToDoModelSerializer
