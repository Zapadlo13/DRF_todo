from rest_framework import viewsets, mixins
from .models import User
from .serializers import UserModelSerializer


# модель User: есть возможность просмотра списка и каждого пользователя в отдельности, можно вносить изменения, нельзя удалять и создавать;

class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
