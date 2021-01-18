import AbstractUser from "./AbstractUser";

/**
 * Concrete implementation of a user, a Professor has greater access privelages than 
 * TAs
 * At the moment, those privelages aren't implemented
 */
class Professor extends AbstractUser {
    constructor (firstName: string, lastName: string, password: string, userName: string, 
        email? : string) {
        super(firstName, lastName, password, userName, email);
    }
}

export default Professor