var user_div = "#user-table"

$(document).on("click", "#userdata_Tip", function () {
    show_user_bar();
    show_user_center();
});

function show_user_center() {
    if (userData == null || userData.length == 0) {
        showMyModal("提示！", "您未登录，无法进行此操作，请先登录。", function () {
            //跳转到登录页面
            window.location.href = _settings.html.login;
        });
        return;
    }
    $(user_div).find("#username").text(userData.username);
    $(user_div).find("#email").text(userData.email);
    $(user_div).find("#sign").text(userData.sign);
    //使用时间格式化插件格式化时间
    var time = moment(userData.regTime).format('YYYY-MM-DD HH:mm:ss');
    $(user_div).find("#reg_time").text(time);
}