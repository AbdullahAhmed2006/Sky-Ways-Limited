// State Management and Simulation Engine for SkyWays Fleet Control
// Dynamically connected to Django REST APIs and MySQL Database

const DEFAULT_STATE = {
    managerName: "Sofia Ramirez",
    managerPic: "https://lh3.googleusercontent.com/aida-public/AB6AXuArYoq4g7p6n2wwKu7R5NmH6n0ELPr5ufBNQYvdxkNa5YDnSSoxs0l8CAgEHgCBeVQQwfLSoCID7R3K-GqRnbKSGmwnB0LkrqU7guJ2tPUikdXhCf4gnyqx8yEgTjU3VzM_eoObYdw5tp7VSCVpnaKK0-JXLdvjIc3i4weeKAO_tq9zmaFjNO37e7YsyNC0x7ZGNNm57Iwa2Y_EcgxCM4EIe1ApFHzMT0Oo809DRZLXUN6s3z8GXOJizOsLh8MltrDRYimTeqDwGsc",
    vehicles: [
        {
            id: "VH-1042",
            name: "Mercedes Citaro G",
            type: "Luxury Coach",
            capacity: 84,
            route: "R-104 (Downtown)",
            status: "In Transit",
            energy: 78,
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB23jpkcBEjtDd-cdfJwha_Xuy5LZmvWq5ymX-IetZc4lLk1JT-G05nUlJjrlQuThCGWstOkasA1CIMd_jqEWb61wWlO88qoPAdVk03zMkH_SSgBIbCeFYg1mbg9-_bY9Q1gUddTMX62tp8CnwSTiObiTjmhFTXQ07VzmZDpH7qpyTjHJ89om0HH6WJq3goSX_ptsGEWCSAcmO4nEC7khoy_6QC7d71sfMpOnxgK7haOMDTwAMq-inX36Xln49ng5UdezaFvseaWec"
        },
        {
            id: "VH-2019",
            name: "Volvo 7900 Elec",
            type: "Express Shuttle",
            capacity: 65,
            route: "Depot Alpha",
            status: "Maintenance",
            energy: 42,
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWzu5jks871pkCN9cO5RZoU0Nb8Beqi7f5gJxit8wEnoQcjEGFJr0bz1H1LRnMN-nCprBMJDl9pjtw6hX6jRqaDo4Nwuu7xXYzDEVknTV6pH2FQUhcttwZDKqyUifLdnf0Oj3txPZHBfaWIh7i1a-3vZtiG8y7H3UPqb0a_iiR8qeCzQH-PQqCmdBtEaUKPAeO99kSGu-1F1W2m5nBAo1yW7_QR7oPdVuT65AjR_kdaOewbo9LkToCHAUdqI4DTos1KOIikkoluIs"
        },
        {
            id: "VH-0899",
            name: "BYD K9",
            type: "Mini Bus",
            capacity: 70,
            route: "Depot Alpha",
            status: "Available",
            energy: 100,
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGlQaaefoTFBcD9krTgj2PS1ayEnbal7PY7SNSnISl6ewmdVXB17EbJiFvrK4o5qfErZ0PaB0OB8Cz4XC9-gpJgFwEx3gL07xiIuDbFzqcBW80E43pRnQL8WkCQ5OKfSAR9yV3NXLQEJuT9BaiyekOVrLnqvnxSn8z_P0hMm5KsozBpnIyiGCcCqXFLQaH7WgqAO2BUVsD8zkPIoiHrsg7OPiDiz_GPD6B7zZZxfhYXBArhqfTzyA1pP3OFtXzA8MA_QJCSLw19kk"
        },
        {
            id: "VH-3301",
            name: "BYD eBus-12",
            type: "Express Shuttle",
            capacity: 75,
            route: "R-102 (Westway)",
            status: "In Transit",
            energy: 89,
            img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=300"
        },
        {
            id: "VH-4400",
            name: "Scania Citywide",
            type: "Luxury Coach",
            capacity: 80,
            route: "R-105 (Harbor)",
            status: "In Transit",
            energy: 91,
            img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300"
        }
    ],
    drivers: [
        {
            id: "DR-01",
            name: "Marcus Johnson",
            rating: 4.9,
            trips: 1284,
            vehicle: "VH-1042",
            attendance: "Present",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKDlDL2wDxHRq04x5Zscf3ePnncYgMzt60uS6mPmn3azz13cvJ5SezsVTrMjD5Eqd1LD7F0nJ55X0OMDB53nbkzNaJTsBfxRdpghXnG6J6AGCrvCp7_e3Q2tZI9I4H4QbdWIKofk_aCqc9Wod9aR8ZqKlmDoHnW9iVxnpe1JjA1QtVRjHm9KWR7ERN6h_kUDG7OpQ52YIzzAGyxBgPI_E_-BZjZSrK2-acEKcfSA-OI3yXbYCrZ75O14u0gOuPlyrB1wqAdsw9viQ"
        },
        {
            id: "DR-02",
            name: "Yuki Tanaka",
            rating: 4.8,
            trips: 902,
            vehicle: "VH-4400",
            attendance: "Present",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBgG1a0cwQWWx111ZzYmJ0xo7loZnPQ2KB1WqWInTiEYKg-EF1yA1ZMGHU-RiZQ25H9tFxan14D9nDmegjndiORzVXP4anPA3KXx13k5KxxmJ6A29FXvTtLG8mKF5KXzLMLrQ23l-DK0eszJPDAhXfKrlzHzv0QgjAoyuftmb3dvrz7GQVxFzuZQ_n0W0yZ7F3E624-JVK2VHIx-_8J78fFh5Gk5g0TnMoeTLgjJieU0WsvYIoB0gE5hXkPwmuhzdxF5alLNsQe-w"
        },
        {
            id: "DR-03",
            name: "Arjun Mehta",
            rating: 4.9,
            trips: 7566,
            vehicle: "VH-3301",
            attendance: "Present",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuArTShModg9kDVOGM1NFJR8j7iKTH2ptrNxvU2eeY3AslQxJs72NrBBgxM8YYJf64XiX_-aZj3To7HDO32LnzMN4KQqcBgtLDBDluhK67xiATxpBpL16BL7jRhmvN7ygvFn1YL4-A8xwTAtBD00sCSo2AtVfOmH8VYePNG5haBu5X5Dy0ayD9UNQzCZqiac4J81ww5MBINZFSQ9lMzbyiyFoW25PubAXenwM3g1qAyZPJp1qIxVDR0X07aozlVS-rVt9bpBHHTnb3U"
        },
        {
            id: "DR-04",
            name: "Luis Gomez",
            rating: 4.7,
            trips: 1102,
            vehicle: "None",
            attendance: "Absent",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIIQSzJQgOsCw3XGRvkkay1by9ETMpGvftMzAVx08WvHQH7DWBu0JDsUOvXURhuZhxjrbwd6ZOeHESSa29CsHsY-Vg6U5G7aGyKWupg8GNF-Uy-PBaofXJShT-7nigZxbqiXoHCDdvda0XKR8IuV7Y2IKExC2fgzysSbx6HxKgQLrI17Q6HOHGCGwCRqhFUVSpVVR1ovN7Fp5I6v6Z7KvZiNLSpuxvGb26Pcp8sTIkOwfiAbliaACHkzT7H2P0BqTIYzT_JOm3rEI"
        },
        {
            id: "DR-05",
            name: "Karim Haddad",
            rating: 4.7,
            trips: 6387,
            vehicle: "None",
            attendance: "Absent",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOC1KUIkDnZ3aElahr-n1KDf2MCjhVpOjG7MSVbN_a5p2bxL3yV8rNXrejtQyYylO1yViJsqUAvD6VACbnPrNfpsuuXuOq9Bh1m7-Dzjzh14VYr_hsq9uAZs1PNITJvUz5gT-PDE5nIWBum2SNNk07ZJ90MdwpePwzRmnz_cOzodznySjAb06WMkBEvflrSG9Fl3ioqxjJc4t62YkUohoWmHpYJadXQNwve9Smgih24kNLM6uT943NU56FTbJkn3YYmN1N4LNLXQw"
        }
    ],
    trips: [],
    alerts: [],
    totalDistance: 38.4,
    pendingBookingsCount: 42
};

// Premium High Quality Image Lookups
const VEHICLE_IMAGES = {
    "Mercedes Citaro G": "https://lh3.googleusercontent.com/aida-public/AB6AXuB23jpkcBEjtDd-cdfJwha_Xuy5LZmvWq5ymX-IetZc4lLk1JT-G05nUlJjrlQuThCGWstOkasA1CIMd_jqEWb61wWlO88qoPAdVk03zMkH_SSgBIbCeFYg1mbg9-_bY9Q1gUddTMX62tp8CnwSTiObiTjmhFTXQ07VzmZDpH7qpyTjHJ89om0HH6WJq3goSX_ptsGEWCSAcmO4nEC7khoy_6QC7d71sfMpOnxgK7haOMDTwAMq-inX36Xln49ng5UdezaFvseaWec",
    "Volvo 7900 Elec": "https://lh3.googleusercontent.com/aida-public/AB6AXuBWzu5jks871pkCN9cO5RZoU0Nb8Beqi7f5gJxit8wEnoQcjEGFJr0bz1H1LRnMN-nCprBMJDl9pjtw6hX6jRqaDo4Nwuu7xXYzDEVknTV6pH2FQUhcttwZDKqyUifLdnf0Oj3txPZHBfaWIh7i1a-3vZtiG8y7H3UPqb0a_iiR8qeCzQH-PQqCmdBtEaUKPAeO99kSGu-1F1W2m5nBAo1yW7_QR7oPdVuT65AjR_kdaOewbo9LkToCHAUdqI4DTos1KOIikkoluIs",
    "BYD K9": "https://lh3.googleusercontent.com/aida-public/AB6AXuDGlQaaefoTFBcD9krTgj2PS1ayEnbal7PY7SNSnISl6ewmdVXB17EbJiFvrK4o5qfErZ0PaB0OB8Cz4XC9-gpJgFwEx3gL07xiIuDbFzqcBW80E43pRnQL8WkCQ5OKfSAR9yV3NXLQEJuT9BaiyekOVrLnqvnxSn8z_P0hMm5KsozBpnIyiGCcCqXFLQaH7WgqAO2BUVsD8zkPIoiHrsg7OPiDiz_GPD6B7zZZxfhYXBArhqfTzyA1pP3OFtXzA8MA_QJCSLw19kk",
    "BYD eBus-12": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=300",
    "Scania Citywide": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300"
};

// Premium Driver Profile Image Lookups (keyed by license_number)
const DRIVER_IMAGES = {
    "DR-01": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKDlDL2wDxHRq04x5Zscf3ePnncYgMzt60uS6mPmn3azz13cvJ5SezsVTrMjD5Eqd1LD7F0nJ55X0OMDB53nbkzNaJTsBfxRdpghXnG6J6AGCrvCp7_e3Q2tZI9I4H4QbdWIKofk_aCqc9Wod9aR8ZqKlmDoHnW9iVxnpe1JjA1QtVRjHm9KWR7ERN6h_kUDG7OpQ52YIzzAGyxBgPI_E_-BZjZSrK2-acEKcfSA-OI3yXbYCrZ75O14u0gOuPlyrB1wqAdsw9viQ",
    "DR-02": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBgG1a0cwQWWx111ZzYmJ0xo7loZnPQ2KB1WqWInTiEYKg-EF1yA1ZMGHU-RiZQ25H9tFxan14D9nDmegjndiORzVXP4anPA3KXx13k5KxxmJ6A29FXvTtLG8mKF5KXzLMLrQ23l-DK0eszJPDAhXfKrlzHzv0QgjAoyuftmb3dvrz7GQVxFzuZQ_n0W0yZ7F3E624-JVK2VHIx-_8J78fFh5Gk5g0TnMoeTLgjJieU0WsvYIoB0gE5hXkPwmuhzdxF5alLNsQe-w",
    "DR-03": "https://lh3.googleusercontent.com/aida-public/AB6AXuArTShModg9kDVOGM1NFJR8j7iKTH2ptrNxvU2eeY3AslQxJs72NrBBgxM8YYJf64XiX_-aZj3To7HDO32LnzMN4KQqcBgtLDBDluhK67xiATxpBpL16BL7jRhmvN7ygvFn1YL4-A8xwTAtBD00sCSo2AtVfOmH8VYePNG5haBu5X5Dy0ayD9UNQzCZqiac4J81ww5MBINZFSQ9lMzbyiyFoW25PubAXenwM3g1qAyZPJp1qIxVDR0X07aozlVS-rVt9bpBHHTnb3U",
    "DR-04": "https://lh3.googleusercontent.com/aida-public/AB6AXuBIIQSzJQgOsCw3XGRvkkay1by9ETMpGvftMzAVx08WvHQH7DWBu0JDsUOvXURhuZhxjrbwd6ZOeHESSa29CsHsY-Vg6U5G7aGyKWupg8GNF-Uy-PBaofXJShT-7nigZxbqiXoHCDdvda0XKR8IuV7Y2IKExC2fgzysSbx6HxKgQLrI17Q6HOHGCGwCRqhFUVSpVVR1ovN7Fp5I6v6Z7KvZiNLSpuxvGb26Pcp8sTIkOwfiAbliaACHkzT7H2P0BqTIYzT_JOm3rEI",
    "DR-05": "https://lh3.googleusercontent.com/aida-public/AB6AXuDOC1KUIkDnZ3aElahr-n1KDf2MCjhVpOjG7MSVbN_a5p2bxL3yV8rNXrejtQyYylO1yViJsqUAvD6VACbnPrNfpsuuXuOq9Bh1m7-Dzjzh14VYr_hsq9uAZs1PNITJvUz5gT-PDE5nIWBum2SNNk07ZJ90MdwpePwzRmnz_cOzodznySjAb06WMkBEvflrSG9Fl3ioqxjJc4t62YkUohoWmHpYJadXQNwve9Smgih24kNLM6uT943NU56FTbJkn3YYmN1N4LNLXQw"
};

// Driver stats lookup (keyed by license_number)
const DRIVER_STATS = {
    "DR-01": { rating: 4.9, trips: 1284 },
    "DR-02": { rating: 4.8, trips: 902 },
    "DR-03": { rating: 4.9, trips: 7566 },
    "DR-04": { rating: 4.7, trips: 1102 },
    "DR-05": { rating: 4.7, trips: 6387 }
};

function getDriverImage(licenseNumber) {
    return DRIVER_IMAGES[licenseNumber] || "https://lh3.googleusercontent.com/aida-public/AB6AXuDKDlDL2wDxHRq04x5Zscf3ePnncYgMzt60uS6mPmn3azz13cvJ5SezsVTrMjD5Eqd1LD7F0nJ55X0OMDB53nbkzNaJTsBfxRdpghXnG6J6AGCrvCp7_e3Q2tZI9I4H4QbdWIKofk_aCqc9Wod9aR8ZqKlmDoHnW9iVxnpe1JjA1QtVRjHm9KWR7ERN6h_kUDG7OpQ52YIzzAGyxBgPI_E_-BZjZSrK2-acEKcfSA-OI3yXbYCrZ75O14u0gOuPlyrB1wqAdsw9viQ";
}

function getDriverStats(licenseNumber) {
    return DRIVER_STATS[licenseNumber] || { rating: 4.5, trips: 100 };
}

function getVehicleImage(make, model) {
    const fullName = `${make} ${model}`;
    if (VEHICLE_IMAGES[fullName]) {
        return VEHICLE_IMAGES[fullName];
    }
    for (const key in VEHICLE_IMAGES) {
        if (fullName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(fullName.toLowerCase())) {
            return VEHICLE_IMAGES[key];
        }
    }
    return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300";
}

// Generate valid 17-character VIN under model constraints
function generateVIN(plate) {
    const base = `VIN${plate.replace('-', '')}`.toUpperCase();
    return base.padEnd(17, '0').substring(0, 17);
}

// Convert a file to a base64 Data URL
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Application Global State
let state = {};
let jwtToken = null;

// Authenticate with Django REST Framework JWT Endpoint
async function authenticateBackend() {
    try {
        const resp = await fetch('/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'AbdullahSuper', password: 'Abdu$1516' })
        });
        if (resp.ok) {
            const data = await resp.json();
            jwtToken = data.access;
            console.log("Authenticated successfully with Django Backend.");
        } else {
            console.error("Authentication failed:", await resp.text());
        }
    } catch (err) {
        console.error("Failed to connect to backend token endpoint:", err);
    }
}

function findCurrentDriverProfile() {
    if (state.userRole !== "driver") return {};
    
    // 1. Try to find by userPk if online
    if (state.currentUser && state.currentUser.id) {
        const found = state.drivers.find(d => d.userPk === state.currentUser.id);
        if (found) return found;
    }
    
    // 2. Try to find by matching username if we can resolve it
    if (state.username) {
        const cleanUser = state.username.toLowerCase().trim();
        const found = state.drivers.find(d => {
            const license = d.id ? d.id.toLowerCase().replace('-', '') : "";
            return license === cleanUser || `driver_${license}` === cleanUser || (d.username && d.username.toLowerCase() === cleanUser);
        });
        if (found) return found;
    }
    
    // 3. Find by full name (only if activeName is not empty)
    if (state.currentUser) {
        const firstName = (state.currentUser.first_name || "").trim().toLowerCase();
        const lastName = (state.currentUser.last_name || "").trim().toLowerCase();
        if (firstName || lastName) {
            const found = state.drivers.find(d => {
                if (!d.name) return false;
                const dName = d.name.toLowerCase();
                if (firstName && lastName) {
                    return dName.includes(firstName) && dName.includes(lastName);
                }
                return dName.includes(firstName || lastName);
            });
            if (found) return found;
        }
    }
    
    return {};
}

// Fetch all models from REST API and update global state
async function fetchBackendData() {
    try {
        if (!jwtToken) return;

        const role = state.userRole || "passenger";

        let dbVehicles = [];
        let dbDrivers = [];
        let dbUsers = [];
        let dbTrips = [];
        let dbBookings = [];
        let dbRoutes = [];

        // 1. Fetch Bookings
        try {
            const resBookings = await fetch('/api/v1/trips/bookings/', {
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            if (resBookings.status === 401) {
                logout();
                return;
            }
            if (resBookings.ok) {
                dbBookings = await resBookings.json();
                state.bookings = dbBookings;
            }
        } catch (e) { console.error("Failed to fetch bookings", e); }

        // 2. Fetch Routes
        try {
            const resRoutes = await fetch('/api/v1/trips/routes/', {
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            if (resRoutes.status === 401) {
                logout();
                return;
            }
            if (resRoutes.ok) {
                dbRoutes = await resRoutes.json();
                state.routes = dbRoutes;
            }
        } catch (e) { console.error("Failed to fetch routes", e); }

        // 3. Fetch Trips
        try {
            const resTrips = await fetch('/api/v1/trips/trips/', {
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            if (resTrips.status === 401) {
                logout();
                return;
            }
            if (resTrips.ok) {
                dbTrips = await resTrips.json();
            }
        } catch (e) { console.error("Failed to fetch trips", e); }

        // 4. Fetch Vehicles
        if (role !== "passenger") {
            try {
                const resVehicles = await fetch('/api/v1/fleet/vehicles/', {
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resVehicles.ok) {
                    dbVehicles = await resVehicles.json();
                }
            } catch (e) { console.error("Failed to fetch vehicles", e); }
        }

        // 5. Fetch Drivers
        if (role !== "passenger") {
            try {
                const resDrivers = await fetch('/api/v1/fleet/drivers/', {
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resDrivers.ok) {
                    dbDrivers = await resDrivers.json();
                }
            } catch (e) { console.error("Failed to fetch drivers", e); }
        }

        // 6. Fetch Users
        if (role === "admin" || role === "dispatcher") {
            try {
                const resUsers = await fetch('/api/v1/users/', {
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resUsers.ok) {
                    dbUsers = await resUsers.json();
                }
            } catch (e) { console.error("Failed to fetch users", e); }
        }

        // 7. Fetch Revenues (admin/dispatcher only)
        if (role === "admin" || role === "dispatcher") {
            try {
                const resRevenues = await fetch('/api/v1/operations/revenues/', {
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resRevenues.ok) {
                    state.revenues = await resRevenues.json();
                }
            } catch (e) { console.error("Failed to fetch revenues", e); }
        }

        // 8. Fetch Expenses (admin/dispatcher only)
        if (role === "admin" || role === "dispatcher") {
            try {
                const resExpenses = await fetch('/api/v1/operations/expenses/', {
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resExpenses.ok) {
                    state.expenses = await resExpenses.json();
                }
            } catch (e) { console.error("Failed to fetch expenses", e); }
        }

        // If database is empty, seed it with default state (admin only)
        if ((role === "admin" || role === "dispatcher") && dbVehicles.length === 0 && dbDrivers.length === 0) {
            console.log("DB is empty. Seeding initial vehicles and drivers...");
            await populateInitialData();
            return await fetchBackendData();
        }

        // Map users & drivers for lookup
        const usersMap = {};
        dbUsers.forEach(u => usersMap[u.id] = u);

        const driversMap = {};
        dbDrivers.forEach(d => driversMap[d.id] = d);

        // Map Vehicles to Frontend schema
        state.vehicles = dbVehicles.map(v => {
            let assignedDriverName = "None";
            if (v.driver && driversMap[v.driver]) {
                const uId = driversMap[v.driver].user;
                if (usersMap[uId]) {
                    assignedDriverName = `${usersMap[uId].first_name} ${usersMap[uId].last_name}`;
                }
            }
            const cleanImg = getVehicleImage(v.make, v.model);

            return {
                pk: v.id,
                id: v.plate_number,
                name: `${v.make} ${v.model}`,
                type: v.capacity > 75 ? "Luxury Coach" : (v.capacity > 60 ? "Express Shuttle" : "Mini Bus"),
                capacity: v.capacity,
                route: v.status === "in_service" ? "R-104 (Downtown)" : "Depot Alpha",
                status: v.status === "available" ? "Available" : (v.status === "in_service" ? "In Transit" : "Maintenance"),
                energy: v.energy,
                img: cleanImg,
                driverPk: v.driver,
                driverName: assignedDriverName
            };
        });

        // Map Drivers to Frontend schema
        state.drivers = dbDrivers.map(d => {
            let driverName = d.name || "Driver";
            let userEmail = d.email || "";
            let userObj = usersMap[d.user];
            if (!userObj && state.currentUser && d.user === state.currentUser.id) {
                userObj = state.currentUser;
            }
            if (userObj) {
                driverName = `${userObj.first_name} ${userObj.last_name}`;
                userEmail = userObj.email;
            }

            const assignedVeh = dbVehicles.find(v => v.driver === d.id);
            const vehPlate = assignedVeh ? assignedVeh.plate_number : "None";
            const driverStats = getDriverStats(d.license_number);

            return {
                pk: d.id,
                userPk: d.user,
                id: d.license_number,
                name: driverName,
                email: userEmail,
                rating: driverStats.rating,
                trips: driverStats.trips,
                vehicle: vehPlate,
                attendance: d.is_active ? "Present" : "Absent",
                img: d.profile_image ? d.profile_image : (userObj && (userObj.profile_image || userObj.profile_pic) ? (userObj.profile_image || userObj.profile_pic) : getDriverImage(d.license_number))
            };
        });

        // Map Trips to Frontend schema
        state.trips = dbTrips.map(t => {
            const bookingObj = dbBookings.find(b => b.id === t.booking);
            const vehicleObj = dbVehicles.find(v => v.id === t.vehicle);
            const driverObj = dbDrivers.find(d => d.id === t.driver);

            return {
                pk: t.id,
                booking: t.booking,
                id: `RT-${t.id}`,
                source: bookingObj ? bookingObj.pickup_point : "Depot Alpha",
                destination: bookingObj ? bookingObj.destination : "Downtown Terminal",
                progress: t.status === "finished" ? 100 : (t.status === "ongoing" ? Math.floor(Math.random() * 40) + 25 : 0),
                distance: parseFloat(t.distance_travelled_km || 30),
                duration: 45,
                vehicleId: vehicleObj ? vehicleObj.plate_number : "None",
                driverId: driverObj ? driverObj.license_number : "None",
                status: t.status === "finished" ? "Completed" : (t.status === "cancelled" ? "Cancelled" : "In Transit")
            };
        });

        state.totalDistance = dbTrips.reduce((acc, t) => acc + parseFloat(t.distance_travelled_km || 0), 0) || 38.4;
        state.totalDistance = parseFloat(state.totalDistance.toFixed(1));
        state.pendingBookingsCount = dbBookings.filter(b => b.status === "pending").length;

        // Keep alerts and other client-side settings locally
        const rawAlerts = localStorage.getItem("skyways_alerts");
        if (rawAlerts) {
            state.alerts = JSON.parse(rawAlerts);
        } else {
            state.alerts = JSON.parse(JSON.stringify(DEFAULT_STATE.alerts));
            localStorage.setItem("skyways_alerts", JSON.stringify(state.alerts));
        }

        // Set manager profile based on loaded user if admin
        if (state.userRole === "admin" || state.userRole === "dispatcher") {
            const adminUserObj = dbUsers.find(u => u.username === state.username);
            if (adminUserObj) {
                state.managerName = `${adminUserObj.first_name} ${adminUserObj.last_name}`;
                state.managerPic = adminUserObj.profile_image || adminUserObj.profile_pic || DEFAULT_STATE.managerPic;
            } else {
                state.managerName = DEFAULT_STATE.managerName;
                state.managerPic = DEFAULT_STATE.managerPic;
            }
        } else {
            const userObj = dbUsers.find(u => u.username === state.username);
            if (userObj) {
                state.managerName = `${userObj.first_name} ${userObj.last_name}`;
                state.managerPic = userObj.profile_image || userObj.profile_pic || DEFAULT_STATE.managerPic;
            } else {
                state.managerPic = DEFAULT_STATE.managerPic;
            }
        }

    } catch (err) {
        console.error("Error fetching and mapping data from Django DB, falling back to local simulation data:", err);
        showToast("Connected in offline demonstration mode.", "info");
        
        // Fallback to DEFAULT_STATE or localStorage
        if (!state.vehicles || state.vehicles.length === 0) {
            const localVehicles = localStorage.getItem("skyways_mock_vehicles");
            state.vehicles = localVehicles ? JSON.parse(localVehicles) : JSON.parse(JSON.stringify(DEFAULT_STATE.vehicles));
        }
        if (!state.drivers || state.drivers.length === 0) {
            const localDrivers = localStorage.getItem("skyways_mock_drivers");
            state.drivers = localDrivers ? JSON.parse(localDrivers) : JSON.parse(JSON.stringify(DEFAULT_STATE.drivers));
        }
        if (!state.trips || state.trips.length === 0) {
            const localTrips = localStorage.getItem("skyways_mock_trips");
            state.trips = localTrips ? JSON.parse(localTrips) : [];
        }
        if (!state.routes || !state.routes.length) {
            state.routes = [
                { id: 1, name: "Route 101", start_location: "Central Station", end_location: "Airport Terminal 3", distance_km: 42.0 },
                { id: 2, name: "Route 102", start_location: "Harbor Depot", end_location: "Tech Park West", distance_km: 28.0 },
                { id: 3, name: "Route 104", start_location: "Downtown Terminal", end_location: "Depot Alpha", distance_km: 15.0 }
            ];
        }
        if (!state.bookings) {
            const localBookings = localStorage.getItem("skyways_mock_bookings");
            state.bookings = localBookings ? JSON.parse(localBookings) : [];
        }
        if (!state.complaints) {
            const localComplaints = localStorage.getItem("skyways_mock_complaints");
            state.complaints = localComplaints ? JSON.parse(localComplaints) : [];
        }
        if (!state.feedbacks) {
            const localFeedbacks = localStorage.getItem("skyways_mock_feedbacks");
            state.feedbacks = localFeedbacks ? JSON.parse(localFeedbacks) : [];
        }
        if (!state.expenses) {
            const localExpenses = localStorage.getItem("skyways_mock_expenses");
            state.expenses = localExpenses ? JSON.parse(localExpenses) : [
                { id: 1, vehicle: "VH-1042", amount: 120.00, category: "Fuel", incurred_at: "2026-06-15", note: "Weekly fuel refill" },
                { id: 2, vehicle: "VH-2019", amount: 450.00, category: "Maintenance", incurred_at: "2026-06-17", note: "Brake pads replacement" },
                { id: 3, vehicle: "VH-4400", amount: 80.00, category: "Insurance", incurred_at: "2026-06-19", note: "Highway toll pass" }
            ];
        }
        if (!state.revenues) {
            const localRevenues = localStorage.getItem("skyways_mock_revenues");
            state.revenues = localRevenues ? JSON.parse(localRevenues) : [
                { id: 1, booking: 101, amount: 250.00, collected_at: "2026-06-16", method: "online" },
                { id: 2, booking: 102, amount: 175.00, collected_at: "2026-06-18", method: "card" },
                { id: 3, booking: 103, amount: 300.00, collected_at: "2026-06-20", method: "online" }
            ];
        }

        state.totalDistance = state.trips.reduce((acc, t) => acc + parseFloat(t.distance || 0), 0) || 38.4;
        state.totalDistance = parseFloat(state.totalDistance.toFixed(1));
        state.pendingBookingsCount = state.bookings.filter(b => b.status === "pending").length;

        const rawAlerts = localStorage.getItem("skyways_alerts");
        state.alerts = rawAlerts ? JSON.parse(rawAlerts) : JSON.parse(JSON.stringify(DEFAULT_STATE.alerts));

        const savedProfile = localStorage.getItem("skyways_user_profile");
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            state.managerName = `${profile.first_name} ${profile.last_name}`;
            state.managerPic = profile.profile_image || profile.profile_pic || DEFAULT_STATE.managerPic;
        } else {
            state.managerName = DEFAULT_STATE.managerName;
            state.managerPic = DEFAULT_STATE.managerPic;
        }
    }

    // Trip assignment change detector
    const isDriver = (state.userRole === "driver");
    if (isDriver && state.currentUser) {
        const driverProfile = findCurrentDriverProfile();
        const driverLicense = driverProfile.id || "";
        
        if (driverLicense) {
            const currentAssignedTripIds = state.trips
                .filter(t => t.driverId === driverLicense)
                .map(t => t.id);
            
            if (state.previousDriverTrips) {
                // Detect new assignments
                currentAssignedTripIds.forEach(tripId => {
                    if (!state.previousDriverTrips.includes(tripId)) {
                        const trip = state.trips.find(t => t.id === tripId);
                        const routeInfo = trip ? `from ${trip.source} to ${trip.destination}` : "";
                        const msg = `You have been assigned to a new trip ${tripId} ${routeInfo}.`;
                        showToast(msg, "info");
                        addNotification("New Trip Assignment", msg);
                    }
                });
            }
            state.previousDriverTrips = currentAssignedTripIds;
        }
    }
}

// Seed Database with Initial Mock Data if DB is empty
async function populateInitialData() {
    const defaultDrivers = DEFAULT_STATE.drivers;
    const driverIdMap = {};

    for (const d of defaultDrivers) {
        const username = `driver_${d.id.toLowerCase().replace('-', '')}`;
        const parts = d.name.split(' ');
        const first_name = parts[0];
        const last_name = parts.slice(1).join(' ') || "Driver";

        try {
            const resUser = await fetch('/api/v1/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    email: `${username}@skyways.com`,
                    password: 'Abdu$1516',
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: '1234567890',
                    role: 'driver'
                })
            });
            if (resUser.ok) {
                const userData = await resUser.json();
                const userId = userData.id;

                const resDriver = await fetch('/api/v1/fleet/drivers/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        user: userId,
                        license_number: d.id,
                        phone_number: '1234567890',
                        is_active: d.attendance === "Present"
                    })
                });
                if (resDriver.ok) {
                    const driverData = await resDriver.json();
                    driverIdMap[d.id] = driverData.id;
                }
            }
        } catch (err) {
            console.error("Error seeding initial driver:", err);
        }
    }

    const defaultVehicles = DEFAULT_STATE.vehicles;
    for (const v of defaultVehicles) {
        const nameParts = v.name.split(' ');
        const make = nameParts[0];
        const model = nameParts.slice(1).join(' ');

        let driverPk = null;
        let assocDriverId = null;
        if (v.id === "VH-1042") assocDriverId = "DR-01";
        else if (v.id === "VH-4400") assocDriverId = "DR-02";
        else if (v.id === "VH-3301") assocDriverId = "DR-03";

        if (assocDriverId && driverIdMap[assocDriverId]) {
            driverPk = driverIdMap[assocDriverId];
        }

        try {
            await fetch('/api/v1/fleet/vehicles/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    vin: generateVIN(v.id),
                    plate_number: v.id,
                    make: make,
                    model: model || "Coach",
                    year: 2024,
                    capacity: v.capacity,
                    status: v.status === "Available" ? "available" : (v.status === "In Transit" ? "in_service" : "maintenance"),
                    driver: driverPk,
                    energy: v.energy
                })
            });
        } catch (err) {
            console.error("Error seeding initial vehicle:", err);
        }
    }

    const defaultRoutes = [
        { name: "Route 101", start: "Central Station", end: "Airport Terminal 3", dist: 42.0 },
        { name: "Route 102", start: "Harbor Depot", end: "Tech Park West", dist: 28.0 },
        { name: "Route 104", start: "Downtown Terminal", end: "Depot Alpha", dist: 15.0 }
    ];
    for (const r of defaultRoutes) {
        try {
            await fetch('/api/v1/trips/routes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    name: r.name,
                    start_location: r.start,
                    end_location: r.end,
                    distance_km: r.dist
                })
            });
        } catch (err) {
            console.error("Error seeding initial route:", err);
        }
    }
}

