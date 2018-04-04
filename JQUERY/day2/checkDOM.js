/**
 * Created by jQueryDemo on 2015/12.
 */
$(function () {

    var $j_cbAll = $("#j_cbAll"), // 获取全选checkbox：jQuery对象
    //j_cbAll = $j_cbAll[0], // 获取全选checkbox：DOM对象
        $tb = $("#j_tb"), // 获取tbody
        $cbs = $tb.find(":checkbox"); // 获取tbody中所有的复选框
    //cbsLen = $cbs.length; // 获取复选框的长度

    // 给全选checkbox绑定单击事件：处理所有选项的checkbox选中状态
    $j_cbAll.click(function () {
        // 全选
        if ($(this).prop("checked") === true) {
            // 设置复选框被选中
            $cbs.prop("checked", true);
        } else {
            // 设置复选框不被选中
            $cbs.prop("checked", false);
        }
    });

    // 给所有 tbody中的 checkbox元素 绑定click事件
    $cbs.click(function () {
        // 获取所有被选中的checkbox个数
        $tb.find(":checkbox:checked").length === $cbs.length ?
            $j_cbAll.prop("checked", true) :
            $j_cbAll.prop("checked", false);
    });


    // GET选中元素
    $("#j_btnDelSel").click(function () {
        // 判断如果没有选中行则提示
        if($tb.find(":checked").length <= 0) {
            alert("请选中要GET的行");
            return;
        }

        // 选中所用行直接使用html()方法 更快
        if($tb.find(":checkbox:checked").length === $cbs.length) {
            $tb.html("");
            // 设置不选中状态
            $j_cbAll.prop("checked", false);
            alert("恭喜你已GET所有神技！");
            return;
        }

        // 获取到所有选中行
        $tb.find(":checked").parent("td").parent("tr").remove();
    });

    // GET单行
    $("a.get").click(function () {
        // todo: GET前的确认操作
        delDate(this);
    });

    // 展示添加窗口
    $("#j_btnAddData").click(function () {
        $("#j_mask").show();
        $("#j_formAdd").show();
    });

    // 添加
    $("#j_btnAdd").click(function () {
        var txtLesson = $("#j_txtLesson").val();
        var txtBelSch = $("#j_txtBelSch").val();

        // 判断是否输入了内容
        if($.trim(txtLesson) === "") {
            alert("请出入课程名称");

            return;
        }

        var trHml =
            "<tr>"
            +   "<td><input type='checkbox'/></td>"
            +   "<td>" + txtLesson + "</td>"
            +   "<td>" + txtBelSch + "</td>"
            +   "<td><a href='javascrip:;' class='get' onclick='delDate(this)'>GET</a></td>"
            + "</tr>";

        $tb.append(trHml);

        hideFormAddSection();
    });

    // 关闭按钮
    $("#j_hideFormAdd").click(function () {
        hideFormAddSection();
    });
});

// GET单行
function delDate(e) {
    // 调用的时候把this传进来，调用时候的this指向当前元素：a
    $(e).parent("td").parent("tr").remove();
}

// 隐藏添加区域并重置值
function hideFormAddSection() {
    $("#j_mask").hide();
    $("#j_formAdd").hide();

    $("#j_txtLesson").val("");
    $("#j_txtBelSch").val("传智播客-前端与移动开发学院");
}