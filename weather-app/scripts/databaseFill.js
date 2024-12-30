require('dotenv').config();

// Function to generate random weather data
function generateRandomWeatherData() {
    const apiKey = process.env.API_PASSWORD;
    const temperature = parseFloat((Math.random() * 60 - 20).toFixed(1));
    const humidity = parseFloat((Math.random() * 100).toFixed(1));
    const pressure = Math.floor(Math.random() * 100 + 950);
    const sunlight = Math.floor(Math.random() * 101);
    const isRaining = Math.random() < 0.5;
    const rain = parseFloat((Math.random() * 100).toFixed(1));
    const time = new Date().toISOString().replace('T', ' ').split('.')[0];
    
    return {
        temperature,
        humidity,
        pressure,
        sunlight,
        isRaining,
        rain,
        password: apiKey,
        time,
        shouldSave: true
    };
}

const url = 'http://localhost:3000/api/weather';
const totalPosts = 300;

// Function to send POST request
async function sendPostRequest(data, i) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log(`Request ${i + 1}: Status Code: ${response.status}`);
    } catch (error) {
        console.log(`Request ${i + 1}: Error: ${error.message}`);
    }
}

(async () => {
    for (let i = 0; i < totalPosts; i++) {
        const data = generateRandomWeatherData();
        await sendPostRequest(data, i);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log("Completed sending POST requests with random weather data.");
})();