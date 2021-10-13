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
        isEntryOwner: ['destroy',]
    }

    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(0))    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = models.Budget.objects.all()
    serializer_class = serializers.BudgetSerializer
    permission_classes=(ActionBasedPermission,)
    action_permissions = {
        LoggedIn: ['create', 'list'],
        isBudgetOwner: ['destroy','partial_update'],
        CanAccessBudget: ['retrieve',],
    }


    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(0))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
        
    
    def get_queryset(self):
        qs =  super().get_queryset()
        final_qs =  super().get_queryset()
        user = self.request.user
        for q in qs:
            if user not in q.participants.all():
                final_qs = final_qs.exclude(id=q.id)
        return final_qs
    

    def partial_update(self, request, *args, **kwargs):
        try:
            instance = self.queryset.get(pk=kwargs.get('pk'))
        except models.Budget.DoesNotExist:
            return Response({"errors": "Instance not found"},status=status.HTTP_404_NOT_FOUND)
        new_username = request.data['new_user']
        try:
            new_part = User.objects.get(username=new_username)
        except User.DoesNotExist:
            return Response({"errors": "Username not found"},status=status.HTTP_404_NOT_FOUND)
        instance.participants.add(new_part)
        data = self.get_serializer(instance).data
        return Response(data)
    
    @method_decorator(vary_on_headers('Authorization'))
    @method_decorator(cache_page(0))
    def retrieve(self, request, *args, **kwargs):
        budget_data = super().retrieve(request,*args, **kwargs).data
        budget_id = budget_data.get('id', 0)
        entries = models.Entry.objects.filter(budget__id=budget_id)
        entry_serializer = serializers.EntryDetailSerializer
        entry_arr = []
        for entry in entries:
            entry_data = entry_serializer(entry).data
            entry_arr.append(entry_data)
        budget_data['entries'] = entry_arr
        return Response(budget_data)


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
