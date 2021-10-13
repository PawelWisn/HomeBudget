#!/bin/sh

rm -rf v1/migrations/*
python manage.py makemigrations v1
python manage.py makemigrations
python manage.py migrate

echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@yahoo.com', 'adminadmin');" | python manage.py shell
echo "from v1.models import Category; Category.objects.create('Food');Category.objects.create('Home');Category.objects.create('Car');" | python manage.py shell

exec "$@"
