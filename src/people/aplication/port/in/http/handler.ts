export interface Handler<T, U> {
    getPeopleList: (
        event: T,
        context: U,
    ) => Promise<unknown>

    getPeople: (
        event: T,
        context: U,
    ) => Promise<unknown>

    createPeople: (
        event: T,
        context: U,
    ) => Promise<unknown>

    updatePeople: (
        event: T,
        context: U,
    ) => Promise<unknown>

    deletePeople: (
        event: T,
        context: U,
    ) => Promise<unknown>

    // exec: (event: T, context: U,) => Promise<unknown>
}