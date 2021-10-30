from . import serializers
from . import models
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from .permissions import ActionBasedPermission, LoggedIn, isBudgetOwner, isEntryOwner, CanAccessEntry,CanAccessBudget
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers
from rest_framework.response import Response
from django.db.models import Q


class EntryViewSet(viewsets.ModelViewSet):
    queryset = models.Entry.objects.all()
    serializer_class = serializers.EntrySerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        CanAccessEntry: ['create', 'retrieve'],
        isEntryOwner: ['destroy'],
    }


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = models.Budget.objects.all()
    serializer_class = serializers.BudgetSerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        LoggedIn: ['create', 'list'],
        isBudgetOwner: ['destroy'],
        CanAccessBudget: ['retrieve'],
    }


    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(0))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
        
    
    def get_queryset(self):
        qs =  super().get_queryset()
        return qs.filter(participants__in=[self.request.user])
    
    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(0))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request,*args, **kwargs)


class InvitationViewSet(viewsets.ModelViewSet):
    queryset = models.Budget.objects.all()
    serializer_class = serializers.BudgetSerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        isBudgetOwner: ['partial_update'],
    }

    def partial_update(self, request, *args, **kwargs):
        try:
            instance = self.queryset.get(pk=kwargs.get('pk'))
        except models.Budget.DoesNotExist:
            return Response({"errors": "Instance not found"},status=status.HTTP_404_NOT_FOUND)

        new_username = request.data.get('new_user', None)
        try:
            new_participant = User.objects.get(username=new_username)
        except User.DoesNotExist:
            return Response({"errors": "Username not found"},status=status.HTTP_404_NOT_FOUND)
        
        instance.participants.add(new_participant)
        data = self.get_serializer(instance).data
        return Response(data)    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        AllowAny: ['list', 'retrieve'],
    }

    @method_decorator(cache_page(10))    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
