from django.contrib import admin
from .models import *


class BudgetAdmin(admin.ModelAdmin):
    filter_horizontal = ('participants',)
    list_display = ('title', 'owner', 'total',)
    filter_display = ('owner',)


class EntryAdmin(admin.ModelAdmin):
    list_filter = ('category', 'creator',)
    list_display = ('budget', 'amount', 'category',)


admin.site.register(Category)
admin.site.register(Entry, EntryAdmin)
admin.site.register(Budget, BudgetAdmin)
