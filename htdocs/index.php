<?php

	require_once __DIR__ . '/../vendor/autoload.php';

	/* Set up error handling before we get to the stack. */
	
	//\OpenBuild\Exception\Handler::register();

	/* Get the app */
	$app = \OpenBuild\Application::getInstance();

	/* Check for functional testing or run the app. */
	if(isset($functionalTest) && $functionalTest === TRUE){
		return $app;
	}else{
		$app->run();
	}

