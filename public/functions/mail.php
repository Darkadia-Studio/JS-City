<?php
    if(isset($_POST['mailTo'])) {
        $email_to = null;
        $email_from = null;
        $email_subject = null;
        $email_message = null;
        $mail_replace = null;

        if(!isset($_POST['mailTo']) ||
            !isset($_POST['mailFrom']) ||
            !isset($_POST['subject']) ||
            !isset($_POST['message'])) {
                died('We are sorry, but there appears to be a problem with the form you submitted.');
        }

        $email_to = $_POST['mailTo'];
        $email_from = $_POST['mailFrom'];
        $email_subject = $_POST['subject'];
        $email_message = $_POST['message'];
        $mail_replace = $_POST['replace'];
        

        foreach($mail_replace as $key => $value){
            $email_message = str_replace($key, $value, $email_message);
        }
        
        /* $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
        
        if(!preg_match($email_exp,$email_from)) {
            $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
        } */
        
        function clean_string($string) {
            $bad = array("content-type","bcc:","to:","cc:","href");
            return str_replace($bad,"",$string);
        }
        
        // create email headers
        $headers = 'From: '.$email_from."\r\n".
        'Reply-To: '.$email_from."\r\n" .
        'X-Mailer: PHP/' . phpversion();
        @mail($email_to, $email_subject, $email_message, $headers);
    }
?>