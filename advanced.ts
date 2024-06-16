
namespace radio { // advanced.ts


    // ========== group="Kommentar" advanced=true

    //% group="Funktionen" advanced=true
    //% block="// %text" weight=9
    export function comment(text: string): void { }



    // ========== group="Funktionen" advanced=true

    //% group="Funktionen" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=8
    export function between(i0: number, i1: number, i2: number): boolean {
        return (i0 >= i1 && i0 <= i2)
    }

    //% group="Funktionen" advanced=true
    //% block="Prozent (1 ↓ 128 ↑ 255) %value * %prozent \\%" weight=6
    //% value.min=1 value.max=255 value.defl=128
    //% prozent.min=10 prozent.max=100 prozent.defl=100
    export function motorProzent(value: number, prozent: number) {
        return Math.idiv((value - 128) * prozent, 100) + 128
    }

    //% group="Funktionen" advanced=true
    //% block="mapInt32 %value|from low %fromLow|high %fromHigh|to low %toLow|high %toHigh" weight=4
    //% inlineInputMode=inline
    export function mapInt32(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        // return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
        return Math.idiv(Math.imul(value - fromLow, toHigh - toLow), fromHigh - fromLow) + toLow
    }



    //% group="Funktionen" advanced=true
    //% block="Simulator" weight=3
    export function simulator() { return "€".charCodeAt(0) == 8364 }


    //% group="Funktionen" advanced=true
    //% block="Funkgruppe" weight=2
    export function funkgruppe() { return n_funkgruppe }





    //% group="Funktionen" advanced=true deprecated=true
    //% block="motorProzent1 %value max %prozent"
    //% value.min=1 value.max=255 value.defl=128
    //% prozent.min=10 prozent.max=127 prozent.defl=127
    export function motorProzent1(value: number, prozent: number) {
        return mapInt32(value, 1, 255, 128 - prozent, 128 + prozent)
    }

    //% group="Funktionen" advanced=true
    //% block="mapInt32 %value|from low %fromLow|high %fromHigh|to low %toLow|high %toHigh" weight=4
    //% inlineInputMode=inline
    /* export function mapInt32(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        // return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
        return Math.idiv(Math.imul(value - fromLow, toHigh - toLow), fromHigh - fromLow) + toLow
    } */




    // ========== group="Buffer" advanced=true

    //% group="Buffer" advanced=true
    //% block="Buffer %buffer getNumber(%format offset %offset)" weight=8
    //% format.defl=NumberFormat.UInt8LE
    //% offset.min=0 offset.max=18
    export function getNumber(buffer: Buffer, format: NumberFormat, offset: number): number { return buffer.getNumber(format, offset) }

    //% group="Buffer" advanced=true
    //% block="Buffer %buffer setNumber(%format offset %offset value %value)" weight=7
    //% format.defl=NumberFormat.UInt8LE
    //% offset.min=0 offset.max=18
    //% inlineInputMode=inline
    export function setNumber(buffer: Buffer, format: NumberFormat, offset: number, value: number) { buffer.setNumber(format, offset, value) }

    //% group="Buffer" advanced=true
    //% block="Buffer %buffer offset %offset getBit 2** %exp" weight=4
    //% offset.min=0 offset.max=18
    //% exp.min=0 exp.max=7
    export function getBit(buffer: Buffer, offset: number, exp: number): boolean {
        return (buffer[offset] & 2 ** Math.trunc(exp)) != 0
    }

    //% group="Buffer" advanced=true
    //% block="Buffer %buffer offset %offset setBit 2** %exp %pBit" weight=3
    //% offset.min=0 offset.max=18
    //% exp.min=0 exp.max=7
    //% inlineInputMode=inline
    export function setBit(buffer: Buffer, offset: number, exp: number, bit: boolean) {
        if (bit)
            buffer[offset] | 2 ** Math.trunc(exp)
        else
            buffer[offset] & ~(2 ** Math.trunc(exp))
    }

    //% group="Buffer" advanced=true
    //% block="%pNumber .toHex()" weight=1
    export function toHex(bytes: number[]): string { return Buffer.fromArray(bytes).toHex() }


} // advanced.ts
