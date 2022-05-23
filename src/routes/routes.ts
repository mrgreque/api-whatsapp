import { SenderProvider, QrCode } from './../provider/implementations/SenderProvider';
import { Router } from 'express'
import { sendMessageController } from '../useCase/sendMessage';
import { baseProcessingController } from '../useCase/baseProcessing';
import { checkNumberController } from '../useCase/checkNumbers';

const router = Router();

const sender = new SenderProvider();

router.get('/status', (request, response) => {
    return response.send({
        qrCode: sender.qrCode,
        connected: sender.isConnected
    });
})

router.post('/send/message', (request, response) => { return sendMessageController.handle(request, response, sender); });
router.post('/process/messages', (request, response) => { return baseProcessingController.handle(request, response, sender); });
router.post('/check/numbers', (request, response) => { return checkNumberController.handle(request, response, sender); });

export default router