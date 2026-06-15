<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "budylevska.accounting@gmail.com";
$subject = "Нова заявка з сайту";

$body = "
Ім'я: $name
Телефон: $phone
Email: $email
Повідомлення:
$message
";

$headers = "From: $email";

if (mail($to, $subject, $body, $headers)) {
  http_response_code(200);
} else {
  http_response_code(500);
}
