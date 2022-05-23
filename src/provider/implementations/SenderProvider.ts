import { IMessage, ISenderProvider } from './../ISenderProvider';
import { create, Whatsapp, Message, SocketState } from 'venom-bot';
import fs from 'fs';
import mime from 'mime-types';

export type QrCode = {
    base64Qr: string;
}

export class SenderProvider implements ISenderProvider{

    private client?: Whatsapp;
    private connected: boolean = false;
    private qr: QrCode = {
        base64Qr: ''
    };

    
    get isConnected() : boolean {
        return this.connected;
    }

    get qrCode() : QrCode {
        return this.qr;
    }
    

    constructor() {
        this.initialize()
    };

    private initialize() {
        const qr = (base64Qr: string) => {
            this.qr = { base64Qr };
        }

        const status = (statusSession: string) => {
            this.connected = ['isLogged', 'qrReadSuccess', 'ChatAvailable'].includes(statusSession);
        }

        const start = (client: Whatsapp) => {
            this.client = client;

            client.onStateChange((state) => {
                console.log(state);
                
                this.connected = state === SocketState.CONNECTED;
            });

            client.onMessage(async (message) => {
                if (message.isMedia === true || message.isMMS === true) {
                    const buffer = await client.decryptFile(message);

                    const filename = `arquivo.${mime.extension(message.mimetype)}`;
                    await fs.writeFile(filename, buffer, err => {
                        err ? console.log(err) : null ;
                    });
                }
                console.log(message.body);
            });
        }

        create('ws-wpp-provider', qr, status, {
            disableWelcome: true,
            autoClose: 0
        })
            .then((client) => {
                start(client);
            })
            .catch((error) => console.log(error));
    };

    async sendMessage(message: IMessage): Promise<void> {
        /*const messages = await this.client?.getAllMessagesInChat(message.to, true, true);
        messages?.forEach( message => {
            console.log(`${message.sender.pushname} - ${message.body.length > 50 ? '' : message.body}`)
        });*/
        await this.client?.sendText(message.to, message.body)
            .then(s => console.log(s))
            .catch(e => console.log(e));

    };

    async processingMessage(message: IMessage): Promise<Object> {
        const res = await this.client?.sendText(message.to, message.body)
            .then(success => { 
                return success 
            })
            .catch(error => {
                return error 
            });

        return res;
    }

    async batteryLevel(): Promise<void> {
        const porcent = await this.client?.getBatteryLevel();
        console.log(porcent);
    };

    async connectionState(): Promise<void> {
        const wifi = await this.client?.getConnectionState();
        console.log(wifi);
    };

    async checkNumber(number: string): Promise<boolean> {
        const exist: any = await this.client?.checkNumberStatus(number)
            .then( result => {return result.numberExists})
            .catch(err => {
                console.log(err);
                return false;
            });

        return exist;
    };
};