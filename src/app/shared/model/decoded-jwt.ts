export interface DecodedJwt {
    Oid: string;
    exp: Date;
    iat: Date;
    privileges: any[];
    subscriptionId?: string;
}
