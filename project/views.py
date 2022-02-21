from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet

from project.filters import TodoFilter
from project.models import Project, ToDo
from project.serializers import ProjectModelSerializer, ToDoModelSerializer


# модель Project: доступны все варианты запросов; для постраничного вывода установить размер страницы 10 записей; добавить фильтрацию по совпадению части названия проекта;


class ProjectPageNumberPagination(PageNumberPagination):
    page_size = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.select_related().all()
    serializer_class = ProjectModelSerializer
    #pagination_class = ProjectPageNumberPagination

    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', None)  # поиск по параметру name
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


# модельToDo: доступны все варианты запросов; при удалении не удалятьToDo, а выставлять признак, что оно закрыто; добавить фильтрацию по проекту; для постраничного вывода установить размер страницы 20.


class ToDoPageNumberPagination(PageNumberPagination):
    page_size = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    #pagination_class = ToDoPageNumberPagination
    #filterset_class = TodoFilter


    def destroy(self, request, *args, **kwargs):

        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
        else:
            instance.is_active = True
        instance.save()
