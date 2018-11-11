import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { DeviceViewModel, SensorSummaryViewModel, SensorValueViewModel } from './models';
import { EventEmitter } from 'events';

export class MessageClientEvents {
    public static readonly CONFIG_RECEIVED: string = 'configReceived';
    public static readonly STATE_RECEIVED: string = 'stateReceived';
}

export class MessagingEvents {
    public static readonly RECEIVE_CONFIG: string = 'receiveConfig';
    public static readonly CURRENT_STATE: string = 'currentState';
    public static readonly REGISTER_DEVICE: string = 'registerDevice';
    public static readonly RECORD_VALUE: string = 'recordvalue';
}

export class MessageClient extends EventEmitter {
    private registrationHub: HubConnection;
    private sensorValueHub: HubConnection;

    isRegistrationConnected: boolean = false;
    isSensorValuesConnected: boolean = false;

    constructor(
        messagingUri: string,
        registrationEndPoint: string,
        sensorValueEndPoint: string
    ) {
        super();

        this.registrationHub = new HubConnectionBuilder()
            .withUrl(`${messagingUri}${registrationEndPoint}`)
            .configureLogging(LogLevel.Information)
            .build();

        this.sensorValueHub = new HubConnectionBuilder()
            .withUrl(`${messagingUri}${sensorValueEndPoint}`)
            .configureLogging(LogLevel.Information)
            .build();

        this.registrationHub
            .start()
            .then(() => {
                console.log('Registration connected');
                this.isRegistrationConnected = true;
            })
            .catch(err => {
                console.error(err);
            });

        this.sensorValueHub
            .start()
            .then(() => {
                console.log('Sensor values connected');
                this.isSensorValuesConnected = true;
            })
            .catch(err => {
                console.error(err);
            });

        this.registrationHub.on(
            MessagingEvents.RECEIVE_CONFIG,
            (result: DeviceViewModel) => {
                this.emit(MessageClientEvents.CONFIG_RECEIVED, result);
            }
        );

        this.sensorValueHub.on(
            MessagingEvents.CURRENT_STATE,
            (result: SensorSummaryViewModel) => {
                this.emit(MessageClientEvents.STATE_RECEIVED, result);
            }
        );
    }

    sendRegistration(name: string): Promise<void> {
        return this.registrationHub.send(MessagingEvents.REGISTER_DEVICE, name);
    }

    sendSensorValue(content: SensorValueViewModel): Promise<void> {
        return this.sensorValueHub.send(MessagingEvents.RECEIVE_CONFIG, content);
    }
}
