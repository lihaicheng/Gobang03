var myModal_div = "#myModal-div";
var my_alertBox = "#my_alertBox";
$(function () {
    //存在模态框id则异步加载模态框
    if ($(myModal_div).length > 0) {
        loadMyModal(myModal_div);
        console.log("加载模态框")
    }


    //加载模态框数据,方法私有
    function loadMyModal(modal_div) {
        $.get("html/myModal.html", function (result) {
            $(modal_div).html(result);
        });
    }
});

/* 提示框 */
function alertBox(tip, color) {
    var box = $("<div></div>");
    $("#warningTip").remove();

    box.attr("id", "warningTip");
    box.attr("class", "alert alert-" + color + " alert-dismissible");
    box.attr("role", "alert");
    box.html("<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip);

    $(my_alertBox).html(box);
}

//模态框
function showMyModal(title, content, fun) {
    var myModal = $("#myModal");
    myModal.find("#title").text(title);
    myModal.find("#content").text(content);
    myModal.on('hide.bs.modal', fun);
    myModal.modal('show');
}
