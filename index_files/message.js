var webroot;

$(document).ready(function() {
	webroot = $("#webroot").attr("value");
});

// add message to background database
function addMsg() {
	var sub = new SubmitData();

	// sub.put($("#commentForm"));
	sub.put($("#commentForm"), "form_msg");

	$.post(webroot + "/message_add.action", sub.getQueryData(), function(data) {
		var result = JSON.parse(data).result;
		if (result && result == "success") {
			alert("留言成功!");
		} else {
			alert("留言失败!");
		}
	});
}
