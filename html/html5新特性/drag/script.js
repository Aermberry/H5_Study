//拖动
var currentTarget;
var p=document.querySelector('p')
console.log(p);
// 开始拖动
p.addEventListener('dragstart', function(e){
	currentTarget=this;
	this.style.borderColor = 'red' ;
});

// 拖动结束
p.addEventListener('dragend',function(e){
this.style.borderColor = '#c0c0c0';
});

// target有元素进入时
var target=document.querySelector('#target');
// alert(target);
target.addEventListener('dragenter',function (e) {
	/* body... */
	// this.className='over';
	this.classList.add('over');
});

// 元素离开时
target.addEventListener('dragleave',function (e) {
	/* body... */
	this.classList.remove('over');

});

// 阻止事件冒泡
target.addEventListener('dragover',function (e) {
	/* body... */
e.preventDefault();
e.stopPropagation();
});

target.addEventListener('drop',function (e) {
	/* body... */
	this.appendChild(currentTarget);
})
