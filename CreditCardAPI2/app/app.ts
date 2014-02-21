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

class CreditCardController {
    static $inject = ['$scope', '$http', 'ms'];
    constructor(private $scope: ICreditCardScope, private $http: ng.IHttpService, private ms: CreditCardModalService) {
        $scope.model = new CreditCardInfo();

        $scope.submitCreditCard = (ccinfo: CreditCardModel): void => {
            $http.post('/api/creditcard', ccinfo).then(
                (s: ng.IHttpPromiseCallbackArg<CreditCardResponseModel>): ng.ui.bootstrap.IModalServiceInstance =>
                    s.data.Authorized ? ms.show('Success', 'Your Credit Card Was Processed', s.data.Reason) : ms.show('Error', 'Your Credit Card Was <strong>Not</strong>Processed', s.data.Reason)
                ,
                (e: ng.IHttpPromiseCallbackArg<any>): ng.ui.bootstrap.IModalServiceInstance =>
                    ms.show('Error', 'Your Credit Card Was Not Processed', e.data.Message)
                ).then((mi) => {
                    mi.opened.then(
                        (o) => { }, //opened
                        (e) => { }  //issue opening
                        );

                    mi.result.then(
                        (c) => { }, //closed
                        (d) => { }  //dismissed
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

class CreditCardModalService {
    static $inject = ['$modal'];
    constructor(private $modal: ng.ui.bootstrap.IModalService) {
        var bp = 0;
    }

    show(header: string, body: string, bodyExtra: string): ng.ui.bootstrap.IModalServiceInstance {
        var opts: ng.ui.bootstrap.IModalSettings = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/app/partials/modal.html',
            controller: ($scope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance) => {
                $scope.modalOptions = {
                    okButtonText: 'Ok',
                    headerText: header,
                    bodyText: body,
                    bodyAdditionalText: bodyExtra,
                    ok: () => { $modalInstance.close(); },
                    dismiss: () => { $modalInstance.dismiss() }
                };
            }
        };

        return this.$modal.open(opts);
    }
}

var app = angular.module('cca', ['ngRoute', 'ui.bootstrap']);
app.service('ms', ['$modal', CreditCardModalService]);
app.controller('ccc', ['$scope', '$http', 'ms', CreditCardController]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/loadcc1', {
            controller: 'ccc',
            templateUrl: '/app/partials/loadcc1.html'
        })
        .when('/loadcc2', {
            controller: 'ccc',
            templateUrl: '/app/partials/loadcc2.html'
        })
        .otherwise({ redirectTo: '/loadcc1' });
});

