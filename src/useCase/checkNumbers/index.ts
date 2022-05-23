import { CheckNumberController } from "./CheckNumberController";
import { CheckNumberUseCase } from "./CheckNumberUseCase";

const checkNumberUseCase = new CheckNumberUseCase();
const checkNumberController = new CheckNumberController(checkNumberUseCase);

export { checkNumberUseCase, checkNumberController };