// Local storage fallback for settings & alerts
function saveLocalSettings() {
    localStorage.setItem("skyways_alerts", JSON.stringify(state.alerts));
}

let notificationSocket = null;
function initWebSocket() {
    if (notificationSocket) {
        try {
            notificationSocket.close();
        } catch (e) {}
    }

    // Only establish WebSocket if we are connected to a real backend (not mock token)
    if (!jwtToken || jwtToken.startsWith("mock_")) {
        console.log("Mock token active, skipping real-time WebSocket connection.");
        return;
    }

    const wsScheme = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsScheme}://${window.location.host}/ws/notifications/`;
    
    console.log("Connecting to WebSocket:", wsUrl);
    notificationSocket = new WebSocket(wsUrl);

    notificationSocket.onmessage = async function(e) {
        try {
            const data = JSON.parse(e.data);
            console.log("WebSocket message received:", data);
            
            // Perform instant database sync without local polling delay
            await fetchBackendData();

            const role = state.userRole || "passenger";
            const currentUsername = (state.currentUser && state.currentUser.username) || state.username || "";
            const currentFirstName = state.currentUser ? (state.currentUser.first_name || "").toLowerCase() : "";
            const currentLastName = state.currentUser ? (state.currentUser.last_name || "").toLowerCase() : "";
            const currentFullName = `${currentFirstName} ${currentLastName}`.trim();
            const currentDriverProfile = findCurrentDriverProfile();
            const currentDriverPk = currentDriverProfile ? currentDriverProfile.pk : null;
            const currentDriverId = currentDriverProfile ? currentDriverProfile.id : "";

            if (data.type === "booking_created") {
                // If current user is the driver assigned to this booking
                const isAssignedDriver = (
                    (data.driver_pk && currentDriverPk && data.driver_pk === currentDriverPk) ||
                    (data.driver_id && currentDriverId && data.driver_id === currentDriverId)
                );
                
                if (isAssignedDriver) {
                    addNotification("New Passenger Booking", `Passenger ${data.passenger_name} booked a ticket on your vehicle ${data.vehicle_id}. Route: ${data.pickup_point} to ${data.destination}.`);
                } else if (role === "admin" || role === "dispatcher") {
                    addNotification("New Ticket Booked", `Passenger ${data.passenger_name} booked a ticket on vehicle ${data.vehicle_id} (Route: ${data.pickup_point} to ${data.destination}).`);
                }
            } else if (data.type === "trip_dispatched") {
                // If current user is the driver assigned to this trip
                const isAssignedDriver = (
                    (data.driver_pk && currentDriverPk && data.driver_pk === currentDriverPk) ||
                    (data.driver_id && currentDriverId && data.driver_id === currentDriverId)
                );

                // If current user is the passenger of this trip
                let isPassengerTrip = false;
                if (role === "passenger" && data.booking_id) {
                    const matchedBooking = state.bookings.find(b => b.id === data.booking_id);
                    if (matchedBooking) {
                        const pName = (matchedBooking.passenger_name || "").toLowerCase();
                        isPassengerTrip = (
                            (currentUsername && pName.includes(currentUsername.toLowerCase())) ||
                            (currentFullName && pName.includes(currentFullName.toLowerCase())) ||
                            pName.includes("customer / portal") || 
                            pName.includes("portal booking")
                        );
                    }
                }

                if (isAssignedDriver) {
                    addNotification("New Trip Dispatched", `A new trip (ID: ${data.trip_id}) has been dispatched to your vehicle. Prepare for departure!`);
                } else if (isPassengerTrip) {
                    addNotification("Your Trip is Dispatched", `Your ride (Trip ID: ${data.trip_id}) has been dispatched. Track status in your dashboard.`);
                } else if (role === "admin" || role === "dispatcher") {
                    addNotification("Trip Dispatched", `Trip ${data.trip_id} has been dispatched with Vehicle ${data.vehicle_id} / Driver ${data.driver_id}.`);
                }
            }

            // Dynamically refresh the current view
            const activeHash = window.location.hash || "#dashboard";
            if (activeHash === "#dashboard") {
                renderDashboard();
            } else if (activeHash === "#routes") {
                renderRoutes();
            } else if (activeHash === "#tickets") {
                renderTickets();
            } else if (activeHash === "#vehicles") {
                renderVehicles();
            }
        } catch (err) {
            console.error("Error parsing WebSocket message:", err);
        }
    };

    notificationSocket.onclose = function(e) {
        console.log("WebSocket closed. Attempting reconnect in 5 seconds...", e.reason);
        setTimeout(function() {
            initWebSocket();
        }, 5000);
    };

    notificationSocket.onerror = function(err) {
        console.error("WebSocket encountered error: Closing socket");
        try {
            notificationSocket.close();
        } catch(e) {}
    };
}

// Initialize Application
async function initApp() {
    const savedToken = localStorage.getItem("skyways_jwt_token");
    const savedRole = localStorage.getItem("skyways_user_role");
    const savedUsername = localStorage.getItem("skyways_username");

    if (savedToken && savedRole) {
        jwtToken = savedToken;
        state.userRole = savedRole;
        state.username = savedUsername;
        
        // Hide overlay
        const overlay = document.getElementById("auth-overlay");
        if (overlay) overlay.classList.add("hidden");

        const savedProfile = localStorage.getItem("skyways_user_profile");
        if (savedProfile) {
            try {
                state.currentUser = JSON.parse(savedProfile);
                state.managerName = `${state.currentUser.first_name} ${state.currentUser.last_name}`;
                if (state.currentUser.profile_image) {
                    state.managerPic = state.currentUser.profile_image;
                } else if (state.currentUser.profile_pic) {
                    state.managerPic = state.currentUser.profile_pic;
                }
            } catch (e) {
                console.error("Failed to parse saved user profile", e);
            }
        }

        await fetchBackendData();
        initRouting();
        setupGlobalUI();
        startSimulations();
        initWebSocket();
        refreshUILayout();
    } else {
        // Show auth overlay
        const overlay = document.getElementById("auth-overlay");
        if (overlay) overlay.classList.remove("hidden");
        selectAuthRole("passenger");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initApp().then(() => {
        let defaultHash = "#dashboard";
        if (state.userRole === "driver") defaultHash = "#drivers";
        routeTo(window.location.hash || defaultHash);
    });
    
    // Close modals on backdrop click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });
});

// Toast System
function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    let borderClass = "border-l-primary";
    if (type === "error") borderClass = "border-l-error";
    else if (type === "success") borderClass = "border-l-secondary";
    toast.className = `toast glass-card rounded-xl p-4 flex items-center gap-3 border-l-4 ${borderClass} shadow-lg`;
    
    let icon = "info";
    let color = "text-primary";
    if (type === "success") { icon = "check_circle"; color = "text-secondary"; }
    else if (type === "error") { icon = "warning"; color = "text-error"; }

    toast.innerHTML = `
        <span class="material-symbols-outlined ${color}">${icon}</span>
        <div class="flex-grow">
            <p class="text-body-md font-semibold text-on-surface">${message}</p>
        </div>
        <button class="text-on-surface-variant hover:text-on-surface" onclick="this.parentElement.remove()">
            <span class="material-symbols-outlined text-sm">close</span>
        </button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-fade-out");
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function toggleMapFullscreen() {
    const el = document.getElementById("map-container-card");
    if (!el) return;

    if (!document.fullscreenElement) {
        el.requestFullscreen().catch(err => {
            console.warn("Fullscreen request failed, falling back to CSS modal:", err);
            el.classList.add("map-fullscreen-fallback");
            showToast("Entered fallback full screen mode. Press ESC to exit.", "info");
            
            // Add listener to exit on ESC
            const escListener = (e) => {
                if (e.key === "Escape") {
                    el.classList.remove("map-fullscreen-fallback");
                    document.removeEventListener("keydown", escListener);
                }
            };
            document.addEventListener("keydown", escListener);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add full screen listener to cleanup fallback classes if user exits native fullscreen
document.addEventListener("fullscreenchange", () => {
    const el = document.getElementById("map-container-card");
    if (el && !document.fullscreenElement) {
        el.classList.remove("map-fullscreen-fallback");
    }
});

// Navigation / Router
function initRouting() {
    window.addEventListener("hashchange", () => {
        routeTo(window.location.hash);
    });

    document.querySelectorAll("nav a, aside a").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                history.pushState(null, null, href);
                routeTo(href);
            }
        });
    });
}

function handleGlobalSearch() {
    const searchVal = document.getElementById("global-search")?.value || "";
    
    // Update global search dropdown
    updateSearchDropdown(searchVal);

    const hash = window.location.hash || "#dashboard";
    if (hash === "#vehicles") renderVehicles();
    else if (hash === "#drivers") renderDrivers();
    else if (hash === "#routes") renderRoutes();
    else if (hash === "#dashboard") renderDashboard();
}

function routeTo(hash) {
    const sectionId = hash.replace("#", "") || "dashboard";
    const validSections = ["dashboard", "vehicles", "drivers", "routes", "booking", "tickets", "analytics", "support", "settings"];
    
    if (!validSections.includes(sectionId)) return;

    // Role-based route authorization
    const role = state.userRole || "passenger";
    let allowed = [];
    if (role === "admin" || role === "dispatcher") {
        allowed = ["dashboard", "vehicles", "drivers", "routes", "analytics", "support", "settings"];
    } else if (role === "passenger") {
        allowed = ["dashboard", "routes", "booking", "tickets", "support", "settings"];
    } else if (role === "driver") {
        allowed = ["dashboard", "vehicles", "drivers", "routes", "support", "settings"];
    }

    if (!allowed.includes(sectionId)) {
        console.warn(`Unauthorized section attempt: ${sectionId} for role: ${role}`);
        routeTo(allowed[0] || "dashboard");
        return;
    }

    if (window.location.hash !== `#${sectionId}`) {
        history.replaceState(null, null, `#${sectionId}`);
    }

    const searchInput = document.getElementById("global-search");
    if (searchInput) {
        searchInput.value = "";
    }
    const dropdown = document.getElementById("search-results-dropdown");
    if (dropdown) {
        dropdown.classList.add("hidden");
    }

    validSections.forEach(id => {
        const el = document.getElementById(`view-${id}`);
        if (el) {
            if (id === sectionId) el.classList.remove("hidden");
            else el.classList.add("hidden");
        }
    });

    document.querySelectorAll("aside nav a, nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${sectionId}`) {
            link.className = "flex items-center gap-3 bg-gradient-to-r from-primary/10 to-transparent text-primary font-bold border-l-4 border-primary px-4 py-3 rounded-r-lg";
        } else {
            link.className = "flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest/10 px-4 py-3 border-l-4 border-transparent rounded-r-lg transition-colors";
        }
    });

    // Update Topbar Title & Subtitle based on active view and role
    const titleEl = document.getElementById("topbar-title");
    const subtitleEl = document.getElementById("topbar-subtitle");
    if (titleEl && subtitleEl) {
        if (sectionId === "dashboard") {
            titleEl.textContent = "Fleet Command Center";
            subtitleEl.textContent = "Real-time control station dashboard";
        } else if (sectionId === "vehicles") {
            titleEl.textContent = "Vehicle Inventory";
            subtitleEl.textContent = "Track shuttle energy, status and allocations";
        } else if (sectionId === "drivers") {
            titleEl.textContent = state.userRole === "driver" ? "Driver Shift Portal" : "Driver Staffing Roster";
            subtitleEl.textContent = state.userRole === "driver" ? "Manage your attendance and vehicle shift info" : "Monitor roster shifts, ratings and attendance";
        } else if (sectionId === "routes") {
            titleEl.textContent = "Transit Routes & Live Trips";
            subtitleEl.textContent = "Track live route schedules, progress and waypoints";
        } else if (sectionId === "booking") {
            titleEl.textContent = "Transit Booking Portal";
            subtitleEl.textContent = "Create instant seat reservations and passenger boarding passes";
        } else if (sectionId === "tickets") {
            titleEl.textContent = "Your Boarding Passes";
            subtitleEl.textContent = "Manage active reservations and route history";
        } else if (sectionId === "analytics") {
            titleEl.textContent = "Financial Ledger & Analytics";
            subtitleEl.textContent = "Real-time revenue flows and operational expense tracking";
        } else if (sectionId === "support") {
            titleEl.textContent = "Support & Assistance Center";
            subtitleEl.textContent = "File complaints and chat with our live helper AI bot";
        } else if (sectionId === "settings") {
            titleEl.textContent = "System Parameters";
            subtitleEl.textContent = "Configure profile parameters and access administration settings";
        }
    }

    if (sectionId === "dashboard") renderDashboard();
    else if (sectionId === "vehicles") renderVehicles();
    else if (sectionId === "drivers") renderDrivers();
    else if (sectionId === "routes") renderRoutes();
    else if (sectionId === "booking") renderBooking();
    else if (sectionId === "tickets") renderTickets();
    else if (sectionId === "analytics") renderAnalytics();
    else if (sectionId === "support") renderSupport();
    else if (sectionId === "settings") renderSettings();

    closeAllModals();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global UI Setup
function setupGlobalUI() {
    updateManagerProfile();
    setupSearchDropdown();
    setupExpenseFormListeners();
}
function updateManagerProfile() {
    document.querySelectorAll(".manager-name").forEach(el => el.textContent = state.managerName);
    document.querySelectorAll(".manager-pic").forEach(img => {
        img.src = state.managerPic;
        img.alt = state.managerName;
    });
}

function setupSearchDropdown() {
    const searchInput = document.getElementById("global-search");
    if (!searchInput) return;

    const parent = searchInput.parentElement;
    if (!parent) return;

    let dropdown = document.getElementById("search-results-dropdown");
    if (!dropdown) {
        dropdown = document.createElement("div");
        dropdown.id = "search-results-dropdown";
        dropdown.className = "absolute left-0 right-0 mt-2 bg-surface-container/95 border border-outline-variant/30 rounded-xl shadow-2xl backdrop-blur-md hidden z-50 overflow-y-auto max-h-96 flex flex-col p-2 gap-1 text-body-md text-on-surface";
        parent.appendChild(dropdown);
    }

    // Hide dropdown on click outside
    document.addEventListener("click", (e) => {
        if (searchInput && dropdown && !searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("hidden");
        }
        const notifDropdown = document.getElementById("notification-dropdown");
        const notifBtn = document.getElementById("notification-btn");
        if (notifDropdown && notifBtn && !notifDropdown.classList.contains("hidden")) {
            if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
                notifDropdown.classList.add("hidden");
            }
        }
    });

    // Show dropdown when focusing input if there's text
    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim().length > 0) {
            dropdown.classList.remove("hidden");
        }
    });
}

function updateSearchDropdown(query) {
    const dropdown = document.getElementById("search-results-dropdown");
    if (!dropdown) return;

    if (!query) {
        dropdown.innerHTML = "";
        dropdown.classList.add("hidden");
        return;
    }

    const cleanQuery = query.toLowerCase().trim();
    
    // Find matching drivers
    const matchingDrivers = state.drivers.filter(d => 
        d.name.toLowerCase().includes(cleanQuery) || 
        d.id.toLowerCase().includes(cleanQuery)
    );

    // Find matching vehicles
    const matchingVehicles = state.vehicles.filter(v => 
        v.name.toLowerCase().includes(cleanQuery) || 
        v.id.toLowerCase().includes(cleanQuery) || 
        v.type.toLowerCase().includes(cleanQuery)
    );

    // Find matching trips
    const matchingTrips = state.trips.filter(t => 
        t.id.toLowerCase().includes(cleanQuery) || 
        t.source.toLowerCase().includes(cleanQuery) || 
        t.destination.toLowerCase().includes(cleanQuery) || 
        t.vehicleId.toLowerCase().includes(cleanQuery)
    );

    const totalResults = matchingDrivers.length + matchingVehicles.length + matchingTrips.length;

    if (totalResults === 0) {
        dropdown.innerHTML = `
            <div class="p-4 text-center text-on-surface-variant text-body-md">
                <span class="material-symbols-outlined text-xl mb-1 block">search_off</span>
                No matches found for "${query}"
            </div>
        `;
        dropdown.classList.remove("hidden");
        return;
    }

    dropdown.innerHTML = "";
    
    // Render Drivers category
    if (matchingDrivers.length > 0) {
        const header = document.createElement("div");
        header.className = "text-label-caps text-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border-b border-outline-variant/10 flex items-center gap-1";
        header.innerHTML = `<span class="material-symbols-outlined text-sm">person</span> Drivers`;
        dropdown.appendChild(header);

        matchingDrivers.forEach(d => {
            const item = document.createElement("div");
            item.className = "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors";
            item.innerHTML = `
                <img src="${d.img}" class="w-8 h-8 rounded-full object-cover border border-outline-variant/30" />
                <div class="flex-grow min-w-0">
                    <p class="font-semibold text-on-surface truncate">${d.name}</p>
                    <p class="text-xs text-on-surface-variant truncate">${d.id} • ${d.attendance}</p>
                </div>
            `;
            item.onclick = () => {
                dropdown.classList.add("hidden");
                // Navigate to drivers and filter/highlight
                routeTo("#drivers");
                const globalSearch = document.getElementById("global-search");
                if (globalSearch) {
                    globalSearch.value = d.name;
                }
                renderDrivers();
            };
            dropdown.appendChild(item);
        });
    }

    // Render Vehicles category
    if (matchingVehicles.length > 0) {
        const header = document.createElement("div");
        header.className = "text-label-caps text-secondary text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border-b border-outline-variant/10 mt-2 flex items-center gap-1";
        header.innerHTML = `<span class="material-symbols-outlined text-sm">directions_bus</span> Vehicles`;
        dropdown.appendChild(header);

        matchingVehicles.forEach(v => {
            const item = document.createElement("div");
            item.className = "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors";
            item.innerHTML = `
                <div class="w-8 h-8 bg-surface-container-low rounded flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                    <span class="material-symbols-outlined text-secondary text-sm">directions_bus</span>
                </div>
                <div class="flex-grow min-w-0">
                    <p class="font-semibold text-on-surface truncate">${v.name}</p>
                    <p class="text-xs text-on-surface-variant truncate">${v.id} • ${v.type} • ${v.status}</p>
                </div>
            `;
            item.onclick = () => {
                dropdown.classList.add("hidden");
                // Navigate to vehicles and filter
                routeTo("#vehicles");
                const globalSearch = document.getElementById("global-search");
                if (globalSearch) {
                    globalSearch.value = v.id; // search by plate/id
                }
                renderVehicles();
            };
            dropdown.appendChild(item);
        });
    }

    // Render Trips/Routes category
    if (matchingTrips.length > 0) {
        const header = document.createElement("div");
        header.className = "text-label-caps text-tertiary text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border-b border-outline-variant/10 mt-2 flex items-center gap-1";
        header.innerHTML = `<span class="material-symbols-outlined text-sm">route</span> Trips & Routes`;
        dropdown.appendChild(header);

        matchingTrips.forEach(t => {
            const item = document.createElement("div");
            item.className = "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors";
            item.innerHTML = `
                <div class="w-8 h-8 bg-surface-container-low rounded flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                    <span class="material-symbols-outlined text-tertiary text-sm">route</span>
                </div>
                <div class="flex-grow min-w-0">
                    <p class="font-semibold text-on-surface truncate">${t.id}</p>
                    <p class="text-xs text-on-surface-variant truncate">${t.source} → ${t.destination} • ${t.status}</p>
                </div>
            `;
            item.onclick = () => {
                dropdown.classList.add("hidden");
                // Navigate to routes and filter
                routeTo("#routes");
                const globalSearch = document.getElementById("global-search");
                if (globalSearch) {
                    globalSearch.value = t.id;
                }
                renderRoutes();
            };
            dropdown.appendChild(item);
        });
    }

    dropdown.classList.remove("hidden");
}

function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.add("hidden"));
}

