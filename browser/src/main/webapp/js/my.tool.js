var myModal_div = "#myModal-div";
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
function alertBox(parent, tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip;

    $("#warningTip").remove();
    $(parent).children(':first').before(box);
}

//模态框
function showMyModal(title, content, fun) {
    var myModal = $("#myModal");
    myModal.find("#title").text(title);
    myModal.find("#content").text(content);
    myModal.on('hide.bs.modal', fun);
    myModal.modal('show');
}
