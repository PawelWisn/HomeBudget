from rest_framework import permissions
from . import models


class ActionBasedPermission(permissions.AllowAny):
    def has_permission(self, request, view):
        print(view.action)
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
        print('has obj perm:', obj.owner == self.request.user)
        return obj.owner == self.request.user

    def has_permission(self, request, view):
        return request.user.is_authenticated


class isEntryOwner(permissions.BasePermission):
    message = "Not allowed."
    
    def has_object_permission(self, request, view, obj):
        print('has obj perm:', obj.owner == self.request.user)
        return obj.Creator == self.request.user

    def has_permission(self, request, view):
        return request.user.is_authenticated