// Simulations and Background Processing
function startSimulations() {
    // 1. Live Trips Progress Simulator
    setInterval(async () => {
        let stateChanged = false;
        for (const trip of state.trips) {
            if (trip.status === "In Transit" && trip.progress < 100) {
                const inc = Math.floor(Math.random() * 4) + 1; // 1-4%
                trip.progress = Math.min(100, trip.progress + inc);
                stateChanged = true;

                if (trip.progress === 100) {
                    trip.status = "Completed";
                    
                    // Call API to mark Trip finished in DB
                    try {
                        await fetch(`/api/v1/trips/trips/${trip.pk}/`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwtToken}`
                            },
                            body: JSON.stringify({
                                status: 'finished',
                                distance_travelled_km: trip.distance
                            })
                        });

                        // Release Vehicle status
                        const veh = state.vehicles.find(v => v.id === trip.vehicleId);
                        if (veh) {
                            await fetch(`/api/v1/fleet/vehicles/${veh.pk}/`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${jwtToken}`
                                },
                                body: JSON.stringify({ status: 'available' })
                            });
                        }
                    } catch (e) {
                        console.error("Failed to sync finished trip in DB", e);
                    }

                    showToast(`Trip ${trip.id} reached destination! Vehicle ${trip.vehicleId} is now Available.`, "success");
                }
            }
        }

        if (stateChanged) {
            await fetchBackendData();
            const activeHash = window.location.hash || "#dashboard";
            if (activeHash === "#routes") renderRoutes();
            else if (activeHash === "#dashboard") renderDashboard();
            else if (activeHash === "#vehicles") renderVehicles();
        }
    }, 8000);

    // 2. Animated Map Markers Movement Simulator
    setInterval(() => {
        const markers = document.querySelectorAll(".map-marker-dot");
        markers.forEach(marker => {
            const maxOffset = 15;
            const dx = Math.floor(Math.random() * maxOffset) - (maxOffset/2);
            const dy = Math.floor(Math.random() * maxOffset) - (maxOffset/2);
            
            const baseLeft = parseFloat(marker.dataset.baseLeft);
            const baseTop = parseFloat(marker.dataset.baseTop);
            
            marker.style.left = `calc(${baseLeft}% + ${dx}px)`;
            marker.style.top = `calc(${baseTop}% + ${dy}px)`;
        });
    }, 5000);

    // 3. Random Diagnostic Alerts Engine
    setInterval(() => {
        if (state.userRole === "passenger") return;
        if (Math.random() < 0.15) {
            const randomVehicles = state.vehicles.filter(v => v.status === "In Transit");
            if (randomVehicles.length === 0) return;
            const vehicle = randomVehicles[Math.floor(Math.random() * randomVehicles.length)];
            
            const diagnosticAlerts = [
                { title: "Low Fuel / Battery Warning", text: `${vehicle.id} energy capacity dropped to 10%. Refuel scheduled.`, level: "Warning", icon: "build", colorClass: "tertiary" },
                { title: "Minor Maintenance Alert", text: `${vehicle.id} reports tire pressure variance. Diagnostics logged.`, level: "Warning", icon: "build", colorClass: "tertiary" },
                { title: "System Route Alert", text: `${vehicle.id} deviated from route schedule due to road construction block.`, level: "Info", icon: "info", colorClass: "primary" }
            ];

            const chosen = diagnosticAlerts[Math.floor(Math.random() * diagnosticAlerts.length)];
            const alertId = `AL-${Date.now()}`;
            
            state.alerts.unshift({
                id: alertId,
                title: chosen.title,
                text: chosen.text,
                time: "Just now",
                level: chosen.level,
                icon: chosen.icon,
                colorClass: chosen.colorClass
            });

            if (state.alerts.length > 10) state.alerts.pop();

            showToast(`${chosen.title}: ${vehicle.id}`, chosen.level === "Critical" ? "error" : "info");
            saveLocalSettings();
            
            const activeHash = window.location.hash || "#dashboard";
            if (activeHash === "#dashboard") renderDashboard();
        }
    }, 12000);
}

// 1. Dashboard View
function renderDashboard() {
    const totalVehiclesCount = state.vehicles.length;
    const activeDriversCount = state.drivers.filter(d => d.attendance === "Present").length;
    
    const isDriver = state.userRole === "driver";
    const isPassenger = state.userRole === "passenger";

    if (isDriver) {
        if (window.passengerDashboardInterval) {
            clearInterval(window.passengerDashboardInterval);
            window.passengerDashboardInterval = null;
        }
        const driverProfile = findCurrentDriverProfile();
        
        const card1Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(1) p");
        if (card1Title) card1Title.textContent = "Your Assigned Vehicle";
        const card1Value = document.getElementById("dash-total-vehicles");
        if (card1Value) {
            card1Value.className = "text-3xl font-bold text-on-surface truncate pr-2 block";
            card1Value.textContent = driverProfile.vehicle || "Unassigned";
            card1Value.title = driverProfile.vehicle || "Unassigned";
        }

        const card2Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(2) p");
        if (card2Title) card2Title.textContent = "Your Rating";
        const card2Value = document.getElementById("dash-active-drivers");
        if (card2Value) {
            card2Value.className = "text-4xl font-bold text-on-surface";
            card2Value.textContent = driverProfile.rating || "N/A";
        }

        const card3Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(3) p");
        if (card3Title) card3Title.textContent = "Your Trips";
        const card3Value = document.getElementById("dash-pending-bookings");
        if (card3Value) {
            card3Value.className = "text-4xl font-bold text-on-surface";
            card3Value.textContent = driverProfile.trips || "0";
        }

        const card4Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(4) p");
        if (card4Title) card4Title.textContent = "Shift Attendance";
        const card4Value = document.getElementById("dash-fleet-distance");
        if (card4Value) {
            const isPresent = (driverProfile.attendance === "Present");
            card4Value.className = "text-3xl font-bold text-on-surface flex items-center justify-between w-full pr-2 gap-4 flex-wrap mt-1";
            card4Value.innerHTML = `
                <span>${driverProfile.attendance || "Absent"}</span>
                <button onclick="toggleAttendance('${driverProfile.id || ''}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-${isPresent ? 'error' : 'secondary'}/30 bg-${isPresent ? 'error' : 'secondary'}/10 text-${isPresent ? 'error' : 'secondary'} hover:bg-${isPresent ? 'error' : 'secondary'}/20 transition-all duration-300 flex items-center gap-1 shadow-sm">
                    <span class="material-symbols-outlined text-[16px]">${isPresent ? 'logout' : 'login'}</span>
                    Go ${isPresent ? 'Absent' : 'Present'}
                </button>
            `;
        }

        // Restore Warnings & Logs Panel Heading for Driver
        const panelTitleEl = document.querySelector("#view-dashboard h3.text-headline-md");
        if (panelTitleEl) {
            panelTitleEl.innerHTML = `
                <span class="material-symbols-outlined text-on-surface-variant">notifications_active</span>
                Warnings &amp; Logs
            `;
        }

        // Render Alerts for Driver
        const alertsContainer = document.getElementById("dash-alerts-container");
        if (alertsContainer) {
            alertsContainer.innerHTML = "";
            const criticalCount = state.alerts.filter(a => a.level === "Critical").length;
            const alertBadge = document.getElementById("dash-alerts-badge");
            if (alertBadge) {
                alertBadge.textContent = `${criticalCount} Critical`;
                alertBadge.className = criticalCount > 0 
                    ? "px-2 py-0.5 rounded text-label-caps font-label-caps bg-error/20 text-error border border-error/30 shadow-[0_0_10px_rgba(255,180,171,0.2)]"
                    : "px-2 py-0.5 rounded text-label-caps font-label-caps bg-white/5 text-on-surface-variant border border-white/10";
            }

            if (state.alerts.length === 0) {
                alertsContainer.innerHTML = `
                    <div class="p-6 text-center text-on-surface-variant">
                        <span class="material-symbols-outlined text-4xl mb-2 text-outline-variant">check_circle</span>
                        <p class="text-body-md">All systems nominal. No alerts reported.</p>
                    </div>
                `;
            } else {
                const alertThemes = {
                    error: {
                        card: "p-4 rounded-lg bg-error/10 border border-error/30 relative overflow-hidden group cursor-pointer hover:bg-error/15 transition-all",
                        bar: "absolute left-0 top-0 bottom-0 w-1 bg-error shadow-[0_0_10px_rgba(255,180,171,0.5)]",
                        text: "text-error",
                        icon: "warning"
                    },
                    tertiary: {
                        card: "p-4 rounded-lg bg-tertiary/10 border border-tertiary/30 relative overflow-hidden group cursor-pointer hover:bg-tertiary/15 transition-all",
                        bar: "absolute left-0 top-0 bottom-0 w-1 bg-tertiary shadow-[0_0_10px_rgba(255,185,95,0.5)]",
                        text: "text-tertiary",
                        icon: "build"
                    },
                    primary: {
                        card: "p-4 rounded-lg bg-primary/10 border border-primary/30 relative overflow-hidden group cursor-pointer hover:bg-primary/15 transition-all",
                        bar: "absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(76,215,246,0.5)]",
                        text: "text-primary",
                        icon: "info"
                    }
                };
                state.alerts.forEach(alert => {
                    const theme = alertThemes[alert.colorClass] || alertThemes.primary;
                    const item = document.createElement("div");
                    item.className = theme.card + " flex-shrink-0";
                    item.innerHTML = `
                        <div class="${theme.bar}"></div>
                        <div class="flex gap-3">
                            <span class="material-symbols-outlined ${theme.text}">${alert.icon}</span>
                            <div class="flex-grow">
                                <div class="flex justify-between items-start mb-1">
                                    <h4 class="text-body-lg font-semibold text-on-surface">${alert.title}</h4>
                                    <span class="text-label-caps text-on-surface-variant text-[10px]">${alert.time}</span>
                                </div>
                                <p class="text-body-md text-on-surface-variant">${alert.text}</p>
                                <div class="mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="text-[10px] text-primary font-bold uppercase tracking-wider">Dismiss / Resolve</span>
                                </div>
                            </div>
                        </div>
                    `;
                    item.addEventListener("click", () => {
                        dismissAlert(alert.id);
                    });
                    alertsContainer.appendChild(item);
                });
            }
        }
    } else if (isPassenger) {
        // Find passenger's bookings
        const passengerName = state.currentUser ? `${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.trim().toLowerCase() : "";
        const username = state.username ? state.username.toLowerCase() : "";

        const passengerBookings = state.bookings.filter(b => {
            const pName = (b.passenger_name || "").toLowerCase();
            return (passengerName && pName.includes(passengerName)) || 
                   (username && pName.includes(username)) || 
                   pName.includes("customer / portal") || 
                   pName.includes("portal booking");
        });

        // Latest active booking
        const activeBooking = passengerBookings.find(b => b.status !== "cancelled" && b.status !== "completed" && b.status !== "finished");

        // Card 1: Assigned Vehicle
        const card1Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(1) p");
        if (card1Title) card1Title.textContent = "Assigned Vehicle";
        const card1Value = document.getElementById("dash-total-vehicles");
        if (card1Value) {
            card1Value.className = "text-xl font-bold text-on-surface truncate pr-2 block mt-1";
            if (activeBooking) {
                const veh = state.vehicles.find(v => v.pk == activeBooking.vehicle || v.id == activeBooking.vehicle || (v.name && v.name.includes(activeBooking.vehicle)));
                const vehName = veh ? veh.name : (typeof activeBooking.vehicle === "string" ? activeBooking.vehicle : "Bus Shuttle");
                const vehId = veh ? veh.id : "VH-Assigned";
                card1Value.textContent = `${vehName} (${vehId})`;
                card1Value.title = `${vehName} (${vehId})`;
            } else {
                card1Value.textContent = "No Active Ride";
                card1Value.removeAttribute("title");
            }
        }

        // Card 2: Assigned Driver
        const card2Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(2) p");
        if (card2Title) card2Title.textContent = "Assigned Driver";
        const card2Value = document.getElementById("dash-active-drivers");
        if (card2Value) {
            card2Value.className = "text-xl font-bold text-on-surface truncate mt-1";
            if (activeBooking) {
                const drv = state.drivers.find(d => d.pk == activeBooking.driver || d.id == activeBooking.driver || (d.name && d.name.includes(activeBooking.driver)));
                const drvName = drv ? drv.name : (typeof activeBooking.driver === "string" ? activeBooking.driver : "Assigned Driver");
                const drvRating = drv ? drv.rating : "4.9";
                card2Value.textContent = `${drvName} (${drvRating}★)`;
            } else {
                card2Value.textContent = "No Active Driver";
            }
        }

        // Card 3: Journey Distance
        const card3Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(3) p");
        if (card3Title) card3Title.textContent = "Journey Distance";
        const card3Value = document.getElementById("dash-pending-bookings");
        if (card3Value) {
            card3Value.className = "text-3xl font-bold text-on-surface mt-1";
            if (activeBooking) {
                let dist = 25.0;
                if (state.routes) {
                    const rte = state.routes.find(r => r.id == activeBooking.route || (r.start_location === activeBooking.pickup_point && r.end_location === activeBooking.destination));
                    if (rte && rte.distance_km) dist = parseFloat(rte.distance_km);
                }
                card3Value.innerHTML = `${dist} <span class="text-headline-md text-on-surface-variant font-normal">km</span>`;
            } else {
                card3Value.textContent = "0.0 km";
            }
        }

        // Card 4: Est. Travel Time
        const card4Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(4) p");
        if (card4Title) card4Title.textContent = "Est. Travel Time";
        const card4Value = document.getElementById("dash-fleet-distance");
        if (card4Value) {
            card4Value.className = "text-3xl font-bold text-on-surface mt-1";
            if (activeBooking) {
                let dist = 25.0;
                if (state.routes) {
                    const rte = state.routes.find(r => r.id == activeBooking.route || (r.start_location === activeBooking.pickup_point && r.end_location === activeBooking.destination));
                    if (rte && rte.distance_km) dist = parseFloat(rte.distance_km);
                }
                const travelTimeMins = Math.round(dist * 1.5);
                card4Value.textContent = `${travelTimeMins} mins`;
            } else {
                card4Value.textContent = "N/A";
            }
        }

        // Right Side Departure Countdown Panel (Warnings Replacement)
        const panelTitleEl = document.querySelector("#view-dashboard h3.text-headline-md");
        if (panelTitleEl) {
            panelTitleEl.innerHTML = `
                <span class="material-symbols-outlined text-primary">schedule</span>
                Upcoming Departure Details
            `;
        }

        const alertsContainer = document.getElementById("dash-alerts-container");
        if (alertsContainer) {
            alertsContainer.innerHTML = "";
            
            const badge = document.getElementById("dash-alerts-badge");
            if (activeBooking) {
                if (badge) {
                    badge.textContent = activeBooking.status ? activeBooking.status.toUpperCase() : "CONFIRMED";
                    badge.className = "px-2 py-0.5 rounded text-label-caps bg-primary/20 text-primary border border-primary/30 shadow-sm";
                }

                const pickup = activeBooking.pickup_point;
                const dest = activeBooking.destination;
                const dateStr = activeBooking.scheduled_date;
                const timeStr = activeBooking.scheduled_time;
                const seats = activeBooking.notes || "Seats: Unassigned";
                const countdownId = `countdown-${activeBooking.id}`;
                
                alertsContainer.innerHTML = `
                    <div class="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4">
                        <div class="flex justify-between items-center border-b border-white/10 pb-3">
                            <span class="text-body-lg font-bold text-primary">Booking ID: #${activeBooking.id}</span>
                            <span id="${countdownId}" class="text-body-md font-semibold text-secondary animate-pulse">Calculating departure...</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">my_location</span>
                                <span class="text-body-md text-on-surface font-medium">From: ${pickup}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">location_on</span>
                                <span class="text-body-md text-on-surface font-medium">To: ${dest}</span>
                            </div>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_month</span>
                                <span class="text-body-sm text-on-surface-variant font-medium">Scheduled: ${dateStr} at ${timeStr.substring(0, 5)}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-[18px] text-on-surface-variant">airline_seat_recline_normal</span>
                                <span class="text-body-sm text-on-surface-variant font-semibold">${seats}</span>
                            </div>
                        </div>
                        <button onclick="routeTo('#tickets')" class="w-full mt-2 neon-btn text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-body-md font-bold transition-all hover:scale-[1.02]">
                            <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
                            View Boarding Pass / Ticket
                        </button>
                    </div>
                `;

                function tickCountdown() {
                    const el = document.getElementById(countdownId);
                    if (!el) return;

                    const rawTime = timeStr.includes(":") ? timeStr : `${timeStr}:00`;
                    const departureStr = `${dateStr}T${rawTime}`;
                    const departureTime = new Date(departureStr);
                    const now = new Date();
                    const diffMs = departureTime - now;

                    if (isNaN(departureTime.getTime())) {
                        el.textContent = "Scheduled Departure";
                        return;
                    }

                    if (diffMs <= 0) {
                        el.textContent = "Departed / Ongoing";
                        el.className = "text-body-md font-semibold text-tertiary";
                    } else {
                        const diffHrs = Math.floor(diffMs / 3600000);
                        const diffMins = Math.floor((diffMs % 3600000) / 60000);
                        const diffSecs = Math.floor((diffMs % 60000) / 1000);

                        let text = "Departure in ";
                        if (diffHrs > 0) {
                            text += `${diffHrs}h ${diffMins}m`;
                        } else if (diffMins > 0) {
                            text += `${diffMins}m ${diffSecs}s`;
                        } else {
                            text += `${diffSecs}s`;
                        }
                        el.textContent = text;
                    }
                }

                tickCountdown();
                if (window.passengerDashboardInterval) clearInterval(window.passengerDashboardInterval);
                window.passengerDashboardInterval = setInterval(tickCountdown, 1000);
            } else {
                if (badge) {
                    badge.textContent = "0 Confirmed";
                    badge.className = "px-2 py-0.5 rounded text-label-caps bg-white/5 text-on-surface-variant border border-white/10";
                }
                
                alertsContainer.innerHTML = `
                    <div class="p-6 text-center text-on-surface-variant glass-card rounded-xl flex flex-col items-center gap-3">
                        <span class="material-symbols-outlined text-4xl text-outline-variant">directions_bus</span>
                        <p class="text-body-md leading-relaxed">Ready to travel? You don't have any booked trips at the moment.</p>
                        <button onclick="routeTo('#booking')" class="mt-2 neon-btn text-white py-2 px-6 rounded-lg text-body-md font-bold flex items-center gap-2">
                            <span class="material-symbols-outlined">add_circle</span>
                            Book a Ride Now
                        </button>
                    </div>
                `;
                if (window.passengerDashboardInterval) clearInterval(window.passengerDashboardInterval);
            }
        }
    } else {
        if (window.passengerDashboardInterval) {
            clearInterval(window.passengerDashboardInterval);
            window.passengerDashboardInterval = null;
        }
        
        const card1Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(1) p");
        if (card1Title) card1Title.textContent = "Total Vehicles";
        const card1Value = document.getElementById("dash-total-vehicles");
        if (card1Value) {
            card1Value.className = "text-display-lg text-on-surface";
            card1Value.textContent = totalVehiclesCount;
            card1Value.removeAttribute("title");
        }

        const card2Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(2) p");
        if (card2Title) card2Title.textContent = "Active Drivers";
        const card2Value = document.getElementById("dash-active-drivers");
        if (card2Value) {
            card2Value.className = "text-display-lg text-on-surface";
            card2Value.textContent = activeDriversCount;
        }

        const card3Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(3) p");
        if (card3Title) card3Title.textContent = "Pending Bookings";
        const card3Value = document.getElementById("dash-pending-bookings");
        if (card3Value) {
            card3Value.className = "text-display-lg text-on-surface";
            card3Value.textContent = state.pendingBookingsCount;
        }

        const card4Title = document.querySelector("#view-dashboard > div.grid > div:nth-child(4) p");
        if (card4Title) card4Title.textContent = "Fleet Distance";
        const card4Value = document.getElementById("dash-fleet-distance");
        if (card4Value) {
            card4Value.className = "text-display-lg text-on-surface flex items-baseline gap-1";
            card4Value.innerHTML = `${state.totalDistance} <span class="text-headline-md text-on-surface-variant font-normal">k km</span>`;
        }

        // Restore Warnings & Logs Panel Heading for Admin/Manager
        const panelTitleEl = document.querySelector("#view-dashboard h3.text-headline-md");
        if (panelTitleEl) {
            panelTitleEl.innerHTML = `
                <span class="material-symbols-outlined text-on-surface-variant">notifications_active</span>
                Warnings &amp; Logs
            `;
        }

        // Render Alerts for Admin/Manager
        const alertsContainer = document.getElementById("dash-alerts-container");
        if (alertsContainer) {
            alertsContainer.innerHTML = "";
            const criticalCount = state.alerts.filter(a => a.level === "Critical").length;
            const alertBadge = document.getElementById("dash-alerts-badge");
            if (alertBadge) {
                alertBadge.textContent = `${criticalCount} Critical`;
                alertBadge.className = criticalCount > 0 
                    ? "px-2 py-0.5 rounded text-label-caps font-label-caps bg-error/20 text-error border border-error/30 shadow-[0_0_10px_rgba(255,180,171,0.2)]"
                    : "px-2 py-0.5 rounded text-label-caps font-label-caps bg-white/5 text-on-surface-variant border border-white/10";
            }

            if (state.alerts.length === 0) {
                alertsContainer.innerHTML = `
                    <div class="p-6 text-center text-on-surface-variant">
                        <span class="material-symbols-outlined text-4xl mb-2 text-outline-variant">check_circle</span>
                        <p class="text-body-md">All systems nominal. No alerts reported.</p>
                    </div>
                `;
            } else {
                const alertThemes = {
                    error: {
                        card: "p-4 rounded-lg bg-error/10 border border-error/30 relative overflow-hidden group cursor-pointer hover:bg-error/15 transition-all",
                        bar: "absolute left-0 top-0 bottom-0 w-1 bg-error shadow-[0_0_10px_rgba(255,180,171,0.5)]",
                        text: "text-error",
                        icon: "warning"
                    },
                    tertiary: {
                        card: "p-4 rounded-lg bg-tertiary/10 border border-tertiary/30 relative overflow-hidden group cursor-pointer hover:bg-tertiary/15 transition-all",
                        bar: "absolute left-0 top-0 bottom-0 w-1 bg-tertiary shadow-[0_0_10px_rgba(255,185,95,0.5)]",
                        text: "text-tertiary",
                        icon: "build"
                    },
                    primary: {
                        card: "p-4 rounded-lg bg-primary/10 border border-primary/30 relative overflow-hidden group cursor-pointer hover:bg-primary/15 transition-all",
                        bar: "absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(76,215,246,0.5)]",
                        text: "text-primary",
                        icon: "info"
                    }
                };
                state.alerts.forEach(alert => {
                    const theme = alertThemes[alert.colorClass] || alertThemes.primary;
                    const item = document.createElement("div");
                    item.className = theme.card + " flex-shrink-0";
                    item.innerHTML = `
                        <div class="${theme.bar}"></div>
                        <div class="flex gap-3">
                            <span class="material-symbols-outlined ${theme.text}">${alert.icon}</span>
                            <div class="flex-grow">
                                <div class="flex justify-between items-start mb-1">
                                    <h4 class="text-body-lg font-semibold text-on-surface">${alert.title}</h4>
                                    <span class="text-label-caps text-on-surface-variant text-[10px]">${alert.time}</span>
                                </div>
                                <p class="text-body-md text-on-surface-variant">${alert.text}</p>
                                <div class="mt-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="text-[10px] text-primary font-bold uppercase tracking-wider">Dismiss / Resolve</span>
                                </div>
                            </div>
                        </div>
                    `;
                    item.addEventListener("click", () => {
                        dismissAlert(alert.id);
                    });
                    alertsContainer.appendChild(item);
                });
            }
        }
    }
}

function dismissAlert(alertId) {
    state.alerts = state.alerts.filter(a => a.id !== alertId);
    saveLocalSettings();
    showToast("Alert resolved and cleared.", "success");
    renderDashboard();
}

// 2. Vehicles View
let vehicleFilter = "All";

function renderVehicles() {
    const grid = document.getElementById("vehicles-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const searchVal = (document.getElementById("global-search")?.value || "").toLowerCase();
    
    const filtered = state.vehicles.filter(vehicle => {
        if (vehicleFilter !== "All" && vehicle.status !== vehicleFilter) return false;
        if (searchVal) {
            return vehicle.name.toLowerCase().includes(searchVal) || vehicle.id.toLowerCase().includes(searchVal) || vehicle.type.toLowerCase().includes(searchVal);
        }
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full p-12 text-center glass-card rounded-xl text-on-surface-variant">
                <span class="material-symbols-outlined text-5xl mb-3">directions_bus</span>
                <p class="text-body-lg">No vehicles found matching current criteria.</p>
            </div>
        `;
        return;
    }

    const vehicleStatusThemes = {
        "Available": {
            badge: "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(76,215,246,0.2)]",
            dot: "bg-primary",
            progress: "from-primary-container to-primary shadow-[0_0_8px_rgba(76,215,246,0.2)]",
            text: "text-primary"
        },
        "In Transit": {
            badge: "bg-secondary/10 text-secondary border-secondary/20 shadow-[0_0_10px_rgba(78,222,163,0.2)]",
            dot: "bg-secondary animate-pulse",
            progress: "from-secondary-container to-secondary shadow-[0_0_8px_rgba(78,222,163,0.2)]",
            text: "text-secondary"
        },
        "Maintenance": {
            badge: "bg-tertiary/10 text-tertiary border-tertiary/20 shadow-[0_0_10px_rgba(255,185,95,0.2)]",
            dot: "bg-tertiary",
            progress: "from-tertiary-container to-tertiary shadow-[0_0_8px_rgba(255,185,95,0.2)]",
            text: "text-tertiary"
        }
    };

    filtered.forEach(vehicle => {
        const theme = vehicleStatusThemes[vehicle.status] || vehicleStatusThemes.Available;
        
        const isDriver = (state.userRole === "driver");
        let isMyVehicle = false;
        if (isDriver) {
            const activeName = state.currentUser ? `${state.currentUser.first_name} ${state.currentUser.last_name}`.toLowerCase() : "";
            const driverProfile = state.drivers.find(d => 
                (d.userPk && state.currentUser && d.userPk === state.currentUser.id) || 
                (d.name && d.name.toLowerCase().includes(activeName))
            ) || {};
            isMyVehicle = (driverProfile.vehicle === vehicle.id);
        }

        const card = document.createElement("div");
        card.className = `glass-card rounded-xl p-card-padding flex flex-col gap-4 glow-hover group relative overflow-hidden`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-label-caps text-primary tracking-wider">${vehicle.id}</span>
                    <h3 class="text-headline-md font-bold text-on-surface mt-1">${vehicle.name}</h3>
                </div>
                <div class="${theme.badge} px-3 py-1 rounded-full flex items-center gap-2 border">
                    <div class="w-2 h-2 rounded-full ${theme.dot}"></div>
                    <span class="text-label-caps">${vehicle.status}</span>
                </div>
            </div>
            <div class="h-32 w-full bg-surface-container-low rounded-lg relative overflow-hidden border border-outline-variant/30 flex items-center justify-center">
                <img alt="${vehicle.name}" class="object-cover w-full h-full opacity-60 mix-blend-luminosity group-hover:opacity-100 transition-opacity" src="${vehicle.img}"/>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <span class="text-label-caps text-on-surface-variant">Capacity</span>
                    <span class="text-body-lg text-on-surface flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-sm">group</span> ${vehicle.capacity} pax
                    </span>
                </div>
                <div class="flex flex-col">
                    <span class="text-label-caps text-on-surface-variant">${vehicle.status === 'Maintenance' ? 'Location' : 'Route / Trip'}</span>
                    <span class="text-body-lg text-on-surface truncate">${vehicle.route}</span>
                </div>
            </div>
            <div class="mt-2">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-label-caps text-on-surface-variant">Battery Status</span>
                    <span class="text-label-caps ${theme.text}">${vehicle.energy}%</span>
                </div>
                <div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r ${theme.progress} rounded-full" style="width: ${vehicle.energy}%"></div>
                </div>
            </div>
            ${(state.userRole === "admin" || state.userRole === "dispatcher") ? `
            <div class="border-t border-outline-variant/10 pt-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="text-sm text-outline hover:text-white flex items-center gap-1" onclick="openEditVehicle('${vehicle.id}')">
                    <span class="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
                <button class="text-sm text-error/80 hover:text-error flex items-center gap-1" onclick="deleteVehicle('${vehicle.id}')">
                    <span class="material-symbols-outlined text-[16px]">delete</span> Delete
                </button>
            </div>
            ` : (isDriver ? `
            <div class="border-t border-outline-variant/10 pt-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                ${isMyVehicle ? `
                <button class="text-sm text-outline hover:text-white flex items-center gap-1" onclick="openEditVehicle('${vehicle.id}')">
                    <span class="material-symbols-outlined text-[16px]">edit</span> Edit Vehicle & Stats
                </button>
                ` : (vehicle.status === "Available" ? `
                <button class="text-sm text-primary hover:text-white flex items-center gap-1" onclick="assignVehicleToSelf('${vehicle.id}')">
                    <span class="material-symbols-outlined text-[16px]">airline_seat_recline_normal</span> Assign to Self & Start Tour
                </button>
                ` : '')}
            </div>
            ` : '')}
        `;
        grid.appendChild(card);
    });
}

function filterVehicles(status, btn) {
    vehicleFilter = status;
    document.querySelectorAll("#vehicle-filters button").forEach(b => {
        b.className = "px-4 py-2 rounded-full border border-white/10 text-body-md text-on-surface-variant hover:text-white hover:bg-white/5 transition-all";
    });
    btn.className = "px-4 py-2 rounded-full bg-primary/20 border border-primary/50 text-body-md text-primary font-semibold shadow-[0_0_10px_rgba(76,215,246,0.3)]";
    renderVehicles();
}

function openAddVehicleModal() {
    const modal = document.getElementById("modal-vehicle");
    if (!modal) return;
    
    document.getElementById("vehicle-modal-title").textContent = "Add New Vehicle";
    document.getElementById("vehicle-action-type").value = "add";
    document.getElementById("form-vehicle-id").disabled = false;
    
    document.getElementById("form-vehicle-id").value = "VH-" + (Math.floor(Math.random() * 9000) + 1000);
    document.getElementById("form-vehicle-name").value = "";
    document.getElementById("form-vehicle-capacity").value = "70";
    document.getElementById("form-vehicle-energy").value = "100";
    document.getElementById("form-vehicle-type").value = "Luxury Coach";
    document.getElementById("form-vehicle-status").value = "Available";
    document.getElementById("form-vehicle-route").value = "Depot Alpha";
    
    modal.classList.remove("hidden");
}

function openEditVehicle(vehicleId) {
    const vehicle = state.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const modal = document.getElementById("modal-vehicle");
    if (!modal) return;

    document.getElementById("vehicle-modal-title").textContent = `Edit Vehicle (${vehicle.id})`;
    document.getElementById("vehicle-action-type").value = "edit";
    document.getElementById("form-vehicle-id").value = vehicle.id;
    document.getElementById("form-vehicle-id").disabled = true;

    document.getElementById("form-vehicle-name").value = vehicle.name;
    document.getElementById("form-vehicle-capacity").value = vehicle.capacity;
    document.getElementById("form-vehicle-energy").value = vehicle.energy;
    document.getElementById("form-vehicle-type").value = vehicle.type;
    document.getElementById("form-vehicle-status").value = vehicle.status;
    document.getElementById("form-vehicle-route").value = vehicle.route;

    modal.classList.remove("hidden");
}

async function submitVehicleForm(e) {
    e.preventDefault();
    const mode = document.getElementById("vehicle-action-type").value;
    const id = document.getElementById("form-vehicle-id").value.trim().toUpperCase();
    const name = document.getElementById("form-vehicle-name").value.trim();
    const capacity = parseInt(document.getElementById("form-vehicle-capacity").value);
    const energy = parseInt(document.getElementById("form-vehicle-energy").value);
    const type = document.getElementById("form-vehicle-type").value;
    const status = document.getElementById("form-vehicle-status").value;
    const route = document.getElementById("form-vehicle-route").value.trim();

    if (!id || !name) {
        showToast("Please fill in all required fields.", "error");
        return;
    }

    const make = name.split(' ')[0] || "Unknown";
    const model = name.split(' ').slice(1).join(' ') || "Coach";
    const apiStatus = status === "Available" ? "available" : (status === "In Transit" ? "in_service" : "maintenance");

    try {
        if (jwtToken && !jwtToken.startsWith("mock_")) {
            if (mode === "add") {
                if (state.vehicles.some(v => v.id === id)) {
                    showToast(`Vehicle ID ${id} already exists!`, "error");
                    return;
                }

                const payload = {
                    vin: generateVIN(id),
                    plate_number: id,
                    make: make,
                    model: model,
                    year: 2024,
                    capacity: capacity,
                    status: apiStatus,
                    energy: energy
                };

                const resp = await fetch('/api/v1/fleet/vehicles/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify(payload)
                });

                if (resp.ok) {
                    showToast(`Vehicle ${id} (${name}) added to database!`, "success");
                } else {
                    showToast("Failed to save vehicle: " + await resp.text(), "error");
                }
            } else {
                const vehicle = state.vehicles.find(v => v.id === id);
                if (vehicle && vehicle.pk) {
                    const payload = {
                        make: make,
                        model: model,
                        capacity: capacity,
                        status: apiStatus,
                        energy: energy
                    };

                    const resp = await fetch(`/api/v1/fleet/vehicles/${vehicle.pk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify(payload)
                    });

                    if (resp.ok) {
                        showToast(`Vehicle ${id} updated in database.`, "success");
                    } else {
                        showToast("Failed to update vehicle.", "error");
                    }
                }
            }
            await fetchBackendData();
        } else {
            // Offline / Mock fallback
            if (mode === "add") {
                if (state.vehicles.some(v => v.id === id)) {
                    showToast(`Vehicle ID ${id} already exists!`, "error");
                    return;
                }
                const newVeh = {
                    pk: Date.now(),
                    id: id,
                    name: name,
                    type: type,
                    capacity: capacity,
                    route: "Depot Alpha",
                    status: status,
                    energy: energy,
                    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300",
                    driverPk: null,
                    driverName: "None"
                };
                state.vehicles.push(newVeh);
            } else {
                const vehicle = state.vehicles.find(v => v.id === id);
                if (vehicle) {
                    vehicle.name = name;
                    vehicle.capacity = capacity;
                    vehicle.energy = energy;
                    vehicle.type = type;
                    vehicle.status = status;
                }
            }
            saveMockState();
            showToast(`Offline Vehicle ${id} saved!`, "success");
        }
        closeAllModals();
        renderVehicles();
        renderDashboard();
    } catch (err) {
        console.error(err);
        showToast("Error updating vehicle details.", "error");
    }
}

