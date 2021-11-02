from rest_framework import serializers
from django.contrib.auth.models import User
from . import models
from django.utils import timezone
from django.db.models import F


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Entry
        fields = ('id', 'creator', 'amount', 'category', 'budget')

    def create(self, validated_data):
        x = super().create(validated_data)
        budget = validated_data.get('budget', None)
        if budget:
            budget.total = F('total') + validated_data.get('amount', 0)
            budget.save()
        return x


class EntryDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name')
    creator_name = serializers.CharField(source='creator.username')
    class Meta:
        model = models.Entry
        fields = ('id', 'creator_name', 'amount', 'category_name', 'budget')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('id', 'name')


class BudgetSerializer(serializers.ModelSerializer):
    entries = EntryDetailSerializer(many=True, read_only=True)

    class Meta:
        model = models.Budget
        fields = ('id', 'title', 'owner', 'total', 'participants', 'entries',)
        extra_kwargs = {'participants': {'required': False}}

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.participants.add(instance.owner)
        return instance
