using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class InstructionsManager : MonoBehaviour {

	public bool vrEnabled=true;
	public Button leftArrow;
	public Button rightArrow;
	public GameObject[] tabsCardboard;
	public GameObject[] tabsWindow;
	private int index;

	// Use this for initialization
	void Start () {
		index = 0;
		GetTab (index).SetActive (true);
		leftArrow.gameObject.SetActive(false);
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	private int GetLenght(){
		if (vrEnabled)
			return tabsCardboard.Length;
		else
			return tabsWindow.Length;
	}

	public void PrevTab(){
		GetTab (index).SetActive (false);
		index--;
		GetTab (index).SetActive (true);
		UpdateButtonsState ();
	}



	public void NextTab(){
		GetTab (index).SetActive (false);
		index++;
		GetTab (index).SetActive (true);
		UpdateButtonsState ();
	}

	private GameObject GetTab(int idx){
		if (vrEnabled)
			return tabsCardboard [idx];
		else
			return tabsWindow [idx];
	}

	private void UpdateButtonsState(){
		leftArrow.gameObject.SetActive(index!=0);
		rightArrow.gameObject.SetActive(index != GetLenght ()-1);
	}
}
