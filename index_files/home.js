var webroot;

$(document).ready(function() {
	webroot = $("#webroot").attr("value");

	//
	$("#gallery li").each(function(index) {

		$(this).click(function() {
			var modal = $.UIkit.modal("#alert");
			var img = $("#alert").children().find("img");
			img.attr("src", $(this).find("img").attr("src"));
			if (modal.isActive()) {
				modal.hide();
			} else {
				// $(modal.element[0]).find(".uk-modal-dialog").width($(modal.element[0]).find(".uk-modal-close
				// uk-close").width());
				// $(modal.element[0]).find(".uk-modal-dialog").width(700);
				$(modal.element[0]).find("p").html($(this).find("img").attr("name"));
				modal.show();
				$(modal.element[0]).find(".uk-modal-dialog img").width("100%");
			}
		});

	});

	// 不能写在外面
	$("#cover ul li a").each(function(i) {
		$(this).click(i, function() {
			picIndex = i;
			showPic(i);
		});
	});

	//
	// $("#open_explore").focusout(function() {
	// $("#open_explore").css("display", "block");
	// });

	// 工程展示名称暂显
	$("#gallery li").each(function(i) {
		var name = $(this).find("img").attr("name");
		$(this).append("<div>" + name + "</div>");
	});
	$("#gallery li").mouseenter(function() {
		$(this).find("div").animate({
			"bottom" : 0
		}, 200);
	});
	$("#gallery li").mouseleave(function() {
		$(this).find("div").animate({
			"bottom" : "-30px"
		}, 200);
	});

});

// add message to background database
function addMsg() {
	var sub = new SubmitData();

	// sub.put($("#commentForm"));
	sub.put($("#commentForm"), "form_msg");

	$.post(webroot + "/message_add.action", sub.getQueryData(), function(data) {
		var result = JSON.parse(data).result;
		var modal = $.UIkit.modal("#alert");
		if (result && result == "success") {
			// $("#alert").children().children().last().html("留言成功!");
		} else {
			alert("留言失败!");
		}
		if (modal.isActive()) {
			modal.hide();
		} else {
			modal.show();
		}
	});
}

// 图片轮播
var picMargins = [ "0", "-100%", "-200%", "-300%" ];
var picIndex = 0;
var tenth = 0;
function slider(direction) {
	picIndex = (picIndex + direction + 4) % 4;
	// console.log(new Date() + "=======" + picIndex);
	showPic(picIndex);
}

window.setInterval(function() {
	tenth++;
	if (tenth >= 70) {
		tenth = 0;
		slider(+1);
	}
}, 100);

function showPic(index) {
	$("#pic_slider").animate({
		marginLeft : picMargins[index]
	}, 500);
	tenth = 0;
	$("#cover ul li").css("background", "url('" + webroot + "/common/images/unselected.png') no-repeat center");
	$("#cover ul li").eq(index).css("background", "url('" + webroot + "/common/images/selected.png') no-repeat center");
}

// 关闭"展开探索"
function close_explore() {
	$("#open_explore").css("display", "none");
}
//
function open_explore() {
	$("#open_explore").css("display", "block");
	// $("#open_explore").trigger("focusin");
}