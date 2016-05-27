#pragma strict

public var difficulty : int = 1;
public var playing : boolean = false;
public var died : boolean = false;
public var score : int = 1;
public var lives : int = 4;

function Awake(){
	DontDestroyOnLoad(this);
}