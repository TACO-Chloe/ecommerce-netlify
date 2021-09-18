<template>
  <div id="app">
      <webrtc-streamer :url="webrtcstream" :webrtcurl="webrtcurl" width="320" height="240" muted></webrtc-streamer>
  </div>
</template>

<script>
import "webrtc-streamer/html/webrtc-streamer-element";

export default {
  data() {
    return {
      webrtcstream: 'rtsp://admin:passw0rd@172.18.2.125',
      webrtcurl: 'http://172.18.2.10:8010/',
    };
  }  
};

</script>