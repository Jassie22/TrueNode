<?php
// Configuration settings
$recipient_email = "info@truenode.co.uk"; // Recipient email address
$email_subject = "New Contact Form Submission from True Node Website";

// Initialize response array
$response = [
    'success' => false,
    'message' => ''
];

// Process the form only when submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Validate inputs
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If no validation errors, process the email
    if (empty($errors)) {
        // Prepare email headers
        $headers = "From: $name <$email>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        
        // Prepare email body with HTML formatting
        $email_body = "
        <html>
        <head>
            <title>New Message from True Node Website</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                h2 { color: #903AE7; }
                .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #903AE7; }
                .footer { margin-top: 30px; font-size: 12px; color: #777; }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <div class='message-box'>
                    <p><strong>Message:</strong></p>
                    <p>" . nl2br(htmlspecialchars($message)) . "</p>
                </div>
                <div class='footer'>
                    <p>This message was sent from the True Node website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Send the email
        $mail_success = mail($recipient_email, $email_subject, $email_body, $headers);
        
        if ($mail_success) {
            $response['success'] = true;
            $response['message'] = "Thank you for your message. We'll get back to you soon!";
        } else {
            $response['message'] = "Sorry, there was an error sending your message. Please try again later or contact us directly at $recipient_email.";
        }
    } else {
        // If there are validation errors, return them
        $response['message'] = implode(", ", $errors);
    }
}

// Return JSON response for AJAX requests
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// For direct form submissions, show a response page
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set flag for success/error messages
    $submission_status = $response['success'] ? 'success' : 'error';
    $submission_message = $response['message'];
} else {
    $submission_status = '';
    $submission_message = '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form - True Node</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(144, 58, 231, 0.2);
        }
        h1 {
            color: #903AE7;
            margin-top: 0;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.8);
        }
        input, textarea {
            width: 100%;
            padding: 12px;
            background-color: rgba(18, 18, 18, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 4px;
            box-sizing: border-box;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: #903AE7;
        }
        textarea {
            min-height: 120px;
            resize: vertical;
        }
        button {
            background-color: #903AE7;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #7B2DD9;
        }
        .message {
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .success {
            background-color: rgba(39, 174, 96, 0.2);
            border: 1px solid rgba(39, 174, 96, 0.4);
        }
        .error {
            background-color: rgba(231, 76, 60, 0.2);
            border: 1px solid rgba(231, 76, 60, 0.4);
        }
        a {
            color: #903AE7;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .btn {
            display: inline-block;
            background-color: #903AE7;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            text-decoration: none;
            margin-top: 20px;
        }
        .btn:hover {
            background-color: #7B2DD9;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if ($submission_status === 'success'): ?>
            <h1>Message Sent!</h1>
            <div class="message success">
                <?php echo $submission_message; ?>
            </div>
            <p>We'll review your message and get back to you as soon as possible.</p>
            <a href="/" class="btn">Return to Homepage</a>
        <?php elseif ($submission_status === 'error'): ?>
            <h1>Oops!</h1>
            <div class="message error">
                <?php echo $submission_message; ?>
            </div>
            <p>Please try again or contact us directly at <a href="mailto:info@truenode.co.uk">info@truenode.co.uk</a>.</p>
            <a href="javascript:history.back()" class="btn">Go Back</a>
        <?php else: ?>
            <h1>Contact Us</h1>
            <p>Please use our contact form on the homepage to send us a message.</p>
            <a href="/#contact" class="btn">Go to Contact Form</a>
        <?php endif; ?>
    </div>
</body>
</html> 