import AbstractUser from "./AbstractUser";

/**
 * Concrete implementation of a user, a TA has fewer access privelages than Professor
 * At the moment, those privelages aren't implemented
 */
class TA extends AbstractUser {
    constructor (firstName: string, lastName: string, password: string, 
        userName: string, email? : string) {
        super(firstName, lastName, password, userName, email);
    }
}

export default TA