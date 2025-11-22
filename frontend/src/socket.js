import { addMessage } from "./api";

class MockSocket {
  constructor() {
    this.handlers = {};
    this.connected = false;
    this.auth = {};
  }

  connect() {
    this.connected = true;
    return this;
  }

  disconnect() {
    this.connected = false;
  }

  on(event, handler) {
    this.handlers[event] = this.handlers[event] || [];
    this.handlers[event].push(handler);
  }

  off(event, handler) {
    if (!this.handlers[event]) return;
    this.handlers[event] = this.handlers[event].filter((h) => h !== handler);
  }

  emit(event, payload, ack) {
    if (event === "join") return;

    if (event === "message") {
      const saved = addMessage({
        ...payload,
        createdAt: new Date().toISOString()
      });
      setTimeout(() => {
        (this.handlers["message"] || []).forEach((h) => h(saved));
      }, 50);
      if (typeof ack === "function") {
        ack({ ok: true, message: saved });
      }
      return;
    }
  }
}

const socket = new MockSocket();

export default socket;
