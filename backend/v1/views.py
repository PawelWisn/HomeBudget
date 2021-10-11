from . import serializers
from . import models
from rest_framework import viewsets
from django.contrib.auth.models import User
from .permissions import ActionBasedPermission, LoggedIn, isBudgetOwner, isEntryOwner
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework.response import Response



class EntryViewSet(viewsets.ModelViewSet):
    queryset = models.Entry.objects.all()
    serializer_class = serializers.EntrySerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        AllowAny: ['create', 'list', 'retrieve'],
        isEntryOwner: ['destroy',]
    }

    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(10))    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(10))
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.UserSerializerNoPassword(instance)
        return Response(serializer.data)

class BudgetViewSet(viewsets.ModelViewSet):
    queryset = models.Budget.objects.all()
    serializer_class = serializers.BudgetSerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        AllowAny: ['create', 'list', 'retrieve'],
        isBudgetOwner: ['destroy','partial_update']
    }

    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(0))
    def list(self, request, *args, **kwargs):
        x = super().list(request, *args, **kwargs)
        return x

    def partial_update(self, request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        new_username = request.data['new_user']
        new_part = User.objects.get(username=new_username)
        instance.participants.add(new_part)
        data = self.get_serializer(instance).data
        return Response(data)
