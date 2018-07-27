var user_div = $("#user-info");
$(function () {
    user_div.find("#submit").click(function (e) {
        e.preventDefault();
        updateUser(user_div);
    });
    getUser_alter(user_div);
    alertBox("#user-info", "修改信息请输入原密码！<br/>留空则不修改原信息。", "success");
});

function updateUser(user_div) {
    $.ajax({
        type: "PUT",
        url: _settings.apiServer + _settings.api.user,
        data: user_div.serialize(),
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //修改成功
                showUser(result.extend.user);
                alertBox(user_div, "保存成功", "success");
                showMyModal("修改成功", "您的信息已修改成功！", null);
            } else {
                alertBox(user_div, "服务拒绝保存!<br/>修改信息请输入原密码！", "warning");
            }
        }
    });
}

function getUser_alter(user_div) {
    $.ajax({
        type: "GET",
        url: _settings.apiServer + _settings.api.user,
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //查询成功
                showUser(result.extend.user);
            }
        }
    });
}

function showUser(user) {
    user_div.find("#username").val(user.username);
    user_div.find("#phoneNum").val(user.phone)
    user_div.find("#email").val(user.email);
    user_div.find("#sign").val(user.sign);
}