export class SensorSummaryViewModel {
    deviceSensorId: number;
    sensorId: number;
    sensorName: string;
    uom: string;
    isEnabled: boolean;
    lastValue?: number;
    lastValueReceived?: Date;
    averageValue?: number;
    totalValue?: number;
}