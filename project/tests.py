import json
import math

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    CoreAPIClient
from mixer.backend.django import mixer
from usersapp.models import User
from .views import ProjectModelViewSet
from .models import Project, ToDo


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123456789'
        self.email = 'admin_123456789@mail.ru'

        self.username = 'user_test'
        self.user_password = 'test_123456789'
        self.user_email = 'test_123456789@mail.ru'

        self.admin = User.objects.create_superuser(self.name, self.email, self.password)
        self.data_project = {'name': 'Тестовый проект', 'is_active': True, 'repository': 'https://mail.ru/',
                             'users': [self.admin.id]}
        self.data_project2 = {'name': 'Тестовый проект 2', 'is_active': True, 'repository': 'https://yandex.ru/'}

        self.url = '/api/projects/'

    # APIRequestFactory force_authenticate
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data_project, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data_project, format='json')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # APIClient
    def test_get_detail(self):
        client = APIClient()
        client.login(username=self.name, password=self.password)
        project = Project.objects.create(**self.data_project2)
        response = client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def test_put_admin(self):
        client = APIClient()
        project = Project.objects.create(**self.data_project2)
        client.login(username=self.name, password=self.password)
        response = client.put(f'{self.url}{project.id}/', self.data_project)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_ = Project.objects.get(id=project.id)
        self.assertEqual(project_.name, self.data_project.get('name'))
        self.assertEqual(project_.is_active, self.data_project.get('is_active'))
        self.assertEqual(project_.repository, self.data_project.get('repository'))
        client.logout()

    # APISimpleTestCase


class TestMath(APISimpleTestCase):

    def test_sqrt(self):
        self.assertEqual(math.sqrt(4), 2)


# APITestCase
class TestToDo(APITestCase):

    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin_123456789'
        self.email = 'admin_123456789@mail.ru'

        self.data_project = {'name': 'Тестовый проект 2', 'is_active': True, 'repository': 'https://yandex.ru/'}
        self.url = '/api/todos/'
        self.admin = User.objects.create_superuser(self.name, self.email, self.password)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_admin(self):
        self.client.login(username=self.name, password=self.password)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_put_admin(self):
        project = Project.objects.create(**self.data_project)
        todo = ToDo.objects.create(text='test', project=project, creator=self.admin)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/',
                                   {'text': 'ТЕКСТ', 'project': todo.project.id, 'creator': todo.creator.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_ = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo_.text, 'ТЕКСТ')
        self.client.logout()

    def test_put_mixer(self):
        todo = mixer.blend(ToDo)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/',
                                   {'text': 'MIXER', 'project': todo.project.id, 'creator': todo.creator.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        bio_ = ToDo.objects.get(id=todo.id)
        self.assertEqual(bio_.text, 'MIXER')
        self.client.logout()

    def test_put_mixer_fields(self):
        todo = mixer.blend(ToDo, text='TEXT')
        self.assertEqual(todo.text, 'TEXT')
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/',
                                   {'text': 'MIXER', 'project': todo.project.id, 'creator': todo.creator.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        bio_ = ToDo.objects.get(id=todo.id)
        self.assertEqual(bio_.text, 'MIXER')
        self.client.logout()
