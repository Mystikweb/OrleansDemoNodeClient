export class SensorValueViewModel {
    deviceSensorId: number;
    value: number;
    timeStamp: Date;

    constructor(deviceSensorId: number, value: number) {
        this.deviceSensorId = deviceSensorId;
        this.value = value;

        const currentDate = new Date(Date.now());
        this.timeStamp = new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate(),
                currentDate.getUTCHours(),
                currentDate.getUTCMinutes(),
                currentDate.getUTCSeconds(),
                currentDate.getUTCMilliseconds()
            )
        );
    }
}
