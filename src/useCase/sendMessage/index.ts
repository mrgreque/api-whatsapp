import { SenderProvider } from './../../provider/implementations/SenderProvider';
import { SendMessageController } from './SendMessageController';
import { SendMessageUseCase } from './SendMessageUseCase';

const sendMessageUseCase = new SendMessageUseCase();
const sendMessageController = new SendMessageController(sendMessageUseCase);

export {sendMessageUseCase, sendMessageController};