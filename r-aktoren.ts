// Gib deinen Code hier ein

namespace receiver { // r-aktoren.ts

    export enum eRGBled { a, b, c }

    let n_rgbled = [0, 0, 0]
    let n_hupe = false


    //% group="Relais" subcategory="Aktoren"
    //% block="Relais %pON"
    //% pON.shadow="toggleOnOff"
    export function relay(pON: boolean) { }




    //% group="Hupe" subcategory="Aktoren"
    //% block="Hupe %pON"
    //% pON.shadow="toggleOnOff"
    export function hupe(pON: boolean) {
        if (n_hupe !== pON) {
            n_hupe = pON
            if (n_hupe)
                music.ringTone(262)
            else
                music.stopAllSounds()
            // pins.digitalWritePin(pinBuzzer, n_buzzer ? 1 : 0)
        }
    }





    //% group="Licht" subcategory="Aktoren"
    //% block="RGB LEDs %led %color %on" weight=6
    //% color.shadow="colorNumberPicker"
    //% on.shadow="toggleOnOff"
    export function rgbLEDon(led: eRGBled, color: number, on: boolean) {
        rgbLEDs(led, (on ? color : 0), false)
    }
 
    //% group="Licht" subcategory="Aktoren"
    //% block="RGB LEDs %led %color blinken %blinken" weight=5
    //% color.shadow="colorNumberPicker"
    //% blinken.shadow="toggleYesNo"
    export function rgbLEDs(led: eRGBled, color: number, blinken: boolean) {
        if (blinken && n_rgbled[led] != 0)
            n_rgbled[led] = 0
        else
            n_rgbled[led] = color

        //basic.setLedColors(n_rgbled[0], n_rgbled[1], n_rgbled[2])
    }



    // I²C Adresse Single Relay
    const i2cRelay = 0x19

    const SINGLE_OFF = 0x00
    const SINGLE_ON = 0x01

    //% group="SparkFun Qwiic Single Relay"
    //% block="Magnet %pOn"
    //% pOn.shadow="toggleOnOff"
    export function turnRelay(pOn: boolean) {
        pins.i2cWriteBuffer(i2cRelay, Buffer.fromArray([pOn ? SINGLE_ON : SINGLE_OFF]))
    }

} // r-aktoren.ts
