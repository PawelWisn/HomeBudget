from django.db import models
from django.contrib.auth.models import User
from django.db.models import F


class Budget(models.Model):
    class Meta:
        ordering = "title", 'id'

    title = models.CharField(max_length=128, default='Budget')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    participants = models.ManyToManyField(User, related_name='participants', blank=True)

    def __str__(self) -> str:
        return self.title + ': ' + str(self.owner)


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=128, unique=True)

    def __str__(self) -> str:
        return self.name


class Entry(models.Model):
    class Meta:
        verbose_name_plural = 'Entries'

    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return str(self.creator) + ': ' + str(self.amount)

    def save(self, *args, **kwargs):
        self.budget.total = F('total') + self.amount
        self.budget.save()
        instance = super().save(*args, **kwargs)
        return instance

    def delete(self, *args, **kwargs):
        self.budget.total = F('total') - self.amount
        self.budget.save()
        return super().delete(*args, **kwargs)
