/*EXAMPLE:
    {
        numbers: [
            {number: '5516900000000', valid: false, observation: ''},
            {number: '5516900000001', valid: false, observation: ''}
        ]
    }
*/

interface INumber {
    number: string;
    valid: boolean;
    observation: string;
}

export interface ICheckNumberDTO {
    numbers: INumber[];
};