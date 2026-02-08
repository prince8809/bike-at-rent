Bike at Rent – Test Data Reference

This file contains test/seed data derived from the official Bike at Rent rate card.
It is used for backend development, database seeding, and QA testing.

General Assumptions

Currency: INR (₹)

Pricing model: Per day

Default status: available

Hourly pricing: NULL

Security Deposit rules:

Scooters & Local rides → ₹2000

Bikes (Top bikes) → ₹3000

Category Mapping
Category Key	Description
scooter	Performance scooters
bike	Premium / touring bikes
local	Budget local-use vehicles
Scooters (Per Day)

Security Deposit: ₹2000

Name	Daily Price (₹)	Features
Ntorq 125 (Regular)	800	Automatic, Petrol, Comfort Ride
Ntorq 125 (XP / XT)	900	Automatic, Petrol, Sport Mode
Ntorq 125 (New Gen)	1000	Automatic, Petrol, New Generation
Top Bikes (Per Day)

Security Deposit: ₹3000

Name	Daily Price (₹)	Features
Classic / Hunter 350cc	1600	Manual, Petrol, Touring
Himalayan 411	1700	Manual, Petrol, Adventure
Xpulse 200cc	1400	Manual, Petrol, Off-road
TVS Apache RTR 160	1250	Manual, Petrol, Sport
Bajaj Pulsar NS 160	1250	Manual, Petrol, Street
Local Rides (Per Day)

Security Deposit: ₹2000

Name	Daily Price (₹)	Features
Jupiter 110cc	600	Automatic, Petrol, Local Use
Activa 125cc	600	Automatic, Petrol, Local Use
Radeon 110cc	800	Manual, Petrol, Commuter
Access 125cc	700	Automatic, Petrol, Local Use
Free Accessories (Included)

These are included with every rental at no additional cost:

Rider Helmet

Pillion Helmet

Mobile Holder

Luggage Carrier

Bungee Cables

Trip Guidance

Paid Add-ons (Optional)
Item	Price
Riding Gloves	₹100 / set
Elbow & Knee Guards	₹300 / set
Riding Jacket & Pants	₹500 / day
Saddle / Tail / Tank Bag	₹500 / set
Pickup / Drop Charges
Type	Price
One-way (City / Train)	₹300
Two-way	₹500
Backend Notes

Designed to map directly to the Bike model

features → PostgreSQL text[]

Prices → float / numeric

Used for test data and initial DB seeding

Not intended as production pricing source

File: bike_test_data.md
Purpose: Backend testing & seed reference
Status: Initial version

