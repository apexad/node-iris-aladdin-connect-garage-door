# Node Iris by Lowe's tool for Aladdin Connect Garage Door

This tool can be used to check the `Status` and `Open`/`Close` an Aladdin Connect Garage Door connected to Iris by Lowe's via a node script.  
Aladdin Connect Garage Door must be setup on Iris by Lowe's ([Instructions](http://www.geniecompany.com/data/products/aladdinconnect/iris-programming_aladdin-connect.pdf)).  
To use:
```javascript
var iris = require('node-iris-aladdin-connect-garage-door');

iris.irisGarageDoor(IRIS_USERNAME, IRIS_PASSWORD, ACTION);
```
Parameter       | Description
----------------|------------
IRIS_USERNAME   | Your Iris By Lowe's Username (usually an email address)
IRIS_PASSWORD   | Your Iris By Lowe's Password
ACTION          | status, open, or close

## Limitations
- Not tested with any other garage door controllers connected to Iris, but I assume it should work.
- Not setup for multiple places/locations in Iris by Lowe's or multiple garage doors (uses the first place it finds, and the first garage door it finds).

## Credits
Uses Web Socket connections string/syntax information from [Iris Web Portal](https://github.com/thegillion/Iris-Web-Portal)
