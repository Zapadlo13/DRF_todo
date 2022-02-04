import json
from django.core.management.base import BaseCommand
from usersapp.models import User



def load_from_json(file_name):
    with open(file_name, mode='r', encoding='utf-8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()

        super_user = User.objects.create_superuser('zap', 'zap@geekshop.ru', '1')

        users = load_from_json('usersapp/fixtures/users.json')
        for user in users:
            cat = user.get('fields')
            new_user = User(**cat)
            new_user.save()



