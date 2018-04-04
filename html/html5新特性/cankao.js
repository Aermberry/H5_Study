// 在H5中为每个DOM元素添加了一组ondragxxx事件
    //
    var p = document.querySelector('p');
    // 设置target上有元素经过时的样式
    var target = document.querySelector('#target');

    function dragstartHandler(e) {
      var sourceId = this.dataset.sourceId;
      e.dataTransfer.setData('source', sourceId);
      // 拖放开始触发
     
      this.style.borderColor = 'red';
    }

    p.addEventListener('dragstart', dragstartHandler);

    var a = document.querySelector('a');
    a.addEventListener('dragstart', dragstartHandler);

    // 注册目标元素的放事件
    target.addEventListener('drop', function(e) {
      // 当有元素扔到当前target上时触发
      var sourceId = e.dataTransfer.getData('source');
      console.log(sourceId);

      var selector = '[data-source-id="' + sourceId + '"]';
      // [data-source-id="1"]
      this.appendChild(document.querySelector(selector));

    });




    p.addEventListener('dragend', function(e) {
      this.style.borderColor = '#c0c0c0';
    });

    target.addEventListener('dragenter', function(e) {
      // 元素进入当前区域触发
      // console.log('有人来了');
      this.classList.add('over');
    });

    target.addEventListener('dragleave', function(e) {
      // 元素进入当前区域触发
      // console.log('有人来了');
      this.classList.remove('over');
    });

    // 如果想要drop触发一定要在dragover阻止系统默认事件
    target.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
