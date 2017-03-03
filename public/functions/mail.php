<?php
    if(isset($_POST['data'])) {
        $email_to = null;
        $email_from = null;
        $email_subject = null;
        $email_message = null;
        $mail_replace = null;

        $data = json_decode($_POST['data']);

        if(!isset($_POST['data'])) {
                died('We are sorry, but there appears to be a problem with the form you submitted.');
        }

        $email_to = $data['mailTo'];
        $email_from = $data['mailFrom'];
        $email_subject = $data['subject'];
        $email_message = $data['message'];
        $mail_replace = $data['replace'];
        

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