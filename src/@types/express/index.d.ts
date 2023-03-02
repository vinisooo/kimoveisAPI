import { User } from './../../entities/users.entities';
import { iLoggedUser } from "../../interfaces/users.interfaces"

declare global {
    namespace Express {
        interface Request {
            loggedUser: iLoggedUser,
            foundUser: User
        }
    }
}