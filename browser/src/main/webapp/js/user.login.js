/*
用户登录相关
 */

$(function () {
    loginFrom("#loginFrom", "#login_btn");
    fromVar("#loginFrom");
});

function loginFrom(from, submit) {
    $(submit).click(function () {
        event.preventDefault();
        submit_disenable(this);
        ajaxLogin($(from), $(submit));
    });
}

function fromVar(from) {
    $(from).validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            username: "请输入用户名",
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            }
        }
    });
}

function ajaxLogin(from, submit) {
    $.ajax({
        type: "post",
        url: _settings.apiServer + _settings.api.login,
        data: from.serialize(),
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.code == 100) { //登陆成功
                showLogin_success(from);
                window.location.href = _settings.html.userCenter;
            } else {
                showLogin_error(from);
            }
        },
        error: function (result) {
            showNet_error(from);
        },
        complete: function () {
            // Handle the complete event
            submit_enable(submit);
        }
    });
}

var classes = "";//提交按钮新class
var oldClasses = "";//提交按钮原class
function submit_disenable(submit) {
    oldClasses = submit.getAttribute("class");
    classes = oldClasses + " disabled";
    submit.setAttribute("class", classes);
    submit.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在登陆...";
}

function submit_enable(submit) {
    submit.setAttribute("class", oldClasses);
    submit.removeClass("disabled");
    submit.html("登录");
}

function showNet_error(parent) {
    var tips = "登录失败，请检查网络！";
    alertBox(parent, tips, "warning")
}

function showLogin_error(parent) {
    var tips = "账号或密码错误，请重新输入！";
    alertBox(parent, tips, "warning")
}

function showLogin_success(parent) {
    var tips = "登录成功，欢迎回来！";
    alertBox(parent, tips, "success")
}

//JS操作cookies方法!

//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}