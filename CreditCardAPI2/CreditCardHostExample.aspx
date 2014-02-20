<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CreditCardHostExample.aspx.cs" Inherits="CreditCardAPI2.Views.CreditCardHostExample" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <h2>Blah Blah Blah HTML Before...</h2>
        <div data-ng-app="CreditCardApp" data-ng-controller="CreditCardController">
            <%--With ng-bind - don't use this
            <div data-ng-bind-html="injectHtml.value"></div>
            <hr />--%>
            With ng-view
            <div data-ng-view=""></div>
        </div>
        <h2>...Blah Blah Blah HTML After</h2>
    </form>

    <script src="Scripts/angular.js"></script>
    <script src="Scripts/angular-route.js"></script>
    <script src="Scripts/ui-bootstrap-0.10.0.js"></script>
    <script src="app/app.js"></script>
</body>
</html>
