var on = false;
var i_elem;
chrome.storage.sync.get("on", function (obj) {
	if (obj.on!==null) {
		if (obj.on == "true") {
			on = true;	
			chrome.storage.sync.get("ins_to_input", function (obj) {
				if (obj.ins_to_input!==null) {
					if (obj.ins_to_input == "false") {
						i_elem = 1;
						$("input[type='password']").each(function() {
							var this_dev_gp = Math.random().toString(36).slice(2,12)+i_elem;
							$(this).attr('dev_gp',this_dev_gp).wrap("<div class='dev_gen_pass_ob_inp'></div>");
							$(this).parent().append("<input type='button' class='dev_gen_pass_button_p dev_gen_pass_show' name='dev_gen_pass_toggle_pass' dev_gp_but='"+this_dev_gp+"' value=''>");
							$("[name='dev_gen_pass_toggle_pass'][dev_gp_but='"+this_dev_gp+"']").css({
								'padding' : $(this).css('padding'),
								'font' : $(this).css('font'),
								'font-size' : $(this).css('font-size'),
								'left' : $(this).innerWidth()-24,
							});
							$(this).parent().attr("style","width:"+$(this).innerWidth()+"px !important;");
							i_elem++;
						});
					}
				}
			});
		}
	}
});
chrome.storage.sync.get("ins_to_input", function (obj) {
	if (obj.ins_to_input!==null) {
		if (obj.ins_to_input == "true") {
			i_elem = 1;
			$("input[type='password']").each(function() {
				var this_dev_gp = Math.random().toString(36).slice(2,12)+i_elem;
				$(this).attr('dev_gp',this_dev_gp).wrap("<div class='dev_gen_pass_ob_inp'></div>");
				//$(this).parent().append("<input type='button' class='dev_gen_pass_button_g_p' name='dev_gen_pass_open_g_p_block' value='•••' style='border-color:"+$(this).css('border-color')+" !important;padding-top:"+$(this).css('padding-top')+" !important;padding-bottom:"+$(this).css('padding-bottom')+" !important;font-size:"+$(this).css('font-size')+" !important;font-weight:"+$(this).css('font-weight')+" !important;font-style:"+$(this).css('font-style')+" !important;font-variant:"+$(this).css('font-variant')+" !important;font-stretch:"+$(this).css('font-stretch')+" !important;line-height:"+$(this).css('line-height')+" !important;'>")
				$(this).parent().append("<input type='button' class='dev_gen_pass_button_g_p' name='dev_gen_pass_open_g_p_block' dev_gp_but='"+this_dev_gp+"' value='•••'>");
				$("[name='dev_gen_pass_open_g_p_block'][dev_gp_but='"+this_dev_gp+"']").css({
					'padding' : $(this).css('padding'),
					'font' : $(this).css('font'),
					'font-size' : $(this).css('font-size'),
					'border' : $(this).css('border'),
					'left' : $(this).innerWidth(),
				});
				$(this).parent().attr("style","width:"+$(this).innerWidth()+"px !important;");
				if (on === true) {
					$(this).parent().append("<input type='button' class='dev_gen_pass_button_p dev_gen_pass_show' name='dev_gen_pass_toggle_pass' dev_gp_but='"+this_dev_gp+"' value='&nbsp;'>");
					$("[name='dev_gen_pass_toggle_pass'][dev_gp_but='"+this_dev_gp+"']").css({
						'padding' : $(this).css('padding'),
						'font' : $(this).css('font'),
						'font-size' : $(this).css('font-size'),
						'left' : $(this).innerWidth()-$("[name='dev_gen_pass_open_g_p_block'][dev_gp_but='"+this_dev_gp+"']").innerWidth()-5,
					});
					$(this).parent().attr("style","width:"+$(this).innerWidth()+"px !important;");
				}
				i_elem++;
			});
		}
	}
});
$(document).ready(function(){
	$('body').on('click', '[name="dev_gen_pass_open_g_p_block"]', function(){
		//alert($(this).offset().top + " - " + $(this).offset().left);
		var o_top = $(this).offset().top + $(this).parent().height();
		$("body").append("<div id='dev_gen_pass_block_g_p' class='dev_gen_pass_block_g_p' style='top:"+o_top+"px;left:"+$(this).offset().left+"px'><div class='dev_gen_pass_block_n'><div class='dev_gen_pass_title'><div class='dev_gen_pass_text_center'>Вставить пароль</div><div class='dev_gen_pass_close_pp'>&#215;</div></div><div class='dev_gen_pass_content dev_gen_pass_text_center'><div class='dev_gen_pass_str'><input type='checkbox' id='dev_gen_pass_char' dev_gp_char='"+$(this).attr('dev_gp_but')+"'><label for='dev_gen_pass_char'>Символы</label></div><div class='dev_gen_pass_str'><input type='checkbox' id='dev_gen_pass_all_in_form' checked='checked' dev_gp_aif='"+$(this).attr('dev_gp_but')+"'><label for='dev_gen_pass_all_in_form'>Вставить пароль во все поля формы</label></div><div class='dev_gen_pass_str'><span>Количество символов</span><input type='number' name='"+$(this).attr('dev_gp_but')+"' min='1' max='100' value='15'></div><div class='dev_gen_pass_str'><input type='button' class='dev_gen_pass_btn' name='dev_gen_pass_gen_pass' dev_gp_but_ok='"+$(this).attr('dev_gp_but')+"' value='Создать пароль'></div></div></div></div>");
	});
	$('body').on('click', '.dev_gen_pass_close_pp', function(){
		$(this).parent('div').parent('div').parent('div').remove();
	});
	$('body').on('click','[name="dev_gen_pass_gen_pass"]', function(){
		var num = $("[name='"+$(this).attr('dev_gp_but_ok')+"']").val();
		if($("[dev_gp_char='"+$(this).attr('dev_gp_but_ok')+"']").prop("checked")) {
			var new_pass = rand_str_c(num);
		}else{
			var new_pass = rand_str(num);
		}
		if($("[dev_gp_aif='"+$(this).attr('dev_gp_but_ok')+"']").prop("checked")) {
			$('[dev_gp="'+$(this).attr('dev_gp_but_ok')+'"]').closest('form').find("input[type='password']").each(function(){
				$(this).val(new_pass);
			});
		}else{
			$('[dev_gp="'+$(this).attr('dev_gp_but_ok')+'"]').val(new_pass)
		}
	});
	$('body').on('click','[name="dev_gen_pass_toggle_pass"]',function(){
		if ($("[dev_gp='"+$(this).attr('dev_gp_but')+"']").attr("type") == "password") {
			$("[dev_gp='"+$(this).attr('dev_gp_but')+"']").prop("type", "text");
			$(this).removeClass("dev_gen_pass_show").addClass("dev_gen_pass_hide");
		}else{
			$("[dev_gp='"+$(this).attr('dev_gp_but')+"']").prop("type", "password");
			$(this).removeClass("dev_gen_pass_hide").addClass("dev_gen_pass_show");
		}
	});
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