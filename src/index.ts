import AppSettings from './appsettings.json';

import { RGBLight } from './RGBLight';
import { Dht11Reader } from './DhtReader';
import { SensorResult } from './models';

const light = new RGBLight(AppSettings.LED_Red,
    AppSettings.LED_Green,
    AppSettings.LED_Blue);

const reader = new Dht11Reader(AppSettings.DHT11);

const result: SensorResult = reader.readValue();
        
console.log(result.temperature);
console.log(result.humidity);
console.log(result.error)

light.green(1000);

light.off(5000);
