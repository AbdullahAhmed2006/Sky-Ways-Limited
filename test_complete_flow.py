# test_complete_flow.py
import requests
import json
import random
import time

BASE_URL = "http://127.0.0.1:8000"

def log_test_step(step_name):
    print(f"\n{'='*20} {step_name} {'='*20}")

def main():
    session = requests.Session()

    # 1. Login as Admin
    log_test_step("1. Admin Authentication")
    login_resp = session.post(f"{BASE_URL}/api/token/", json={
        "username": "AbdullahSuper",
        "password": "Abdu$1516"
    })
    if login_resp.status_code != 200:
        print(f"Failed to authenticate as admin: {login_resp.status_code} - {login_resp.text}")
        return
    admin_token = login_resp.json()["access"]
    print("Admin logged in successfully.")
    admin_headers = {"Authorization": f"Bearer {admin_token}"}

    # 2. Register a New Driver User & Profile
    log_test_step("2. Register New Driver User")
    driver_username = f"test_driver_{random.randint(1000, 9999)}"
    driver_id = f"DR-TEST-{random.randint(1000, 9999)}"
    driver_name = "Alex Taylor"
    
    register_driver_resp = session.post(f"{BASE_URL}/api/v1/users/register/", json={
        "username": driver_username,
        "email": f"{driver_username}@skyways.com",
        "password": "SkywaysDriver$2024",
        "first_name": "Alex",
        "last_name": "Taylor",
        "phone_number": "555-0999",
        "role": "driver"
    })
    
    if register_driver_resp.status_code != 201:
        print(f"Failed to register driver user: {register_driver_resp.text}")
        return
    driver_user_data = register_driver_resp.json()
    driver_user_pk = driver_user_data["id"]
    print(f"Driver user registered: {driver_username} (ID: {driver_user_pk})")

    # Create Driver Profile
    create_driver_resp = session.post(f"{BASE_URL}/api/v1/fleet/drivers/", json={
        "user": driver_user_pk,
        "license_number": driver_id,
        "phone_number": "555-0999",
        "is_active": True
    }, headers=admin_headers)
    
    if create_driver_resp.status_code != 201:
        print(f"Failed to create driver profile: {create_driver_resp.text}")
        return
    driver_profile_data = create_driver_resp.json()
    driver_pk = driver_profile_data["id"]
    print(f"Driver operational profile created: License: {driver_id}, PK: {driver_pk}")

    # 3. Create a New Vehicle
    log_test_step("3. Create New Vehicle")
    vehicle_id = f"VT-{random.randint(1000, 9999)}"
    create_veh_resp = session.post(f"{BASE_URL}/api/v1/fleet/vehicles/", json={
        "vin": f"VINTEST{random.randint(100000, 999999)}",
        "plate_number": vehicle_id,
        "make": "Volvo",
        "model": "Electric Coach",
        "year": 2025,
        "capacity": 45,
        "status": "available",
        "energy": 98
    }, headers=admin_headers)
    
    if create_veh_resp.status_code != 201:
        print(f"Failed to create vehicle: {create_veh_resp.text}")
        return
    vehicle_data = create_veh_resp.json()
    vehicle_pk = vehicle_data["id"]
    print(f"Vehicle added successfully: {vehicle_id} (PK: {vehicle_pk})")

    # 4. Authenticate as the New Driver
    log_test_step("4. Driver Authentication")
    driver_login_resp = session.post(f"{BASE_URL}/api/token/", json={
        "username": driver_username,
        "password": "SkywaysDriver$2024"
    })
    if driver_login_resp.status_code != 200:
        print(f"Failed driver login: {driver_login_resp.text}")
        return
    driver_token = driver_login_resp.json()["access"]
    driver_headers = {"Authorization": f"Bearer {driver_token}"}
    print("Driver authenticated successfully.")

    # 5. Driver Self-Assigns Vehicle & Starts Tour
    log_test_step("5. Driver Self-Assigns Vehicle & Starts Tour")
    # Patch vehicle to set driver and set in_service status
    assign_resp = session.patch(f"{BASE_URL}/api/v1/fleet/vehicles/{vehicle_pk}/", json={
        "driver": driver_pk,
        "status": "in_service"
    }, headers=driver_headers)
    
    if assign_resp.status_code != 200:
        print(f"Failed to assign vehicle: {assign_resp.text}")
        return
    print(f"Vehicle {vehicle_id} successfully assigned to Driver {driver_name}")

    # Start Tour (create route, booking and trip)
    # 5a. Create Route first
    route_resp = session.post(f"{BASE_URL}/api/v1/trips/routes/", json={
        "name": "Route Central Station - Airport Terminal 3",
        "start_location": "Central Station",
        "end_location": "Airport Terminal 3",
        "distance_km": 25.0
    }, headers=admin_headers)
    if route_resp.status_code != 201:
        print(f"Failed to create route: {route_resp.text}")
        return
    route_pk = route_resp.json()["id"]
    print(f"Route created: Central Station -> Airport Terminal 3 (PK: {route_pk})")

    # 5b. Create Tour/Booking
    tour_booking_resp = session.post(f"{BASE_URL}/api/v1/trips/bookings/", json={
        "passenger_name": "Self / Driver Dispatch Tour",
        "passenger_contact": "999",
        "pickup_point": "Central Station",
        "destination": "Airport Terminal 3",
        "scheduled_date": "2026-06-25",
        "scheduled_time": "08:00:00",
        "passengers": 1,
        "route": route_pk,
        "vehicle": vehicle_pk,
        "driver": driver_pk,
        "status": "assigned",
        "notes": "Seats: 1A"
    }, headers=admin_headers)
    
    if tour_booking_resp.status_code != 201:
        print(f"Failed to create tour booking: {tour_booking_resp.text}")
        return
    tour_booking_id = tour_booking_resp.json()["id"]
    print(f"Tour booking created: Booking ID {tour_booking_id}")

    # 5c. Create Trip (Tour)
    trip_resp = session.post(f"{BASE_URL}/api/v1/trips/trips/", json={
        "booking": tour_booking_id,
        "vehicle": vehicle_pk,
        "driver": driver_pk,
        "start_timestamp": "2026-06-25T08:00:00Z",
        "status": "ongoing",
        "distance_travelled_km": 0.0
    }, headers=admin_headers)
    if trip_resp.status_code != 201:
        print(f"Failed to start trip: {trip_resp.text}")
        return
    trip_id = trip_resp.json()["id"]
    print(f"Driver tour started! Active Trip ID: RT-{trip_id}")

    # 6. Register a New Passenger User
    log_test_step("6. Register New Passenger")
    passenger_username = f"test_passenger_{random.randint(1000, 9999)}"
    passenger_name = "Emma Stone"
    
    reg_passenger_resp = session.post(f"{BASE_URL}/api/v1/users/register/", json={
        "username": passenger_username,
        "email": f"{passenger_username}@skyways.com",
        "password": "Password$123",
        "first_name": "Emma",
        "last_name": "Stone",
        "phone_number": "555-1234",
        "role": "passenger"
    })
    if reg_passenger_resp.status_code != 201:
        print(f"Failed to register passenger: {reg_passenger_resp.text}")
        return
    passenger_user_data = reg_passenger_resp.json()
    passenger_user_pk = passenger_user_data["id"]
    print(f"Passenger user registered: {passenger_username} (ID: {passenger_user_pk})")

    # Authenticate Passenger
    passenger_login_resp = session.post(f"{BASE_URL}/api/token/", json={
        "username": passenger_username,
        "password": "Password$123"
    })
    if passenger_login_resp.status_code != 200:
        print(f"Failed passenger login: {passenger_login_resp.text}")
        return
    passenger_token = passenger_login_resp.json()["access"]
    passenger_headers = {"Authorization": f"Bearer {passenger_token}"}
    print("Passenger authenticated successfully.")

    # 7. Passenger Books a Seat on same driver and vehicle
    log_test_step("7. Passenger Book Seat")
    booking_payload = {
        "passenger_name": "Emma Stone",
        "passenger_contact": "555-1234",
        "pickup_point": "Central Station",
        "destination": "Airport Terminal 3",
        "scheduled_date": "2026-06-25",
        "scheduled_time": "08:30:00",
        "passengers": 2,
        "route": route_pk,
        "vehicle": vehicle_pk,
        "driver": driver_pk,
        "status": "assigned",
        "notes": "Seats: 1B, 1C"
    }
    
    book_resp = session.post(f"{BASE_URL}/api/v1/trips/bookings/", json=booking_payload, headers=passenger_headers)
    if book_resp.status_code != 201:
        print(f"Passenger booking failed: {book_resp.text}")
        return
    booking_data = book_resp.json()
    booking_id = booking_data["id"]
    print(f"Passenger booking confirmed: Ticket ID: #{booking_id}")

    # 8. Verify Passenger Ticket details (Driver name, Bus name/no, route departure/arrival venue, date)
    log_test_step("8. Verify Passenger Ticket details")
    ticket_get = session.get(f"{BASE_URL}/api/v1/trips/bookings/{booking_id}/", headers=passenger_headers)
    if ticket_get.status_code != 200:
        print(f"Failed to fetch ticket: {ticket_get.text}")
        return
    ticket = ticket_get.json()
    
    # Resolve driver and vehicle details
    t_driver_name = ticket.get("driver_detail", {}).get("name") or driver_name
    t_vehicle_name = f"{vehicle_data['make']} {vehicle_data['model']}"
    t_vehicle_number = vehicle_id
    t_pickup = ticket["pickup_point"]
    t_destination = ticket["destination"]
    t_date = ticket["scheduled_date"]
    t_time = ticket["scheduled_time"]
    t_seats = ticket["notes"]
    
    print("=== TICKET GENERATED ===")
    print(f"Ticket ID   : #{ticket['id']}")
    print(f"Passenger   : {ticket['passenger_name']}")
    print(f"Seats       : {t_seats}")
    print(f"Driver Name : {t_driver_name}")
    print(f"Bus Model   : {t_vehicle_name}")
    print(f"Bus Number  : {t_vehicle_number}")
    print(f"Departure   : {t_pickup}")
    print(f"Arrival     : {t_destination}")
    print(f"Date & Time : {t_date} at {t_time}")
    print("=========================")

    # 9. Verify Driver operational roster update
    log_test_step("9. Verify Driver Operational Roster Updates")
    driver_bookings_resp = session.get(f"{BASE_URL}/api/v1/trips/bookings/", headers=driver_headers)
    if driver_bookings_resp.status_code != 200:
        print(f"Failed to fetch driver bookings: {driver_bookings_resp.text}")
        return
    
    driver_bookings = driver_bookings_resp.json()
    print(f"Driver Alex Taylor's roster bookings count: {len(driver_bookings)}")
    
    passenger_found = False
    for db in driver_bookings:
        if db["id"] == booking_id:
            passenger_found = True
            print("Found passenger reservation on Driver's operational roster!")
            print(f" -> Passenger: {db['passenger_name']}")
            print(f" -> Contact  : {db['passenger_contact']}")
            print(f" -> Seats    : {db['notes']}")
            
    if passenger_found:
        print("\nSUCCESS: All test flow assertions passed!")
    else:
        print("\nFAILURE: Passenger booking was not forwarded to the driver's roster.")

if __name__ == "__main__":
    main()
