import { Dht11Reader } from './DhtReader';
import { SensorResult } from './models';

const reader = new Dht11Reader(16);

const result: SensorResult = reader.readValue();
        
console.log(result.temperature);
console.log(result.humidity);
console.log(result.error);