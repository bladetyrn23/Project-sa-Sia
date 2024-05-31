<?php
session_start();
if (!isset($_SESSION['email']) || $_SESSION['account_type'] !== '1') {
    header("Location: login22.php");
    exit();
}
include("Connections.php");
$user_email = $_SESSION['email'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #36393f; /* Discord's dark background color */
            color: #fff; /* Text color */
        }
        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #202225; /* Discord's dark secondary color */
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            color: #fff; /* White text color */
        }
        h2 {
            margin-bottom: 20px;
            color: #fff; /* White text color */
        }
        p {
            margin-bottom: 30px;
            color: #ccc; /* Light gray text color */
        }
        a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #7289da; /* Discord's brand color */
            color: #fff; /* White text color */
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        a:hover {
            background-color: #677bc4; /* Slightly darker shade of Discord's brand color */
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome, User <?php echo $user_email; ?></h2>
        <p>This is your user dashboard. You can access your account settings, profile, etc., here.</p>
        <a href="login22.php">Logout</a>
    </div>
</body>
</html>
