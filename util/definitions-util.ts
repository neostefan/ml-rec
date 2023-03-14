enum MessageType {
    INFO = "INFO",
    ERROR = "ERROR"
}

interface Message {
    body: string,
    type: MessageType
}

export {
    MessageType,
    Message
}