async function deleteVehicle(id) {
    if (confirm(`Are you sure you want to decommission vehicle ${id}?`)) {
        const vehicle = state.vehicles.find(v => v.id === id);
        if (vehicle && vehicle.pk) {
            try {
                const resp = await fetch(`/api/v1/fleet/vehicles/${vehicle.pk}/`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resp.ok) {
                    showToast(`Vehicle ${id} decommissioned from database.`, "info");
                } else {
                    showToast("Failed to delete vehicle.", "error");
                }
            } catch (err) {
                console.error(err);
            }
        }
        await fetchBackendData();
        renderVehicles();
    }
}

// 3. Driver Management View
function renderDrivers() {
    const grid = document.getElementById("drivers-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const presentCount = state.drivers.filter(d => d.attendance === "Present").length;
    const absentCount = state.drivers.filter(d => d.attendance === "Absent").length;
    
    const presentEl = document.getElementById("driver-present-count");
    const absentEl = document.getElementById("driver-absent-count");
    if (presentEl) presentEl.textContent = presentCount;
    if (absentEl) absentEl.textContent = absentCount;

    const searchVal = (document.getElementById("global-search")?.value || "").toLowerCase();

    let filtered = state.drivers;
    if (state.userRole === "driver") {
        const addBtn = document.querySelector("[onclick='openAddDriverModal()']");
        if (addBtn) addBtn.classList.add("hidden");
    } else {
        const addBtn = document.querySelector("[onclick='openAddDriverModal()']");
        if (addBtn) addBtn.classList.remove("hidden");
    }

    filtered = filtered.filter(d => {
        if (searchVal) {
            return d.name.toLowerCase().includes(searchVal) || (d.vehicle && d.vehicle.toLowerCase().includes(searchVal));
        }
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full p-12 text-center glass-card rounded-xl text-on-surface-variant">
                <span class="material-symbols-outlined text-5xl mb-3">person</span>
                <p class="text-body-lg">No drivers found matching search query.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(driver => {
        const isPresent = driver.attendance === "Present";
        const overlayClass = isPresent ? "to-secondary/10" : "to-error/10";
        const card = document.createElement("div");
        card.className = `glass-card rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group hover:border-${isPresent ? 'secondary' : 'error'}/30 transition-all duration-300`;
        
        const isDriverUser = (state.userRole === "driver");
        const myProfile = findCurrentDriverProfile();
        const isMe = isDriverUser && myProfile && (driver.id === myProfile.id);

        let buttonsHTML = "";
        if (isDriverUser) {
            if (isMe) {
                buttonsHTML = `
                    <button class="w-full py-2 text-xs rounded border border-white/10 hover:bg-white/5 text-on-surface font-semibold" onclick="toggleAttendance('${driver.id}')">
                        Toggle My Attendance
                    </button>
                `;
            } else {
                buttonsHTML = `
                    <div class="text-[10px] text-on-surface-variant italic py-1">View Only</div>
                `;
            }
        } else {
            buttonsHTML = `
                <button class="flex-grow py-2 text-xs rounded border border-white/10 hover:bg-white/5 text-on-surface font-semibold" onclick="toggleAttendance('${driver.id}')">
                    Toggle Status
                </button>
                <button class="p-2 text-primary/80 hover:text-primary hover:bg-primary/5 rounded border border-transparent" onclick="openEditDriver('${driver.id}')">
                    <span class="material-symbols-outlined text-sm block">edit</span>
                </button>
                <button class="p-2 text-error/80 hover:text-error hover:bg-error/5 rounded border border-transparent" onclick="deleteDriver('${driver.id}')">
                    <span class="material-symbols-outlined text-sm block">delete</span>
                </button>
            `;
        }

        card.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-b from-transparent ${overlayClass} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div class="relative w-24 h-24 mb-4 ${isPresent ? '' : 'grayscale opacity-75'}">
                <img alt="${driver.name}" class="w-full h-full rounded-full object-cover border-2 border-outline-variant z-10 relative" src="${driver.img}"/>
                <div class="absolute -bottom-2 inset-x-0 mx-auto w-16 h-4 bg-background rounded-full blur-sm -z-0"></div>
            </div>
            <h3 class="text-headline-md font-bold text-on-surface mb-1">${driver.name}</h3>
            <div class="flex items-center gap-1 text-body-md text-tertiary mb-1">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span>${driver.rating}</span>
                <span class="text-on-surface-variant mx-1">•</span>
                <span class="text-on-surface-variant">${driver.trips} trips</span>
            </div>

            <div class="flex items-center gap-2 text-label-caps text-on-surface-variant mb-4 px-3 py-1 bg-surface-container/50 rounded-lg border border-outline-variant/30">
                <span class="material-symbols-outlined text-[14px]">directions_bus</span>
                ${driver.vehicle !== "None" ? driver.vehicle : "Unassigned"}
            </div>

            <div class="mt-auto w-full pt-4 border-t border-outline-variant/20 flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <span class="text-body-md text-on-surface-variant text-left">Attendance</span>
                    <div class="px-3 py-1 rounded-full ${isPresent ? 'bg-secondary/10 border-secondary/30 text-secondary shadow-[0_0_10px_rgba(78,222,163,0.3)]' : 'bg-error/10 border-error/30 text-error shadow-[0_0_10px_rgba(255,180,171,0.3)]'} text-label-caps flex items-center gap-1 border">
                        <span class="material-symbols-outlined text-[14px]">${isPresent ? 'north_east' : 'south_east'}</span>
                        ${driver.attendance}
                    </div>
                </div>
                
                <div class="flex gap-2 w-full mt-2">
                    ${buttonsHTML}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

async function toggleAttendance(driverId) {
    let driver = state.drivers.find(d => d.id === driverId);
    if (!driver && state.currentUser && state.userRole === "driver") {
        driver = state.drivers.find(d => d.userPk === state.currentUser.id || 
            (d.name && d.name.toLowerCase().includes(`${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.trim().toLowerCase())));
    }
    if (!driver) return;
    
    const nextAttendance = driver.attendance === "Present" ? "Absent" : "Present";
    
    if (jwtToken && !jwtToken.startsWith("mock_") && driver.pk) {
        const nextIsActive = nextAttendance === "Present";
        try {
            const resp = await fetch(`/api/v1/fleet/drivers/${driver.pk}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ is_active: nextIsActive })
            });
            if (resp.ok) {
                showToast(`${driver.name} attendance updated in database.`, "info");
            }
        } catch (e) {
            console.error(e);
        }
        await fetchBackendData();
    } else {
        // Offline / Mock fallback
        driver.attendance = nextAttendance;
        
        // Update mock drivers in localStorage
        const localDrivers = JSON.parse(localStorage.getItem("skyways_mock_drivers") || "[]");
        const idx = localDrivers.findIndex(d => d.id === driver.id || d.name === driver.name);
        if (idx !== -1) {
            localDrivers[idx].attendance = nextAttendance;
            localStorage.setItem("skyways_mock_drivers", JSON.stringify(localDrivers));
        } else {
            localDrivers.push({
                id: driver.id || "DR-MOCK",
                name: driver.name,
                rating: driver.rating || 5.0,
                trips: driver.trips || 0,
                vehicle: driver.vehicle || "None",
                attendance: nextAttendance,
                img: driver.img || "",
                userPk: driver.userPk || (state.currentUser ? state.currentUser.id : null)
            });
            localStorage.setItem("skyways_mock_drivers", JSON.stringify(localDrivers));
        }
        
        showToast(`${driver.name} attendance updated (Offline).`, "info");
    }
    
    renderDrivers();
    renderDashboard();
}

function openAddDriverModal() {
    const modal = document.getElementById("modal-driver");
    if (!modal) return;
    
    const modalTitle = document.getElementById("driver-modal-title");
    if (modalTitle) modalTitle.textContent = "Add New Driver Profile";
    const actionTypeInput = document.getElementById("driver-action-type");
    if (actionTypeInput) actionTypeInput.value = "add";
    
    document.getElementById("form-driver-name").value = "";
    let maxId = 0;
    state.drivers.forEach(d => {
        const num = parseInt(d.id.replace("DR-", ""));
        if (!isNaN(num) && num > maxId) maxId = num;
    });
    const newIdCode = "DR-" + (maxId + 1).toString().padStart(2, '0');
    document.getElementById("form-driver-id").value = newIdCode;
    document.getElementById("form-driver-vehicle").innerHTML = `
        <option value="None">None (Unassigned)</option>
        ${state.vehicles.map(v => `<option value="${v.pk}">${v.id} - ${v.name}</option>`).join("")}
    `;

    const submitBtn = document.querySelector("#modal-driver button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Add Driver";

    // Reset image upload preview
    const thumb = document.getElementById("driver-image-thumb");
    const placeholder = document.getElementById("driver-image-placeholder");
    const fileInput = document.getElementById("form-driver-image");
    if (thumb) { thumb.classList.add("hidden"); thumb.src = ""; }
    if (placeholder) placeholder.classList.remove("hidden");
    if (fileInput) fileInput.value = "";
    
    modal.classList.remove("hidden");
}

function openEditDriver(driverId) {
    const driver = state.drivers.find(d => d.id === driverId);
    if (!driver) return;

    const modal = document.getElementById("modal-driver");
    if (!modal) return;

    const modalTitle = document.getElementById("driver-modal-title");
    if (modalTitle) modalTitle.textContent = `Edit Driver Profile (${driver.id})`;
    const actionTypeInput = document.getElementById("driver-action-type");
    if (actionTypeInput) actionTypeInput.value = "edit";

    document.getElementById("form-driver-id").value = driver.id;
    document.getElementById("form-driver-name").value = driver.name;

    // Populate vehicle dropdown and select current vehicle
    const vehicleSelect = document.getElementById("form-driver-vehicle");
    vehicleSelect.innerHTML = `
        <option value="None">None (Unassigned)</option>
        ${state.vehicles.map(v => {
            const isAssignedToThisDriver = (v.driverPk === driver.pk);
            return `<option value="${v.pk}" ${isAssignedToThisDriver ? 'selected' : ''}>${v.id} - ${v.name}</option>`;
        }).join("")}
    `;

    const submitBtn = document.querySelector("#modal-driver button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Save Changes";

    // Reset image upload preview
    const thumb = document.getElementById("driver-image-thumb");
    const placeholder = document.getElementById("driver-image-placeholder");
    const fileInput = document.getElementById("form-driver-image");
    if (thumb) { thumb.classList.add("hidden"); thumb.src = ""; }
    if (placeholder) placeholder.classList.remove("hidden");
    if (fileInput) fileInput.value = "";

    modal.classList.remove("hidden");
}

// Preview selected driver image in the upload circle
function previewDriverImage(input) {
    const thumb = document.getElementById("driver-image-thumb");
    const placeholder = document.getElementById("driver-image-placeholder");
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            thumb.src = e.target.result;
            thumb.classList.remove("hidden");
            placeholder.classList.add("hidden");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Preview selected register image in the upload circle
function previewRegisterImage(input) {
    const thumb = document.getElementById("auth-reg-image-thumb");
    const placeholder = document.getElementById("auth-reg-image-placeholder");
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            thumb.src = e.target.result;
            thumb.classList.remove("hidden");
            placeholder.classList.add("hidden");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Preview selected settings image in the upload circle
function previewSettingsImage(input) {
    const thumb = document.getElementById("set-manager-image-thumb");
    const placeholder = document.getElementById("set-manager-image-placeholder");
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            thumb.src = e.target.result;
            thumb.classList.remove("hidden");
            placeholder.classList.add("hidden");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

async function submitDriverForm(e) {
    e.preventDefault();
    const mode = document.getElementById("driver-action-type")?.value || "add";
    const id = document.getElementById("form-driver-id").value.trim().toUpperCase();
    const name = document.getElementById("form-driver-name").value.trim();
    const assignedVehPk = document.getElementById("form-driver-vehicle").value;
    const imageFileInput = document.getElementById("form-driver-image");
    const imageFile = imageFileInput ? imageFileInput.files[0] : null;
    
    if (!name) {
        showToast("Please fill in driver name.", "error");
        return;
    }

    if (!jwtToken || jwtToken.startsWith("mock_")) {
        // Offline / Mock fallback
        if (mode === "add") {
            if (state.drivers.some(d => d.id === id)) {
                showToast(`Driver ID ${id} already exists!`, "error");
                return;
            }
            const newDriverPk = Date.now();
            const newDriver = {
                pk: newDriverPk,
                userPk: Date.now() + 1,
                id: id,
                name: name,
                rating: 5.0,
                trips: 0,
                vehicle: "None",
                attendance: "Present",
                img: getDriverImage(id)
            };
            state.drivers.push(newDriver);
            
            if (assignedVehPk !== "None") {
                const vehicle = state.vehicles.find(v => v.pk.toString() === assignedVehPk.toString() || v.id === assignedVehPk);
                if (vehicle) {
                    vehicle.driverPk = newDriver.pk;
                    vehicle.driverName = newDriver.name;
                    newDriver.vehicle = vehicle.id;
                    vehicle.status = "In Transit"; // start their tour
                    
                    // Automatically add mock trip
                    const mockBookingId = Math.floor(Math.random() * 9000) + 1000;
                    const pickup = "Central Station";
                    const destination = "Airport Terminal 3";
                    
                    state.bookings.unshift({
                        id: mockBookingId,
                        passenger_name: "Self / Driver Dispatch Tour",
                        passenger_contact: "999",
                        pickup_point: pickup,
                        destination: destination,
                        scheduled_date: new Date().toISOString().split('T')[0],
                        scheduled_time: "08:00:00",
                        passengers: 1,
                        route: 1,
                        vehicle: vehicle.id,
                        driver: newDriver.id,
                        status: "assigned",
                        notes: "Seats: 1A"
                    });
                    
                    state.trips.unshift({
                        pk: Math.floor(Math.random() * 900) + 100,
                        id: `RT-${mockBookingId}`,
                        source: pickup,
                        destination: destination,
                        progress: 0,
                        distance: 15,
                        duration: 30,
                        vehicleId: vehicle.id,
                        driverId: newDriver.id,
                        status: "In Transit"
                    });
                }
            }
            showToast(`Offline Driver ${name} created and tour started!`, "success");
        } else {
            const driver = state.drivers.find(d => d.id === id);
            if (driver) {
                driver.name = name;
                
                state.vehicles.forEach(v => {
                    if (v.driverPk === driver.pk) {
                        v.driverPk = null;
                        v.driverName = "None";
                        v.status = "Available";
                    }
                });
                
                if (assignedVehPk !== "None") {
                    const vehicle = state.vehicles.find(v => v.pk.toString() === assignedVehPk.toString() || v.id === assignedVehPk);
                    if (vehicle) {
                        vehicle.driverPk = driver.pk;
                        vehicle.driverName = driver.name;
                        driver.vehicle = vehicle.id;
                        vehicle.status = "In Transit"; // start their tour
                        
                        // Automatically add mock trip if not exists
                        const hasTrip = state.trips.some(t => t.driverId === driver.id && t.status === "In Transit");
                        if (!hasTrip) {
                            const mockBookingId = Math.floor(Math.random() * 9000) + 1000;
                            const pickup = "Central Station";
                            const destination = "Airport Terminal 3";
                            
                            state.bookings.unshift({
                                id: mockBookingId,
                                passenger_name: "Self / Driver Dispatch Tour",
                                passenger_contact: "999",
                                pickup_point: pickup,
                                destination: destination,
                                scheduled_date: new Date().toISOString().split('T')[0],
                                scheduled_time: "08:00:00",
                                passengers: 1,
                                route: 1,
                                vehicle: vehicle.id,
                                driver: driver.id,
                                status: "assigned",
                                notes: "Seats: 1A"
                            });
                            
                            state.trips.unshift({
                                pk: Math.floor(Math.random() * 900) + 100,
                                id: `RT-${mockBookingId}`,
                                source: pickup,
                                destination: destination,
                                progress: 0,
                                distance: 15,
                                duration: 30,
                                vehicleId: vehicle.id,
                                driverId: driver.id,
                                status: "In Transit"
                            });
                        }
                    }
                } else {
                    driver.vehicle = "None";
                }
                showToast(`Offline Driver ${name} updated!`, "success");
            } else {
                showToast("Driver not found.", "error");
            }
        }
        saveMockState();
        closeAllModals();
        renderDrivers();
        renderDashboard();
        return;
    }

    try {
        if (mode === "add") {
            const timestamp = Date.now().toString().slice(-6);
            const username = `driver_${id.toLowerCase().replace('-', '')}_${timestamp}`;
            const parts = name.split(' ');
            const first_name = parts[0];
            const last_name = parts.slice(1).join(' ') || "Driver";

            const resUser = await fetch('/api/v1/users/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    email: `${username}@skyways.com`,
                    password: 'SkywaysDriver$2024',
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: '1234567890',
                    role: 'driver'
                })
            });

            if (!resUser.ok) {
                const errData = await resUser.json();
                const errMsg = Object.values(errData).flat().join(', ');
                showToast(`Registration failed: ${errMsg}`, "error");
                return;
            }

            const userData = await resUser.json();
            const userId = userData.id;

            const resDriver = await fetch('/api/v1/fleet/drivers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    user: userId,
                    license_number: id,
                    phone_number: '1234567890',
                    is_active: true
                })
            });

            if (!resDriver.ok) {
                const errData = await resDriver.json();
                const errMsg = Object.values(errData).flat().join(', ');
                showToast(`Driver profile creation failed: ${errMsg}`, "error");
                return;
            }

            const driverData = await resDriver.json();
            const driverPk = driverData.id;

            if (imageFile) {
                const formData = new FormData();
                formData.append('profile_image', imageFile);
                await fetch(`/api/v1/fleet/drivers/${driverPk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: formData
                });
            }

            if (assignedVehPk !== "None") {
                await fetch(`/api/v1/fleet/vehicles/${assignedVehPk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        driver: driverPk,
                        status: 'in_service'
                    })
                });

                // Auto-start online trip
                const routePk = state.routes && state.routes.length > 0 ? state.routes[0].id : 1;
                const pickup = state.routes && state.routes.length > 0 ? state.routes[0].start_location : "Central Station";
                const destination = state.routes && state.routes.length > 0 ? state.routes[0].end_location : "Airport Terminal 3";
                
                const resBooking = await fetch('/api/v1/trips/bookings/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        passenger_name: "Self / Driver Dispatch Tour",
                        passenger_contact: "999",
                        pickup_point: pickup,
                        destination: destination,
                        scheduled_date: new Date().toISOString().split('T')[0],
                        scheduled_time: "08:00:00",
                        passengers: 1,
                        route: routePk,
                        vehicle: assignedVehPk,
                        driver: driverPk,
                        status: "assigned"
                    })
                });
                
                if (resBooking.ok) {
                    const bookingData = await resBooking.json();
                    await fetch('/api/v1/trips/trips/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({
                            booking: bookingData.id,
                            vehicle: assignedVehPk,
                            driver: driverPk,
                            start_timestamp: new Date().toISOString(),
                            status: "ongoing",
                            distance_travelled_km: 15
                        })
                    });
                }
            }

            showToast(`Driver ${name} created and registered in database!`, "success");
        } else {
            const driver = state.drivers.find(d => d.id === id);
            if (driver && driver.pk) {
                const parts = name.split(' ');
                const first_name = parts[0];
                const last_name = parts.slice(1).join(' ') || "Driver";

                if (driver.userPk) {
                    const resUser = await fetch(`/api/v1/users/${driver.userPk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({
                            first_name: first_name,
                            last_name: last_name
                        })
                    });
                    if (!resUser.ok) {
                        showToast("Failed to update driver account details.", "error");
                        return;
                    }
                }

                if (imageFile) {
                    const formData = new FormData();
                    formData.append('profile_image', imageFile);
                    const resImg = await fetch(`/api/v1/fleet/drivers/${driver.pk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: formData
                    });
                    if (!resImg.ok) {
                        showToast("Failed to upload new profile photo.", "error");
                    }
                }

                const currentVehicles = state.vehicles.filter(v => v.driverPk === driver.pk);
                for (const cv of currentVehicles) {
                    if (cv.pk.toString() !== assignedVehPk) {
                        await fetch(`/api/v1/fleet/vehicles/${cv.pk}/`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwtToken}`
                            },
                            body: JSON.stringify({
                                driver: null,
                                status: 'available'
                            })
                        });
                    }
                }

                if (assignedVehPk !== "None") {
                    await fetch(`/api/v1/fleet/vehicles/${assignedVehPk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({
                            driver: driver.pk,
                            status: 'in_service'
                        })
                    });

                    // Auto-start online trip if driver has none
                    const hasTrip = state.trips.some(t => t.driverId === driver.id && t.status === "In Transit");
                    if (!hasTrip) {
                        const routePk = state.routes && state.routes.length > 0 ? state.routes[0].id : 1;
                        const pickup = state.routes && state.routes.length > 0 ? state.routes[0].start_location : "Central Station";
                        const destination = state.routes && state.routes.length > 0 ? state.routes[0].end_location : "Airport Terminal 3";
                        
                        const resBooking = await fetch('/api/v1/trips/bookings/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwtToken}`
                            },
                            body: JSON.stringify({
                                passenger_name: "Self / Driver Dispatch Tour",
                                passenger_contact: "999",
                                pickup_point: pickup,
                                destination: destination,
                                scheduled_date: new Date().toISOString().split('T')[0],
                                scheduled_time: "08:00:00",
                                passengers: 1,
                                route: routePk,
                                vehicle: assignedVehPk,
                                driver: driver.pk,
                                status: "assigned"
                            })
                        });
                        
                        if (resBooking.ok) {
                            const bookingData = await resBooking.json();
                            await fetch('/api/v1/trips/trips/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${jwtToken}`
                                },
                                body: JSON.stringify({
                                    booking: bookingData.id,
                                    vehicle: assignedVehPk,
                                    driver: driver.pk,
                                    start_timestamp: new Date().toISOString(),
                                    status: "ongoing",
                                    distance_travelled_km: 15
                                })
                            });
                        }
                    }
                }

                showToast(`Driver ${name} profile updated!`, "success");
            } else {
                showToast("Driver profile not found.", "error");
            }
        }

        await fetchBackendData();
        closeAllModals();
        renderDrivers();
    } catch (err) {
        console.error(err);
        showToast("Error occurred while saving driver details.", "error");
    }
}

