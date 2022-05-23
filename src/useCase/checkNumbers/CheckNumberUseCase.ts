import { SenderProvider } from './../../provider/implementations/SenderProvider';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { ICheckNumberDTO } from './CheckNumberDTO';
class CheckNumberUseCase {
    constructor(){};

    async execute(data: ICheckNumberDTO, senderProvider: SenderProvider){
        
        await Promise.all(
            data.numbers.map( async (nr) => {
                if (isValidPhoneNumber(nr.number, 'BR')) {
                    let phoneNumber = parsePhoneNumber(nr.number, 'BR').format('E.164').replace('+', '');
        
                    phoneNumber = phoneNumber.includes('@c.us') ? phoneNumber : `${phoneNumber}@c.us`;
            
                    nr.number = phoneNumber;

                    nr.valid = await senderProvider.checkNumber(nr.number); 
                    
                    if(nr.valid) {
                        nr.observation = 'Number valid';
                    } else {
                        nr.observation = 'Number invalid';
                    };
                } else {
                    nr.valid = false;
                    nr.observation = 'Number format is invalid';
                };
            })
        );

        return data.numbers;
    };
};

export { CheckNumberUseCase };