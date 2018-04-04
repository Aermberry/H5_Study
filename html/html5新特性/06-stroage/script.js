var text_editor=document.querySelector('#text_editor');
	var btn_set=document.querySelector('#btn_set');
	var btn_get=document.querySelector('#btn_get');
	// 添加监听器
	// 设置内容到本地存储器
	// alert(text_editor)
	btn_set.addEventListener('click',function(){
		var value=text_editor.value;
		if(window.localStorage){
			// localStorage.a55=value;
			// localStorage['a45']=value;
			localStorage.setItem('a56', value);
			sessionStorage.setItem('a56', value);

		}

	});


// 从本地存储器获取内容
     btn_get.addEventListener('click',function(){
     	if(window.localStorage){
     		// text_editor.value=localStorage.a45;
     		// text_editor.value=localStorage['a45'];
     	text_editor.value=localStorage.getItem('a56');
     	text_editor.value=sessionStorage.getItem('a56');
     	}
     });