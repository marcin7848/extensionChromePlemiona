<?php
/**
* Simple example script using PHPMailer with exceptions enabled
* @package phpmailer
* @version $Id$
*/

require '../class.phpmailer.php';

try {
	$mail = new PHPMailer(true); //New instance, with exceptions enabled

	$body             = "Tresc";

	$mail->IsSMTP();                           // tell the class to use SMTP
	$mail->SMTPAuth   = true;                  // enable SMTP authentication
	$mail->Port       = 465;                    // set the SMTP server port
	$mail->Host       = "smtp.gmail.com"; // SMTP server
	$mail->Username   = "marcin7848@gmail.com";     // SMTP server username
	$mail->Password   = "KacZ987@KM";            // SMTP server password

	$mail->IsSendmail();  // tell the class to use Sendmail

	$mail->AddReplyTo("marcin7848@gmail.com","First Last");

	$mail->From       = "marcin7848@gmail.com";
	$mail->FromName   = "Temat2";

	$to = "marcin7848@gmail.com";

	$mail->AddAddress($to);

	$mail->Subject  = "Temat wiadomosci";

	$mail->AltBody    = ""; // optional, comment out and test
	$mail->WordWrap   = 80; // set word wrap

	$mail->MsgHTML($body);

	$mail->IsHTML(false); // send as HTML

	$mail->Send();
	echo 'Message has been sent.';
} catch (phpmailerException $e) {
	echo $e->errorMessage();
}
?>