import AppSettings from './appsettings.json';

import { RGBLight } from './RGBLight';
import { Dht11Reader } from './DhtReader';
import { SensorResult } from './models';

const light = new RGBLight(AppSettings.LED_Red,
    AppSettings.LED_Green,
    AppSettings.LED_Blue);

light.off();
setTimeout(() => light.red(), 5000);
setTimeout(() => light.green(), 5000);
setTimeout(() => light.blue(), 5000);
setTimeout(() => light.white(), 5000);
setTimeout(() => light.off(), 2000);

const reader = new Dht11Reader(AppSettings.DHT11);

const result: SensorResult = reader.readValue();
        
console.log(result.temperature);
console.log(result.humidity);
console.log(result.error);