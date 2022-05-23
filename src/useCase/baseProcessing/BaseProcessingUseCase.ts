import { ISenderProvider } from './../../provider/ISenderProvider';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { BaseProcessingDTO } from "./BaseProcessingDTO";


class BaseProcessingUseCase {

    constructor() {}

    async execute(data: BaseProcessingDTO, senderProvider: ISenderProvider) {

        await Promise.all(
            data.infos.map( async (info) => {
                if (isValidPhoneNumber(info.to, 'BR')) {
                    let phoneNumber = parsePhoneNumber(info.to, 'BR').format('E.164').replace('+', '');
        
                    phoneNumber = phoneNumber.includes('@c.us') ? phoneNumber : `${phoneNumber}@c.us`;
        
                    info.to = phoneNumber;
        
                    if(!info.blacklist) {
                        const ret: any = await senderProvider.processingMessage({
                            to: info.to,
                            body: info.campaignMessage
                        });
                        
                        if(ret.erro) {
                            info.blacklist = true;
                        } else {
                            info.sended = true;
                        };
                    };
                } else {
                    info.blacklist = true;
                };
            })
        );

        return data.infos;
    };
};

export { BaseProcessingUseCase };