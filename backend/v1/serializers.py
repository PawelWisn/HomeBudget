from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        write_only_fields = ('password',)


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Entry
        fields=('id', 'creator', 'amount', 'category', 'budget')

    # def create(self, validated_data):
    #     creator = self.request

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Budget
        fields = ('id', 'title', 'owner','total','participants')        