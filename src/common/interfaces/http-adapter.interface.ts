//* Creo una interface para mis consultas HTTP, la cual luego sera implementada por mi custon provider (adapter)

export interface HttpAdapter {
    // Uso tipos genericos
    get<T> ( url:string) : Promise<T>;
}