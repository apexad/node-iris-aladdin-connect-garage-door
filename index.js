var rp = require('request-promise-native');
var WebSocket = require('faye-websocket');
var garageDoor;
var placeId;
var cookieData;
var irisWebSocket;

module.exports = function (iris_user, iris_password, action, callback) {
  var options = {
    method: 'POST',
    uri: 'https://bc.irisbylowes.com/login',
    form: {
      user: iris_user,
      password: iris_password,
      public: true
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    resolveWithFullResponse: true
  };

  function setPlace() {
    irisWebSocket.send(JSON.stringify({ type: 'sess:SetActivePlace',
      headers: { destination: 'SERV:sess:', correlationId: '78f7d29a-222e-4976-9d2b-d1f553cf8881', isRequest: true },
      payload: { messageType: 'sess:SetActivePlace', attributes: { placeId: placeId } }
    }));
    listDevices();
  }

  function listDevices() {
    irisWebSocket.send(JSON.stringify({ type: 'place:ListDevices',
      headers: { destination: 'SERV:place:' + placeId, correlationId: '6606672e-57f8-47d1-8002-5fe59d34c1d8', isRequest: true },
      payload: { messageType: 'place:ListDevices', attributes: {} }
    }));
  }

  function toggleGarageDoor(setGarageState) {
    irisWebSocket.send(JSON.stringify({
      headers: { destination: garageDoor['base:address'], correlationId: '790525f5-171f-4533-a952-0dcafb9b5310', isRequest: true },
      payload: { messageType: 'base:SetAttributes', attributes: { 'motdoor:doorstate': setGarageState } }
    }));
    irisWebSocket.close();
  }

  function onMessage(messageData) {
    if (messageData.headers.correlationId === '6606672e-57f8-47d1-8002-5fe59d34c1d8') {
      messageData.payload.attributes.devices.forEach(function(device) {
      	if (device['motdoor:doorstate']) {
      	  garageDoor = device;
      	}
      });
      switch (action) {
        case 'open':
          toggleGarageDoor('OPEN');
          return callback('OPENING');
        case 'close':
          toggleGarageDoor('CLOSED');
          return callback('CLOSING');
        default:
        case 'status':
          irisWebSocket.close();
          return callback(garageDoor['motdoor:doorstate']);
      }
    }
    if (!placeId && messageData.payload.attributes.places) {
      placeId = messageData.payload.attributes.places[0].placeId;
      setPlace();
    }
  }

  rp(options).then(function (response) {
    cookieData = response.headers['set-cookie'][0].split(';')[0];
    irisWebSocket = new WebSocket.Client(
      'wss://bc.irisbylowes.com/websocket',
      [],
      { headers: { Cookie: cookieData} }
    );
    irisWebSocket.on('message', function (evt) {
      onMessage(JSON.parse(evt.data));
    });
  })
  .catch(function (err) {
    console.log('Could not get Iris By Lowe\'s cookie');
  });
}
