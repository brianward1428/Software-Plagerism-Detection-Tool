/**
 * Interface that represents a Person in the Plagiarism Detector.
 * 
 * A person is either the user of a system or the author of a submission.
 * A person has a first name, last name, and optional email.
 */

interface IPerson {
    firstName : string;
    lastName : string;
    email? : string; // email optional -- some people may not have an account and email

    getFirstName(): string;
    setFirstName(firstNameIn: string): void;
    getLastName(): string;
    setLastName(lastNameIn: string): void;
    getEmail(): string;
    setEmail(emailIn: string): void;
}

export default IPerson