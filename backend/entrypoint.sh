#!/bin/sh

python manage.py makemigrations v1
python manage.py makemigrations
python manage.py migrate

python manage.py test

#populate some categories
echo "from v1.models import Category; Category.objects.get_or_create(name='Food');Category.objects.get_or_create(name='Home');Category.objects.get_or_create(name='Car');" | python manage.py shell

exec "$@"
