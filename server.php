<?php

$server = 'localhost';
$username = 'root';
$password = '';

$con = mysqli_connect($server, $username, $password);
mysqli_select_db($con, 'test');

$mode = isset($_GET['mode']) ? $_GET['mode'] : '';

if ($mode == 'det') {
    $id = $_GET['id'];
    $sql = "SELECT * FROM items WHERE id='$id'";
    $result = mysqli_query($con, $sql);

    $data = array();
    if (!empty($result))
        if (mysqli_num_rows($result))
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }

    echo json_encode($data);
} else {
    $q = $_GET['q'];
    $sql = "SELECT * FROM items WHERE name LIKE '$q%' LIMIT 25";
    $result = mysqli_query($con, $sql);

    $data = array();
    if (!empty($result))
        if (mysqli_num_rows($result))
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }

    echo json_encode($data);
}

