import {assert, expect} from 'chai';
import { test } from 'mocha';
import SorensenDiceSim from '../../model/plagiarism-detection/SorensenDiceSim';

describe('tests for sorensenDiceSim', function () {

    let sorensenObj = new SorensenDiceSim();

    it("test compare with first string being empty", () => {
        expect(sorensenObj.compare('', 'hello')).to.eql(0.0)
    });

    it("test compare with first string being space", () => {
        expect(sorensenObj.compare(' ', 'hello')).to.eql(0.0)
    });

    it("test compare with second string being empty", () => {
        expect(sorensenObj.compare('hello', '')).to.eql(0.0)
    });

    it("test compare with second string being space", () => {
        expect(sorensenObj.compare('hello', ' ')).to.eql(0.0)
    });

    it("test compare with both strings empty", () => {
        expect(sorensenObj.compare('', '')).to.eql(0.0)
    });

    it("test compare with both strings spaces", () => {
        expect(sorensenObj.compare(' ', ' ')).to.eql(0.0)
    });

    it("test compare with identical strings", () => {
        expect(sorensenObj.compare('hello', 'hello')).to.eql(1.0)
    });

    it("test compare with identical strings with extra space", () => {
        expect(sorensenObj.compare('hello', 'hello ')).to.eql(1.0)
    });

    it("test compare with identical strings with more than one word", () => {
        expect(sorensenObj.compare('hello world', 'hello world')).to.eql(1.0)
    });

    it("test compare with identical strings with more than one word with extra space in between one of them", () => {
        expect(sorensenObj.compare('hello world', 'hello world')).to.eql(1.0)
    });

    it("test compare with identical strings case insensitive", () => {
        expect(sorensenObj.compare('HELLO  world', 'hello world')).to.eql(1.0)
    });
})