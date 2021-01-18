import IPerson from "./IPerson";

/**
 * Interface that represents a User in the Plagiarism Detector.
 * 
 * A user is the user of the system and requires an account creation.
 * A user inherits a first name, last name, and optional email from IPerson.
 * A user has additional fields for userName, password and date joined.
 */
interface Iuser extends IPerson {
    userName : string;
    password : string;
    dateJoined : Date;

    getUserName(): string;
    setUserName(usernameIn : string): void;
    getPassword(): string;
    setPassword(passwordIn : string): void;
    getDateJoined() : Date;
}

export default IUser