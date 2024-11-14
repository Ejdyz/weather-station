import os
import requests
import random
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Function to generate random weather data
def generate_random_weather_data(req_number):
    api_key = os.environ['API_PASSWORD']
    weather_data = {
        "temperature": round(random.uniform(-20, 40), 1),
        "humidity": round(random.uniform(0, 100), 1),
        "pressure": random.randint(950, 1050),
        "sunlight": random.randint(0, 100),
        "isRaining": random.choice([True, False]),
        "rain": round(random.uniform(0, 100), 1),
        "password": api_key,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "reqNumber": req_number
    }
    return weather_data

# URL to send the POST request to
url = 'http://localhost:3000/api/weather'

# Define the total number of posts
total_posts = 30000  # Adjust this as needed

# Send POST requests with a 1-second delay between each
for i in range(total_posts):
    req_number = i % 144  # Reset to 0 every 143 posts
    data = generate_random_weather_data(req_number)
    response = requests.post(url, json=data)
    print(f"Request {i + 1}: Status Code: {response.status_code}")

print("Completed sending POST requests with random weather data.")
