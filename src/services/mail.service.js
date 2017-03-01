export class MailService{
    constructor($http, $scope){
        this.$http = $http;
        this.$scope = $scope;
        this.from = "noreply.jscity@darkadia-studio.com";
    }
}