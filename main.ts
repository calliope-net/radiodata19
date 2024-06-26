{
    "name": "fernsteuerung",
    "version": "0.2.27",
    "description": "",
    "dependencies": {
        "core": "*",
        "radio": "*"
    },
    "files": [
        "main.blocks",
        "main.ts",
        "README.md",
        "bluetooth.ts",
        "datenpaket.ts",
        "enums.ts",
        "advanced.ts",
        "led5x5.ts",
        "s-sender.ts",
        "s-buttonevents.ts",
        "s-qwiicjoystick.ts",
        "s-multiswitch.ts",
        "r-receiver.ts",
        "r-qwiicmotor.ts",
        "r-aktoren.ts",
        "r-aktoren-v3.ts"
    ],
    "testFiles": [
        "test.ts"
    ],
    "fileDependencies": {
        "r-aktoren-v3.ts": "v3"
    },
    "targetVersions": {
        "target": "4.0.29",
        "targetId": "calliopemini"
    },
    "supportedTargets": [
        "calliopemini"
    ],
    "preferredEditor": "blocksprj"
}
