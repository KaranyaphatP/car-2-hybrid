function Turn_Right () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 300)
}
function Forward () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 350)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 350)
}
function Turn_Left () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 300)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
}
radio.onReceivedValue(function (name, value) {
    if (name == "mgX") {
        right_axis = value
    } else if (name == "mgY") {
        Axis = value
    } else if (name == "engine") {
        running = value
    } else if (name == "mode") {
        Mode = value
    }
    Right_Wheel = -1 * (Axis + right_axis)
    Left_Wheel = -1 * (Axis - right_axis)
})
function Stop () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
}
let Right_Sensor = 0
let Front_Sensor = 0
let Left_Sensor = 0
let Direction2 = 0
let Left_Wheel = 0
let Right_Wheel = 0
let Mode = 0
let running = 0
let right_axis = 0
let Axis = 0
radio.setGroup(147)
basic.showIcon(IconNames.Target)
Axis = 0
right_axis = 0
running = 0
Mode = 0
basic.forever(function () {
    if (running == 1) {
        if (input.buttonIsPressed(Button.A)) {
            running = 0
        }
    }
})
basic.forever(function () {
    if (running == 0) {
        if (input.buttonIsPressed(Button.A)) {
            running = 1
        }
    }
})
basic.forever(function () {
    if (Mode == 0) {
        if (running == 0) {
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.analogWritePin(AnalogPin.P15, 0)
        }
        if (running == 1) {
            if (0 < Right_Wheel) {
                pins.analogWritePin(AnalogPin.P12, 0)
                pins.analogWritePin(AnalogPin.P13, Math.abs(Right_Wheel))
            } else {
                pins.analogWritePin(AnalogPin.P12, Math.abs(Right_Wheel))
                pins.analogWritePin(AnalogPin.P13, 0)
            }
        }
    }
})
basic.forever(function () {
    if (Mode == 0) {
        if (running == 0) {
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.analogWritePin(AnalogPin.P15, 0)
        }
        if (running == 1) {
            if (Left_Wheel > 0) {
                pins.analogWritePin(AnalogPin.P14, 0)
                pins.analogWritePin(AnalogPin.P15, Math.abs(Left_Wheel))
            } else {
                pins.analogWritePin(AnalogPin.P14, Math.abs(Left_Wheel))
                pins.analogWritePin(AnalogPin.P15, 0)
            }
        }
    } else if (Mode == 1) {
        if (running == 0) {
            Stop()
        } else if (running == 1) {
            if (Direction2 == 0) {
                Stop()
            }
            if (Direction2 == 1) {
                Forward()
            }
            if (Direction2 == 2) {
                Turn_Left()
            }
            if (Direction2 == 3) {
                Turn_Right()
            }
        }
    }
})
basic.forever(function () {
    if (Mode == 0) {
        if (running == 0) {
            basic.showIcon(IconNames.No)
            led.stopAnimation()
        }
    } else if (Mode == 1) {
        if (running == 0) {
            basic.showIcon(IconNames.Sad)
            led.stopAnimation()
        }
    }
})
basic.forever(function () {
    if (Mode == 0) {
        if (running == 1) {
            basic.showIcon(IconNames.Yes)
            led.stopAnimation()
        }
    } else if (Mode == 1) {
        if (running == 1) {
            basic.showIcon(IconNames.Happy)
            led.stopAnimation()
        }
    }
})
basic.forever(function () {
    serial.writeValue("Front", pins.analogReadPin(AnalogPin.P2))
    serial.writeValue("Left", pins.analogReadPin(AnalogPin.P0))
    serial.writeValue("Right", pins.analogReadPin(AnalogPin.P1))
    serial.writeValue("Direction", Direction2)
    serial.writeValue("Running", running)
    serial.writeValue("Rotation (x)", input.acceleration(Dimension.X))
    serial.writeValue("Rotation (Y)", input.acceleration(Dimension.Y))
})
basic.forever(function () {
    if (300 < pins.analogReadPin(AnalogPin.P0)) {
        Left_Sensor = 1
    } else {
        Left_Sensor = 0
    }
})
basic.forever(function () {
    if (500 < pins.analogReadPin(AnalogPin.P2)) {
        Front_Sensor = 0
    } else {
        Front_Sensor = 1
    }
})
basic.forever(function () {
    if (Front_Sensor == 1) {
        Direction2 = 0
    } else {
        if (Left_Sensor == 0 && Right_Sensor == 0) {
            Direction2 = 1
        }
        if (Left_Sensor == 1 && Right_Sensor == 0) {
            Direction2 = 3
        }
        if (Left_Sensor == 0 && Right_Sensor == 1) {
            Direction2 = 2
        }
        if (Left_Sensor == 1 && Right_Sensor == 1) {
            Direction2 = 0
        }
    }
})
basic.forever(function () {
    if (300 < pins.analogReadPin(AnalogPin.P1)) {
        Right_Sensor = 1
    } else {
        Right_Sensor = 0
    }
})
