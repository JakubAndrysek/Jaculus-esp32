import { stdout } from 'stdio';
import { waitForIp, currentIp } from 'wifi';
import { ForrestHubClient, createForrestHubClient } from './forrestHubLib';

/**
 * ForrestHub API Demo
 *
 * This example demonstrates how to use the ForrestHub client library
 * to interact with a ForrestHub server.
 */

async function runForrestHubDemo() {
    stdout.write("=== ForrestHub Client Demo ===\n");

    // Wait for WiFi connection
    stdout.write("Waiting for IP address...\n");
    waitForIp();
    stdout.write(`Connected! IP: ${currentIp()}\n\n`);

    // Create ForrestHub client
    // Replace '192.168.1.100' with your ForrestHub server IP
    const forrestHub = createForrestHubClient('192.168.1.100', 4444);

    stdout.write(`Using ForrestHub server: ${forrestHub.getBaseUrl()}\n\n`);

    // Test connection
    try {
        stdout.write("1. Testing connection...\n");
        const isConnected = await forrestHub.testConnection();

        if (isConnected) {
            stdout.write("   ✓ Connection successful!\n\n");
        } else {
            stdout.write("   ✗ Connection failed!\n\n");
            return;
        }
    } catch (error) {
        stdout.write(`   ✗ Connection error: ${error.message}\n\n`);
        return;
    }

    // Example 1: Health check
    try {
        stdout.write("2. Health Check\n");
        const health = await forrestHub.healthCheck();
        stdout.write(`   API Status: ${JSON.stringify(health)}\n\n`);
    } catch (error) {
        stdout.write(`   ✗ Health check error: ${error.message}\n\n`);
    }

    await sleep(1000);

    // Example 2: Get game status
    try {
        stdout.write("3. Getting Game Status\n");
        const gameStatus = await forrestHub.getGameStatus();
        stdout.write(`   Game Status: ${JSON.stringify(gameStatus)}\n\n`);
    } catch (error) {
        stdout.write(`   ✗ Game status error: ${error.message}\n\n`);
    }

    await sleep(1000);

    // Example 3: Variable operations
    try {
        stdout.write("4. Variable Operations\n");

        // Set a variable
        stdout.write("   Setting variable: project='esp32_demo', key='sensor_temp', value=23.5\n");
        await forrestHub.setVariable('esp32_demo', 'sensor_temp', 23.5);

        // Get the variable back
        const temp = await forrestHub.getVariable('esp32_demo', 'sensor_temp');
        stdout.write(`   Retrieved temperature: ${JSON.stringify(temp)}\n`);

        // Check if variable exists
        const exists = await forrestHub.variableExists('esp32_demo', 'sensor_temp');
        stdout.write(`   Variable exists: ${JSON.stringify(exists)}\n\n`);
    } catch (error) {
        stdout.write(`   ✗ Variable operations error: ${error.message}\n\n`);
    }

    await sleep(1000);

    // Example 4: Array operations
    try {
        stdout.write("5. Array Operations\n");

        // Add record to array
        const sensorData = {
            timestamp: Date.now(),
            temperature: 23.5,
            humidity: 45.2,
            device: "ESP32-S3"
        };

        stdout.write("   Adding sensor data to array...\n");
        await forrestHub.addArrayRecord('esp32_demo', 'sensor_readings', sensorData, `reading_${Date.now()}`);

        // Get all records
        const allReadings = await forrestHub.getAllArrayRecords('esp32_demo', 'sensor_readings');
        stdout.write(`   Total sensor readings: ${JSON.stringify(allReadings)}\n\n`);
    } catch (error) {
        stdout.write(`   ✗ Array operations error: ${error.message}\n\n`);
    }

    await sleep(1000);

    // Example 5: Get client count
    try {
        stdout.write("6. Getting Client Count\n");
        const clientCount = await forrestHub.getClientsCount();
        stdout.write(`   Connected clients: ${JSON.stringify(clientCount)}\n\n`);
    } catch (error) {
        stdout.write(`   ✗ Client count error: ${error.message}\n\n`);
    }

    await sleep(1000);

    // Example 6: Send admin message
    try {
        stdout.write("7. Sending Admin Message\n");
        const message = `Hello from ESP32! Time: ${new Date().toISOString()}`;
        await forrestHub.sendAdminMessage(message);
        stdout.write(`   ✓ Admin message sent: ${message}\n\n`);
    } catch (error) {
        stdout.write(`   ✗ Admin message error: ${error.message}\n\n`);
    }

    stdout.write("=== ForrestHub Demo Completed ===\n");
    stdout.write("The ForrestHub client library is working correctly!\n");

    // Optional: Run continuous monitoring (uncomment to enable)
    // await runContinuousMonitoring(forrestHub);
}

/**
 * Optional continuous monitoring - uncomment the call above to enable
 */
async function runContinuousMonitoring(forrestHub: ForrestHubClient) {
    stdout.write("\n--- Starting continuous monitoring (every 10 seconds) ---\n");

    let count = 0;
    while (true) {
        try {
            count++;
            stdout.write(`Monitoring #${count}: `);

            // Send periodic sensor data
            const sensorData = {
                timestamp: Date.now(),
                temperature: 20 + Math.random() * 10, // Random temp 20-30°C
                humidity: 40 + Math.random() * 20,     // Random humidity 40-60%
                device: "ESP32-S3",
                reading_count: count
            };

            await forrestHub.addArrayRecord('esp32_demo', 'live_readings', sensorData, `live_${Date.now()}`);
            await forrestHub.setVariable('esp32_demo', 'last_reading_time', new Date().toISOString());

            stdout.write(`Temperature: ${sensorData.temperature.toFixed(1)}°C, Humidity: ${sensorData.humidity.toFixed(1)}%\n`);

        } catch (error) {
            stdout.write(`Error: ${error.message}\n`);
        }

        await sleep(10000); // 10 second intervals
    }
}

// Start the demo
runForrestHubDemo().catch(error => {
    stdout.write(`Fatal error: ${error.message}\n`);
    exit(1);
});
