var user_div = "#user-info";//用户信息显示表单
$(function () {
    $(user_div).find("#submit").click(function (e) {
        e.preventDefault();
        updateUser(user_div);
    });
    getUser_alter(user_div);
    alertBox("修改信息请输入原密码！<br/>留空则不修改原信息。", "success");
});

function updateUser(user_div) {
    $.ajax({
        type: "PUT",
        url: _settings.api.user,
        data: $(user_div).serialize(),
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //修改成功
                showUser(result.extend.user);
                alertBox("保存成功", "success");
                showMyModal("修改成功", "您的信息已修改成功！", null);
            } else {
                alertBox("服务拒绝保存!<br/>修改信息请输入原密码！", "warning");
            }
        }
    });
}

function getUser_alter() {
    $.ajax({
        type: "GET",
        url: _settings.api.user,
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //查询成功
                showUser(result.extend.user);
            } else {
                showMyModal("提示！", "您未登录，无法进行此操作，请先登录。", function () {
                    //跳转到登录页面
                    window.location.href = _settings.html.login;
                });
            }
        }
    });
}

function showUser(user) {
    $(user_div).find("#username").val(user.username);
    $(user_div).find("#phoneNum").val(user.phone)
    $(user_div).find("#email").val(user.email);
    $(user_div).find("#sign").val(user.sign);
}