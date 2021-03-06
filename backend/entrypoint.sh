#!/bin/sh

rm -rf v1/migrations/*
python manage.py makemigrations v1
python manage.py makemigrations
python manage.py migrate

#create useruser
echo "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@yahoo.com', 'adminadmin');" | python manage.py shell

#populate some categories
echo "from v1.models import Category; Category.objects.get_or_create(name='Food');Category.objects.get_or_create(name='Home');Category.objects.get_or_create(name='Car');" | python manage.py shell

exec "$@"
