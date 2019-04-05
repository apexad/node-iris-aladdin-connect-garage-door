```diff
- WARNING: As of March 31, 2019 Lowe's Iris was shutdown.
- This code is left up for historical purposes only.
```
Switch your door to default service and see: https://github.com/apexad/node-aladdin-connect-garage-door
# Node Iris by Lowe's tool for Aladdin Connect Garage Door

This tool can be used to check the `status` and `open`/`close` an Aladdin Connect Garage Door connected to Iris by Lowe's via a node script.  
Aladdin Connect Garage Door must be setup on Iris by Lowe's ([Instructions](http://www.geniecompany.com/data/products/aladdinconnect/iris-programming_aladdin-connect.pdf)).

## Usage
```javascript
var irisGarageDoor = require('node-iris-aladdin-connect-garage-door');

function callback(text)  {
  console.log(text);
}

irisGarageDoor('IRIS_USERNAME', 'IRIS_PASSWORD', 'ACTION', callback, 'DEVICE NAME');
```
Parameter       | Description
----------------|------------
IRIS_USERNAME   | Your Iris By Lowe's Username (usually an email address)
IRIS_PASSWORD   | Your Iris By Lowe's Password
ACTION          | status, open, or close
callback        | a callback function
DEVICE_NAME     | (optional) for multiple Garage Doors, specify device name

The `callback` function (added in v0.0.2) runs when your action is actually called (after the script connects to the login server and the websocket).  
If `ACTION` was status, it will get CLOSED or OPEN, otherwise it will get OPENING or CLOSING.

## Limitations
- Not tested with other garage door controllers connected to Iris (only Aladdin Connect), but I assume it should work.

## Credits
Uses Web Socket connections string/syntax information from [Iris Web Portal](https://github.com/thegillion/Iris-Web-Portal)

## Home Automation
This can be used in a home automation program that will run commands to check status, open, and close a garage door.  
An example use of this in in the `example` folder. This setup has been tested as command `node state.js` with [homebridge-garagedoor-command](https://www.npmjs.com/package/homebridge-garagedoor-command)
