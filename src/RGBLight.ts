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

    off() {
        this.redPin.digitalWrite(PinState.OFF);
        this.greenPin.digitalWrite(PinState.OFF);
        this.bluePin.digitalWrite(PinState.OFF);
    }

    white() {
        this.redPin.digitalWrite(PinState.ON);
        this.greenPin.digitalWrite(PinState.ON);
        this.bluePin.digitalWrite(PinState.ON);
    }

    red() {
        this.redPin.digitalWrite(PinState.ON);
        this.greenPin.digitalWrite(PinState.OFF);
        this.bluePin.digitalWrite(PinState.OFF);
    }

    green() {
        this.redPin.digitalWrite(PinState.OFF);
        this.greenPin.digitalWrite(PinState.ON);
        this.bluePin.digitalWrite(PinState.OFF);
    }

    blue() {
        this.redPin.digitalWrite(PinState.OFF);
        this.greenPin.digitalWrite(PinState.OFF);
        this.bluePin.digitalWrite(PinState.ON);
    }
}