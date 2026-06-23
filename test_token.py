import requests, json

url = 'http://127.0.0.1:8000/api/token/'
resp = requests.post(url, json={'username': 'AbdullahSuper', 'password': 'Abdu$1516'})
print('Status:', resp.status_code)
print('Response:', resp.text)

# Test homepage
home_resp = requests.get('http://127.0.0.1:8000/')
print('Home Status:', home_resp.status_code)
print('Home Content snippet:', home_resp.text[:200])
