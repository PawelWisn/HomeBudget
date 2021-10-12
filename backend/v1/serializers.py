from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Entry
        fields = ('id', 'creator', 'amount', 'category', 'budget')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('id', 'name')


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Budget
        fields = ('id', 'title', 'owner', 'total', 'participants')
        extra_kwargs = {'participants': {'required': False}}

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.participants.add(instance.owner)
        return instance
