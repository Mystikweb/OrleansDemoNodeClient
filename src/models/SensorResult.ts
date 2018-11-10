export class SensorResult {
    temperature: number;
    humidity: number;
    error: any;

    constructor(temp: number, humid: number, err: any) {
        this.temperature = temp;
        this.humidity = humid;
        this.error = err;
    }
}