import IUser from "./IUser";

/**
 * Abstract Class that resembles the shared attributes and methods of a all users 
 * of the Plagiarism Detector
 * 
 * An Abstract User can be extended to implement the remaining non-shared 
 * features of all users
 */
abstract class AbstractUser implements IUser {
    dateJoined: Date;
    
    constructor (private firstName: string, private lastName: string, 
                private password: string, private userName: string,
                private email? : string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.dateJoined = new Date() // always want this to be current -- dont accept parameter
    }

    getDateJoined(): Date {
        return this.dateJoined;
    }

    getEmail(): string {
        if (this.email) {
            return this.email;
        } else {
            return 'NA'
        }
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
    }
    getPassword(): string {
        return this.password;
    }
    getUserName(): string {
        return this.userName;
    }
    setEmail(emailIn: string): void {
        this.email = emailIn;
    }
    setFirstName(firstNameIn: string): void {
        this.firstName = firstNameIn;
    }
    setLastName(lastNameIn: string): void {
        this.lastName = lastNameIn;
    }
    setUserName(userNameIn : string): void {
        this.userName = userNameIn;
    }
    setPassword(passwordIn : string): void {
        this.password = passwordIn;
    }
}

export default AbstractUser