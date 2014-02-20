class CreditCardModelx {
    constructor(public CCNumber: string, public CVN: string, public FName: string, public LName: string) {}
}

class CreditCardResponseModelx {
    constructor(public Authorized: boolean, public Reason: string) { }
}