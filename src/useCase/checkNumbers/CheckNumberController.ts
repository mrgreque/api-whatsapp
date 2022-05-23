import { SenderProvider } from './../../provider/implementations/SenderProvider';
import { Request, Response } from "express";
import { CheckNumberUseCase } from "./CheckNumberUseCase";

class CheckNumberController {
    constructor(private checkNumberUseCase: CheckNumberUseCase){};

    async handle(request: Request, response: Response, senderProvider: SenderProvider){
        const data = request.body;

        try {
            const result = await this.checkNumberUseCase.execute(data, senderProvider);

            response.status(200).json({
                success: true,
                error: '',
                result
            });
        } catch (error) {
            response.status(200).json({
                success: false,
                error,
                result: []
            });
        };
    };
};

export { CheckNumberController };