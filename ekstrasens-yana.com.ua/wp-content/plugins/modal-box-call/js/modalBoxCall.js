function showModalBoxCall() {
 	
	var modalBack = document.getElementById('popupBoxBack'); // находим наше "окно"
    modalBack.style.display = 'block'; // "включаем" его
	
    var modalWin = document.getElementById('popupBoxCall'); // находим наше "окно"
    modalWin.style.display = 'block'; // "включаем" его

    myCloseBoxCall.onclick = function(){ // при клике на кнопку все исчезнет
		modalBack.style.display = 'none'; // делаем окно невидимым
        modalWin.style.display = 'none'; // делаем окно невидимым
        return false;
    };
	
	popupBoxBack.onclick = function(){ // при клике на кнопку все исчезнет
		modalBack.style.display = 'none'; // делаем окно невидимым
        modalWin.style.display = 'none'; // делаем окно невидимым
		return false;
    };
}