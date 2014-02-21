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

var CreditCardController = (function () {
    function CreditCardController($scope, $http, ms) {
        this.$scope = $scope;
        this.$http = $http;
        this.ms = ms;
        $scope.model = new CreditCardInfo();

        $scope.submitCreditCard = function (ccinfo) {
            $http.post('/api/creditcard', ccinfo).then(function (s) {
                return s.data.Authorized ? ms.show('Success', 'Your Credit Card Was Processed', s.data.Reason) : ms.show('Error', 'Your Credit Card Was <strong>Not</strong>Processed', s.data.Reason);
            }, function (e) {
                return ms.show('Error', 'Your Credit Card Was Not Processed', e.data.Message);
            }).then(function (mi) {
                mi.opened.then(function (o) {
                }, function (e) {
                });

                mi.result.then(function (c) {
                }, function (d) {
                });
            });
        };
    }
    CreditCardController.$inject = ['$scope', '$http', 'ms'];
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

var CreditCardModalService = (function () {
    function CreditCardModalService($modal) {
        this.$modal = $modal;
        var bp = 0;
    }
    CreditCardModalService.prototype.show = function (header, body, bodyExtra) {
        var opts = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/app/partials/modal.html',
            controller: function ($scope, $modalInstance) {
                $scope.modalOptions = {
                    okButtonText: 'Ok',
                    headerText: header,
                    bodyText: body,
                    bodyAdditionalText: bodyExtra,
                    ok: function () {
                        $modalInstance.close();
                    },
                    dismiss: function () {
                        $modalInstance.dismiss();
                    }
                };
            }
        };

        return this.$modal.open(opts);
    };
    CreditCardModalService.$inject = ['$modal'];
    return CreditCardModalService;
})();

var app = angular.module('cca', ['ngRoute', 'ui.bootstrap']);
app.service('ms', ['$modal', CreditCardModalService]);
app.controller('ccc', ['$scope', '$http', 'ms', CreditCardController]);
app.config(function ($routeProvider) {
    $routeProvider.when('/loadcc1', {
        controller: 'ccc',
        templateUrl: '/app/partials/loadcc1.html'
    }).when('/loadcc2', {
        controller: 'ccc',
        templateUrl: '/app/partials/loadcc2.html'
    }).otherwise({ redirectTo: '/loadcc1' });
});
//# sourceMappingURL=app.js.map
