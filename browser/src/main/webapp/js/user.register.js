/**
 * 用户注册相关
 * @type {RegExp}
 */

var regUsername = /^[a-zA-Z_][a-zA-Z0-9_]{4,19}$/;
var regPasswordSpecial = /[~!@#%&=;':",./<>_\}\]\-\$\(\)\*\+\.\[\?\\\^\{\|]/;
var regPasswordAlpha = /[a-zA-Z]/;
var regPasswordNum = /[0-9]/;
var password;
var check = [false, false, false, false];

//提交注册
function regAjax(from) {
	$.ajax({
		type: "post",
		url: _settings.apiServer + _settings.url.ajaxReg,
		data: from.serialize(),
		dataType: "json",
		success: function(result) {
			console.log(result);
			if(data.isReg) { //注册成功
				$('#myModal').modal('show');
				showMyModal("注册成功！", "你已注册成功，注册信息已发送道破你的邮箱。", function() {
					window.location.href = _settings.apiServer + _settings.html.userCenter;
				});
			} else {
				showMyModal("注册失败！", "拒绝注册，服务器拒绝您的注册请求，请重试！");
			}
		},
		error: function() {
			showMyModal("网络检查！", "网络错误，请检查网络后重试！");
		}
	});
}

//校验成功函数
function success(Obj, counter) {
	Obj.parent().parent().removeClass('has-error').addClass('has-success');
	$('.tips').eq(counter).hide();
	$('.glyphicon-ok').eq(counter).show();
	$('.glyphicon-remove').eq(counter).hide();
	check[counter] = true;

}

// 校验失败函数
function fail(Obj, counter, msg) {
	Obj.parent().parent().removeClass('has-success').addClass('has-error');
	$('.glyphicon-remove').eq(counter).show();
	$('.glyphicon-ok').eq(counter).hide();
	$('.tips').eq(counter).text(msg).show();
	check[counter] = false;
}

// 用户名匹配
$('.container').find('#username').change(usernameVar).blur(usernameVar);

function usernameVar() {
	if(regUsername.test($(this).val())) {
		isHaveUsername($(this));
	} else if($(this).val().length < 5) {
		fail($(this), 0, '用户名太短，不能少于5个字符');
	} else {
		fail($(this), 0, '用户名只能为英文数字和下划线,且不能以数字开头')
	}
}

/**
 *验证用户名是否存在
 * @param account
 */
function isHaveUsername(account) {
	$.ajax({
		type: "post",
		url: _settings.apiServer + _settings.url.ajaxRegVer,
		data: "account=" + account.val(),
		dataType: "json",
		success: function(result) {
			console.log(result);
			if(data.isHave == false) { //账号未注册
				success(account, 0);
			} else {
				fail(account, 0, '用户名已存在！')
			}
		},
		error: function() {
			fail(account, 0, '网络错误，无法验证！')
		}
	});
}

// 密码匹配

// 匹配字母、数字、特殊字符至少两种的函数
function atLeastTwo(password) {
	var a = regPasswordSpecial.test(password) ? 1 : 0;
	var b = regPasswordAlpha.test(password) ? 1 : 0;
	var c = regPasswordNum.test(password) ? 1 : 0;
	return a + b + c;

}

$('.container').find('#password').change(function() {
	password = $(this).val();
	if($(this).val().length < 6) {
		fail($(this), 1, '密码太短，不能少于6个字符');
	} else {
		if(atLeastTwo($(this).val()) < 2) {
			fail($(this), 1, '密码中至少包含字母、数字、特殊字符的两种')
		} else {
			success($(this), 1);
		}
	}
});

// 再次输入密码校验
$('.container').find('#passwordConfirm').change(function() {
	if($(this).val() == password) {
		success($(this), 2);
	} else {
		fail($(this), 2, '两次输入的密码不一致');
	}
});

// 手机号码
var regPhoneNum = /^[0-9]{11}$/
$('.container').find('#phoneNum').change(phoneNumVar).blur(phoneNumVar);

//手机号码验证
function phoneNumVar() {
	if(regPhoneNum.test($(this).val())) {
		isHavePhoneNum($(this));
	} else {
		fail($(this), 3, '手机号码只能为11位数字');
	}
}

/**
 *验证手机号是否存在
 * @param account
 */
function isHavePhoneNum(account) {
	$.ajax({
		type: "post",
		url: _settings.apiServer + _settings.url.ajaxRegVer,
		data: "account=" + account.val(),
		dataType: "json",
		success: function(result) {
			console.log(result);
			if(data.isHave == false) { //账号未注册
				success(account, 3);
			} else {
				fail(account, 3, '手机号码已注册！')
			}
		},
		error: function() {
			fail(account, 3, '网络错误，无法验证！')
		}
	});
}

$('#submit').click(function(e) {
	e.preventDefault();
	if(!check.every(function(value) {
			if(value == true) {
				regAjax($(_settings.regFrom));
			}
		})) {
		for(key in check) {
			if(!check[key]) {
				$('.container').find('input').eq(key).parent().parent().removeClass('has-success').addClass('has-error')
			}
		}
	}
});