/*加载用户数据*/

$(function () {
    getUserBar();
    $(".loginOut").click(function () {
        loginOut();
    });
});

//注销登录
function loginOut() {
    $.ajax({
        type: "get",
        url: _settings.apiServer + _settings.api.logout,
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //注销成功
                alert("注销成功！")
                window.location.href = _settings.html.login;
            } else {
                alert("注销登录失败！")
            }
        }
    });
}

//自动登录用户
function getUserBar() {
    $.ajax({
        type: "get",
        url: _settings.apiServer + _settings.api.user,
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //登陆成功
                var user = result.extend.user;
                $("#navbar-user").show();
                $("#navbar-user").find(".user-bar").text(user.username);
                $("#navbar-login").hide();
            } else {
                $("#navbar-user").hide();
                $("#navbar-login").show();
            }
        }
    });
}