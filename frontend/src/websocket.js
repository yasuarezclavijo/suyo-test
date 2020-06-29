class WSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WSocketService.instance) {
            WSocketService.instance = new WSocketService();
        }
        return WSocketService.instance;
    }
    constructor() {
        this.socket = null;
    }

    connect() {
        const path = 'ws://127.0.0.1:8000/ws/chat/test/';
        this.socket = new WebSocket(path);
        this.socket.onopen = () => {
            console.log("WS open");
        }
        this.socket.onmessage = e => {
            this.socketNewMessage(e.data);
        }
        this.socket.onerror = e => {
            console.log(e.message);
        }
        this.socket.onclose = e => {
            console.log("wS is closed");
            this.connect();
        }
    }
    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "messages") {
            this.callbacks[command](parsedData.messages);
        }
        if (command === "new_message") {
            this.callbacks[command](parsedData.message);
        }
    }
    fetchMessages(username, chatId) {
        this.sendMessage({
            command: "fetch_messages",
            username: username,
        });
    }

    newChatMessage(message) {
        this.sendMessage({
            command: "new_message",
            from: message.from,
            message: message.content,
        });
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks["messages"] = messagesCallback;
        this.callbacks["new_message"] = newMessageCallback;
    }

    sendMessage(data) {
        try {
            this.socket.send(JSON.stringify({...data}));
        } catch (err) {
            console.log(err.message);
        }
    }
    state() {
        return this.socket.readyState;
    }

}

const WSInstance = WSocketService.getInstance();
export default WSInstance;