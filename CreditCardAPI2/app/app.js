/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
//import m = module("app/models/CreditCardModel");
var CreditCardModel = (function () {
    function CreditCardModel(CCNumber, CVN, FName, LName) {
        this.CCNumber = CCNumber;
        this.CVN = CVN;
        this.FName = FName;
        this.LName = LName;
    }
    return CreditCardModel;
})();

var CreditCardResponseModel = (function () {
    function CreditCardResponseModel(Authorized, Reason) {
        this.Authorized = Authorized;
        this.Reason = Reason;
    }
    return CreditCardResponseModel;
})();

var CreditCardInfo = (function () {
    function CreditCardInfo() {
    }
    return CreditCardInfo;
})();

var CreditCardFactory = (function () {
    //get urlBase():string {
    //    return this._urlBase;
    //}
    function CreditCardFactory($http) {
        this.$http = $http;
        this.submitCreditCard = function (ccard) {
            return this.$http.post(this._urlBase, ccard);
        };
        this._urlBase = '/api/creditcard';
    }
    return CreditCardFactory;
})();

var CreditCardController = (function () {
    function CreditCardController($scope, $http, $modal) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.$modal = $modal;
        $scope.model = new CreditCardInfo();
        this._ccFactory = new CreditCardFactory(this.$http);

        $scope.submitCreditCard = function (ccinfo) {
            var bp = 0;
            _this._ccFactory.submitCreditCard(ccinfo).then(function (s) {
                //s.data.Authorized/.Reason, s.status
                var bp = 0;
                var modalInstance = $modal.open({ template: '<div>Authorized!!!</div>', resolve: {} });

                modalInstance.result.then(function () {
                    var bp = 0;
                }, function () {
                    var bp = 0;
                });
            }, function (e) {
                //e.data.Message, e.status
                var bp = 0;
                var modalInstance = $modal.open({ template: '<div>Error!!!</div>', resolve: {} });

                modalInstance.result.then(function () {
                    var bp = 0;
                }, function () {
                    var bp = 0;
                });
            });
        };
    }
    return CreditCardController;
})();

var ModalInstanceController = (function () {
    function ModalInstanceController($scope, $modalInstance) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }
    return ModalInstanceController;
})();

var app = angular.module('CreditCardApp', ['ngRoute', 'ui.bootstrap']).factory('CreditCardFactory', CreditCardFactory).controller('CreditCardController', CreditCardController).config(function ($routeProvider) {
    $routeProvider.when('/loadcc', {
        controller: 'CreditCardController',
        templateUrl: 'app/partials/loadcc.html'
    }).otherwise({ redirectTo: '/loadcc' });
});
//# sourceMappingURL=app.js.map
