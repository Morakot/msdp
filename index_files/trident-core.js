/*******************************************************************************
 * 封装对于form、table等组件进行访问的公共方法.
 * 
 * @author Boki
 * @Date 2014-12-15 23:39:58
 ******************************************************************************/

/*******************************************************************************
 * 封装提交方式.
 ******************************************************************************/
/**
 * 用于提交的数据对象
 */
function SubmitData() {
	// 添加请求参数
	this.put = function() {
		if (arguments.length == 1) {// 如果只有一个参数,必须是jQuery封装的form表单
			var arg = arguments[0];
			if (!arg.jquery || arg.get(0).tagName.toLowerCase() != "form") {
				return;
			}
			var form = $(arg);
			for (var i = 0; i < form.get(0).elements.length; i++) {
				var field = form.get(0).elements[i];
				if (field.tagName.toLowerCase() == "button") {
					continue;
				}
				if (field.tagName.toLowerCase() == "input") {
					if (field.type.toLowerCase() == "submit" || field.type.toLowerCase() == "reset")
						continue;
				}
				if (field.name && field.value) {
					this.data[field.name] = field.value;
				}
			}
		} else if (arguments.length == 2) {// 如果有2个参数,第一个可以为[字符串,jquery表单,jquery表格]中的一种,另一个为key字符串.
			var arg1 = arguments[0];
			var arg2 = arguments[1];

			if (typeof arg2 != "string") {
				return;
			}

			if (typeof arg1 == "string") {
				// TODO:转码
				this.data[arg2] = arg1;
			} else if (arg1.jquery && arg1.get(0).tagName.toLowerCase() == "form") {// 表单
				if (!this.data.forms) {
					this.data.forms = {};
				}
				this.data.forms[arg2] = {};
				var form = $(arg1);
				for (var i = 0; i < form.get(0).elements.length; i++) {
					var field = form.get(0).elements[i];
					if (field.tagName.toLowerCase() == "button") {
						continue;
					}
					if (field.tagName.toLowerCase() == "input") {
						if (field.type.toLowerCase() == "submit" || field.type.toLowerCase() == "reset")
							continue;
					}
					if (field.name && field.value) {
						this.data.forms[arg2][field.name] = field.value;
					}
				}
			} else if (arg1.jquery && arg1.get(0).tagName.toLowerCase() == "table") {// 表格
				if (!this.data.tables) {
					this.data.tables = {};
				}
				// TODO:
			}
		}
	};

	this.data = {};

	this.getData = function() {
		return this.data;
	};

	// 获取用于提交数据, json格式, 在java代码中以"tridata"获取此json值
	this.getQueryData = function() {
		return "tridata=" + JSON.stringify(this.data);
	};
}

/*******************************************************************************
 * 处理由自定义标签生成的表格的方法
 ******************************************************************************/
/**
 * 获取当前行数据
 * 
 * @param trimed:在获取单元格内容时,是否去除前后空格. 除非设置为false, 否则默认去除.
 */
function getRowData(element, trimed) {
	var object = {};
	$(element).parent().parent().find("td").each(function(i) {
		if (!$(this).attr("type") || $(this).attr("type") == "label") {
			object[$(this).attr("name")] = (trimed == false) ? $(this).html() : $(this).html();
		} else {
			object[$(this).attr("name")] = $(this);
		}
	});
	return object;
}

/**
 * 获取当前行元素
 */
function getCell(element) {
	return $(element).parent();
}

/**
 * 获取当前单元格元素
 */
function getRow(element) {
	return $(element).parent().parent();
}