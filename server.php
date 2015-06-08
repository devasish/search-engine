<?php
error_reporting(E_ALL);
$q = $_GET['q'];

$server = 'localhost';
$username = 'root';
$password = '';

$con = mysqli_connect($server, $username, $password);
mysqli_select_db($con, 'test');


$sql = "SELECT * FROM items WHERE name LIKE '%$q%'";
$result = mysqli_query($con, $sql);

$data = array();
if(!empty($result))
if (mysqli_num_rows($result))
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);

