<?php
session_start(); // Start session at the beginning

$Email = $password = "";
$EmailErr = $passwordErr = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["Email"])) {
        $EmailErr = "Email is Required";
    } else {
        $Email = $_POST["Email"];
    }
    if (empty($_POST["password"])) {
        $passwordErr = "Password is Required";
    } else {
        $password = $_POST["password"];
    }
    if ($Email && $password) {
        include("Connections.php");
        // Check if database connection is successful
        if (!$Connections) {
            die("Database connection failed: " . mysqli_connect_error());
        }
        $check_Email = mysqli_query($Connections, "SELECT * FROM login_tbl WHERE Email = '$Email'");
        $check_Email_row = mysqli_num_rows($check_Email);

        if ($check_Email_row > 0) {
            $_SESSION['email'] = $_POST['Email'];
            $row = mysqli_fetch_assoc($check_Email);
            $db_password = $row["Password"];
            $db_account_type = $row["Account_type"];
            if ($db_password == $password) {
                $_SESSION['account_type'] = $db_account_type; // Set the account type in session
                if ($db_account_type == "0") {
                    echo "<script> window.location.href = 'admin.html'; </script>";
                    exit; // Ensure that no further output is sent after redirection
                } else {
                    echo "<script> window.location.href = 'user.php'; </script>";
                    exit; // Ensure that no further output is sent after redirection
                }
            } else {
                $passwordErr = "Password is incorrect";
            }
        } else {
            $EmailErr = "Email is not Registered";
        }
    } 
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Login Form</title>
  <link rel="stylesheet" href="login.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
 
 <div class="wrapper">
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
	  <h1>Login</h1>
	  <div class="input-box">
	      <input type="text" placeholder="Username" name="Email" value="<?php echo $Email; ?>" >
	      <span class="error"><?php echo $EmailErr; ?></span>
	  </div>
	  <div class="input-box">
	       <input type="password" placeholder="Password" name="password" value="<?php echo $password; ?>" >
	       <span class="error"><?php echo $passwordErr; ?></span>
	  </div>
      <div class="remember-forgot">
	       <label><input type="checkbox" name="remember">Remember me</label>
		   <a href="#">Forgot password?<a/>
		  
	  </div>

       <button type="submit" class="btn">Login</button>	  
<p>Don't have an account?</p>
      <div class="register-link">
	  
	 <a href="signup.html"> 
	 Signup
	 </a>
	  </div>
    </form>

 </div>
   

</body>
</html>