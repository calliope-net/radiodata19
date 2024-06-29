
namespace sender { // s-auswahl.ts


    // Storage: im Flash steht die Funkgruppe und das Modell, und wird beim Einschalten wieder hergestellt

    let a_StorageBuffer = Buffer.create(4) // lokaler Speicher 4 Byte NumberFormat.UInt32LE
    enum eStorageBuffer { funkgruppe, modell /* , c, d */ } // Index im Buffer
    enum eModell { // zuletzt gewähltes Modell wird im offset 1 dauerhaft gespeiechert
        cb2e, // Standardwert CalliBot
        mkcg, // Maker Kit Car ohne und mit Gabelstapler
        mkck, // Maker Kit Car mit Kran
        car4  // CaR 4
    } // so viele Images müssen im Array sein - Bilder am Ende dieser Datei
    export function getModell(): eModell {
        // gibt den Enum Wert zurück
        return a_StorageBuffer[eStorageBuffer.modell]
    }



    // Funktion: wird je nach Modell mit Tasten geändert, steht nicht im Flash

    enum eFunktion {
        ng, // nicht gestartet
        m0_s0,      // Joystick steuert M0 und Servo (Fahren und Lenken)
        m0_m1_s0,   // M0 und M1, Servo über Tasten A- B+ (Gabelstapler)
        ma_mb,      // MA und MB (Seilrolle und Drehkranz)
        mc_mb       // MC und MB (Zahnstange und Drehkranz)
    }
    let n_Funktion = eFunktion.ng // aktuell ausgewählte Funktion




    //% group="Auswahl Modell" subcategory="Auswahl"
    //% block="Start Auswahl Modell Flash einlesen %storagei32"
    export function startAuswahl(storagei32: number) {
        storageBufferSet(storagei32)
        // let iModell = a_StorageBuffer[eStorageBuffer.modell]
        if (!radio.between(getModell(), 0, a_ModellImages.length - 1))
            // wenn ungülti, Standardwert setzen
            a_StorageBuffer[eStorageBuffer.modell] = eModell.cb2e

        a_ModellImages[getModell()].showImage(0) // Bild vom Modell anzeigen
        basic.pause(1500)
        return a_StorageBuffer[eStorageBuffer.funkgruppe]
    }


    //% group="Auswahl Modell" subcategory="Auswahl"
    //% block="Knopf A geklickt"
    export function buttonA() {
        if (n_Funktion == eFunktion.ng) {
            // wenn nicht gestartet, kann Modell geändert werden
            if (a_StorageBuffer[eStorageBuffer.modell] > 0) 
                a_StorageBuffer[eStorageBuffer.modell]--
            a_ModellImages[getModell()].showImage(0)
        }

    }


    //% group="Auswahl Modell" subcategory="Auswahl"
    //% block="Knopf B geklickt"
    export function buttonB() {
        if (n_Funktion == eFunktion.ng) {
            // wenn nicht gestartet, kann Modell geändert werden
            if (a_StorageBuffer[eStorageBuffer.modell] < a_ModellImages.length - 1) 
                a_StorageBuffer[eStorageBuffer.modell]++
            a_ModellImages[getModell()].showImage(0)
        }
    }

    //% group="Auswahl Modell" subcategory="Auswahl"
    //% block="Knopf A+B geklickt"
    export function buttonAB() {
        n_Funktion == eFunktion.m0_s0 // startet immer mit Fahren und Lenken

    }


    // group="Auswahl Modell" subcategory="Auswahl"
    // block="zeige Bild %index" weight=8
    // function showImage(index: eModell) {
    //    a_ModellImages[index].showImage(0)
    //}


    // ========== group="Storage (Flash)" color=#FFBB00

    //% group="Storage (Flash)" subcategory="Auswahl"
    //% block="Flash einlesen %i32" weight=9
    export function storageBufferSet(i32: number) {
        // i32.shadow=storage_get_number
        a_StorageBuffer.setNumber(NumberFormat.UInt32LE, 0, i32)
    }

    //% group="Storage (Flash)" subcategory="Auswahl"
    //% block="Flash speichern" weight=8
    export function storageBufferGet() {
        return a_StorageBuffer.getNumber(NumberFormat.UInt32LE, 0)
    }



    // ========== Bilder für Auswahl Modell


    let a_ModellImages = [
        images.createImage(`
    . # . # .
    . . . . .
    . . . . .
    # # # # #
    . # . # .
    `),
        images.createImage(`
    . . # . .
    . . # . .
    . . # # #
    . . # . .
    # # # . .
    `),
        images.createImage(`
    . # # # #
    . # . . #
    . # . . .
    . # . . .
    # # # # .
    `),
        images.createImage(`
    . . . . .
    . # # # .
    # . . . #
    # # # # #
    . # . # .
    `)/* ,
        images.createImage(`
    . . . . .
    . # . # .
    # . . . #
    . # . # .
    . . . . .
    `), */
    ]

} // s-auswahl.ts
