import { Gpio } from 'pigpio';

export enum PinState {
    ON = 1,
    OFF = 0
}

export class RGBLight {
    private redPin: Gpio;
    private greenPin: Gpio;
    private bluePin: Gpio;

    constructor(redPinNumber: number, 
        greenPinNumber: number, 
        bluePinNumber: number) {
        this.redPin = new Gpio(redPinNumber, { mode: Gpio.OUTPUT });
        this.greenPin = new Gpio(greenPinNumber, { mode: Gpio.OUTPUT });
        this.bluePin = new Gpio(bluePinNumber, { mode: Gpio.OUTPUT });
    }

    off(waitTime: number | null | undefined) {
        waitTime = waitTime ? waitTime : 1000;
        
        setTimeout(() => {
            this.redPin.digitalWrite(PinState.OFF);
            this.greenPin.digitalWrite(PinState.OFF);
            this.bluePin.digitalWrite(PinState.OFF);
        }, waitTime);
    }

    white(waitTime: number | null | undefined) {
        waitTime = waitTime ? waitTime : 1000;

        setTimeout(() => {
            this.redPin.digitalWrite(PinState.ON);
            this.greenPin.digitalWrite(PinState.ON);
            this.bluePin.digitalWrite(PinState.ON);
        }, waitTime);
    }

    red(waitTime: number | null | undefined) {
        waitTime = waitTime ? waitTime : 1000;

        setTimeout(() => {
            this.redPin.digitalWrite(PinState.ON);
            this.greenPin.digitalWrite(PinState.OFF);
            this.bluePin.digitalWrite(PinState.OFF);
        }, waitTime);
    }

    green(waitTime: number | null | undefined) {
        waitTime = waitTime ? waitTime : 1000;

        setTimeout(() => {
            this.redPin.digitalWrite(PinState.OFF);
            this.greenPin.digitalWrite(PinState.ON);
            this.bluePin.digitalWrite(PinState.OFF);
        }, waitTime);
    }

    blue(waitTime: number | null | undefined) {
        waitTime = waitTime ? waitTime : 1000;

        setTimeout(() => {
            this.redPin.digitalWrite(PinState.OFF);
            this.greenPin.digitalWrite(PinState.OFF);
            this.bluePin.digitalWrite(PinState.ON);
        }, waitTime);
    }
}