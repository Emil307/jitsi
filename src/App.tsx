import React from 'react';
// @ts-ignore: error message
import JitsiMeetJS from 'lib-jitsi-meet-dist';

const App: React.FC = () => {
  const roomName = 'conf';

  const options = {
    width: 800,
    height: 600,
    parentNode: document.getElementById('jitsi-container'),
    configOverwrite: {},
    interfaceConfigOverwrite: {},
    hosts: {
      domain: 'jitsi.fantast.dev',
      anonymousdomain: "jitsi.fantast.dev@",
      muc: 'jitsi.fantast.dev'
    },
    bosh: 'https://jitsi.fantast.dev/http-bind',
  };

  const confOptions = {
    openBridgeChannel: true,
  };

  // @ts-ignore: error message
  JitsiMeetJS.init(options);

  const conference = JitsiMeetJS.conference?.join(roomName);

  let connection = new JitsiMeetJS.JitsiConnection(null, null, options);

  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {});
  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, () => {});
  connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, () => {});

  connection.connect();

  const room = connection.initJitsiConference(roomName, confOptions, null);
  room.on(JitsiMeetJS.events.conference.TRACK_ADDED, () => {});
  room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {});

  JitsiMeetJS.createLocalTracks().then(() => {});

  room.join();

  return (
    <div>
      app
      <div id="jitsi-container" style={{ height: 720, width: "100%" }}></div>
    </div>
  )
}

export default App;
