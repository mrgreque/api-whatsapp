import { ISendeMessageDTO } from './SendMessageDTO';
import { ISenderProvider } from './../../provider/ISenderProvider';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';


class SendMessageUseCase {

    constructor(){};

    async execute(data: ISendeMessageDTO, senderProvider: ISenderProvider) {

        if (!isValidPhoneNumber(data.to, 'BR')) {
            throw new Error('This number is not valid');
        };
        
        let phoneNumber = parsePhoneNumber(data.to, 'BR').format('E.164').replace('+', '');

        phoneNumber = phoneNumber.includes('@c.us') ? phoneNumber : `${phoneNumber}@c.us`;

        data.to = phoneNumber;

        await senderProvider.batteryLevel();
        await senderProvider.connectionState();
        await senderProvider.sendMessage(data);
    };

};

export {SendMessageUseCase}