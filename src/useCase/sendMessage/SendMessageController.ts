import { SenderProvider } from './../../provider/implementations/SenderProvider';
import { Request, Response } from "express";
import { SendMessageUseCase } from "./SendMessageUseCase";


class SendMessageController {

    constructor(private sendMessageUseCase: SendMessageUseCase ) {};

    async handle(request: Request, response: Response, sendProvider: SenderProvider) {

        const data = request.body;

        try {

            await this.sendMessageUseCase.execute(data, sendProvider);
            return response.status(200).json({
                success: true,
                message: 'Mensagem enviada com sucesso'
            });

        } catch (error: any) {

            if(error.text) {
                return response.status(400).json({
                    success: true,
                    message: error.text
                });
            }

            return response.status(400).json({
                success: false,
                message: error
            });

        }

    };

};

export {SendMessageController}