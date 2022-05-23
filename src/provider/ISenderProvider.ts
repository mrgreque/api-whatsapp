export interface IMessage {
    to: string;
    body: string;
}

export interface ISenderProvider {
    sendMessage(message: IMessage): Promise<void>;
    processingMessage(message: IMessage): Promise<Object>;
    batteryLevel(): Promise<void>;
    connectionState(): Promise<void>;
    checkNumber(number: string): Promise<boolean>;
};