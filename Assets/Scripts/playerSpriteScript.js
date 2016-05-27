#pragma strict

public var arrowSprite : GameObject;

private var spriteRendererArrow : SpriteRenderer;
private var showingArrow : boolean;
private var arrowCounter : float;

function Start () {
	showingArrow = false;
	spriteRendererArrow = arrowSprite.GetComponent.<SpriteRenderer>();
	spriteRendererArrow.color = Color(1,1,1,0);
	arrowCounter = 0;
}

function Update () {
	if (Time.timeScale != 1) {
		if (!showingArrow) {
			arrowCounter = 0;
			spriteRendererArrow.color = Color(1,1,1,1);
			showingArrow = true;
		}
	}
	else {
		if (showingArrow) {
			spriteRendererArrow.color = Color(1,1,1,0);
			showingArrow = false;
			arrowSprite.transform.localPosition = Vector3(10,10,0);
		}
	}

	if (showingArrow) {
		arrowCounter++;
		arrowSprite.transform.Translate(Vector3.up * Mathf.Sin(arrowCounter/10) / 4);
	}
}