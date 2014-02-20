var CreditCardModelx = (function () {
    function CreditCardModelx(CCNumber, CVN, FName, LName) {
        this.CCNumber = CCNumber;
        this.CVN = CVN;
        this.FName = FName;
        this.LName = LName;
    }
    return CreditCardModelx;
})();

var CreditCardResponseModelx = (function () {
    function CreditCardResponseModelx(Authorized, Reason) {
        this.Authorized = Authorized;
        this.Reason = Reason;
    }
    return CreditCardResponseModelx;
})();
//# sourceMappingURL=CreditCardModel.js.map