async function deleteDriver(id) {
    if (confirm(`Remove driver ID ${id} from operational staff?`)) {
        const driver = state.drivers.find(d => d.id === id);
        if (driver && driver.pk) {
            try {
                const resp = await fetch(`/api/v1/fleet/drivers/${driver.pk}/`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${jwtToken}` }
                });
                if (resp.ok) {
                    showToast(`Driver ${driver.name} removed from roster.`, "info");
                }
            } catch (err) {
                console.error(err);
            }
        }
        await fetchBackendData();
        renderDrivers();
    }
}

// 4. Routes & Trips View
function renderRoutes() {
    const list = document.getElementById("routes-list");
    if (!list) return;
    list.innerHTML = "";

    const isDriver = state.userRole === "driver";
    let driverLicense = "";
    if (isDriver) {
        const driverProfile = findCurrentDriverProfile();
        driverLicense = driverProfile.id || "";
    }

    const searchVal = (document.getElementById("global-search")?.value || "").toLowerCase();
    const filteredTrips = state.trips.filter(trip => {
        if (searchVal) {
            const driverObj = state.drivers.find(d => d.id === trip.driverId) || { name: "" };
            return trip.id.toLowerCase().includes(searchVal) ||
                   trip.source.toLowerCase().includes(searchVal) ||
                   trip.destination.toLowerCase().includes(searchVal) ||
                   trip.vehicleId.toLowerCase().includes(searchVal) ||
                   driverObj.name.toLowerCase().includes(searchVal);
        }
        return true;
    });

    document.getElementById("routes-scheduled-text").textContent = `${filteredTrips.length} routes scheduled today`;

    if (filteredTrips.length === 0) {
        list.innerHTML = `
            <div class="col-span-full p-12 text-center glass-card rounded-xl text-on-surface-variant">
                <span class="material-symbols-outlined text-5xl mb-3">route</span>
                <p class="text-body-lg">No active trips dispatched or matching search query. Click "Schedule New Trip" below.</p>
            </div>
        `;
        return;
    }

    filteredTrips.forEach(trip => {
        const isTransit = trip.status === "In Transit";
        const driverObj = state.drivers.find(d => d.id === trip.driverId) || { name: trip.driverId || "Unassigned" };

        const card = document.createElement("div");
        card.className = "glass-card rounded-2xl p-6 relative overflow-hidden group";
        
        card.innerHTML = `
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            <div class="flex justify-between items-start mb-6">
                <div class="bg-surface-variant/50 px-3 py-1 rounded-md border border-outline-variant/30 flex items-center gap-2">
                    <span class="text-label-caps text-on-surface">${trip.id}</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1 rounded-full border border-${isTransit ? 'tertiary' : 'secondary'}/30 bg-${isTransit ? 'tertiary' : 'secondary'}/10">
                    <span class="w-2 h-2 rounded-full bg-${isTransit ? 'tertiary' : 'secondary'} ${isTransit ? 'animate-pulse' : ''}"></span>
                    <span class="text-label-caps text-${isTransit ? 'tertiary' : 'secondary'}">${trip.status}</span>
                </div>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between mb-8 gap-4">
                <div class="flex-1 relative min-w-[200px]">
                    <div class="absolute left-[7px] top-[20px] bottom-[20px] w-px bg-gradient-to-b from-secondary/50 via-outline-variant/50 to-error/50"></div>
                    <div class="flex items-start gap-4 mb-6 relative z-10">
                        <div class="w-4 h-4 rounded-full border-2 border-secondary bg-surface mt-1 flex-shrink-0 z-10 glow-active shadow-[0_0_10px_rgba(78,222,163,0.5)]"></div>
                        <div>
                            <p class="text-label-caps text-on-surface-variant mb-1">Source</p>
                            <p class="text-body-lg font-semibold text-on-surface">${trip.source}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 relative z-10">
                        <div class="w-4 h-4 rounded-full border-2 border-error bg-surface mt-1 flex-shrink-0 z-10"></div>
                        <div>
                            <p class="text-label-caps text-on-surface-variant mb-1">Destination</p>
                            <p class="text-body-lg font-semibold text-on-surface">${trip.destination}</p>
                        </div>
                    </div>
                </div>
                <div class="w-48 h-32 relative overflow-hidden rounded-xl border border-outline-variant/30 flex-shrink-0 hidden sm:block bg-surface-container-lowest flex items-center justify-center">
                    <img class="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-90 transition-opacity" 
                          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300" alt="Isometric bus"/>
                </div>
            </div>

            <div class="mb-6">
                <div class="flex justify-between text-label-caps text-on-surface-variant mb-2">
                    <span>Trip progress</span>
                    <span class="bg-surface-variant/50 px-2 py-0.5 rounded border border-outline-variant/30">${trip.progress}%</span>
                </div>
                <div class="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-tertiary-fixed-dim to-tertiary rounded-full progress-glow relative" style="width: ${trip.progress}%">
                        <div class="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="glass-card rounded-lg p-3 text-center">
                    <span class="material-symbols-outlined text-on-surface-variant mb-1 text-xl">near_me</span>
                    <p class="text-body-md font-semibold text-on-surface">${trip.distance} km</p>
                    <p class="text-label-caps text-on-surface-variant text-[10px]">Distance</p>
                </div>
                <div class="glass-card rounded-lg p-3 text-center">
                    <span class="material-symbols-outlined text-on-surface-variant mb-1 text-xl">schedule</span>
                    <p class="text-body-md font-semibold text-on-surface">${trip.duration} min</p>
                    <p class="text-label-caps text-on-surface-variant text-[10px]">Est. time</p>
                </div>
                <div class="glass-card rounded-lg p-3 text-center">
                    <span class="material-symbols-outlined text-on-surface-variant mb-1 text-xl">directions_car</span>
                    <p class="text-body-md font-semibold text-on-surface">${trip.vehicleId}</p>
                    <p class="text-label-caps text-on-surface-variant text-[10px]">Vehicle</p>
                </div>
            </div>

            <div class="flex items-center justify-between border-t border-outline-variant/20 pt-4">
                <div class="flex items-center gap-2 text-on-surface-variant">
                    <span class="material-symbols-outlined text-sm">person</span>
                    <span class="text-body-md">${driverObj.name}</span>
                </div>
                <div class="flex items-center gap-2">
                    ${(state.userRole === "admin" || state.userRole === "dispatcher" || (state.userRole === "driver" && trip.driverId === driverLicense)) ? `
                    <button class="px-3 py-1 bg-primary/20 border border-primary/40 text-primary rounded text-xs hover:bg-primary/30 transition-all flex items-center gap-1" onclick="openPassengerRoster('${trip.id}')">
                        <span class="material-symbols-outlined text-[14px]">group</span> Roster
                    </button>
                    ` : ''}
                    ${(state.userRole === "admin" || state.userRole === "dispatcher") ? `
                    <button class="text-xs text-error/80 hover:text-error border border-transparent hover:border-error/20 px-2 py-1 rounded" onclick="cancelTrip('${trip.id}')">
                        Cancel Trip
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

function openScheduleTripModal() {
    const modal = document.getElementById("modal-trip");
    if (!modal) return;

    const availVehs = state.vehicles.filter(v => v.status === "Available");
    const presentDrivers = state.drivers.filter(d => d.attendance === "Present");

    const vehicleSelect = document.getElementById("form-trip-vehicle");
    const driverSelect = document.getElementById("form-trip-driver");

    if (availVehs.length === 0) {
        vehicleSelect.innerHTML = `<option value="">No Available Vehicles - Add one or free up transit</option>`;
    } else {
        vehicleSelect.innerHTML = availVehs.map(v => `<option value="${v.pk}">${v.id} - ${v.name} (Cap: ${v.capacity})</option>`).join("");
    }

    if (presentDrivers.length === 0) {
        driverSelect.innerHTML = `<option value="">No Present Drivers - Toggle Roster status</option>`;
    } else {
        driverSelect.innerHTML = presentDrivers.map(d => `<option value="${d.pk}">${d.name} (Trips: ${d.trips})</option>`).join("");
    }

    document.getElementById("form-trip-id").value = "RT-" + (Math.floor(Math.random() * 800) + 100);
    document.getElementById("form-trip-source").value = "Depot Alpha";
    document.getElementById("form-trip-dest").value = "Station " + String.fromCharCode(65 + Math.floor(Math.random() * 6));
    document.getElementById("form-trip-distance").value = Math.floor(Math.random() * 30) + 10;
    document.getElementById("form-trip-duration").value = Math.floor(Math.random() * 40) + 20;

    modal.classList.remove("hidden");
}

async function submitTripForm(e) {
    e.preventDefault();
    const id = document.getElementById("form-trip-id").value.trim().toUpperCase();
    const source = document.getElementById("form-trip-source").value.trim();
    const destination = document.getElementById("form-trip-dest").value.trim();
    const distance = parseFloat(document.getElementById("form-trip-distance").value);
    const duration = parseInt(document.getElementById("form-trip-duration").value);
    const vehiclePk = document.getElementById("form-trip-vehicle").value;
    const driverPk = document.getElementById("form-trip-driver").value;

    if (!id || !source || !destination || !vehiclePk || !driverPk) {
        showToast("Please complete all fields (including selecting a vehicle/driver).", "error");
        return;
    }

    let routePk = null;
    let existingRoute = state.routes ? state.routes.find(r => r.start_location === source && r.end_location === destination) : null;
    if (existingRoute) {
        routePk = existingRoute.id;
    } else {
        const resRoute = await fetch('/api/v1/trips/routes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                name: `Route ${source} - ${destination}`,
                start_location: source,
                end_location: destination,
                distance_km: distance
            })
        });
        if (resRoute.ok) {
            const routeData = await resRoute.json();
            routePk = routeData.id;
        }
    }

    try {
        const resBooking = await fetch('/api/v1/trips/bookings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                passenger_name: "Self / Scheduled Dispatch",
                passenger_contact: "999",
                pickup_point: source,
                destination: destination,
                scheduled_date: new Date().toISOString().split('T')[0],
                scheduled_time: "08:00:00",
                passengers: 1,
                route: routePk,
                vehicle: vehiclePk,
                driver: driverPk,
                status: "assigned"
            })
        });

        if (resBooking.ok) {
            const bookingData = await resBooking.json();
            
            const resTrip = await fetch('/api/v1/trips/trips/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    booking: bookingData.id,
                    vehicle: vehiclePk,
                    driver: driverPk,
                    start_timestamp: new Date().toISOString(),
                    status: "ongoing",
                    distance_travelled_km: distance
                })
            });

            if (resTrip.ok) {
                await fetch(`/api/v1/fleet/vehicles/${vehiclePk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        status: 'in_service',
                        driver: driverPk
                    })
                });
                showToast(`Trip scheduled successfully in database!`, "success");
            }
        }

        await fetchBackendData();
        closeAllModals();
        renderRoutes();
    } catch (err) {
        console.error(err);
    }
}

async function cancelTrip(tripId) {
    if (confirm(`Cancel active trip ${tripId}?`)) {
        const trip = state.trips.find(t => t.id === tripId);
        if (trip && trip.pk) {
            try {
                await fetch(`/api/v1/trips/trips/${trip.pk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({ status: 'cancelled' })
                });

                const vehicle = state.vehicles.find(v => v.id === trip.vehicleId);
                if (vehicle && vehicle.pk) {
                    await fetch(`/api/v1/fleet/vehicles/${vehicle.pk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({ status: 'available' })
                    });
                }
                showToast(`Trip ${tripId} cancelled. Vehicle returned to depot.`, "info");
            } catch (err) {
                console.error(err);
            }
        }
        await fetchBackendData();
        renderRoutes();
    }
}

// 5. Booking Portal View
let selectedPrefType = "Luxury Coach";

function renderBooking() {
    const cards = document.querySelectorAll("#booking-pref-grid .vehicle-card");
    cards.forEach(card => {
        const type = card.dataset.type;
        if (type === selectedPrefType) {
            card.classList.add("active", "border-primary");
        } else {
            card.classList.remove("active", "border-primary");
        }

        card.onclick = () => {
            selectedPrefType = type;
            renderBooking();
        };
    });

    const dateInput = document.getElementById("book-date");
    if (dateInput && !dateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    const timeInput = document.getElementById("book-time");
    if (timeInput && !timeInput.value) {
        timeInput.value = "08:30";
    }
}

async function confirmBooking() {
    const pickup = document.getElementById("book-pickup").value.trim();
    const destination = document.getElementById("book-destination").value.trim();
    const date = document.getElementById("book-date").value;
    const time = document.getElementById("book-time").value;
    const passengers = parseInt(document.getElementById("book-passengers").value);

    if (!pickup || !destination || !date || !time) {
        showToast("Please fill out all booking fields.", "error");
        return;
    }

    let matchedVehicle = null;
    if (selectedPrefType === "No Preference") {
        matchedVehicle = state.vehicles.find(v => v.status === "Available");
    } else {
        matchedVehicle = state.vehicles.find(v => v.status === "Available" && v.type === selectedPrefType);
    }

    if (!matchedVehicle) {
        matchedVehicle = state.vehicles.find(v => v.status === "Available");
    }

    let matchedDriver = state.drivers.find(d => d.attendance === "Present" && d.vehicle === "None");
    if (!matchedDriver) {
        matchedDriver = state.drivers.find(d => d.attendance === "Present");
        if (matchedDriver && matchedDriver.vehicle && matchedDriver.vehicle !== "None") {
            const prevVeh = state.vehicles.find(v => v.id === matchedDriver.vehicle);
            if (prevVeh && prevVeh.pk) {
                await fetch(`/api/v1/fleet/vehicles/${prevVeh.pk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({ status: 'available' })
                });
            }
        }
    }

    if (!matchedVehicle || !matchedDriver) {
        showToast("Booking failed: No available vehicles or drivers currently in shift. Please add vehicles/present drivers.", "error");
        return;
    }

    let routePk = null;
    let existingRoute = state.routes ? state.routes.find(r => r.start_location === pickup && r.end_location === destination) : null;
    if (existingRoute) {
        routePk = existingRoute.id;
    } else {
        const resRoute = await fetch('/api/v1/trips/routes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                name: `Route ${pickup} - ${destination}`,
                start_location: pickup,
                end_location: destination,
                distance_km: Math.floor(Math.random() * 25) + 15
            })
        });
        if (resRoute.ok) {
            const routeData = await resRoute.json();
            routePk = routeData.id;
        }
    }

    try {
        const resBooking = await fetch('/api/v1/trips/bookings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                passenger_name: "Customer / Portal Booking",
                passenger_contact: "555-0199",
                pickup_point: pickup,
                destination: destination,
                scheduled_date: date,
                scheduled_time: time + ":00",
                passengers: passengers,
                route: routePk,
                vehicle: matchedVehicle.pk,
                driver: matchedDriver.pk,
                status: "assigned"
            })
        });

        if (resBooking.ok) {
            const bookingData = await resBooking.json();
            
            const resTrip = await fetch('/api/v1/trips/trips/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    booking: bookingData.id,
                    vehicle: matchedVehicle.pk,
                    driver: matchedDriver.pk,
                    start_timestamp: new Date().toISOString(),
                    status: "ongoing",
                    distance_travelled_km: Math.floor(Math.random() * 25) + 15
                })
            });

            if (resTrip.ok) {
                await fetch(`/api/v1/fleet/vehicles/${matchedVehicle.pk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        status: 'in_service',
                        driver: matchedDriver.pk
                    })
                });

                showToast(`Booking Confirmed! Trip scheduled successfully.`, "success");
            }
        }

        await fetchBackendData();
        setTimeout(() => {
            routeTo("#routes");
        }, 1200);

    } catch (err) {
        console.error(err);
        showToast("Error processing booking request.", "error");
    }
}
// 6. Settings View
function renderSettings() {
    const titleEl = document.getElementById("settings-title");
    const descEl = document.getElementById("settings-desc");
    if (titleEl && descEl) {
        if (state.userRole === "admin") {
            titleEl.textContent = "Fleet Manager Settings";
            descEl.textContent = "Customize profile details and control application defaults.";
        } else if (state.userRole === "passenger") {
            titleEl.textContent = "Passenger Profile Settings";
            descEl.textContent = "Manage your transit pass details and profile information.";
        } else {
            titleEl.textContent = "User Profile Settings";
            descEl.textContent = "Customize profile details and shift settings.";
        }
    }

    if (state.currentUser) {
        document.getElementById("set-firstname").value = state.currentUser.first_name || "";
        document.getElementById("set-lastname").value = state.currentUser.last_name || "";
        document.getElementById("set-email").value = state.currentUser.email || "";
        document.getElementById("set-phone").value = state.currentUser.phone_number || "";
        
        const resetEmailEl = document.getElementById("set-reset-email");
        const resetPhoneEl = document.getElementById("set-reset-phone");
        if (resetEmailEl) resetEmailEl.value = state.currentUser.email || "";
        if (resetPhoneEl) resetPhoneEl.value = state.currentUser.phone_number || "";
    } else {
        const parts = state.managerName.split(" ");
        document.getElementById("set-firstname").value = parts[0] || "";
        document.getElementById("set-lastname").value = parts.slice(1).join(" ") || "";
        document.getElementById("set-email").value = "";
        document.getElementById("set-phone").value = "";
        
        const resetEmailEl = document.getElementById("set-reset-email");
        const resetPhoneEl = document.getElementById("set-reset-phone");
        if (resetEmailEl) resetEmailEl.value = "";
        if (resetPhoneEl) resetPhoneEl.value = "";
    }
    const thumb = document.getElementById("set-manager-image-thumb");
    const placeholder = document.getElementById("set-manager-image-placeholder");
    const fileInput = document.getElementById("set-manager-image");
    if (fileInput) fileInput.value = "";
    if (state.managerPic) {
        if (thumb) {
            thumb.src = state.managerPic;
            thumb.classList.remove("hidden");
        }
        if (placeholder) {
            placeholder.classList.add("hidden");
        }
    } else {
        if (thumb) {
            thumb.classList.add("hidden");
            thumb.src = "";
        }
        if (placeholder) {
            placeholder.classList.remove("hidden");
        }
    }

    // Toggle Verification Terminal visibility based on role
    const verifyTerminal = document.getElementById("settings-verify-terminal");
    if (verifyTerminal) {
        if (state.userRole !== "passenger") {
            verifyTerminal.classList.remove("hidden");
        } else {
            verifyTerminal.classList.add("hidden");
        }
    }
}

async function saveSettings(e) {
    e.preventDefault();
    const firstname = document.getElementById("set-firstname").value.trim();
    const lastname = document.getElementById("set-lastname").value.trim();
    const email = document.getElementById("set-email").value.trim();
    const phone = document.getElementById("set-phone").value.trim();
    const imageFileInput = document.getElementById("set-manager-image");
    const imageFile = imageFileInput ? imageFileInput.files[0] : null;

    if (!firstname || !lastname) {
        showToast("First name and Last name cannot be empty.", "error");
        return;
    }

    state.managerName = `${firstname} ${lastname}`;

    let picBase64 = null;
    if (imageFile) {
        try {
            picBase64 = await fileToBase64(imageFile);
        } catch (err) {
            console.error("Error converting settings file to base64", err);
        }
    }

    if (picBase64) {
        state.managerPic = picBase64;
    }

    // PATCH update to database if online
    if (jwtToken && !jwtToken.startsWith("mock_") && state.currentUser && state.currentUser.id) {
        try {
            const formData = new FormData();
            formData.append("first_name", firstname);
            formData.append("last_name", lastname);
            formData.append("email", email);
            formData.append("phone_number", phone);
            if (imageFile) {
                formData.append("profile_image", imageFile);
            }

            const resp = await fetch(`/api/v1/users/${state.currentUser.id}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: formData
            });
            if (resp.ok) {
                const updatedUser = await resp.json();
                state.currentUser = updatedUser;
                localStorage.setItem("skyways_user_profile", JSON.stringify(updatedUser));
                if (updatedUser.profile_image) {
                    state.managerPic = updatedUser.profile_image;
                }
                showToast("Profile settings saved to database.", "success");
                await fetchBackendData();
            } else {
                showToast("Failed to save profile settings: " + await resp.text(), "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Network error saving profile settings.", "error");
        }
    } else {
        // Offline update
        if (state.currentUser) {
            state.currentUser.first_name = firstname;
            state.currentUser.last_name = lastname;
            state.currentUser.email = email;
            state.currentUser.phone_number = phone;
            if (picBase64) {
                state.currentUser.profile_pic = picBase64;
            }
            localStorage.setItem("skyways_user_profile", JSON.stringify(state.currentUser));
        }

        // Sync local mock driver roster details
        if (state.userRole === "driver" && state.currentUser) {
            const localDrivers = JSON.parse(localStorage.getItem("skyways_mock_drivers") || "[]");
            const dIdx = localDrivers.findIndex(d => d.userPk === state.currentUser.id || (d.name && d.name.toLowerCase().includes(`${firstname} ${lastname}`.trim().toLowerCase())));
            if (dIdx !== -1) {
                localDrivers[dIdx].name = `${firstname} ${lastname}`;
                localDrivers[dIdx].email = email;
                localDrivers[dIdx].phone_number = phone;
                if (picBase64) {
                    localDrivers[dIdx].img = picBase64;
                }
                localStorage.setItem("skyways_mock_drivers", JSON.stringify(localDrivers));
            }
        }
        
        await fetchBackendData();
        showToast("Offline Profile settings updated.", "success");
    }

    updateManagerProfile();
    
    let defaultHash = "#dashboard";
    if (state.userRole === "driver") defaultHash = "#drivers";
    routeTo(defaultHash);
}
async function resetDatabase() {
    if (confirm("Reset database to default Stitch design state? All custom bookings/vehicles will be deleted from backend.")) {
        try {
            // Delete all vehicles, drivers, bookings, complaints, feedbacks, expenses, revenues if online
            if (jwtToken && !jwtToken.startsWith("mock_")) {
                for (const v of state.vehicles) {
                    await fetch(`/api/v1/fleet/vehicles/${v.pk}/`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${jwtToken}` }
                    }).catch(() => {});
                }
                for (const d of state.drivers) {
                    await fetch(`/api/v1/fleet/drivers/${d.pk}/`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${jwtToken}` }
                    }).catch(() => {});
                }
                // Clear complaints/feedbacks
                if (state.complaints) {
                    for (const c of state.complaints) {
                        await fetch(`/api/v1/operations/complaints/${c.id}/`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${jwtToken}` }
                        }).catch(() => {});
                    }
                }
            }
            
            // Clear local storage overrides
            localStorage.removeItem("skyways_mock_vehicles");
            localStorage.removeItem("skyways_mock_drivers");
            localStorage.removeItem("skyways_mock_trips");
            localStorage.removeItem("skyways_mock_bookings");
            localStorage.removeItem("skyways_mock_complaints");
            localStorage.removeItem("skyways_mock_feedbacks");
            localStorage.removeItem("skyways_mock_expenses");
            localStorage.removeItem("skyways_mock_revenues");

            state.vehicles = [];
            state.drivers = [];
            state.trips = [];
            state.bookings = [];
            state.complaints = [];
            state.feedbacks = [];
            state.expenses = [];
            state.revenues = [];

            showToast("Database reset requested. Re-seeding defaults.", "info");
        } catch (e) {
            console.error(e);
        }
        await fetchBackendData();
        updateManagerProfile();
        
        let defaultHash = "#dashboard";
        if (state.userRole === "driver") defaultHash = "#drivers";
        routeTo(defaultHash);
    }
}

// ==========================================
// NEW ROLE-BASED AUTH & SESSION MANAGEMENT
// ==========================================

function selectAuthRole(role) {
    document.getElementById("auth-selected-role").value = role;
    document.querySelectorAll(".role-tab").forEach(tab => {
        tab.className = "role-tab px-2 py-2 rounded-lg font-semibold text-xs tracking-wider uppercase text-on-surface-variant hover:text-white";
    });
    
    const activeTab = document.getElementById(`role-tab-${role}`);
    if (activeTab) {
        activeTab.className = "role-tab px-2 py-2 rounded-lg font-semibold text-xs tracking-wider uppercase text-primary bg-primary/10 border border-primary/20";
    }
}

function toggleAuthMode(mode) {
    const loginForm = document.getElementById("auth-login-form");
    const registerForm = document.getElementById("auth-register-form");
    const forgotForm = document.getElementById("auth-forgot-form");
    if (mode === "register") {
        if (loginForm) loginForm.classList.add("hidden");
        if (registerForm) registerForm.classList.remove("hidden");
        if (forgotForm) forgotForm.classList.add("hidden");
    } else if (mode === "forgot") {
        if (loginForm) loginForm.classList.add("hidden");
        if (registerForm) registerForm.classList.add("hidden");
        if (forgotForm) forgotForm.classList.remove("hidden");
    } else {
        if (loginForm) loginForm.classList.remove("hidden");
        if (registerForm) registerForm.classList.add("hidden");
        if (forgotForm) forgotForm.classList.add("hidden");
    }
}

