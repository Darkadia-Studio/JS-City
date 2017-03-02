export class MailService{
    constructor($http, $scope){
        this.$http = $http;
        this.$scope = $scope;
        this.from = "noreply.jscity@darkadia-studio.com";
    }

    sendActivationMail(user){
        $.post("functions/test.php", { json_string:JSON.stringify({name:"John", time:"2pm"}) });
    }

}