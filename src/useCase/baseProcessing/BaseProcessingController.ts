import { Response } from 'express';
import { Request } from 'express';
import { ISenderProvider } from './../../provider/ISenderProvider';
import { BaseProcessingUseCase } from "./BaseProcessingUseCase";


class BaseProcessingController {

    constructor( private baseProcessingUseCase: BaseProcessingUseCase ){};

    async handle(request: Request, response: Response, senderProvider: ISenderProvider) {
        const data = request.body;

        try {
            const result = await this.baseProcessingUseCase.execute( data, senderProvider);

            response.status(200).json({
                success: true,
                message: 'Base processada com sucesso',
                result
            });
        } catch (error) {
            response.status(400).json({
                success: false,
                message: 'Erro ao processar a base',
                result: error
            });
        };
    };

};

export { BaseProcessingController };