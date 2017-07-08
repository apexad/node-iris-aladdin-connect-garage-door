var irisGarageDoor = require('node-iris-aladdin-connect-garage-door');

function callback(text)  {
  console.log(text);
}

irisGarageDoor('IRIS_USERNAME', 'IRIS_PASSWORD', 'close', callback);
