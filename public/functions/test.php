<?php
$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
        
        if(!preg_match($email_exp,$email_from)) {
            $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
        }
        
        $string_exp = "/^[A-Za-z .'-]+$/";
        
        if(!preg_match($string_exp,$first_name)) {
            $error_message .= 'The First Name you entered does not appear to be valid.<br />';
        }
        
        if(!preg_match($string_exp,$last_name)) {
            $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
        }
        
        if(strlen($comments) < 2) {
            $error_message .= 'The Comments you entered do not appear to be valid.<br />';
        }
        
        if(strlen($error_message) > 0) {
            died($error_message);
        }
        ?>