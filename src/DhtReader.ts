import { DHT11 } from 'rpi-dht-sensor';

import { SensorResult } from './models';

export class Dht11Reader {
    private pin: number = null;
    private sensor: DHT11;

    constructor(pin: number) {
        this.pin = pin;
        this.sensor = new DHT11(this.pin);
    }

    readValue(): SensorResult {
        const sensorReadValue = this.sensor.read();
        console.log(sensorReadValue);

        return new SensorResult(sensorReadValue.temperature,
            sensorReadValue.humidity,
            null);
    }
}