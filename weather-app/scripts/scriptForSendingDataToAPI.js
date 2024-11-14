// Replace this with your actual API endpoint
const apiEndpoint = 'http://raspberrypi.local:3000/api/weather';

// Sample data array (replace this with your actual JSON data array)
const dataArray = [
    {"isRaining": true, "time": "2024-11-13T16:20:32", "password": "password", "pressure": 1013.95, "sunlight": 528, "shouldSave": true, "rain": 0.1, "humidity": 99.9, "temperature": 2.0},
    
];

// Function to send data to the API
async function sendDataToAPI(dataArray) {
    for (const data of dataArray) {
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                console.error(`Error with ID ${data.id}:`, response.statusText);
            } else {
                const result = await response.json();
                console.log(`Success for ID ${data.id}:`, result);
            }
        } catch (error) {
            console.error(`Network error for ID ${data.id}:`, error);
        }
    }
}

// Call the function to send data
sendDataToAPI(dataArray);
