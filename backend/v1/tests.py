from . import models
from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client
from . import permissions

client = Client()
random_password = 'xp2fXR/z+RK3nDGf'


class BaseTestCase(TestCase):

    def setUp(self) -> None:
        self.new_user = {
            "username": "new_user",
            "password": f"{random_password}"
        }

    def create_user(self, user_dict=None):
        user_dict = user_dict or self.new_user
        response = client.post('/auth/users/', user_dict)
        return User.objects.get(pk=response.data['id'])

    def get_user_token(self, user_dict=None):
        user_dict = user_dict or self.new_user
        response = client.post('/auth/jwt/create/', user_dict)
        self.assertEqual(response.status_code, 200, msg=response.data)
        token = response.data['access']
        return token

class UserTestCase(BaseTestCase):
    def test_registration_successful(self):
        user_dict = self.new_user.copy()
        response = client.post('/auth/users/', user_dict)
        self.assertEqual(response.status_code, 201, msg=response.data)
        self.assertContains(response, 'username', status_code=201)
        self.assertContains(response, 'id', status_code=201)

    def test_registration_failed_no_password(self):
        user_dict = self.new_user.copy()
        user_dict.pop('password')
        response = client.post('/auth/users/', user_dict)
        self.assertEqual(response.status_code, 400, msg=response.data)

    def test_registration_failed_empty_password(self):
        user_dict = self.new_user.copy()
        user_dict['password'] = ''
        response = client.post('/auth/users/', user_dict)
        self.assertEqual(response.status_code, 400, msg=response.data)

    def test_registration_unique_usernames(self):
        user_dict = self.new_user.copy()
        response = client.post('/auth/users/', user_dict)
        self.assertEqual(response.status_code, 201, msg=response.data)
        response = client.post('/auth/users/', user_dict)
        self.assertEqual(response.status_code, 400, msg=response.data)

    def test_login_successful(self):
        self.create_user()
        user_dict = self.new_user.copy()
        response = client.post('/auth/jwt/create/', user_dict)
        self.assertEqual(response.status_code, 200, msg=response.data)
        self.assertContains(response, 'access', status_code=200)

class BudgetTestCase(BaseTestCase):
    def test_budget_creation_login_required(self):
        user = self.create_user()
        token = self.get_user_token()
        auth = f"JWT {token}"

        payload = {"title": "Budget1", "owner": user.id}
        
        response = client.post('/budget/', payload)
        self.assertEqual(response.status_code, 401, msg=response.data)
        
        response = client.post('/budget/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)
        self.assertContains(response, 'id', status_code=201)

    def test_budget_only_allowed_can_access(self):
        user = self.create_user()
        token = self.get_user_token()
        auth = f"JWT {token}"

        user_dict2 = {'username':'second_user', 'password':f"{random_password}"}
        user2 = self.create_user(user_dict2)
        token2 = self.get_user_token(user_dict2)
        auth2 = f"JWT {token2}"

        payload = {"title": "Budget1", "owner": user.id}

        #create
        response = client.post('/budget/', payload, HTTP_AUTHORIZATION=auth)
        self.assertEqual(response.status_code, 201, msg=response.data)

        budget_id = str(response.data['id'])

        #list
        response = client.get('/budget/', HTTP_AUTHORIZATION=auth)
        self.assertEqual(response.status_code, 200, msg=response.data)
        self.assertEqual(len(response.data['results']), 1)

        response = client.get('/budget/', HTTP_AUTHORIZATION=auth2)
        self.assertEqual(response.status_code, 200, msg=response.data)
        self.assertEqual(len(response.data['results']), 0)

        #retrieve
        response = client.get(f'/budget/{budget_id}/', HTTP_AUTHORIZATION=auth)
        self.assertEqual(response.status_code, 200, msg=response.data)
        self.assertContains(response, 'id', status_code=200)

        response = client.get(f'/budget/{budget_id}/', HTTP_AUTHORIZATION=auth2)
        self.assertEqual(response.status_code, 403, msg=response.data)
        self.assertNotContains(response, 'id', status_code=403)

        #delete
        response = client.delete(f'/budget/{budget_id}/', HTTP_AUTHORIZATION=auth2)
        self.assertNotEqual(response.status_code, 204, msg=response.data)

        response = client.delete(f'/budget/{budget_id}/', HTTP_AUTHORIZATION=auth)
        self.assertEqual(response.status_code, 204, msg=response.data)
        
    def test_budget_can_be_shared(self):
        user = self.create_user()
        token = self.get_user_token()
        auth = f"JWT {token}"

        user_dict2 = {'username':'second_user', 'password':f"{random_password}"}
        user2 = self.create_user(user_dict2)
        token2 = self.get_user_token(user_dict2)
        auth2 = f"JWT {token2}"

        payload = {"title": "Budget1", "owner": user.id}
        
        #create
        response = client.post('/budget/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)

        budget_id = str(response.data['id'])
        payload = {"new_user": user2.username}

        #share
        response = client.patch(f'/budget/{budget_id}/', payload, HTTP_AUTHORIZATION=auth, content_type='application/json')
        self.assertEqual(response.status_code, 200, msg=response.data)

        #confirm access
        response = client.get('/budget/', HTTP_AUTHORIZATION=auth2)
        self.assertEqual(response.status_code, 200, msg=response.data)
        self.assertEqual(len(response.data['results']), 1)

class EntryTestCase(BaseTestCase):
    def test_entry_creation_login_required(self):
        user = self.create_user()
        token = self.get_user_token()
        auth = f"JWT {token}"

        #create category
        category = models.Category.objects.create(name='Food')

        payload = {"title": "Budget1", "owner": user.id}
        
        response = client.post('/budget/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)
        self.assertContains(response, 'id', status_code=201)

        budget_id = str(response.data['id'])
        payload = {"creator": user.id, "amount":"50.01", "category":category.id,"budget":budget_id }

        #with auth
        response = client.post('/entry/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)
        self.assertContains(response, 'id', status_code=201)

        #no auth
        response = client.post('/entry/', payload, follow=True)
        self.assertEqual(response.status_code, 401, msg=response.data)

    def test_entry_amount_adds_properly(self):
        user = self.create_user()
        token = self.get_user_token()
        auth = f"JWT {token}"

        #create category
        category = models.Category.objects.create(name='Food')

        payload = {"title": "Budget1", "owner": user.id}
        
        response = client.post('/budget/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)
        self.assertContains(response, 'id', status_code=201)

        budget_id = str(response.data['id'])
        payload = {"creator": user.id, "amount":"50.01", "category":category.id,"budget":budget_id }

        #first post
        response = client.post('/entry/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)

        #second post
        response = client.post('/entry/', payload, HTTP_AUTHORIZATION=auth, follow=True)
        self.assertEqual(response.status_code, 201, msg=response.data)

        #total evaluation
        response = client.get(f'/budget/{budget_id}/', HTTP_AUTHORIZATION=auth)
        self.assertEqual(response.status_code, 200, msg=response.data)
        self.assertEqual(response.data['total'], "100.02", msg=response.data)