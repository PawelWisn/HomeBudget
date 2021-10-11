#!/bin/sh

rm -rf v1/migrations/*
python manage.py makemigrations
python manage.py migrate

exec "$@"
