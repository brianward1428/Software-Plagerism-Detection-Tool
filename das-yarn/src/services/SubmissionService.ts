import axios from 'axios';


export default class SubmissionService {
    constructor() {
    }

    url: string = 'http://localhost:3000/submissions';

    createSubmission(submission: any) : Promise<any> {
        return axios.post(this.url, submission);
    }

    getAllSubmissions(cb: any) {
        axios.get(this.url).then(cb);
    };

    getSubmissionById(id: number, cb: any) {
        axios.get(this.url + "/" + id).then(cb);
    };

    updateSubmission(id: number, submission: any, cb: any) {
        axios.put(this.url + "/" + id, submission).then(cb);
    };

    deleteSubmission(id: number, cb: any) {
        axios.delete(this.url + "/" + id).then(cb);
    };
}
