export class CannotFoundUserError extends Error {
    constructor(username: string) {
        super(`L'utilisateur ${username} est introuvable.`);
    }
}

export class WrongPasswordError extends Error {
    constructor(username: string) {
        super(`Le mot de passe utilisé pour l'utilsateur: ${username} est faux.`);
    }
}