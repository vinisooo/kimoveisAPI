import { iLoggedUser } from "../../interfaces/users.interfaces"

declare global {
    namespace Express {
        interface Request {
            loggedUser: iLoggedUser
        }
    }
}