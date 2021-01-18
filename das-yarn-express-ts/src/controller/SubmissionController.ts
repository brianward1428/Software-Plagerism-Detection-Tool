import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Submission} from "../entity/Submission";

export class SubmissionController {

    private submissionRepository = getRepository(Submission);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.submissionRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.submissionRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.submissionRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.submissionRepository.findOne(request.params.id);
        await this.submissionRepository.remove(userToRemove);
    }
}