from rest_framework import viewsets, mixins
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2



# модель User: есть возможность просмотра списка и каждого пользователя в отдельности, можно вносить изменения, нельзя удалять и создавать;

class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerV2

        return UserModelSerializer
