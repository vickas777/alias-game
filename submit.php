<?php

$data = array();

if( isset( $_GET['uploadfiles'] ) ){  
    $error = false;
    $files = array();

    $uploaddir = './uploads/'; // default directory to download on a server
	
	// Create directory if not exist
	if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );

	foreach( $_FILES as $file ){
        if( move_uploaded_file( $file['tmp_name'], $uploaddir . basename($file['name']) ) ){
            $files[] = realpath( $uploaddir . $file['name'] );
        }
        else{
            $error = true;
        }
    }
	$mas = explode("\n", file_get_contents($uploaddir . basename($file['name']))); 
    $data = $error ? array('error' => 'Ошибка загрузки файлов.') : array('files' => $mas );
    unlink($uploaddir . basename($file['name']));
    echo json_encode( $data );
}
?>