export class UnauthorizedError extends Error {
    constructor(public setId: number) {
        super('You dont have rights for download set ' + setId);
    }
}
