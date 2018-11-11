(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
(<any>global).WebSocket = require("websocket").w3cwebsocket;

import AppSettings from './appsettings.json';

import { RGBLight } from './RGBLight';
import { Dht11Reader } from './DhtReader';
import { SensorResult, DeviceViewModel, DeviceSensorViewModel, SensorValueViewModel } from './models';
import { MessageClient, MessageClientEvents } from './MessageClient';

let device: DeviceViewModel;
let tempSensor: DeviceSensorViewModel;
let humiditySensor: DeviceSensorViewModel;

const light = new RGBLight(AppSettings.LED_Red,
    AppSettings.LED_Green,
    AppSettings.LED_Blue);

const reader = new Dht11Reader(AppSettings.DHT11);

const messageClient = new MessageClient(AppSettings.MessagingUrl,
    AppSettings.RegistrationHub,
    AppSettings.SensorHub);

messageClient.on(MessageClientEvents.CONFIG_RECEIVED, (result: DeviceViewModel) => {
    device = result;
    tempSensor = device.sensors.find(s => s.sensorName === 'Temperature');
    humiditySensor = device.sensors.find(s => s.sensorName === 'Humidity');

    console.log('Received configuration starting to read values', device);

    setInterval(() => {
        light.off(500);
    
        light.white(500);
        reader.readValue()
            .then((result: SensorResult) => {
                light.green(500);

                if (tempSensor && tempSensor.isEnabled) {
                    console.log(`Sending temperature value ${result.temperature}${tempSensor.uom}`);
                    light.blue(500);
                    messageClient.sendSensorValue(new SensorValueViewModel(tempSensor.deviceSensorId,
                        result.temperature));
                }

                light.green(500);

                if (humiditySensor && humiditySensor.isEnabled) {
                    console.log(`Sending humidity value ${result.humidity}${humiditySensor.uom}`);
                    light.blue(500);
                    messageClient.sendSensorValue(new SensorValueViewModel(humiditySensor.deviceSensorId,
                        result.humidity));
                }

                light.off(500);
            })
            .catch((err) => {
                console.error(err);
                light.red(1000);
                light.off(500);
            });
    }, 30000);
});

setTimeout(() => {
    messageClient.sendRegistration(AppSettings.DeviceName);
}, 5000);
