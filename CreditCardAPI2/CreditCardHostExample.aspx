<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CreditCardHostExample.aspx.cs" Inherits="CreditCardAPI2.Views.CreditCardHostExample" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <title>Some Remote Page</title>
</head>
<body>
    <form id="form1" runat="server">
        <h2>Blah Blah Blah HTML Before...</h2>
        <a href="#/loadcc1">View 1</a>&nbsp;&nbsp;<a href="#/loadcc2">View 2</a>
        <hr />
        <div data-ng-app="cca" data-ng-controller="ccc">
            <div data-ng-view=""></div>
        </div>
        <hr />
        <h2>...Blah Blah Blah HTML After</h2>
    </form>

    <script src="Scripts/angular.js"></script>
    <script src="Scripts/angular-route.js"></script>
    <script src="Scripts/ui-bootstrap-0.10.0.js"></script>
    <script src="Scripts/ui-bootstrap-tpls-0.10.0.js"></script>
    <script src="app/app.js"></script>
</body>
</html>