async function handleAuthLogin(e) {
    e.preventDefault();
    const username = document.getElementById("auth-login-username").value.trim();
    const password = document.getElementById("auth-login-password").value;
    const selectedRole = document.getElementById("auth-selected-role").value;

    try {
        // Attempt Django login
        const resp = await fetch('/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (resp.ok) {
            const data = await resp.json();
            jwtToken = data.access;
            state.username = username;
            state.userRole = selectedRole;

            localStorage.setItem("skyways_jwt_token", jwtToken);
            localStorage.setItem("skyways_user_role", selectedRole);
            localStorage.setItem("skyways_username", username);

            // Load user profile
            const resUsers = await fetch('/api/v1/users/', {
                headers: { 'Authorization': `Bearer ${jwtToken}` }
            });
            const dbUsers = await resUsers.json();
            const matchedUser = dbUsers.find(u => u.username === username) || {
                id: 99,
                username: username,
                email: `${username}@skyways.com`,
                first_name: username.toUpperCase(),
                last_name: "User",
                role: selectedRole
            };

            // Set role correctly in profile based on DB role
            // 'dispatcher' and 'admin' both map to manager/admin dashboard
            if (matchedUser.role) {
                const frontendRole = matchedUser.role === "dispatcher" ? "admin" : matchedUser.role;
                state.userRole = frontendRole;
                localStorage.setItem("skyways_user_role", frontendRole);
            }
            
            localStorage.setItem("skyways_user_profile", JSON.stringify(matchedUser));
            state.currentUser = matchedUser;
            state.managerName = `${matchedUser.first_name} ${matchedUser.last_name}`;

            showToast(`Welcome back, ${state.managerName}! Access granted.`, "success");
            
            const overlay = document.getElementById("auth-overlay");
            if (overlay) overlay.classList.add("hidden");

            await fetchBackendData();
            initWebSocket();
            refreshUILayout();
            
            let defaultHash = "#dashboard";
            if (state.userRole === "driver") defaultHash = "#drivers";
            routeTo(defaultHash);
        } else {
            throw new Error("Invalid server credentials");
        }
    } catch (err) {
        console.warn("Backend login failed or server offline. Checking mock local storage...", err);
        // Offline Fallback Check
        const mockUsers = JSON.parse(localStorage.getItem("skyways_mock_users") || "[]");
        
        // Add default mock accounts
        const defaultMocks = [
            { username: "sofia", password: "sofia123", first_name: "Sofia", last_name: "Ramirez", role: "admin", email: "sofia@skyways.com", phone: "1112223333", security_question: "city", security_answer: "New York" },
            { username: "jane", password: "jane123", first_name: "Jane", last_name: "Doe", role: "passenger", email: "jane@gmail.com", phone: "4445556666", security_question: "teacher", security_answer: "Smith" },
            { username: "marcus", password: "marcus123", first_name: "Marcus", last_name: "Johnson", role: "driver", email: "marcus@skyways.com", phone: "7778889999", security_question: "food", security_answer: "Pizza" }
        ];

        const allUsers = [...defaultMocks, ...mockUsers];
        const user = allUsers.find(u => u.username === username && u.password === password);

        if (user && user.role === selectedRole) {
            jwtToken = "mock_token_" + Date.now();
            state.username = username;
            state.userRole = selectedRole;

            localStorage.setItem("skyways_jwt_token", jwtToken);
            localStorage.setItem("skyways_user_role", selectedRole);
            localStorage.setItem("skyways_username", username);
            
            const profileObj = {
                id: user.id || 99,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                phone_number: user.phone || ""
            };
            localStorage.setItem("skyways_user_profile", JSON.stringify(profileObj));
            state.currentUser = profileObj;
            state.managerName = `${user.first_name} ${user.last_name}`;

            showToast(`Offline Demo Access: Welcoming ${state.managerName}!`, "success");
            
            const overlay = document.getElementById("auth-overlay");
            if (overlay) overlay.classList.add("hidden");

            await fetchBackendData();
            refreshUILayout();
            
            let defaultHash = "#dashboard";
            if (state.userRole === "driver") defaultHash = "#drivers";
            routeTo(defaultHash);
        } else {
            showToast("Invalid credentials. Try: sofia/sofia123 (Manager), jane/jane123 (Passenger), marcus/marcus123 (Driver)", "error");
        }
    }
}

async function handleAuthForgot(e) {
    e.preventDefault();
    const email = document.getElementById("auth-forgot-email").value.trim();
    const phone = document.getElementById("auth-forgot-phone").value.trim();
    const question = document.getElementById("auth-forgot-question").value;
    const answer = document.getElementById("auth-forgot-answer").value.trim();
    const newPassword = document.getElementById("auth-forgot-newpassword").value;

    try {
        const resp = await fetch('/api/v1/users/reset_password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                phone_number: phone,
                security_question: question,
                security_answer: answer,
                new_password: newPassword
            })
        });

        if (resp.ok) {
            showToast("Password reset successful! Please log in with your new password.", "success");
            toggleAuthMode("login");
            // Clear inputs
            document.getElementById("auth-forgot-email").value = "";
            document.getElementById("auth-forgot-phone").value = "";
            document.getElementById("auth-forgot-question").value = "";
            document.getElementById("auth-forgot-answer").value = "";
            document.getElementById("auth-forgot-newpassword").value = "";
        } else {
            const err = await resp.json();
            showToast("Reset failed: " + (err.error || "Invalid details supplied."), "error");
        }
    } catch (err) {
        console.warn("Resetting password locally offline...", err);
        const mockUsers = JSON.parse(localStorage.getItem("skyways_mock_users") || "[]");
        const defaultMocks = [
            { username: "sofia", password: "sofia123", first_name: "Sofia", last_name: "Ramirez", role: "admin", email: "sofia@skyways.com", phone: "1112223333", security_question: "city", security_answer: "New York" },
            { username: "jane", password: "jane123", first_name: "Jane", last_name: "Doe", role: "passenger", email: "jane@gmail.com", phone: "4445556666", security_question: "teacher", security_answer: "Smith" },
            { username: "marcus", password: "marcus123", first_name: "Marcus", last_name: "Johnson", role: "driver", email: "marcus@skyways.com", phone: "7778889999", security_question: "food", security_answer: "Pizza" }
        ];
        const allUsers = [...defaultMocks, ...mockUsers];
        const userIndex = allUsers.findIndex(u => u.email && u.email.toLowerCase() === email.toLowerCase() && u.phone === phone);
        if (userIndex === -1) {
            showToast("User with this email and phone number not found locally.", "error");
            return;
        }

        const user = allUsers[userIndex];
        if (user.security_question !== question) {
            showToast("Incorrect security question details.", "error");
            return;
        }

        if (!user.security_answer || user.security_answer.trim().toLowerCase() !== answer.toLowerCase()) {
            showToast("Incorrect security question answer.", "error");
            return;
        }

        // Update password
        user.password = newPassword;
        if (userIndex < defaultMocks.length) {
            mockUsers.push(user);
        } else {
            mockUsers[userIndex - defaultMocks.length] = user;
        }
        localStorage.setItem("skyways_mock_users", JSON.stringify(mockUsers));

        showToast("Password reset successful (offline)! Please log in.", "success");
        toggleAuthMode("login");
        // Clear inputs
        document.getElementById("auth-forgot-email").value = "";
        document.getElementById("auth-forgot-phone").value = "";
        document.getElementById("auth-forgot-question").value = "";
        document.getElementById("auth-forgot-answer").value = "";
        document.getElementById("auth-forgot-newpassword").value = "";
    }
}

async function handleSettingsReset(e) {
    e.preventDefault();
    const email = document.getElementById("set-reset-email").value.trim();
    const phone = document.getElementById("set-reset-phone").value.trim();
    const question = document.getElementById("set-reset-question").value;
    const answer = document.getElementById("set-reset-answer").value.trim();
    const newPassword = document.getElementById("set-reset-newpassword").value;

    try {
        const resp = await fetch('/api/v1/users/reset_password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                phone_number: phone,
                security_question: question,
                security_answer: answer,
                new_password: newPassword
            })
        });

        if (resp.ok) {
            showToast("Password updated successfully!", "success");
            // Clear inputs
            document.getElementById("set-reset-email").value = "";
            document.getElementById("set-reset-phone").value = "";
            document.getElementById("set-reset-question").value = "";
            document.getElementById("set-reset-answer").value = "";
            document.getElementById("set-reset-newpassword").value = "";
        } else {
            const err = await resp.json();
            showToast("Update failed: " + (err.error || "Invalid details."), "error");
        }
    } catch (err) {
        console.warn("Updating password locally offline...", err);
        const mockUsers = JSON.parse(localStorage.getItem("skyways_mock_users") || "[]");
        const defaultMocks = [
            { username: "sofia", password: "sofia123", first_name: "Sofia", last_name: "Ramirez", role: "admin", email: "sofia@skyways.com", phone: "1112223333", security_question: "city", security_answer: "New York" },
            { username: "jane", password: "jane123", first_name: "Jane", last_name: "Doe", role: "passenger", email: "jane@gmail.com", phone: "4445556666", security_question: "teacher", security_answer: "Smith" },
            { username: "marcus", password: "marcus123", first_name: "Marcus", last_name: "Johnson", role: "driver", email: "marcus@skyways.com", phone: "7778889999", security_question: "food", security_answer: "Pizza" }
        ];
        const allUsers = [...defaultMocks, ...mockUsers];
        const userIndex = allUsers.findIndex(u => u.email && u.email.toLowerCase() === email.toLowerCase() && u.phone === phone);
        if (userIndex === -1) {
            showToast("User with this email and phone number not found locally.", "error");
            return;
        }

        const user = allUsers[userIndex];
        if (user.security_question !== question) {
            showToast("Incorrect security question details.", "error");
            return;
        }

        if (!user.security_answer || user.security_answer.trim().toLowerCase() !== answer.toLowerCase()) {
            showToast("Incorrect security question answer.", "error");
            return;
        }

        // Update password
        user.password = newPassword;
        if (userIndex < defaultMocks.length) {
            mockUsers.push(user);
        } else {
            mockUsers[userIndex - defaultMocks.length] = user;
        }
        localStorage.setItem("skyways_mock_users", JSON.stringify(mockUsers));

        showToast("Password updated successfully (offline)!", "success");
        // Clear inputs
        document.getElementById("set-reset-email").value = "";
        document.getElementById("set-reset-phone").value = "";
        document.getElementById("set-reset-question").value = "";
        document.getElementById("set-reset-answer").value = "";
        document.getElementById("set-reset-newpassword").value = "";
    }
}

async function handleAuthRegister(e) {
    e.preventDefault();
    const firstname = document.getElementById("auth-reg-firstname").value.trim();
    const lastname = document.getElementById("auth-reg-lastname").value.trim();
    const username = document.getElementById("auth-reg-username").value.trim().toLowerCase();
    const email = document.getElementById("auth-reg-email").value.trim();
    const phone = document.getElementById("auth-reg-phone").value.trim();
    const password = document.getElementById("auth-reg-password").value;
    const imageInput = document.getElementById("auth-reg-image");
    const imageFile = imageInput ? imageInput.files[0] : null;
    const selectedRole = document.getElementById("auth-selected-role").value;
    const securityQuestion = document.getElementById("auth-reg-question") ? document.getElementById("auth-reg-question").value : "";
    const securityAnswer = document.getElementById("auth-reg-answer") ? document.getElementById("auth-reg-answer").value.trim() : "";

    let picBase64 = "";
    if (imageFile) {
        try {
            picBase64 = await fileToBase64(imageFile);
        } catch (err) {
            console.error("Error converting file to base64", err);
        }
    }

    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("first_name", firstname);
        formData.append("last_name", lastname);
        formData.append("phone_number", phone);
        formData.append("role", selectedRole === "admin" ? "dispatcher" : selectedRole);
        formData.append("security_question", securityQuestion);
        formData.append("security_answer", securityAnswer);
        if (imageFile) {
            formData.append("profile_image", imageFile);
        }

        const resp = await fetch('/api/v1/users/register/', {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const userData = await resp.json();
            
            // If registered as driver, automatically build a driver profile
            if (selectedRole === "driver") {
                // Get JWT Token for seeding
                const tokenResp = await fetch('/api/token/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                if (tokenResp.ok) {
                    const tokenData = await tokenResp.json();
                    const registerToken = tokenData.access;
                    
                    const drId = "DR-" + (Math.floor(Math.random() * 90) + 10);
                    
                    const drFormData = new FormData();
                    drFormData.append("user", userData.id);
                    drFormData.append("license_number", drId);
                    drFormData.append("phone_number", phone);
                    drFormData.append("is_active", "true");
                    if (imageFile) {
                        drFormData.append("profile_image", imageFile);
                    }
                    
                    await fetch('/api/v1/fleet/drivers/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${registerToken}`
                        },
                        body: drFormData
                    });
                }
            }

            showToast("Registration successful! You can now log in.", "success");
            toggleAuthMode("login");
            // Clear inputs
            if (imageInput) imageInput.value = "";
            const thumb = document.getElementById("auth-reg-image-thumb");
            const placeholder = document.getElementById("auth-reg-image-placeholder");
            if (thumb) { thumb.classList.add("hidden"); thumb.src = ""; }
            if (placeholder) placeholder.classList.remove("hidden");
            if (document.getElementById("auth-reg-question")) document.getElementById("auth-reg-question").value = "";
            if (document.getElementById("auth-reg-answer")) document.getElementById("auth-reg-answer").value = "";
        } else {
            const err = await resp.json();
            showToast("Registration failed: " + Object.values(err).flat().join(", "), "error");
        }
    } catch (err) {
        console.warn("Registering locally offline...", err);
        const mockUsers = JSON.parse(localStorage.getItem("skyways_mock_users") || "[]");
        if (mockUsers.some(u => u.username === username)) {
            showToast("Username already exists locally!", "error");
            return;
        }

        const newMock = {
            id: Date.now(),
            username,
            password,
            first_name: firstname,
            last_name: lastname,
            role: selectedRole,
            email,
            phone,
            profile_pic: picBase64,
            security_question: securityQuestion,
            security_answer: securityAnswer
        };
        mockUsers.push(newMock);
        localStorage.setItem("skyways_mock_users", JSON.stringify(mockUsers));

        // If driver role, append a mock driver details
        if (selectedRole === "driver") {
            const localDrivers = JSON.parse(localStorage.getItem("skyways_mock_drivers") || "[]");
            const newDrId = "DR-" + (localDrivers.length + 10);
            localDrivers.push({
                pk: newMock.id,
                userPk: newMock.id,
                id: newDrId,
                name: `${firstname} ${lastname}`,
                email: email,
                rating: 5.0,
                trips: 0,
                vehicle: "None",
                attendance: "Present",
                img: picBase64 || getDriverImage(newDrId)
            });
            localStorage.setItem("skyways_mock_drivers", JSON.stringify(localDrivers));
        }

        showToast("Offline Registration Successful! Logging you in...", "success");
        toggleAuthMode("login");
        // Clear inputs
        if (imageInput) imageInput.value = "";
        const thumb = document.getElementById("auth-reg-image-thumb");
        const placeholder = document.getElementById("auth-reg-image-placeholder");
        if (thumb) { thumb.classList.add("hidden"); thumb.src = ""; }
        if (placeholder) placeholder.classList.remove("hidden");
    }
}

function logout() {
    localStorage.removeItem("skyways_jwt_token");
    localStorage.removeItem("skyways_user_role");
    localStorage.removeItem("skyways_username");
    localStorage.removeItem("skyways_user_profile");
    jwtToken = null;
    state.currentUser = null;
    state.userRole = null;
    state.username = null;

    if (notificationSocket) {
        try {
            notificationSocket.close();
        } catch(e) {}
        notificationSocket = null;
    }
    
    // Clear notifications state
    state.notifications = [];
    renderNotificationList();
    updateNotificationBadge();

    showToast("Logged out successfully.", "info");
    
    const overlay = document.getElementById("auth-overlay");
    if (overlay) {
        overlay.classList.remove("hidden");
        toggleAuthMode("login");
    }
}

function refreshUILayout() {
    const role = state.userRole || "passenger";
    const sidebarRoleEl = document.querySelector(".manager-role");
    if (sidebarRoleEl) {
        if (role === "admin" || role === "dispatcher") sidebarRoleEl.textContent = "Fleet Manager";
        else if (role === "passenger") sidebarRoleEl.textContent = "Passenger Account";
        else if (role === "driver") sidebarRoleEl.textContent = "Staff Driver";
    }

    const showEl = (id) => document.getElementById(id)?.classList.remove("hidden");
    const hideEl = (id) => document.getElementById(id)?.classList.add("hidden");

    if (role === "admin" || role === "dispatcher") {
        showEl("nav-dashboard");
        showEl("nav-vehicles");
        showEl("nav-drivers");
        showEl("nav-routes");
        hideEl("nav-booking");
        showEl("nav-analytics");
        showEl("nav-support");
        showEl("nav-settings");
        hideEl("nav-tickets");
        showEl("routes-admin-actions");
        showEl("vehicles-admin-actions");
        showEl("drivers-admin-actions");
        
        // Ensure Admin has full complaint layout and resolving buttons
        const compForm = document.getElementById("passenger-complaint-form-card");
        if (compForm) compForm.classList.add("hidden"); // Admin doesn't submit complaints
        const listTitle = document.getElementById("complaints-list-title");
        if (listTitle) listTitle.textContent = "Active Passenger Complaints / Tickets";
    } else if (role === "passenger") {
        showEl("nav-dashboard");
        hideEl("nav-vehicles");
        hideEl("nav-drivers");
        showEl("nav-routes");
        showEl("nav-booking");
        hideEl("nav-analytics");
        showEl("nav-support");
        showEl("nav-settings");
        showEl("nav-tickets");
        hideEl("routes-admin-actions");
        hideEl("vehicles-admin-actions");
        hideEl("drivers-admin-actions");
        
        // Show complaint fields for passenger
        const compForm = document.getElementById("passenger-complaint-form-card");
        if (compForm) compForm.classList.remove("hidden");
        const listTitle = document.getElementById("complaints-list-title");
        if (listTitle) listTitle.textContent = "Your Submitted Support Tickets";
    } else if (role === "driver") {
        showEl("nav-dashboard");
        showEl("nav-vehicles");
        showEl("nav-drivers"); // attendance & vehicle info
        showEl("nav-routes");
        hideEl("nav-booking");
        hideEl("nav-analytics");
        showEl("nav-support"); // shift notes/complaints
        showEl("nav-settings");
        hideEl("nav-tickets");
        hideEl("routes-admin-actions");
        hideEl("vehicles-admin-actions");
        hideEl("drivers-admin-actions");

        const compForm = document.getElementById("passenger-complaint-form-card");
        if (compForm) compForm.classList.remove("hidden");
        const listTitle = document.getElementById("complaints-list-title");
        if (listTitle) listTitle.textContent = "Your Filed Shift Grievances";
    }
    updateManagerProfile();
    loadNotifications();
}

// ==========================================
// SEAT SELECTOR POP PANEL INTERACTIVITY
// ==========================================

let selectedSeats = [];
function openSeatSelector(e) {
    e.preventDefault();
    const pickup = document.getElementById("book-pickup").value.trim();
    const destination = document.getElementById("book-destination").value.trim();
    const date = document.getElementById("book-date").value;
    const time = document.getElementById("book-time").value;
    const passengers = parseInt(document.getElementById("book-passengers").value);

    if (!pickup || !destination || !date || !time || isNaN(passengers) || passengers < 1) {
        showToast("Please fill out all booking fields with valid values first.", "error");
        return;
    }

    selectedSeats = [];
    
    // Clear and build grid
    const mapGrid = document.getElementById("seat-map-grid");
    if (!mapGrid) return;
    mapGrid.innerHTML = "";

    // Determine seats count
    let totalSeats = 25;
    if (selectedPrefType === "Mini Bus") totalSeats = 10;
    else if (selectedPrefType === "Express Shuttle") totalSeats = 35;

    const colsCount = 5;
    const rowsCount = Math.ceil(totalSeats / 4);

    let seatCounter = 0;
    for (let r = 0; r < rowsCount; r++) {
        for (let c = 0; c < colsCount; c++) {
            if (c === 2) {
                // Aisle column
                const aisle = document.createElement("div");
                aisle.className = "w-8 h-8 flex items-center justify-center text-[10px] text-on-surface-variant/40 font-bold";
                aisle.textContent = "AISLE";
                mapGrid.appendChild(aisle);
            } else {
                seatCounter++;
                if (seatCounter > totalSeats) {
                    const spacer = document.createElement("div");
                    mapGrid.appendChild(spacer);
                    continue;
                }

                const colLetter = String.fromCharCode(65 + (c > 2 ? c - 1 : c));
                const seatName = `${r + 1}${colLetter}`;
                const seat = document.createElement("div");
                
                // Randomly pre-occupy some seats (e.g. 25% chance)
                const isOccupied = (Math.random() < 0.25);
                
                if (isOccupied) {
                    seat.className = "w-8 h-8 rounded bg-error/30 border border-error/50 flex items-center justify-center text-[10px] text-on-surface-variant/70 font-semibold cursor-not-allowed";
                    seat.title = `Seat ${seatName} - Occupied`;
                } else {
                    seat.className = "w-8 h-8 rounded bg-surface-container border border-outline-variant/50 hover:border-primary flex items-center justify-center text-[10px] text-on-surface font-semibold cursor-pointer transition-colors";
                    seat.title = `Seat ${seatName} - Available`;
                    seat.onclick = () => selectSeat(seatName, seat);
                }
                
                seat.textContent = seatName;
                mapGrid.appendChild(seat);
            }
        }
    }

    const modal = document.getElementById("modal-seat-selector");
    if (modal) modal.classList.remove("hidden");
}

function selectSeat(seatName, seatEl) {
    const maxSeats = parseInt(document.getElementById("book-passengers").value) || 1;
    const index = selectedSeats.indexOf(seatName);

    if (index > -1) {
        // Deselect
        selectedSeats.splice(index, 1);
        seatEl.className = "w-8 h-8 rounded bg-surface-container border border-outline-variant/50 hover:border-primary flex items-center justify-center text-[10px] text-on-surface font-semibold cursor-pointer transition-colors";
    } else {
        // Select
        if (selectedSeats.length >= maxSeats) {
            // Automatically pop first
            const firstSeat = selectedSeats.shift();
            const allSeats = document.getElementById("seat-map-grid").children;
            for (const child of allSeats) {
                if (child.textContent === firstSeat && !child.className.includes("cursor-not-allowed")) {
                    child.className = "w-8 h-8 rounded bg-surface-container border border-outline-variant/50 hover:border-primary flex items-center justify-center text-[10px] text-on-surface font-semibold cursor-pointer transition-colors";
                }
            }
        }
        selectedSeats.push(seatName);
        seatEl.className = "w-8 h-8 rounded bg-primary text-black border border-primary-fixed flex items-center justify-center text-[10px] font-bold cursor-pointer shadow-[0_0_8px_rgba(6,182,212,0.6)]";
    }
}

function confirmSeatSelection() {
    const required = parseInt(document.getElementById("book-passengers").value) || 1;
    if (selectedSeats.length !== required) {
        showToast(`Please select exactly ${required} seats. Currently selected: ${selectedSeats.length}`, "error");
        return;
    }
    closeAllModals();
    confirmBooking();
}

// Override confirmBooking with seat number logs & revenue collection
async function confirmBooking() {
    const pickup = document.getElementById("book-pickup").value.trim();
    const destination = document.getElementById("book-destination").value.trim();
    const date = document.getElementById("book-date").value;
    const time = document.getElementById("book-time").value;
    const passengers = parseInt(document.getElementById("book-passengers").value);
    const seatInfo = selectedSeats.join(", ");

    let matchedVehicle = null;
    let matchedDriver = null;

    // 1. Try to find an active trip matching the source and destination
    let matchedTrip = state.trips.find(t => 
        t.source.toLowerCase() === pickup.toLowerCase() &&
        t.destination.toLowerCase() === destination.toLowerCase() &&
        t.status === "In Transit"
    );
    
    if (matchedTrip) {
        matchedVehicle = state.vehicles.find(v => v.id === matchedTrip.vehicleId);
        matchedDriver = state.drivers.find(d => d.id === matchedTrip.driverId);
    }
    
    // 2. If no trip matched, try to find a driver who has an assigned vehicle and is present
    if (!matchedVehicle || !matchedDriver) {
        const activeDriver = state.drivers.find(d => d.attendance === "Present" && d.vehicle && d.vehicle !== "None");
        if (activeDriver) {
            matchedDriver = activeDriver;
            matchedVehicle = state.vehicles.find(v => v.id === activeDriver.vehicle);
        }
    }
    
    // 3. Fallback to any available vehicle and present driver
    if (!matchedVehicle) {
        if (selectedPrefType === "No Preference") {
            matchedVehicle = state.vehicles.find(v => v.status === "Available");
        } else {
            matchedVehicle = state.vehicles.find(v => v.status === "Available" && v.type === selectedPrefType);
        }
        if (!matchedVehicle) {
            matchedVehicle = state.vehicles.find(v => v.status === "Available") || state.vehicles[0];
        }
    }
    if (!matchedDriver) {
        matchedDriver = state.drivers.find(d => d.attendance === "Present" && d.vehicle === "None") ||
                        state.drivers.find(d => d.attendance === "Present") ||
                        state.drivers[0];
    }

    if (!matchedVehicle || !matchedDriver) {
        matchedVehicle = matchedVehicle || { pk: 99, id: "VH-MOCK", name: "Mock Bus", capacity: 50 };
        matchedDriver = matchedDriver || { pk: 99, id: "DR-MOCK", name: "Mock Driver" };
    }

    // Determine route pk
    let routePk = null;
    let existingRoute = state.routes ? state.routes.find(r => r.start_location === pickup && r.end_location === destination) : null;
    if (existingRoute) {
        routePk = existingRoute.id;
    } else {
        if (jwtToken && !jwtToken.startsWith("mock_")) {
            try {
                const resRoute = await fetch('/api/v1/trips/routes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        name: `Route ${pickup} - ${destination}`,
                        start_location: pickup,
                        end_location: destination,
                        distance_km: Math.floor(Math.random() * 25) + 15
                    })
                });
                if (resRoute.ok) {
                    const routeData = await resRoute.json();
                    routePk = routeData.id;
                }
            } catch (e) {}
        }
    }

    const payload = {
        passenger_name: state.currentUser ? (`${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.trim() || state.username || state.currentUser.username || "Customer / Portal Booking") : "Customer / Portal Booking",
        passenger_contact: state.currentUser ? state.currentUser.phone_number || "555-0199" : "555-0199",
        pickup_point: pickup,
        destination: destination,
        scheduled_date: date,
        scheduled_time: time + ":00",
        passengers: passengers,
        route: routePk || 1,
        status: "assigned",
        notes: `Seats: ${seatInfo}`
    };

    // Only assign vehicle/driver if they are not mock values
    const vehPk = matchedVehicle.pk || matchedVehicle.id;
    const drPk = matchedDriver.pk || matchedDriver.id;
    if (vehPk && vehPk !== 99 && vehPk !== "VH-MOCK") {
        payload.vehicle = vehPk;
    }
    if (drPk && drPk !== 99 && drPk !== "DR-MOCK") {
        payload.driver = drPk;
    }

    // Total fare calculator (pax * $25.00)
    const fare = passengers * 25.00;

    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            const resBooking = await fetch('/api/v1/trips/bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(payload)
            });

            if (resBooking.ok) {
                const bookingData = await resBooking.json();
                
                // Create associated Trip
                const resTrip = await fetch('/api/v1/trips/trips/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        booking: bookingData.id,
                        vehicle: bookingData.vehicle || matchedVehicle.pk,
                        driver: bookingData.driver || matchedDriver.pk,
                        start_timestamp: new Date().toISOString(),
                        status: "ongoing",
                        distance_travelled_km: Math.floor(Math.random() * 25) + 15
                    })
                });

                // Create associated Revenue ledger entry
                await fetch('/api/v1/operations/revenues/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        booking: bookingData.id,
                        amount: fare,
                        collected_at: date,
                        method: "online"
                    })
                }).catch(() => {});

                // Decommission vehicle status
                const finalVehPk = bookingData.vehicle || matchedVehicle.pk;
                const finalDrPk = bookingData.driver || matchedDriver.pk;
                if (finalVehPk && finalVehPk !== 99) {
                    await fetch(`/api/v1/fleet/vehicles/${finalVehPk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({
                            status: 'in_service',
                            driver: finalDrPk
                        })
                    });
                }

                showToast(`Ticket Confirmed! Seats: ${seatInfo}. Charged: $${fare}`, "success");
                addNotification("Booking Confirmed", `Your ride from ${pickup} to ${destination} has been confirmed. Seats: ${seatInfo}`);
                simulateBookingCountdown(bookingData.id, pickup, destination);
            } else {
                const errData = await resBooking.json();
                console.error("Booking creation failed:", errData);
                showToast("Booking failed: " + Object.values(errData).flat().join(", "), "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Error processing booking request.", "error");
        }
    } else {
        // Local Mock Action
        const mockBooking = {
            id: Math.floor(Math.random() * 9000) + 1000,
            ...payload
        };
        state.bookings.unshift(mockBooking);
        
        const mockTrip = {
            pk: Math.floor(Math.random() * 900) + 100,
            id: `RT-${mockBooking.id}`,
            source: pickup,
            destination: destination,
            progress: 0,
            distance: Math.floor(Math.random() * 25) + 15,
            duration: 30,
            vehicleId: matchedVehicle.id || "VH-MOCK",
            driverId: matchedDriver.id || "DR-MOCK",
            status: "In Transit"
        };
        state.trips.unshift(mockTrip);

        // Add Mock Revenue
        state.revenues.unshift({
            id: Date.now(),
            booking: mockBooking.id,
            amount: fare,
            collected_at: date,
            method: "online"
        });

        // Set vehicle busy
        const vRef = state.vehicles.find(v => v.pk === matchedVehicle.pk);
        if (vRef) {
            vRef.status = "In Transit";
            vRef.route = `Route to ${destination}`;
        }
        
        saveMockState();
        showToast(`Offline Booking Saved! Seats: ${seatInfo}. Charged: $${fare}`, "success");
        addNotification("Booking Confirmed (Offline)", `Your ride from ${pickup} to ${destination} has been confirmed. Seats: ${seatInfo}`);
        simulateBookingCountdown(mockBooking.id, pickup, destination);
    }

    await fetchBackendData();
    if (state.userRole === "passenger") {
        routeTo("#tickets");
    } else {
        routeTo("#routes");
    }
}

