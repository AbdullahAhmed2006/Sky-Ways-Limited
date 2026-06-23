"""Test registration to find the exact error."""
import requests, json

BASE = 'http://127.0.0.1:8000'

# Try registering like the frontend does for DR-07
payload = {
    'username': 'driver_dr07',
    'email': 'driver_dr07@skyways.com',
    'password': 'Abdu$1516',
    'first_name': 'Test',
    'last_name': 'NewDriver',
    'phone_number': '1234567890',
    'role': 'driver'
}
print(f"POST /api/v1/users/register/")
print(f"Payload: {json.dumps(payload, indent=2)}")
r = requests.post(f'{BASE}/api/v1/users/register/', json=payload)
print(f"Status: {r.status_code}")
print(f"Response: {r.text}")

# Also check if there's an existing DR-06 user from earlier test
print("\n--- Checking existing users ---")
r2 = requests.post(f'{BASE}/api/token/', json={'username':'AbdullahSuper','password':'Abdu$1516'})
token = r2.json()['access']
users = requests.get(f'{BASE}/api/v1/users/', headers={'Authorization':f'Bearer {token}'}).json()
for u in users:
    print(f"  {u['username']} ({u['first_name']} {u['last_name']}) role={u.get('role','?')}")
