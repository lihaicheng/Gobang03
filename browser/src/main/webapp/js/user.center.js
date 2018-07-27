$(function () {
    getUser_center($("#user-table"));
});

function getUser_center(user_div) {
    $.ajax({
        type: "GET",
        url: _settings.apiServer + _settings.api.user,
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //登陆成功
                var user = result.extend.user;
                user_div.find("#username").text(user.username);
                user_div.find("#email").text(user.email);
                user_div.find("#sign").text(user.sign);
                var time=moment(user.regTime).format('YYYY-MM-DD HH:mm:ss');
                user_div.find("#reg_time").text(time);
            } else {
                showMyModal("提示！", "您未登录，无法进行此操作，请先登录。", function () {
                    //跳转到登录页面
                    window.location.href = _settings.html.login;
                });
            }
        }
    });
}
