import { DeviceSensorViewModel } from "./DeviceSensorViewModel";
import { DeviceEventTypeViewModel } from "./DeviceEventTypeViewModel";
import { DeviceStateViewModel } from "./DeviceStateViewModel";

export class DeviceViewModel {
    deviceId: string;
    name: string;
    isEnabled: boolean;
    sensors: Array<DeviceSensorViewModel>;
    eventTypes: Array<DeviceEventTypeViewModel>;
    states: Array<DeviceStateViewModel>;
}