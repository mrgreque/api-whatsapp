import { BaseProcessingController } from "./BaseProcessingController";
import { BaseProcessingUseCase } from "./BaseProcessingUseCase";

const baseProcessingUseCase = new BaseProcessingUseCase();
const baseProcessingController = new BaseProcessingController(baseProcessingUseCase);

export { baseProcessingUseCase, baseProcessingController };