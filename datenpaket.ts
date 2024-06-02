
namespace radio
/*
Calliope Bluetooth Erweiterung für 19 Byte Buffer und CaR Fernsteuerung
für CalliBot, MakerKitCar, CaR4
240601 Lutz Elßner
*/ { // datenpaket.ts


    // ========== Buffer offset

    //% group="Enums" advanced=true
    //% block="%bufferpointer" weight=2
    function radio_bufferpointer(bufferpointer: eBufferPointer) { return bufferpointer }
    export enum eBufferPointer {
        //% block="[1] Motor M0"
        m0 = 1,
        //% block="[4] Motor M1"
        m1 = 4,
        //% block="[7] Motor MA"
        ma = 7,
        //% block="[10] Motor MB"
        mb = 10,
        //% block="[13] Motor MC"
        mc = 13,
        //% block="[16] Motor MD"
        md = 16,


        //% block="M0 | Joystick"
        p0 = 1,
        //% block="M1 | 1. Strecke | Ultraschall"
        p1 = 4,
        //% block="MA | 2. Strecke | Spur 00"
        p2 = 7,
        //% block="MB | 3. Strecke | Spur 01"
        p3 = 10,
        //% block="MC | 4. Strecke | Spur 10"
        p4 = 13,
        //% block="MD | 5. Strecke | Spur 11"
        p5 = 16
    }

    //% group="Enums" advanced=true
    //% block="%bufferoffset" weight=1
    function radio_bufferoffset(bufferoffset: eBufferOffset) { return bufferoffset }
    export enum eBufferOffset { // 3 Byte (b0-b1-b2) ab n_BufferPointer
        //% block="Motor (1 ↓ 128 ↑ 255)"
        b0_Motor = 0, // 1..128..255
        //% block="Servo (1 ↖ 16 ↗ 31)"
        b1_Servo = 1, // Bit 4-0 (0..31)
        //% block="Entfernung 0..255 cm"
        b2_Fahrstrecke = 2, // Encoder in cm max. 255cm
        // b1_3Bit = 3 // Bit 7-6-5
    }


    // ========== Servo Bits 7-6-5

    export enum eSensor {
        //% block="Stop bei Spursensor"
        b5 = 0x20,
        //% block="Stop bei Ultraschallsensor"
        b6 = 0x40,
        //% block="Encoder Impulse"
        b7 = 0x80
    }



    // ========== Steuer-Byte 0

    //% group="Enums" advanced=true
    //% block="[0] Betriebsart %betriebsart" weight=6
    function radio_betriebsart(betriebsart: e0Betriebsart) { return betriebsart }
    export enum e0Betriebsart {
        //% block="00 Fernsteuerung Motoren"
        p0 = 0x00,
        //% block="10 Fernsteuerung Motor M0 bis Sensor"
        p1 = 0x10,
        //% block="20 Programm 5 Strecken"
        p2 = 0x20,
        //% block="30 Programm Sensoren"
        p3 = 0x30
    }


    //% group="Enums" advanced=true
    //% block="[0] Schalter %schalter" weight=5
    function radio_schalter(schalter: e0Schalter) { return schalter }
    export enum e0Schalter {
        //% block="0 Hupe"
        b0 = 0x01,
        //% block="1"
        b1 = 0x02,
        //% block="2"
        b2 = 0x04,
        //% block="3"
        b3 = 0x08,
        //% block="6 Status senden"
        b6 = 0x40,
        //% block="7 zurücksetzen"
        b7 = 0x80
    }



    // ========== Steuer-Byte 3

    //% group="Enums" advanced=true
    //% block="[3] %motorbit aktiviert" weight=4
    function radio_aktiviert(motorbit: e3aktiviert) { return motorbit }
    export enum e3aktiviert {
        //% block="M0 | Joystick"
        m0 = 0x01,
        //% block="M1 | 1. Strecke | Ultraschall"
        m1 = 0x02,
        //% block="MA | 2. Strecke | Spur 00"
        ma = 0x04,
        //% block="MB | 3. Strecke | Spur 01"
        mb = 0x08,
        //% block="MC | 4. Strecke | Spur 10"
        mc = 0x10,
        //% block="MD | 5. Strecke | Spur 11"
        md = 0x20,
        //% block="M0 & M1 (0x03)"
        m01 = m0 + m1,
        //% block="MA & MB (0x0C)"
        mab = ma + mb,
        //% block="MC & MD (0x30)"
        mcd = mc + md,
        //% block="alle 6 Bit (0x3F)"
        m01abcd = m01 + mab + mcd
    }

    //% group="Enums" advanced=true
    //% block="[3] Ultraschall Entfernung %entfernung" weight=3
    function radio_entfernung(entfernung: e3Entfernung) { return entfernung }
    export enum e3Entfernung {
        //% block="5 cm"
        u0 = 0x00,
        //% block="10 cm"
        u1 = 0x40,
        //% block="15 cm"
        u2 = 0x80,
        //% block="20 cm"
        u3 = 0xC0
    }



    // ========== group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"


    // ========== Steuer-Byte 0

    //% group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"
    //% block="%buffer [0] Betriebsart %betriebsart" weight=6
    //% buffer.shadow="radio_sendBuffer19"
    export function setBetriebsart(buffer: Buffer, betriebsart: e0Betriebsart) {
        buffer[0] &= 0b11001111 // AND Bit 7-6-3-2-1-0 bleiben; 5-4 auf 0 setzen
        buffer[0] |= (betriebsart & 0b00110000) // OR Bit 7-6-3-2-1-0 bleiben; 5-4 auf pByte setzen
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer [0] Betriebsart" weight=6
    function getBetriebsart(buffer: Buffer): e0Betriebsart {
        return (buffer[0] & 0b00110000)
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer [0] Betriebsart == %betriebsart" weight=6
    export function isBetriebsart(buffer: Buffer, betriebsart: e0Betriebsart): boolean {
        return (buffer[0] & 0b00110000) == betriebsart
    }



    //% group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"
    //% block="%buffer [0] Schalter %schalter %bit" weight=5
    //% buffer.shadow="radio_sendBuffer19"
    //% bit.shadow="toggleOnOff"
    export function setSchalter(buffer: Buffer, schalter: e0Schalter, bit: boolean) {
        if (bit)
            buffer[0] |= schalter // OR Nullen bleiben, nur 1 wird gesetzt
        else
            buffer[0] &= ~schalter // AND Einsen bleiben, nur 0 wird gesetzt
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer [0] Schalter %schalter" weight=5
    export function getSchalter(buffer: Buffer, schalter: e0Schalter): boolean {
        return (buffer[0] & schalter) == schalter
    }



    // ========== Steuer-Byte 3

    //% group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"
    //% block="%buffer [3] %motorBit aktiviert %bit" weight=4
    //% buffer.shadow="radio_sendBuffer19"
    //% bit.shadow="toggleOnOff"
    export function setaktiviert(buffer: Buffer, motorBit: e3aktiviert, bit: boolean) {
        if (bit)
            buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] |= motorBit // OR Nullen bleiben, nur 1 wird gesetzt
        else
            buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] &= ~motorBit // AND Einsen bleiben, nur 0 wird gesetzt
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer [3] %motorBit aktiviert" weight=4
    export function getaktiviert(buffer: Buffer, motorBit: e3aktiviert) {
        //return (buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] & motorBit) != 0
        return (buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] & motorBit) == motorBit
    }


    //% group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"
    //% block="%buffer [3] Ultraschall Entfernung %entfernung" weight=3
    //% buffer.shadow="radio_sendBuffer19"
    export function setEntfernung(buffer: Buffer, entfernung: e3Entfernung) {
        buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] &= 0b00111111 // AND Bit 5-4-3-2-1-0 bleiben; 7-6 auf 0 setzen
        buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] |= (entfernung & 0b11000000) // OR Bit 5-4-3-2-1-0 bleiben; 7-6 auf pEntfernung setzen
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer [3] Ultraschall Entfernung" weight=3
    function getEntfernung(buffer: Buffer): e3Entfernung {
        return (buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] & 0b11000000)
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer [3] Ultraschall Entfernung == %entfernung" weight=3
    export function isEntfernung(buffer: Buffer, entfernung: e3Entfernung): boolean {
        return (buffer[eBufferPointer.p0 + eBufferOffset.b2_Fahrstrecke] & 0b11000000) == entfernung
    }



    // ========== Servo Byte (3 Bit) Sensor Ereignis aktiviert

    //% group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"
    //% block="%buffer %bufferPointer %sensor %bit" weight=2
    //% buffer.shadow="radio_sendBuffer19"
    //% bit.shadow="toggleOnOff"
    //% inlineInputMode=inline 
    export function setSensor(buffer: Buffer, bufferPointer: eBufferPointer, sensor: eSensor, bit: boolean) {
        //if (!bufferPointer) bufferPointer = eBufferPointer.p0  // wenn nicht angegeben

        if (bit)
            buffer[bufferPointer + eBufferOffset.b1_Servo] |= sensor // OR Nullen bleiben, nur 1 wird gesetzt
        else
            buffer[bufferPointer + eBufferOffset.b1_Servo] &= ~sensor // AND Einsen bleiben, nur 0 wird gesetzt
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer %bufferPointer %sensor" weight=2
    export function getSensor(buffer: Buffer, bufferPointer: eBufferPointer, sensor: eSensor): boolean {
        //if (!bufferPointer) bufferPointer = eBufferPointer.p0  // wenn nicht angegeben

        return (buffer[bufferPointer + eBufferOffset.b1_Servo] & sensor) == sensor
    }


    // ========== 3 Byte (Motor, Servo, Entfernung)

    //% group="Datenpaket zum Senden vorbereiten" subcategory="Datenpaket"
    //% block="%buffer %bufferPointer %bufferOffset Byte %byte" weight=1
    //% buffer.shadow="radio_sendBuffer19"
    //% byte.min=0 byte.max=255
    //% inlineInputMode=inline 
    export function setByte(buffer: Buffer, bufferPointer: eBufferPointer, bufferOffset: eBufferOffset, byte: number) {
        //if (!bufferPointer) bufferPointer = eBufferPointer.p0  // wenn nicht angegeben

        if (bufferOffset == eBufferOffset.b1_Servo) {
            buffer[bufferPointer + bufferOffset] &= 0b11100000 // AND Bit 7-6-5 bleiben; 4-3-2-1-0 auf 0 setzen
            buffer[bufferPointer + bufferOffset] |= (byte & 0b00011111) // OR Bit 7-6-5 bleiben; 4-3-2-1-0 auf pByte setzen
        } else {
            buffer.setUint8(bufferPointer + bufferOffset, byte)
        }
    }

    //% group="Datenpaket auslesen (receivedData oder sendData)" subcategory="Datenpaket"
    //% block="%buffer %bufferPointer %bufferOffset Byte" weight=1
    export function getByte(buffer: Buffer, bufferPointer: eBufferPointer, bufferOffset: eBufferOffset) {
        //if (!bufferPointer) bufferPointer = eBufferPointer.p0  // wenn nicht angegeben

        if (bufferOffset == eBufferOffset.b1_Servo) {
            return buffer[bufferPointer + eBufferOffset.b1_Servo] & 0b00011111 // AND Bit 7-6-5 löschen
        } else {
            return buffer.getUint8(bufferPointer + bufferOffset)
        }
    }



    // ========== group="Kommentar" advanced=true

    //% group="Kommentar" advanced=true
    //% block="// %text"
    export function comment(text: string): void { }



    // ========== group="Logik" advanced=true

    //% group="Logik" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=1
    export function between(i0: number, i1: number, i2: number): boolean {
        return (i0 >= i1 && i0 <= i2)
    }



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


}
// datenpaket.ts