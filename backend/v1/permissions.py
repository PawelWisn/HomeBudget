from rest_framework import permissions
from . import models


class ActionBasedPermission(permissions.AllowAny):
    def has_permission(self, request, view):
        for klass, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return klass().has_permission(request, view)
        return False

class LoggedIn(permissions.BasePermission):
    message = "Not allowed."

    def has_permission(self, request, view):
        return request.user.is_authenticated

class isBudgetOwner(permissions.BasePermission):
    message = "Not allowed."
    
    def has_object_permission(self, request, view, obj):
        return obj.owner == self.request.user

    def has_permission(self, request, view):
        return request.user.is_authenticated


class isEntryOwner(permissions.BasePermission):
    message = "Not allowed."
    
    def has_object_permission(self, request, view, obj):
        return obj.creator == self.request.user

    def has_permission(self, request, view):
        return request.user.is_authenticated

class CanAccessEntry(permissions.BasePermission):
    message = "Not allowed."

    def has_permission(self, request, view):
        if view.action in ['retrieve',]:
            user = request.user
            pk = view.kwargs['pk']
            try:
                obj = models.Entry.objects.get(pk=pk)
            except models.Budget.DoesNotExist:
                return False
            return  user in obj.budget.participants.all()
        elif view.action in ['create',]:
            user = request.user
            budget_id = request.data.get('budget', 0)
            try:
                budget = models.Budget.objects.get(pk=budget_id)
            except models.Budget.DoesNotExist:
                return False
            return user in budget.participants.all()
        return False

class CanAccessBudget(permissions.BasePermission):
    message = "Not allowed."

    def has_permission(self, request, view):
        if view.action in ['retrieve',]:
            user = request.user
            pk = view.kwargs['pk']
            try:
                obj = models.Budget.objects.get(pk=pk)
            except models.Budget.DoesNotExist:
                return False
            return  user in obj.participants.all()
        return False
