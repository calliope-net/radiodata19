
namespace radio { // led5x5.ts


    let n_showString = ""

    let n5x5_funkgruppe = 0
    let n5x5_Buffer3 = 0

    //% group="25 LED" advanced=true color=#54C9C9
    //% block="5x5 zeige Status %buffer [3]" weight=7
    //% buffer.shadow="radio_sendBuffer19"
    export function zeige5x5Status(buffer: Buffer) {
        if (n5x5_funkgruppe != n_funkgruppe) {
            n5x5_funkgruppe = n_funkgruppe
            zeigeBIN(n_funkgruppe, ePlot.hex, 1) // 5x5 x=0-1
        }

        if (n5x5_Buffer3 != buffer[3]) {
            n5x5_Buffer3 = buffer[3]
            let x = 2 // 5x5 x=2 
            if ((n5x5_Buffer3 & e3aktiviert.m1) == e3aktiviert.m1) { led.plot(x, 0) } else { led.unplot(x, 0) }
            if ((n5x5_Buffer3 & e3aktiviert.ma) == e3aktiviert.ma) { led.plot(x, 1) } else { led.unplot(x, 1) }
            if ((n5x5_Buffer3 & e3aktiviert.mb) == e3aktiviert.mb) { led.plot(x, 2) } else { led.unplot(x, 2) }
            if ((n5x5_Buffer3 & e3aktiviert.mc) == e3aktiviert.mc) { led.plot(x, 3) } else { led.unplot(x, 3) }
            if ((n5x5_Buffer3 & e3aktiviert.md) == e3aktiviert.md) { led.plot(x, 4) } else { led.unplot(x, 4) }

            /*   let x2 = ((n5x5_Buffer3 & e3aktiviert.m1) == e3aktiviert.m1 ? 16 : 0)
                  + ((n5x5_Buffer3 & e3aktiviert.ma) == e3aktiviert.ma ? 8 : 0)
                  + ((n5x5_Buffer3 & e3aktiviert.mb) == e3aktiviert.mb ? 4 : 0)
                  + ((n5x5_Buffer3 & e3aktiviert.mc) == e3aktiviert.mc ? 2 : 0)
                  + ((n5x5_Buffer3 & e3aktiviert.md) == e3aktiviert.md ? 1 : 0)
              zeigeBIN(x2, ePlot.bin, 2) // 5x5 x=2 
              */
        }


        /* if (bit)
            buffer[offset] | 2 ** Math.trunc(exp)
        else
            buffer[offset] & ~(2 ** Math.trunc(exp)) */
    }



    //% group="25 LED" subcategory="Sender" color=#54C9C9
    //% block="5x5 zeige Funkgruppe und 1\\|3\\|5" weight=7
    //% n.defl=0
    export function zeigeStatus5x5() {
        if (joystickButtonOn() || getSwitch135())
            n_enableButtonFunkgruppe = false
        if (n_enableButtonFunkgruppe || getSwitch() == eStatus.nicht_angeschlossen)
            zeigeBIN(n_funkgruppe, ePlot.hex, 1)
        else
            zeigeText(getSwitch())
    }


    //% group="25 LED" advanced=true color=#54C9C9
    //% block="5x5 zeige Text wenn geändert %text" weight=5
    export function zeigeText(text: any) {
        let tx = convertToText(text)
        if (tx != n_showString) {
            n_showString = tx
            basic.showString(tx)
        }
    }

    // zeigt Funkgruppe oder i²C Adresse im 5x5 Display binär an

    export enum ePlot {
        //% block="BIN 0..31"
        bin,
        //% block="HEX Zahl"
        hex,
        //% block="BCD Zahl"
        bcd
    }

    //% group="25 LED" advanced=true color=#54C9C9
    //% block="5x5 zeige binär %int %format ←x %x" weight=1
    //% x.min=0 x.max=4 x.defl=4
    export function zeigeBIN(int: number, format: ePlot, x: number) {
        int = Math.imul(int, 1) // 32 bit signed integer
        x = Math.imul(x, 1) // entfernt mögliche Kommastellen

        if (format == ePlot.bin && between(x, 0, 4)) {
            for (let y = 4; y >= 0; y--) {
                if ((int % 2) == 1) { led.plot(x, y) } else { led.unplot(x, y) }
                int = int >> 1 // bitweise Division durch 2
            }
        } else {
            while (int > 0 && between(x, 0, 4)) {
                if (format == ePlot.bcd) {
                    zeigeBIN(int % 10, ePlot.bin, x) // Ziffer 0..9
                    int = Math.idiv(int, 10) // 32 bit signed integer
                } else if (format == ePlot.hex) {
                    zeigeBIN(int % 16, ePlot.bin, x) // Ziffer 0..15
                    int = int >> 4 // bitweise Division durch 16
                }
                x--
            }
        }
    }

    /* 
        //% group="25 LED" advanced=true
        //% block="BCD Zahl %int anzeigen ←x %x" weight=6
        //% x.min=0 x.max=4 x.defl=4
        export function plotBCD(int: number, x: number) {
            int = Math.imul(int, 1) // 32 bit signed integer
            while (int > 0 && between(x, 0, 4)) {
                plotBIN(int % 10, x)
                int = Math.idiv(int, 10) // 32 bit signed integer
                x--
            }
        }
    
        //% group="25 LED" advanced=true
        //% block="HEX Zahl %int anzeigen ←x %x" weight=6
        //% x.min=0 x.max=4 x.defl=4
        export function plotHEX(int: number, x: number) {
            int = Math.imul(int, 1) // 32 bit signed integer
            while (int > 0 && between(x, 0, 4)) {
                plotBIN(int % 16, x)
                int = int >> 4 // bitweise Division durch 16
                x--
            }
        }
    
        //% group="25 LED" advanced=true
        //% block="BIN 0..31 %int anzeigen x %x" weight=2
        //% x.min=0 x.max=4 x.defl=4
        export function plotBIN(int: number, x: number) {
            int = Math.imul(int, 1) // 32 bit signed integer
            if (between(x, 0, 4)) {
                for (let y = 4; y >= 0; y--) {
                    if ((int % 2) == 1) { led.plot(x, y) } else { led.unplot(x, y) }
                    int = int >> 1 // bitweise Division durch 2
                }
            }
        }
     */




} // led5x5.ts
