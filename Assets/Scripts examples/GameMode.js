#pragma strict

public var levelName : String;
public var previousLevel : int;
public var allLevelsMode : boolean;

function Awake(){
	DontDestroyOnLoad(this);
}