// ==========================================
// MY TICKETS & BOARDING PASSES RENDERING
// ==========================================

function getSeatsFromNotes(notes) {
    if (!notes) return "Seat: Unallocated";
    const match = notes.match(/Seats:\s*([A-Za-z0-9,\s]+)/i);
    return match ? `Seat: ${match[1].trim()}` : "Seat: Unallocated";
}

function generateMockQRCodeSVG(id) {
    let rects = "";
    const hash = String(id).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 12; c++) {
            const isFinder = (r < 3 && c < 3) || (r < 3 && c >= 9) || (r >= 9 && c < 3);
            if (isFinder) {
                const fill = (r === 0 || r === 2 || c === 0 || c === 2 || (r < 3 && c >= 9 && (r === 0 || r === 2 || c === 9 || c === 11)) || (r >= 9 && c < 3 && (r === 9 || r === 11 || c === 0 || c === 2))) ? "currentColor" : "none";
                rects += `<rect x="${c * 8}" y="${r * 8}" width="8" height="8" fill="${fill}" />`;
            } else {
                const dotVal = (hash * (r + 1) * (c + 3)) % 5;
                if (dotVal === 0 || dotVal === 2) {
                    rects += `<rect x="${c * 8}" y="${r * 8}" width="8" height="8" fill="currentColor" />`;
                }
            }
        }
    }
    return `
    <svg onclick="openTicketVerificationModal(${id})" viewBox="0 0 96 96" class="w-20 h-20 text-on-surface hover:text-primary transition-colors cursor-pointer" xmlns="http://www.w3.org/2000/svg">
        <rect width="96" height="96" fill="white" fill-opacity="0.05" rx="8" />
        <g transform="translate(4,4)">
            ${rects}
        </g>
    </svg>`;
}

function renderTickets() {
    const container = document.getElementById("tickets-container");
    if (!container) return;
    container.innerHTML = "";

    const isPassenger = (state.userRole === "passenger");
    const passengerName = state.currentUser ? `${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.trim().toLowerCase() : "";
    const username = state.username ? state.username.toLowerCase() : "";

    const list = state.bookings.filter(b => {
        if (isPassenger) {
            const pName = (b.passenger_name || "").toLowerCase();
            return (passengerName && pName.includes(passengerName)) || 
                   (username && pName.includes(username)) || 
                   pName.includes("customer / portal") || 
                   pName.includes("portal booking");
        }
        return true;
    });

    if (list.length === 0) {
        container.innerHTML = `
            <div class="col-span-full p-12 text-center glass-card rounded-xl text-on-surface-variant">
                <span class="material-symbols-outlined text-5xl mb-3">confirmation_number</span>
                <p class="text-body-lg">No active boarding passes or bookings found.</p>
            </div>
        `;
        return;
    }

    list.forEach(b => {
        const parsedSeats = getSeatsFromNotes(b.notes);
        const qrCode = generateMockQRCodeSVG(b.id);
        const isCancellable = (b.status === "pending" || b.status === "assigned" || b.status === "started");
        
        const card = document.createElement("div");
        card.className = "glass-card rounded-3xl p-6 relative overflow-hidden border border-outline-variant/30 flex flex-col justify-between";
        
        let statusBadge = "bg-primary/20 text-primary border-primary/30";
        if (b.status === "canceled" || b.status === "cancelled") statusBadge = "bg-error/20 text-error border-error/30";
        else if (b.status === "completed" || b.status === "finished") statusBadge = "bg-secondary/20 text-secondary border-secondary/30";

        const actionBtnHTML = isCancellable 
            ? `<button class="btn-primary-alt px-4 py-2 rounded-xl text-xs font-semibold" onclick="cancelBooking(${b.id})">Cancel Pass</button>`
            : `<button class="btn-primary px-4 py-2 rounded-xl text-xs font-semibold" onclick="openFeedbackModal(${b.id})">Submit Review</button>`;

        const driverName = b.driver_name || (b.driver ? (state.drivers.find(d => d.pk === b.driver || d.id === b.driver)?.name || "Assigned Driver") : "Unassigned");
        const driverImage = b.driver_image || (b.driver ? (state.drivers.find(d => d.pk === b.driver || d.id === b.driver)?.img || getDriverImage("DR-01")) : null);
        const driverLicense = b.driver_license || (b.driver ? (state.drivers.find(d => d.pk === b.driver || d.id === b.driver)?.id || "N/A") : "N/A");

        const vehicleObj = state.vehicles.find(v => 
            (b.vehicle && (v.pk === b.vehicle || v.id === b.vehicle)) || 
            (b.vehicleId && (v.pk === b.vehicleId || v.id === b.vehicleId))
        );
        const vehicleName = vehicleObj ? vehicleObj.name : "Assigned Bus";
        const vehicleNumber = vehicleObj ? vehicleObj.id : "VH-MOCK";

        let detailsHTML = "";
        if (b.driver || vehicleObj) {
            detailsHTML = `
                <div class="mt-4 pt-3 border-t border-outline-variant/15 flex flex-col gap-3">
                    ${b.driver ? `
                    <div class="flex items-center gap-3">
                        <img class="w-8 h-8 rounded-full object-cover border border-outline-variant" src="${driverImage || getDriverImage("DR-01")}" alt="Driver Profile"/>
                        <div>
                            <p class="text-[10px] text-on-surface-variant leading-none uppercase tracking-wider font-bold">Assigned Driver</p>
                            <p class="text-body-md font-semibold text-on-surface mt-0.5 leading-none">${driverName}</p>
                            <p class="text-[10px] text-on-surface-variant leading-none mt-1">Lic: ${driverLicense}</p>
                        </div>
                    </div>
                    ` : ''}
                    ${vehicleObj ? `
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary text-xl">directions_bus</span>
                        <div>
                            <p class="text-[10px] text-on-surface-variant leading-none uppercase tracking-wider font-bold">Assigned Transport</p>
                            <p class="text-body-md font-semibold text-on-surface mt-0.5 leading-none">${vehicleName}</p>
                            <p class="text-[10px] text-on-surface-variant leading-none mt-1">Bus No: ${vehicleNumber}</p>
                        </div>
                    </div>
                    ` : ''}
                </div>
            `;
        }

        card.innerHTML = `
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span class="text-[10px] text-primary tracking-widest uppercase font-bold">Pass ID: #${b.id}</span>
                    <h4 class="text-headline-md font-bold text-on-surface mt-1">${parsedSeats}</h4>
                </div>
                <div class="px-3 py-1 rounded-full text-label-caps border ${statusBadge}">${b.status}</div>
            </div>

            <div class="flex items-center gap-6 mb-6">
                <div class="flex-grow">
                    <div class="flex items-center justify-between text-body-md text-on-surface font-semibold">
                        <span>${b.pickup_point}</span>
                        <span class="material-symbols-outlined text-sm text-primary">arrow_right_alt</span>
                        <span>${b.destination}</span>
                    </div>
                    <div class="flex justify-between text-xs text-on-surface-variant mt-2">
                        <span>Date: ${b.scheduled_date}</span>
                        <span>Time: ${b.scheduled_time}</span>
                    </div>
                </div>
                <div class="flex-shrink-0">
                    ${qrCode}
                </div>
            </div>

            ${detailsHTML}

            <div class="flex justify-between items-center border-t border-outline-variant/15 pt-4 mt-4">
                <span class="text-xs text-on-surface-variant">Qty: ${b.passengers} Pax</span>
                ${actionBtnHTML}
            </div>
        `;
        container.appendChild(card);
    });
}

async function cancelBooking(bookingId) {
    if (!confirm("Are you sure you want to cancel this reservation? All ticket bookings are eligible for full refund.")) return;

    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            await fetch(`/api/v1/trips/bookings/${bookingId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ status: 'canceled' })
            });

            // Find matching trip and cancel it
            const matchedTrip = state.trips.find(t => t.id === `RT-${bookingId}`);
            if (matchedTrip && matchedTrip.pk) {
                await fetch(`/api/v1/trips/trips/${matchedTrip.pk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({ status: 'cancelled' })
                });

                // Clear vehicle status back to available
                const vehObj = state.vehicles.find(v => v.id === matchedTrip.vehicleId);
                if (vehObj && vehObj.pk) {
                    await fetch(`/api/v1/fleet/vehicles/${vehObj.pk}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({ status: 'available' })
                    });
                }
            }

            // Create refund revenue log
            const revObj = state.revenues ? state.revenues.find(r => r.booking === bookingId) : null;
            if (revObj) {
                await fetch('/api/v1/operations/expenses/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        vehicle: 1, // depot general
                        amount: revObj.amount,
                        category: "Refund",
                        incurred_at: new Date().toISOString().split('T')[0],
                        note: `Ticket Cancel Refund for Booking #${bookingId}`
                    })
                }).catch(() => {});
            }

            showToast("Reservation cancelled and refund processed.", "info");
        } catch (e) {
            console.error(e);
        }
    } else {
        // Offline action
        const b = state.bookings.find(x => x.id === bookingId);
        if (b) b.status = "canceled";

        const t = state.trips.find(x => x.id === `RT-${bookingId}`);
        if (t) t.status = "Cancelled";

        // Create expense refund log
        const fare = b ? b.passengers * 25.00 : 25.00;
        state.expenses.unshift({
            id: Date.now(),
            vehicle: "VH-1042",
            amount: fare,
            category: "Refund",
            incurred_at: new Date().toISOString().split('T')[0],
            note: `Refund Booking #${bookingId}`
        });

        saveMockState();
        showToast("Offline Ticket Cancelled. Balance refunded.", "info");
    }

    await fetchBackendData();
    renderTickets();
}

function openFeedbackModal(bookingId) {
    document.getElementById("feedback-booking-id").value = bookingId;
    selectFeedbackStars(5);
    document.getElementById("form-feedback-comments").value = "";
    
    const modal = document.getElementById("modal-feedback");
    if (modal) modal.classList.remove("hidden");
}

function selectFeedbackStars(val) {
    document.getElementById("form-feedback-rating").value = val;
    const container = document.getElementById("feedback-stars-container");
    const stars = container.querySelectorAll("span");
    stars.forEach((star, index) => {
        if (index < val) {
            star.style.fontVariationSettings = "'FILL' 1";
            star.classList.add("text-tertiary");
        } else {
            star.style.fontVariationSettings = "'FILL' 0";
            star.classList.remove("text-tertiary");
        }
    });
}

async function submitFeedbackForm(e) {
    e.preventDefault();
    const bookingId = parseInt(document.getElementById("feedback-booking-id").value);
    const rating = parseInt(document.getElementById("form-feedback-rating").value);
    const comments = document.getElementById("form-feedback-comments").value.trim();

    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            const resp = await fetch('/api/v1/operations/feedbacks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    booking: bookingId,
                    rating: rating,
                    comments: comments
                })
            });

            if (resp.ok) {
                showToast("Feedback submitted successfully!", "success");
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        state.feedbacks.unshift({
            id: Date.now(),
            booking: bookingId,
            rating: rating,
            comments: comments,
            submitted_at: new Date().toISOString()
        });
        saveMockState();
        showToast("Offline feedback saved. Thank you!", "success");
    }

    await fetchBackendData();
    closeAllModals();
    renderTickets();
}

// ==========================================
// TICKET VERIFICATION & BOARDING
// ==========================================

let activeVerifyBookingId = null;

async function openTicketVerificationModal(bookingId) {
    if (!bookingId) {
        showToast("Please enter a valid Ticket ID.", "error");
        return;
    }
    
    // Find booking
    const booking = state.bookings.find(b => b.id.toString() === bookingId.toString());
    if (!booking) {
        showToast(`Ticket #${bookingId} not found.`, "error");
        return;
    }

    activeVerifyBookingId = booking.id;

    // Populate modal fields
    document.getElementById("verify-modal-id").textContent = `#${booking.id}`;
    document.getElementById("verify-modal-name").textContent = booking.passenger_name;
    document.getElementById("verify-modal-seats").textContent = getSeatsFromNotes(booking.notes);
    document.getElementById("verify-modal-route").textContent = `${booking.pickup_point} → ${booking.destination}`;
    document.getElementById("verify-modal-datetime").textContent = `${booking.scheduled_date} at ${booking.scheduled_time}`;

    // Set badge style based on status
    const statusBadge = document.getElementById("verify-modal-status-badge");
    statusBadge.textContent = booking.status.toUpperCase();
    statusBadge.className = "px-2 py-0.5 rounded-full text-xs font-semibold";
    if (booking.status === "completed") {
        statusBadge.classList.add("bg-secondary/20", "text-secondary", "border", "border-secondary/30");
    } else if (booking.status === "canceled" || booking.status === "cancelled") {
        statusBadge.classList.add("bg-error/20", "text-error", "border", "border-error/30");
    } else {
        statusBadge.classList.add("bg-primary/20", "text-primary", "border", "border-primary/30");
    }

    // Set checkin information info box
    const checkinInfo = document.getElementById("verify-modal-checkin-info");
    const confirmBtn = document.getElementById("verify-modal-confirm-btn");

    checkinInfo.className = "p-3.5 rounded-xl border flex gap-3 items-start";
    if (booking.status === "completed") {
        checkinInfo.classList.add("bg-secondary/5", "border-secondary/30", "text-secondary");
        checkinInfo.innerHTML = `
            <span class="material-symbols-outlined text-xl mt-0.5">check_circle</span>
            <div>
                <p class="font-bold text-sm">Pass Already Verified</p>
                <p class="text-xs text-on-surface-variant mt-0.5">This boarding pass was already scanned and confirmed. Passenger is on board.</p>
            </div>
        `;
        confirmBtn.classList.add("hidden");
    } else if (booking.status === "canceled" || booking.status === "cancelled") {
        checkinInfo.classList.add("bg-error/5", "border-error/30", "text-error");
        checkinInfo.innerHTML = `
            <span class="material-symbols-outlined text-xl mt-0.5">cancel</span>
            <div>
                <p class="font-bold text-sm">Canceled Booking</p>
                <p class="text-xs text-on-surface-variant mt-0.5">This booking has been cancelled and cannot be used for boarding.</p>
            </div>
        `;
        confirmBtn.classList.add("hidden");
    } else {
        // Pending, Assigned, Started
        checkinInfo.classList.add("bg-primary/5", "border-primary/30", "text-primary");
        checkinInfo.innerHTML = `
            <span class="material-symbols-outlined text-xl mt-0.5">verified_user</span>
            <div>
                <p class="font-bold text-sm">Valid Booking - Ready to Board</p>
                <p class="text-xs text-on-surface-variant mt-0.5">This pass is active and authentic. Verify passenger ID and click Confirm Boarded below.</p>
            </div>
        `;
        // Only show confirm boarded button for drivers/dispatchers/admins
        if (state.userRole !== "passenger") {
            confirmBtn.classList.remove("hidden");
        } else {
            confirmBtn.classList.add("hidden");
        }
    }

    const modal = document.getElementById("modal-ticket-verify");
    if (modal) modal.classList.remove("hidden");
}

async function confirmPassengerBoarded() {
    if (!activeVerifyBookingId) return;

    const bookingId = activeVerifyBookingId;
    
    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            // 1. PATCH Booking status to completed
            const resBooking = await fetch(`/api/v1/trips/bookings/${bookingId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ status: 'completed' })
            });

            if (!resBooking.ok) {
                showToast("Failed to update boarding status on backend.", "error");
                return;
            }

            // 2. Find associated trip and POST to triplogs
            let tripPk = null;
            const matchedTrip = state.trips.find(t => t.booking === bookingId);
            if (matchedTrip) {
                tripPk = matchedTrip.pk;
            } else {
                // If not found in memory, query trips list from backend to locate the associated trip
                try {
                    const resTrips = await fetch('/api/v1/trips/trips/', {
                        headers: { 'Authorization': `Bearer ${jwtToken}` }
                    });
                    if (resTrips.ok) {
                        const dbTrips = await resTrips.json();
                        const tObj = dbTrips.find(x => x.booking === bookingId);
                        if (tObj) {
                            tripPk = tObj.id;
                        }
                    }
                } catch (e) {
                    console.error("Error finding trip for logging:", e);
                }
            }

            if (tripPk) {
                // POST log event
                await fetch('/api/v1/operations/triplogs/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        trip: tripPk,
                        event: "Boarding Pass Verified",
                        details: {
                            verified_by: state.currentUser ? state.currentUser.username : "Dispatcher Terminal",
                            method: "QR scan terminal",
                            timestamp: new Date().toISOString()
                        }
                    })
                });
            }

            showToast(`Boarding Confirmed for Pass #${bookingId}!`, "success");
        } catch (err) {
            console.error(err);
            showToast("Network error confirming passenger boarding.", "error");
        }
    } else {
        // Offline flow
        const booking = state.bookings.find(b => b.id.toString() === bookingId.toString());
        if (booking) {
            booking.status = "completed";
        }
        
        // Find offline trip log
        if (!state.triplogs) state.triplogs = [];
        state.triplogs.unshift({
            id: Date.now(),
            trip: `RT-${bookingId}`,
            event: "Boarding Pass Verified",
            details: {
                verified_by: state.managerName || "Offline Terminal",
                method: "Offline QR Scan",
                timestamp: new Date().toISOString()
            }
        });
        
        saveMockState();
        showToast(`Offline Boarding Confirmed for Pass #${bookingId}!`, "success");
    }

    await fetchBackendData();
    closeAllModals();
    renderTickets();
    
    // Clear input
    const termInput = document.getElementById("verify-ticket-input");
    if (termInput) termInput.value = "";
}

function triggerTerminalVerification() {
    const input = document.getElementById("verify-ticket-input");
    if (!input) return;
    const bookingId = input.value.trim();
    openTicketVerificationModal(bookingId);
}

// ==========================================
// ANALYTICS & SVG CHARTS LEDGER
// ==========================================

