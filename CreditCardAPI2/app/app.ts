/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

//import m = module("app/models/CreditCardModel");
class CreditCardModel {
    constructor(public CCNumber: string, public CVN: string, public FName: string, public LName: string) { }
}

class CreditCardResponseModel {
    constructor(public Authorized: boolean, public Reason: string) { }
}

class CreditCardInfo {
    info: CreditCardModel;
    response: CreditCardResponseModel;
}

interface ICreditCardScope extends ng.IScope {
    model: CreditCardInfo;
    submitCreditCard: (ccard: CreditCardModel) => void;
}

class CreditCardFactory {
    private _urlBase: string;
    //get urlBase():string {
    //    return this._urlBase;
    //}

    constructor(private $http: ng.IHttpService) {
        this._urlBase = '/api/creditcard';
    }

    public submitCreditCard = function (ccard: CreditCardModel): ng.IHttpPromise<any> {
        return this.$http.post(this._urlBase, ccard);
    }
}

class CreditCardController {
    private _ccFactory: CreditCardFactory;

    constructor(private $scope: ICreditCardScope, private $http: ng.IHttpService, private $modal: ng.ui.bootstrap.IModalService) {
        $scope.model = new CreditCardInfo();
        this._ccFactory = new CreditCardFactory(this.$http);

        $scope.submitCreditCard = (ccinfo: CreditCardModel): void => {
            var bp = 0;
            this._ccFactory.submitCreditCard(ccinfo).then(
                (s: ng.IHttpPromiseCallbackArg<any>) => {
                    //s.data.Authorized/.Reason, s.status
                    var bp = 0;
                    var modalInstance = $modal.open({ template: '<div>Authorized!!!</div>', resolve: {} });

                    modalInstance.result.then(
                        () => {
                            var bp = 0;
                        },
                        () => {
                            var bp = 0;
                        }
                    );
                },
                (e: ng.IHttpPromiseCallbackArg<any>) => {
                    //e.data.Message, e.status
                    var bp = 0;
                    var modalInstance = $modal.open({ template: '<div>Error!!!</div>', resolve: {} });

                    modalInstance.result.then(
                        () => {
                            var bp = 0;
                        },
                        () => {
                            var bp = 0;
                        }
                    );
                }
            );
        }
    }
}

interface IModalInstanceScope extends ng.IScope {
    ok: () => void;
    cancel: () => void;
}

class ModalInstanceController {
    constructor(private $scope: IModalInstanceScope, private $modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        }
    }
}

var app = angular.module('CreditCardApp', ['ngRoute', 'ui.bootstrap'])
    .factory('CreditCardFactory', CreditCardFactory) 
    .controller('CreditCardController', CreditCardController)
    .config(function ($routeProvider) {
        $routeProvider
            .when('/loadcc', {
                controller: 'CreditCardController',
                templateUrl: 'app/partials/loadcc.html'
            })
            .otherwise({ redirectTo: '/loadcc' });
    });