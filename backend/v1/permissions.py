from rest_framework import permissions
from . import models


class ActionBasedPermission(permissions.AllowAny):
    def has_permission(self, request, view):
        print(request.user.is_authenticated, request.user, flush=True)
        for klass, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return klass().has_permission(request, view)
        return False

class LoggedIn(permissions.BasePermission):
    message = "Not allowed."

    def has_permission(self, request, view):
        return request.user.is_authenticated

