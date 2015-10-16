<?
ini_set('display_errors','On');
error_reporting('E_ALL');

if ($_POST['location']) {
	//echo "bla-bla";
$mes=
sprintf('



<html>
<head></head>
<body>
<br>
<p align="left">
<font face="Verdana" size="2">
<b>%s</b><br><br>
<b>Имя:</b> %s<br>
<b>Телефон:</b> %s<br>
<b>E-mail:</b> %s<br>
%s<br>
%s</font>
</p>
</body>
</html>
',
$_POST['location'],
$_POST['name'],
$_POST['phone'],
$_POST['email'],
$_POST['point'],
$_POST['comment']
);
$from = 'robot@stamp-here.ru';
$email_to='zakaz@stamp-here.ru';
//$email_to='lauramohr@yandex.ru';
$subj='Заявка с сайта "stamp-here.ru"';
if ($_FILES['file']['name']) {
	$uploadfile="./files/".$_FILES['file']['name'];
	move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
	//echo $file_name;
	//$file_name=$temp;
	$file_name=$uploadfile;
	$file=fopen($file_name, "rb");
	// Считываем его в строку $str_file
	$str_file=fread($file,filesize($file_name));
	// Преобразуем эту строку в base64-формат
	//$str_file=base64_encode($str_file);
	$bound=md5(time());
	$header1="Mime-Version: 1.0\r\n";
	$header1.="Content-Type: multipart/mixed; boundary=\"--".$bound."\"";
	$body="\r\n----".$bound."\r\n";
	$body.="Content-type: text/html; charset=\"koi8-r\"\n";
	$body.="Content-Transfer-Encoding: quoted-printable\n\n";
	$mes=convert_cyr_string($mes,'w','k');
	$body.=$mes;
	$body.="\r\n----".$bound."\n";
	$body.="Content-Type: application/octet-stream; ";
	$body.="name=\"".basename($file_name)."\"\r\n";
	$body.="Content-Transfer-Encoding: base64\r\n";
	$body.="Content-Disposition:attachment; filename=\"".basename($file_name)."\"\r\n\r\n";
	//$body.="filename=\"".basename($file_name)."\"\n";
	$body.=chunk_split(base64_encode($str_file))."\r\n";
	$body.="----".$bound."--\r\n";
	$header="From: $from \r\n";
	$header2=$header.$header1;
	$mes2=$body;
	$subj=convert_cyr_string($subj,'w','k');
	$header=convert_cyr_string($header2,'w','k');
	@unlink ($uploadfile);
//fclose($temp); // происходит удаление файла
} else {
	$header="From: $from \r\nContent-Type: text/html;charset=\"koi8-r\"";
	$mes2=convert_cyr_string($mes,'w','k');
	$subj=convert_cyr_string($subj,'w','k');
	$header=convert_cyr_string($header,'w','k');
}
@mail($email_to,$subj,$mes2,$header);
header("Location:thanks.html");
/*exit;
die();*/
//echo '<html><body><script>document.location.href="thanks.html"</script></body></html>';
/*echo'<script type="text/javascript">
  location.replace("/thanks.html");
</script>';*/
}
?>