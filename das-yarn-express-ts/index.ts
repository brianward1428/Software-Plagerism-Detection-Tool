import "reflect-metadata";
import * as express from "express";
import { Request, Response } from "express";

import Project from "./src/model/plagiarism-detection/Project";
import JavaScriptDetectionEngine from "./src/model/plagiarism-detection/JavaScriptDetectionEngine";


// create express app
const app = express();
app.use(express.json());
var cors = require('cors');

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.post('/submissions', async function (req: Request, res: Response) {
    // console.log("request body: ", req.body);
    let simThreshold: number = +req.body.simThreshold;
    let ignoreFile: string = req.body.ignoreFile;
    let proj1: Project = new Project(new Date(), req.body.fileListP1);
    let proj2: Project = new Project(new Date(), req.body.fileListP2);
    let jsEngine = new JavaScriptDetectionEngine();
    jsEngine.compare(proj1, proj2, simThreshold, ignoreFile);
    let results = jsEngine.getResults();
    // const submission = await submissionRepository.create(req.body)
    // const resp = await submissionRepository.save(submission);
    return res.send(results)
});

// setup express app here
// ...

// const submissionRepository = connection.getRepository(Submission);



// start express server 
app.listen(process.env.PORT || 3000, function () {
    console.log("Listening...")
});

// // insert new users for test


console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");

