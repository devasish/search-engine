<?php

$server = 'localhost';
$username = 'root';
$password = '';

$con = mysqli_connect($server, $username, $password);
mysqli_select_db($con, 'test');



$alfa = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
$len = rand(10, 25);
$name = '';
for ($x = 0; $x < 500; $x ++) {
    $name = '';
    for ($i = 0; $i < $len; $i++) {
        $index = rand(0, 25);
        $name .= $alfa[$index];
        if ($index % 5 == 0) {
            $name .= ' ';
        }
    }

    $name = ucwords($name);
    $price = rand(20, 1000);


    $sql = "INSERT INTO items (name,price) VALUES('$name', '$price')";
    mysqli_query($con, $sql);
    echo ucwords($name) . '<br/>';
}


