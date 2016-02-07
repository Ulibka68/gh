$(document).ready(function(){
	$("#gen_pass").click(function () {
		if($("#char").prop("checked"))
			$("#new_pass").empty().text(rand_str_c(parseInt($("#num_c").val())));
		else
			$("#new_pass").empty().append(rand_str(parseInt($("#num_c").val())));
	});
	$("#ins_to_input").change(function () {
		if($("#ins_to_input").prop("checked")) {
			chrome.storage.sync.set({'ins_to_input': "true"});
		}else{
			chrome.storage.sync.set({'ins_to_input': "false"});
		}
	});
	$("#on").change(function () {
		if($("#on").prop("checked")) {
			chrome.storage.sync.set({'on': "true"});
		}else{
			chrome.storage.sync.set({'on': "false"});
		}
	});
});
chrome.storage.sync.get("ins_to_input", function (obj) {
	if (obj.ins_to_input!==null) {
		if (obj.ins_to_input == "true") {
			$("#ins_to_input").attr("checked","checked");
		}else{
			$("#ins_to_input").removeAttr("checked");
		}
	}
});
chrome.storage.sync.get("on", function (obj) {
	if (obj.on!==null) {
		if (obj.on == "true") {
			$("#on").attr("checked","checked");
		}else{
			$("#on").removeAttr("checked");
		}
	}
});
function rand_str(n){
	var s ='';
	while(s.length < n)
		s += Math.random().toString(36).slice(2, 12);
	return s.substr(0, n);
}
function rand_str_c(n) {
	var result       = '';
	var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@"#№$;%^:&?*()[]{}\'|/.,<>+=-_`~';
	var max_position = words.length - 1;
	for( i = 0; i < n; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}
	return result;
}