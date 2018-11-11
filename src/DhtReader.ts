import { DHT11 } from 'rpi-dht-sensor';

import { SensorResult } from './models';

export class Dht11Reader {
    private pin: number = null;
    private sensor: DHT11;

    constructor(pin: number) {
        this.pin = pin;
        this.sensor = new DHT11(this.pin);
    }

    readValue(): Promise<SensorResult> {
        return new Promise<SensorResult>((resolve, reject) => {
            let sensorReadValue: any = null;
            
            setTimeout(() => {
                sensorReadValue = this.sensor.read();
                console.log(sensorReadValue);

                if (sensorReadValue.isValid && sensorReadValue.errors === 0) {
                    resolve(new SensorResult(sensorReadValue.temperature,
                        sensorReadValue.humidity,
                        null));
                } else { 
                    reject(sensorReadValue);
                }
            }, 500);
        });
    }
}