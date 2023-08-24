class WebSocketManager {
    constructor(url,header) {
      if (WebSocketManager.instance) {
        return WebSocketManager.instance;
      }
      this.websocket = new WebSocket(url,header);
      WebSocketManager.instance = this;
    }
    close(){
       this.websocket.close()
    }
  }

  export default WebSocketManager;
  