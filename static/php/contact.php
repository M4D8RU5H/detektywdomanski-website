<?php
header('Content-Type: application/json'); // zwracamy JSON

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$email = 'website.detektywdomanski@gmail.com';
$password = 'feme xofb tzwl npbl'; //TODO: Add password
$destEmail = 'website.detektywdomanski@gmail.com'; //TODO: Change email

// Pobieramy dane z POST
$userName  = trim($_POST['name'] ?? '');
$userEmail = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$service   = trim($_POST['service'] ?? '');
$message   = trim($_POST['message'] ?? '');

// Funkcje walidacji
function isValidEmail($userEmail) {
    return filter_var($userEmail, FILTER_VALIDATE_EMAIL);
}

function isValidPhone($phone) {
    $phone = preg_replace('/\s+/', '', $phone); // usuń spacje
    return preg_match('/^\+?\d{7,15}$/', $phone);
}

// Walidacja (odpowiada JS)
$errors = [];

if (strlen($userName) < 2) $errors['name'] = 'Imię i nazwisko musi mieć co najmniej 2 znaki.';
if (!isValidEmail($userEmail)) $errors['email'] = 'Wprowadź poprawny adres email (np. user@domena.pl).';
if (!isValidPhone($phone)) $errors['phone'] = 'Wprowadź poprawny numer telefonu (tylko cyfry, ewentualnie + na początku).';
if (strlen($message) < 10) $errors['message'] = 'Treść wiadomości musi mieć co najmniej 10 znaków.';

if (!empty($errors)) {
    echo json_encode(['status' => 'error', 'errors' => $errors]);
    exit;
}

// Wysyłka maila przez PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $email;
    $mail->Password   = $password;
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';

    $mail->setFrom($email, $userName);
    $mail->addReplyTo($userEmail, $userName);
    $mail->addAddress($destEmail);

    $mail->isHTML(true);
    $mail->Subject = 'Formularz Kontaktowy';
    
    // Treść maila
    $body  = "<p><strong>Imię i nazwisko:</strong> {$userName}</p>";
    $body .= "<p><strong>Email:</strong> {$userEmail}</p>";
    $body .= "<p><strong>Telefon:</strong> {$phone}</p>";
    $body .= "<p><strong>Rodzaj usługi:</strong> {$service}</p>";
    $body .= "<p><strong>Wiadomość:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
    
    $mail->Body = $body;

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Wiadomość została wysłana!']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Błąd wysyłki: ' . $mail->ErrorInfo]);
}