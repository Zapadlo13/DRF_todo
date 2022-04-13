import graphene
from graphene_django import DjangoObjectType
from project.models import ToDo, Project
from usersapp.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project

    fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo

    fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User

    fields = '__all__'


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(pk=id)
        project.name = name
        project.save()

        return ProjectUpdateMutation(project=project)


class ProjectCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        repository = graphene.String()
        users = graphene.List(graphene.Int)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, repository, users):

        project = Project.objects.create(name=name, repository=repository)
        for user_id in users:
            if User.objects.filter(id=user_id):
                project.users.add(user_id)
        project.save()
        return ProjectCreateMutation(project=project)


class ProjectDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, id):
        Project.objects.get(id=id).delete()

        return ProjectDeleteMutation(project=None)


class Mutations(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()
    create_project = ProjectCreateMutation.Field()
    delete_project = ProjectDeleteMutation.Field()


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    all_users = graphene.List(UserType)

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_user_username = graphene.List(ProjectType,
                                              username=graphene.String(required=False))

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return User.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)

        except Project.DoesNotExist:

            return None

    def resolve_projects_by_user_username(self, info, username=None):
        projects = Project.objects.all()
        if username:
            projects = projects.filter(users__username=username)

        return projects


schema = graphene.Schema(query=Query, mutation=Mutations)
