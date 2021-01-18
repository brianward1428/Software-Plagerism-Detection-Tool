import {assert, expect} from 'chai';
import { test } from 'mocha';
import ParsedFile from "../../model/plagiarism-detection/ParsedFile";
import JavaScriptDetectionEngine from "../../model/plagiarism-detection/JavaScriptDetectionEngine";
import IDetectionEngine from "../../model/plagiarism-detection/IDetectionEngine";

import Project from "../../model/plagiarism-detection/Project";
import * as fs from "fs";

/**
 *
 *              THIS WILL BE THE TEST SUITE FOR TESTING/PLAYING WITH OUR BACK END MODEL
 *
 */



describe('JS Detection Engine', function () {



    it("Testing 1", () => {

        // We'll start with parsing the input files.
        // let file_A : ParsedFile = new ParsedFile("../../model/test-material/jsSample.js","//");
        // let file_B : ParsedFile = new ParsedFile("../../model/test-material/jsSample_2.js","//");

        let file_A = fs.readFileSync('/Users/brianward/Desktop/Northeastern/softwareDev/termProject/Team-07/das-yarn-express-ts/src/test/model/jsSample.js', 'utf-8');
        let file_B = fs.readFileSync("/Users/brianward/Desktop/Northeastern/softwareDev/termProject/Team-07/das-yarn-express-ts/src/test/model/jsSample.js", 'utf-8');

        // console.log(file_A)
        // console.log(file_B)

        // The Detection Engines compare function takes in two projects. So we need to make these two projects.
        let projectA : Project  = new Project(new Date(), [file_A]);
        let projectB : Project  = new Project(new Date(), [file_B]);


        // let engine: IDetectionEngine;
        let engine: JavaScriptDetectionEngine;

        engine = new JavaScriptDetectionEngine();
        engine.compare(projectA, projectB);

        let results = engine.getResults();
        console.log(results);

        // console.log("\n CODE RESULTS \n")
        // console.log(engine.getSimResults_Code())
        //
        // console.log("\n COMMENT RESULTS \n")
        // console.log(engine.getSimResults_Comments())


        expect(false).to.equal(false);
    })
})
