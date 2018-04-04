// 获取P元素
var p=document.querySelector('p');

var target=document.querySelector('#target');

function dragstarthander (e) {
	// body... 
	var sourceId=this.dataset.sourceId;
	e.dataTransfer.setDate('source', sourceId);
	//拖动开始触发
	this.style.borderColor = 'red';
}

// 开始拖动
p.addEventListener('dragstart',dragstarthander);

var a=document.querySelector('a');
a.addEventListener('dragstart', dragstarthander);

//注册目标元素的放事件
target.addEventListener('drop',function(e){
	// 当有元素扔到当前target上时触发
	var sourceId=e.dataTransfer.getDate('source');
	console.log('sourceId');

	var selector='[data-source-id="'+sourceId+'"]';
	// [data-source-id="1"],querySelector通过自定义属性进行选择器选择
	this.appendChild(document.querySelector(selector));

});