var user_div = "#user-info";//用户信息显示表单
$(function () {
    $(user_div).find("#submit").click(function (e) {
        e.preventDefault();
        updateUser();
    });
    alertBox("修改信息请输入原密码！<br/>留空则不修改原信息。", "success");
});

//这里监听后来元素事件
$(document).on("click", "#userdata_Tip", function () {
    show_user_bar();
    show_user_alter();
});

//提交更新信息请求
function updateUser() {
    $.ajax({
        type: "PUT",
        url: _settings.api.user,
        data: $(user_div).serialize(),
        success: function (result) {
            console.log(result);
            if (result.code == 200) { //修改成功
                userData=result.extend.user;
                alertBox("保存成功", "success");
                showMyModal("修改成功", "您的信息已修改成功！", null);
            } else {
                alertBox("服务拒绝保存!<br/>修改信息请输入原密码！", "warning");
            }
        }
    });
}

function show_user_alter() {
    if (userData == null || userData.length == 0) {
        showMyModal("提示！", "您未登录，无法进行此操作，请先登录。", function () {
            //跳转到登录页面
            window.location.href = _settings.html.login;
        });
        return;
    }
    $(user_div).find("#username").val(userData.username);
    $(user_div).find("#phoneNum").val(userData.phone)
    $(user_div).find("#email").val(userData.email);
    $(user_div).find("#sign").val(userData.sign);
}