function renderAnalytics() {
    // Populate vehicle drop in expense form
    const expenseVehSelect = document.getElementById("expense-vehicle");
    if (expenseVehSelect) {
        expenseVehSelect.innerHTML = state.vehicles.map(v => `<option value="${v.pk}">${v.id} - ${v.name}</option>`).join("");
    }

    // Calc totals
    const totalRev = state.revenues ? state.revenues.reduce((acc, r) => acc + parseFloat(r.amount || 0), 0) : 0;
    const totalExp = state.expenses ? state.expenses.reduce((acc, e) => acc + parseFloat(e.amount || 0), 0) : 0;
    const netBal = totalRev - totalExp;

    const revEl = document.getElementById("anal-total-revenue");
    const expEl = document.getElementById("anal-total-expenses");
    const balEl = document.getElementById("anal-net-balance");

    if (revEl) revEl.textContent = `$${totalRev.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (expEl) expEl.textContent = `$${totalExp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (balEl) balEl.textContent = `$${netBal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Draw Chart
    drawFinancialChart();

    // Render tables
    const revBody = document.getElementById("revenue-ledger-body");
    if (revBody) {
        revBody.innerHTML = (state.revenues || []).slice(0, 10).map(r => `
            <tr class="border-b border-outline-variant/10 hover:bg-white/5 transition-colors">
                <td class="py-2.5">#B-${r.booking}</td>
                <td class="py-2.5">${r.collected_at}</td>
                <td class="py-2.5 capitalize">${r.method || "online"}</td>
                <td class="py-2.5 text-right font-semibold text-secondary">$${parseFloat(r.amount).toFixed(2)}</td>
            </tr>
        `).join("");
    }

    const expBody = document.getElementById("expense-ledger-body");
    if (expBody) {
        expBody.innerHTML = (state.expenses || []).slice(0, 10).map(e => {
            const vehicleLabel = typeof e.vehicle === "object" ? e.vehicle.plate_number : (state.vehicles.find(v => v.pk === e.vehicle)?.id || e.vehicle);
            return `
                <tr class="border-b border-outline-variant/10 hover:bg-white/5 transition-colors">
                    <td class="py-2.5">${vehicleLabel}</td>
                    <td class="py-2.5 font-medium">${e.category}</td>
                    <td class="py-2.5">${e.incurred_at}</td>
                    <td class="py-2.5 text-right font-semibold text-error">$${parseFloat(e.amount).toFixed(2)}</td>
                </tr>
            `;
        }).join("");
    }
}

function drawFinancialChart() {
    const container = document.getElementById("analytics-chart-container");
    if (!container) return;
    container.innerHTML = "";

    // Generate weekly data points (last 7 days)
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
    }

    const revPoints = dates.map(dt => {
        return (state.revenues || []).filter(r => r.collected_at === dt).reduce((acc, r) => acc + parseFloat(r.amount), 0);
    });

    const expPoints = dates.map(dt => {
        const incurred = (state.expenses || []).filter(e => {
            const dateStr = typeof e.incurred_at === "string" ? e.incurred_at : "";
            return dateStr.includes(dt);
        });
        return incurred.reduce((acc, e) => acc + parseFloat(e.amount), 0);
    });

    const maxVal = Math.max(...revPoints, ...expPoints, 100) * 1.15;

    // SVG parameters
    const width = 500;
    const height = 220;
    const padding = 30;

    const getX = (index) => padding + (index * (width - padding * 2) / 6);
    const getY = (val) => height - padding - (val * (height - padding * 2) / maxVal);

    // Build SVG paths
    let revPath = "";
    let expPath = "";
    let revDots = "";
    let expDots = "";

    for (let i = 0; i < 7; i++) {
        const rx = getX(i);
        const ry = getY(revPoints[i]);
        const ex = getX(i);
        const ey = getY(expPoints[i]);

        if (i === 0) {
            revPath += `M ${rx} ${ry}`;
            expPath += `M ${ex} ${ey}`;
        } else {
            revPath += ` L ${rx} ${ry}`;
            expPath += ` L ${ex} ${ey}`;
        }

        revDots += `<circle cx="${rx}" cy="${ry}" r="4" fill="#4edea3" class="hover:scale-125 transition-transform" />`;
        expDots += `<circle cx="${ex}" cy="${ey}" r="4" fill="#ffb4ab" class="hover:scale-125 transition-transform" />`;
    }

    const svg = `
    <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="text-on-surface">
        <defs>
            <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#4edea3" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#4edea3" stop-opacity="0.0"/>
            </linearGradient>
            <linearGradient id="exp-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffb4ab" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#ffb4ab" stop-opacity="0.0"/>
            </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="currentColor" stroke-opacity="0.2" />
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="currentColor" stroke-opacity="0.2" />
        <line x1="${padding}" y1="${getY(maxVal/2)}" x2="${width - padding}" y2="${getY(maxVal/2)}" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="4" />

        <!-- Area Gradients -->
        <path d="${revPath} L ${getX(6)} ${height - padding} L ${getX(0)} ${height - padding} Z" fill="url(#rev-grad)" />
        <path d="${expPath} L ${getX(6)} ${height - padding} L ${getX(0)} ${height - padding} Z" fill="url(#exp-grad)" />

        <!-- Line Paths -->
        <path d="${revPath}" fill="none" stroke="#4edea3" stroke-width="3" />
        <path d="${expPath}" fill="none" stroke="#ffb4ab" stroke-width="3" />

        <!-- Dots -->
        ${revDots}
        ${expDots}

        <!-- Labels -->
        <text x="${padding - 5}" y="${padding + 5}" font-size="10" text-anchor="end" fill="currentColor" opacity="0.6">$${Math.round(maxVal)}</text>
        <text x="${padding - 5}" y="${height - padding}" font-size="10" text-anchor="end" fill="currentColor" opacity="0.6">$0</text>
        
        <text x="${getX(0)}" y="${height - 10}" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">${dates[0].slice(-5)}</text>
        <text x="${getX(3)}" y="${height - 10}" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">${dates[3].slice(-5)}</text>
        <text x="${getX(6)}" y="${height - 10}" font-size="9" text-anchor="middle" fill="currentColor" opacity="0.6">${dates[6].slice(-5)}</text>
    </svg>
    `;
    container.innerHTML = svg;
}

function calculateFuelAmount() {
    const litersVal = parseFloat(document.getElementById("fuel-liters")?.value || 0);
    const priceVal = parseFloat(document.getElementById("fuel-price")?.value || 0);
    const amountInput = document.getElementById("expense-amount");
    if (amountInput) {
        amountInput.value = (litersVal * priceVal).toFixed(2);
    }
}

function setupExpenseFormListeners() {
    const categorySelect = document.getElementById("expense-category");
    if (categorySelect) {
        categorySelect.addEventListener("change", () => {
            const fuelFields = document.getElementById("fuel-specific-fields");
            if (fuelFields) {
                if (categorySelect.value === "Fuel") {
                    fuelFields.classList.remove("hidden");
                    calculateFuelAmount();
                } else {
                    fuelFields.classList.add("hidden");
                }
            }
        });
        // Initial setup
        const fuelFields = document.getElementById("fuel-specific-fields");
        if (fuelFields) {
            if (categorySelect.value === "Fuel") {
                fuelFields.classList.remove("hidden");
                calculateFuelAmount();
            } else {
                fuelFields.classList.add("hidden");
            }
        }
    }
}

async function submitExpenseForm(e) {
    e.preventDefault();
    const vehPk = document.getElementById("expense-vehicle").value;
    const category = document.getElementById("expense-category").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const note = document.getElementById("expense-note").value.trim();

    const payload = {
        vehicle: vehPk,
        amount: amount,
        category: category,
        incurred_at: new Date().toISOString().split("T")[0],
        note: note
    };

    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            if (category === "Fuel") {
                const liters = parseFloat(document.getElementById("fuel-liters").value || 0);
                const price = parseFloat(document.getElementById("fuel-price").value || 0);
                const odometer = parseFloat(document.getElementById("fuel-odometer").value || 0);
                
                await fetch('/api/v1/operations/fuellogs/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({
                        vehicle: vehPk,
                        liters: liters,
                        price_per_liter: price,
                        odometer_km: odometer
                    })
                });
            }

            const resp = await fetch('/api/v1/operations/expenses/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(payload)
            });

            if (resp.ok) {
                showToast(`Fleet Expense of $${amount} logged in ledger.`, "success");
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        // Offline action
        const v = state.vehicles.find(x => x.pk.toString() === vehPk.toString());
        state.expenses.unshift({
            id: Date.now(),
            vehicle: v ? v.id : "VH-General",
            amount: amount,
            category: category,
            incurred_at: payload.incurred_at,
            note: note
        });
        
        if (category === "Fuel") {
            const liters = parseFloat(document.getElementById("fuel-liters").value || 0);
            const price = parseFloat(document.getElementById("fuel-price").value || 0);
            const odometer = parseFloat(document.getElementById("fuel-odometer").value || 0);
            if (!state.fuel_logs) state.fuel_logs = [];
            state.fuel_logs.unshift({
                id: Date.now(),
                vehicle: v ? v.id : "VH-General",
                liters: liters,
                price_per_liter: price,
                odometer_km: odometer,
                timestamp: new Date().toISOString()
            });
        }
        saveMockState();
        showToast(`Offline Expense of $${amount} Saved.`, "success");
    }

    // Reset Form
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-note").value = "";

    await fetchBackendData();
    renderAnalytics();
}

// ==========================================
// CUSTOMER SUPPORT, TICKETS & CHATBOT
// ==========================================

function renderSupport() {
    const container = document.getElementById("complaints-list-container");
    if (!container) return;
    container.innerHTML = "";

    const list = state.complaints || [];

    if (list.length === 0) {
        container.innerHTML = `
            <div class="p-6 text-center text-on-surface-variant text-body-md">
                <span class="material-symbols-outlined text-4xl mb-2 text-outline-variant">support_agent</span>
                No support logs filed yet.
            </div>
        `;
        return;
    }

    list.forEach(c => {
        const isResolved = c.status === "resolved" || c.status === "Resolved";
        const date = c.created_at ? new Date(c.created_at).toLocaleDateString() : "Today";
        
        let resolveBtnHTML = "";
        if (!isResolved && (state.userRole === "admin" || state.userRole === "dispatcher")) {
            resolveBtnHTML = `<button class="btn-primary text-white text-xs px-3 py-1 rounded" onclick="resolveComplaint(${c.id})">Mark Resolved</button>`;
        }

        const item = document.createElement("div");
        item.className = `p-4 rounded-xl border border-outline-variant/30 flex justify-between items-start ${isResolved ? 'bg-secondary/5' : 'bg-white/5'}`;
        item.innerHTML = `
            <div class="flex-grow min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-semibold text-on-surface truncate">${c.title}</h4>
                    <span class="text-[9px] uppercase tracking-wider font-bold ${isResolved ? 'text-secondary bg-secondary/10' : 'text-primary bg-primary/10'} px-1.5 py-0.5 rounded border border-current">${c.status}</span>
                </div>
                <p class="text-xs text-on-surface-variant mb-2">${c.description}</p>
                <span class="text-[10px] text-outline">Logged: ${date}</span>
            </div>
            <div class="flex-shrink-0 ml-3">
                ${resolveBtnHTML}
            </div>
        `;
        container.appendChild(item);
    });
}

async function submitComplaintForm(e) {
    e.preventDefault();
    const title = document.getElementById("complaint-title").value.trim();
    const desc = document.getElementById("complaint-desc").value.trim();

    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            const resp = await fetch('/api/v1/operations/complaints/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    title: title,
                    description: desc
                })
            });

            if (resp.ok) {
                showToast("Support ticket registered in database.", "success");
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        // Offline action
        state.complaints.unshift({
            id: Date.now(),
            title: title,
            description: desc,
            status: "pending",
            created_at: new Date().toISOString()
        });
        saveMockState();
        showToast("Offline Ticket Registered.", "success");
    }

    document.getElementById("complaint-title").value = "";
    document.getElementById("complaint-desc").value = "";

    await fetchBackendData();
    renderSupport();
}

async function resolveComplaint(id) {
    if (jwtToken && !jwtToken.startsWith("mock_")) {
        try {
            await fetch(`/api/v1/operations/complaints/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ status: 'resolved' })
            });
            showToast("Support ticket marked Resolved.", "success");
        } catch (e) {}
    } else {
        const c = state.complaints.find(x => x.id === id);
        if (c) c.status = "resolved";
        saveMockState();
        showToast("Offline Ticket Resolved.", "success");
    }

    await fetchBackendData();
    renderSupport();
}

function submitChatForm(e) {
    e.preventDefault();
    const input = document.getElementById("chat-input-field");
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    // Append User message
    const userMsg = document.createElement("div");
    userMsg.className = "flex gap-2 justify-end";
    userMsg.innerHTML = `
        <div class="bg-primary/20 border border-primary/30 rounded-xl p-3 max-w-[80%] text-right">
            ${msg}
        </div>
    `;
    container.appendChild(userMsg);
    
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // Simulate AI reply
    setTimeout(() => {
        const lowerMsg = msg.toLowerCase();
        let reply = "Thank you for contacting SkyWays Command Support. Our transit AI agent is analyzing your query. How can I help you with routes, schedules or ticket bookings?";
        
        if (lowerMsg.includes("cancel") || lowerMsg.includes("refund")) {
            reply = "Hi! You can cancel any booking before departure by clicking 'Cancel Reservation' in the My Tickets tab. Refund is automatically processed to your ledger balance.";
        } else if (lowerMsg.includes("seat")) {
            reply = "SkyWays supports real-time interactive seat selector layouts. You can choose window, aisle, or premium seats when making reservations in the booking portal.";
        } else if (lowerMsg.includes("route")) {
            reply = "Our routes are AI-optimized dynamically based on traffic and depot states. To see active route lists or schedule new dispatches, check out the Routes tab.";
        } else if (lowerMsg.includes("late") || lowerMsg.includes("delay")) {
            reply = "We apologize for the inconvenience. Waypoint delays are automatically logged and adjusted on our command maps using our optimal sequence algorithm.";
        }

        const aiMsg = document.createElement("div");
        aiMsg.className = "flex gap-2";
        aiMsg.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-xs">smart_toy</span>
            </div>
            <div class="bg-white/5 border border-white/10 rounded-xl p-3 max-w-[80%]">
                ${reply}
            </div>
        `;
        container.appendChild(aiMsg);
        container.scrollTop = container.scrollHeight;
    }, 1200);
}

// ==========================================
// AI ROUTE OPTIMIZATION ENGINE
// ==========================================

async function runAIRouteOptimization() {
    const btn = document.querySelector("[onclick='runAIRouteOptimization()']");
    if (!btn) return;
    
    showToast("AI Route Optimization Engine triggered. Optimizing database routes...", "info");
    
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.className = "flex items-center gap-2 bg-gradient-to-r from-outline to-outline-variant text-black font-bold px-6 py-2.5 rounded-lg cursor-not-allowed";
    btn.innerHTML = `<span class="material-symbols-outlined animate-spin text-sm">sync</span> <span>Optimizing...</span>`;

    try {
        if (jwtToken && !jwtToken.startsWith("mock_")) {
            let totalSaved = 0;
            if (state.routes && state.routes.length > 0) {
                for (const r of state.routes) {
                    const resp = await fetch(`/api/v1/trips/routes/${r.id}/optimize/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    });
                    if (resp.ok) {
                        const resData = await resp.json();
                        totalSaved += parseFloat(resData.savings_km || 0);
                    }
                }
                await fetchBackendData();
                showToast(`AI route sequences optimized in database! Saved a total of ${totalSaved.toFixed(2)} km.`, "success");
            } else {
                showToast("No active routes found in the database to optimize.", "warning");
            }
        } else {
            // Mock fallback
            let updatedCount = 0;
            state.trips.forEach(t => {
                if (t.status === "In Transit") {
                    t.distance = parseFloat((t.distance * 0.92).toFixed(1));
                    t.duration = Math.max(5, Math.round(t.duration * 0.85));
                    updatedCount++;
                }
            });
            showToast(`Offline Heuristics: waypoint sequences optimized! Saved 8% distance across transit trips.`, "success");
        }
        
        btn.disabled = false;
        btn.className = "flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary-container text-black font-bold px-6 py-2.5 rounded-lg border-t border-white/20 hover:shadow-[0_0_15px_rgba(78,222,163,0.4)] transition-all";
        btn.innerHTML = originalHTML;
        
        renderRoutes();
    } catch (err) {
        console.error(err);
        showToast("Error during AI route optimization.", "error");
        btn.disabled = false;
        btn.className = "flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary-container text-black font-bold px-6 py-2.5 rounded-lg border-t border-white/20 hover:shadow-[0_0_15px_rgba(78,222,163,0.4)] transition-all";
        btn.innerHTML = originalHTML;
    }
}

// ==========================================
// PASSENGER NOTIFICATIONS SYSTEM
// ==========================================

function getNotificationsStorageKey() {
    const username = (state.currentUser && state.currentUser.username) || state.username || "guest";
    const role = state.userRole || "guest";
    return `skyways_notifications_${username}_${role}`;
}

function loadNotifications() {
    const key = getNotificationsStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            state.notifications = JSON.parse(stored);
        } catch(e) {
            state.notifications = [];
        }
    } else {
        state.notifications = [];
    }
    renderNotificationList();
    updateNotificationBadge();
}

function saveNotifications() {
    const key = getNotificationsStorageKey();
    localStorage.setItem(key, JSON.stringify(state.notifications || []));
}

function updateNotificationBadge() {
    const badge = document.getElementById("notification-badge");
    if (!badge) return;
    const unread = state.notifications && state.notifications.some(n => !n.read);
    if (unread) {
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }
}

function addNotification(title, text) {
    if (!state.notifications) state.notifications = [];
    const newNotif = {
        id: `NT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: title,
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
    };
    state.notifications.unshift(newNotif);
    saveNotifications();
    renderNotificationList();
    updateNotificationBadge();
    showToast(`${title}: ${text}`, "info");
}

function toggleNotificationDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById("notification-dropdown");
    if (!dropdown) return;
    dropdown.classList.toggle("hidden");
    
    if (!dropdown.classList.contains("hidden")) {
        if (state.notifications) {
            state.notifications.forEach(n => n.read = true);
            saveNotifications();
            updateNotificationBadge();
        }
    }
}

function clearNotifications() {
    state.notifications = [];
    saveNotifications();
    renderNotificationList();
    updateNotificationBadge();
}

function renderNotificationList() {
    const listContainer = document.getElementById("notification-list");
    if (!listContainer) return;
    listContainer.innerHTML = "";
    
    if (!state.notifications || state.notifications.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-4 text-on-surface-variant text-body-md">
                No new notifications
            </div>
        `;
        return;
    }
    
    state.notifications.forEach(n => {
        const item = document.createElement("div");
        item.className = "p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1 transition-all hover:bg-white/10";
        item.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="text-body-md font-semibold text-on-surface">${n.title}</span>
                <span class="text-[10px] text-on-surface-variant">${n.time}</span>
            </div>
            <p class="text-body-sm text-on-surface-variant leading-relaxed">${n.text}</p>
        `;
        listContainer.appendChild(item);
    });
}

function simulateBookingCountdown(bookingId, pickup, destination) {
    // 8s: 4 hours remaining
    setTimeout(() => {
        addNotification("Upcoming Trip Alert", `Your ride (ID: ${bookingId}) from ${pickup} to ${destination} is scheduled in 4 hours.`);
    }, 8000);
    
    // 20s: 1 hour remaining
    setTimeout(() => {
        addNotification("Upcoming Trip Alert", `Your ride (ID: ${bookingId}) from ${pickup} to ${destination} is scheduled in 1 hour. Please prepare for departure.`);
    }, 20000);
    
    // 32s: bus at terminal
    setTimeout(() => {
        addNotification("Bus Status Alert", `Your bus for ride (ID: ${bookingId}) has arrived at the terminal in ${pickup}. Boarding is now open.`);
    }, 32000);
}

function openPassengerRoster(tripId) {
    const trip = state.trips.find(t => t.id === tripId);
    if (!trip) {
        showToast("Trip not found", "error");
        return;
    }
    
    let booking = null;
    if (trip.booking) {
        booking = state.bookings.find(b => b.id === trip.booking);
    }
    if (!booking) {
        const bookingIdFromTrip = tripId.replace("RT-", "");
        booking = state.bookings.find(b => b.id.toString() === bookingIdFromTrip);
    }
    
    if (!booking) {
        booking = {
            id: trip.booking || tripId.replace("RT-", ""),
            passenger_name: "Customer / Portal Booking",
            passenger_contact: "555-0199",
            pickup_point: trip.source,
            destination: trip.destination,
            notes: "Seats: 1A, 1B",
            passengers: 2
        };
        state.bookings.push(booking);
        saveMockState();
    }
    
    const vehicle = state.vehicles.find(v => v.id === trip.vehicleId) || { capacity: 70 };
    const capacity = vehicle.capacity;
    
    const seatMatch = (booking.notes || "").match(/Seats:\s*([A-Za-z0-9,\s]+)/i);
    const mySeatsStr = seatMatch ? seatMatch[1].trim() : "";
    const mySeats = mySeatsStr ? mySeatsStr.split(',').map(s => s.trim().toUpperCase()) : [];
    
    document.getElementById("roster-booking-id").value = booking.id;
    document.getElementById("roster-trip-id").value = trip.id;
    document.getElementById("roster-passenger-name").value = booking.passenger_name || "";
    document.getElementById("roster-passenger-contact").value = booking.passenger_contact || "";
    document.getElementById("roster-pickup-point").value = booking.pickup_point || "";
    document.getElementById("roster-destination").value = booking.destination || "";
    document.getElementById("roster-allocated-seats").value = mySeatsStr;
    
    const otherBooked = getRosterSeatMap(trip.id, mySeats, capacity);
    
    const grid = document.getElementById("roster-seat-map-grid");
    if (grid) {
        grid.innerHTML = "";
        const totalRows = Math.ceil(capacity / 4);
        
        for (let r = 1; r <= totalRows; r++) {
            const leftCols = ['A', 'B'];
            const rightCols = ['C', 'D'];
            
            leftCols.forEach(col => {
                const seatId = `${r}${col}`;
                const seatBtn = createSeatElement(seatId, mySeats, otherBooked);
                grid.appendChild(seatBtn);
            });
            
            const aisle = document.createElement("div");
            aisle.className = "flex items-center justify-center text-label-caps text-on-surface-variant/40 text-[10px] font-bold h-8 w-8";
            aisle.textContent = r;
            grid.appendChild(aisle);
            
            rightCols.forEach(col => {
                const seatId = `${r}${col}`;
                const seatBtn = createSeatElement(seatId, mySeats, otherBooked);
                grid.appendChild(seatBtn);
            });
        }
    }
    
    const modal = document.getElementById("modal-passenger-roster");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

function getRosterSeatMap(tripId, mySeats, capacity) {
    const hash = String(tripId).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const occupancyRate = 0.3 + (hash % 20) / 100;
    const otherBooked = new Set();
    const cols = ['A', 'B', 'C', 'D'];
    const totalRows = Math.ceil(capacity / 4);
    
    for (let r = 1; r <= totalRows; r++) {
        for (const col of cols) {
            const seatId = `${r}${col}`;
            if (mySeats.includes(seatId)) {
                continue;
            }
            const seatHash = (hash + r * 7 + col.charCodeAt(0) * 13) % 100;
            if (seatHash < occupancyRate * 100) {
                otherBooked.add(seatId);
            }
        }
    }
    return otherBooked;
}

function createSeatElement(seatId, mySeats, otherBooked) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "w-8 h-8 rounded text-xs font-bold transition-all flex items-center justify-center";
    btn.textContent = seatId;
    
    if (otherBooked.has(seatId)) {
        btn.className += " bg-error/10 text-error/40 border border-error/20 cursor-not-allowed";
        btn.disabled = true;
    } else if (mySeats.includes(seatId)) {
        btn.className += " bg-primary/20 text-primary border border-primary shadow-[0_0_8px_rgba(76,215,246,0.3)]";
        btn.onclick = () => toggleRosterSeat(seatId);
    } else {
        btn.className += " bg-surface-container-high border border-outline-variant/40 text-on-surface hover:border-primary/60 hover:text-primary";
        btn.onclick = () => toggleRosterSeat(seatId);
    }
    return btn;
}

function toggleRosterSeat(seatId) {
    const input = document.getElementById("roster-allocated-seats");
    if (!input) return;
    
    let seats = input.value.split(",")
        .map(s => s.trim().toUpperCase())
        .filter(s => s.length > 0);
        
    if (seats.includes(seatId)) {
        seats = seats.filter(s => s !== seatId);
    } else {
        seats.push(seatId);
    }
    
    seats.sort((a, b) => {
        const rowA = parseInt(a.slice(0, -1));
        const rowB = parseInt(b.slice(0, -1));
        if (rowA !== rowB) return rowA - rowB;
        return a.slice(-1).localeCompare(b.slice(-1));
    });
    
    input.value = seats.join(", ");
    
    const tripId = document.getElementById("roster-trip-id").value;
    const trip = state.trips.find(t => t.id === tripId);
    const vehicle = state.vehicles.find(v => v.id === trip.vehicleId) || { capacity: 70 };
    const otherBooked = getRosterSeatMap(trip.id, seats, vehicle.capacity);
    
    const grid = document.getElementById("roster-seat-map-grid");
    if (grid) {
        grid.innerHTML = "";
        const totalRows = Math.ceil(vehicle.capacity / 4);
        for (let r = 1; r <= totalRows; r++) {
            const leftCols = ['A', 'B'];
            const rightCols = ['C', 'D'];
            
            leftCols.forEach(col => {
                const sId = `${r}${col}`;
                const seatBtn = createSeatElement(sId, seats, otherBooked);
                grid.appendChild(seatBtn);
            });
            
            const aisle = document.createElement("div");
            aisle.className = "flex items-center justify-center text-label-caps text-on-surface-variant/40 text-[10px] font-bold h-8 w-8";
            aisle.textContent = r;
            grid.appendChild(aisle);
            
            rightCols.forEach(col => {
                const sId = `${r}${col}`;
                const seatBtn = createSeatElement(sId, seats, otherBooked);
                grid.appendChild(seatBtn);
            });
        }
    }
}

async function submitRosterPassengerForm(e) {
    e.preventDefault();
    const bookingId = document.getElementById("roster-booking-id").value;
    const tripId = document.getElementById("roster-trip-id").value;
    const passengerName = document.getElementById("roster-passenger-name").value.trim();
    const passengerContact = document.getElementById("roster-passenger-contact").value.trim();
    const allocatedSeats = document.getElementById("roster-allocated-seats").value.trim();
    
    if (!passengerName || !passengerContact) {
        showToast("Please fill in name and contact details.", "error");
        return;
    }
    
    const payload = {
        passenger_name: passengerName,
        passenger_contact: passengerContact,
        notes: `Seats: ${allocatedSeats}`
    };
    
    try {
        if (jwtToken && !jwtToken.startsWith("mock_")) {
            const resp = await fetch(`/api/v1/trips/bookings/${bookingId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(payload)
            });
            
            if (resp.ok) {
                showToast("Passenger details updated successfully in database.", "success");
            } else {
                showToast("Failed to update passenger details on server.", "error");
            }
            await fetchBackendData();
        } else {
            const booking = state.bookings.find(b => b.id.toString() === bookingId.toString());
            if (booking) {
                booking.passenger_name = passengerName;
                booking.passenger_contact = passengerContact;
                booking.notes = `Seats: ${allocatedSeats}`;
                saveMockState();
                showToast("Offline passenger details updated!", "success");
            } else {
                showToast("Booking not found in offline state.", "error");
            }
        }
        closeAllModals();
        renderRoutes();
        if (typeof renderTickets === 'function') renderTickets();
    } catch (err) {
        console.error(err);
        showToast("Error updating passenger details.", "error");
    }
}

async function assignVehicleToSelf(vehicleId) {
    const vehicle = state.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) {
        showToast("Vehicle not found.", "error");
        return;
    }
    
    const activeName = state.currentUser ? `${state.currentUser.first_name || ""} ${state.currentUser.last_name || ""}`.toLowerCase().trim() : "";
    const driver = state.drivers.find(d => 
        (d.userPk && state.currentUser && d.userPk === state.currentUser.id) || 
        (d.name && d.name.toLowerCase().includes(activeName))
    );
    
    if (!driver) {
        showToast("Logged-in driver profile not found.", "error");
        return;
    }
    
    try {
        if (jwtToken && !jwtToken.startsWith("mock_")) {
            const currentVehicles = state.vehicles.filter(v => v.driverPk === driver.pk);
            for (const cv of currentVehicles) {
                await fetch(`/api/v1/fleet/vehicles/${cv.pk}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({ driver: null, status: 'available' })
                });
            }
            
            const resVeh = await fetch(`/api/v1/fleet/vehicles/${vehicle.pk}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ driver: driver.pk, status: 'in_service' })
            });
            
            if (resVeh.ok) {
                const hasActiveTrip = state.trips.some(t => t.driverId === driver.id && t.status === "In Transit");
                if (!hasActiveTrip) {
                    const routePk = state.routes && state.routes.length > 0 ? state.routes[0].id : 1;
                    const pickup = state.routes && state.routes.length > 0 ? state.routes[0].start_location : "Central Station";
                    const destination = state.routes && state.routes.length > 0 ? state.routes[0].end_location : "Airport Terminal 3";
                    
                    const resBooking = await fetch('/api/v1/trips/bookings/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        body: JSON.stringify({
                            passenger_name: "Self / Driver Dispatch Tour",
                            passenger_contact: "999",
                            pickup_point: pickup,
                            destination: destination,
                            scheduled_date: new Date().toISOString().split('T')[0],
                            scheduled_time: "08:00:00",
                            passengers: 1,
                            route: routePk,
                            vehicle: vehicle.pk,
                            driver: driver.pk,
                            status: "assigned"
                        })
                    });
                    
                    if (resBooking.ok) {
                        const bookingData = await resBooking.json();
                        await fetch('/api/v1/trips/trips/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${jwtToken}`
                            },
                            body: JSON.stringify({
                                booking: bookingData.id,
                                vehicle: vehicle.pk,
                                driver: driver.pk,
                                start_timestamp: new Date().toISOString(),
                                status: "ongoing",
                                distance_travelled_km: 15
                            })
                        });
                    }
                }
                showToast(`Vehicle ${vehicleId} assigned to you and tour started!`, "success");
            } else {
                showToast("Failed to assign vehicle in database.", "error");
            }
            await fetchBackendData();
        } else {
            state.vehicles.forEach(v => {
                if (v.driverPk === driver.pk) {
                    v.driverPk = null;
                    v.driverName = "None";
                    v.status = "Available";
                }
            });
            
            vehicle.driverPk = driver.pk;
            vehicle.driverName = driver.name;
            vehicle.status = "In Transit";
            driver.vehicle = vehicle.id;
            
            const mockBookingId = Math.floor(Math.random() * 9000) + 1000;
            const pickup = "Central Station";
            const destination = "Airport Terminal 3";
            
            const mockBooking = {
                id: mockBookingId,
                passenger_name: "Self / Driver Dispatch Tour",
                passenger_contact: "999",
                pickup_point: pickup,
                destination: destination,
                scheduled_date: new Date().toISOString().split('T')[0],
                scheduled_time: "08:00:00",
                passengers: 1,
                route: 1,
                vehicle: vehicle.id,
                driver: driver.id,
                status: "assigned",
                notes: "Seats: 1A"
            };
            state.bookings.unshift(mockBooking);
            
            const mockTrip = {
                pk: Math.floor(Math.random() * 900) + 100,
                id: `RT-${mockBookingId}`,
                source: pickup,
                destination: destination,
                progress: 0,
                distance: 15,
                duration: 30,
                vehicleId: vehicle.id,
                driverId: driver.id,
                status: "In Transit"
            };
            state.trips.unshift(mockTrip);
            
            saveMockState();
            showToast(`Offline Vehicle ${vehicleId} assigned and tour started!`, "success");
        }
        renderVehicles();
        renderDashboard();
    } catch (err) {
        console.error(err);
        showToast("Error assigning vehicle.", "error");
    }
}

function saveMockState() {
    localStorage.setItem("skyways_mock_vehicles", JSON.stringify(state.vehicles || []));
    localStorage.setItem("skyways_mock_drivers", JSON.stringify(state.drivers || []));
    localStorage.setItem("skyways_mock_trips", JSON.stringify(state.trips || []));
    localStorage.setItem("skyways_mock_bookings", JSON.stringify(state.bookings || []));
    localStorage.setItem("skyways_mock_complaints", JSON.stringify(state.complaints || []));
    localStorage.setItem("skyways_mock_feedbacks", JSON.stringify(state.feedbacks || []));
    localStorage.setItem("skyways_mock_expenses", JSON.stringify(state.expenses || []));
    localStorage.setItem("skyways_mock_revenues", JSON.stringify(state.revenues || []));
}