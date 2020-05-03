const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

$('.btn-register').click(function (params) {
	$('#form-login').addClass('hidden');
	$('#form-forgot-password').addClass('hidden');
	$('#form-register').removeClass('hidden');

	$('#img-bg').attr('src', 'img/bg.svg');
});

$('.btn-login').click(function (params) {
	$('#form-register').addClass('hidden');
	$('#form-forgot-password').addClass('hidden');
	$('#form-login').removeClass('hidden');

	$('#img-bg').attr('src', 'img/undraw_sign_in_e6hj.svg');

});

$('.btn-forgot').click(function (params) {
	$('#form-register').addClass('hidden');
	$('#form-forgot-password').removeClass('hidden');
	$('#form-login').addClass('hidden');

	$('#img-bg').attr('src', 'img/undraw_my_password_d6kg.svg');
});

$('.form-ajax').submit(function (e) {
	$('input[type=submit]').prop('disabled', true);
	$('.loading').toggle();
	$.ajax({
		type: 'POST',
		url: $(this).attr('action'),
		data: new FormData($(this)[0]),
		success: function (data) {
			data = JSON.parse(data);
			if (data.status == 20) {
				swal("Success", data.message, "success").then((value) => {
					if (data.return_url != '#') {
						document.location.href = data.return_url
					}
				});
			} else {
				swal("Failed", data.message, "error");
			}
			$('.loading').toggle();
			$('input[type=submit]').prop('disabled', false);
		},
		cache: false,
		contentType: false,
		processData: false,
		error: function (data) {
			swal(data);
			$('.loading').toggle();
			$('input[type=submit]').prop('disabled', false);
		}
	});
	e.preventDefault();
});

//FOR TOAST
$(document).ready(function () {
	let param = {
		img: "",
		title: "Doe",
		time: 'sejam yang lalu',
		message: 'pesan ada disini nih',
		autohide:  'false',
	}
	$('#render-toast').append(createToast(param));
	 param = {
		img: "",
		title: "dawda",
		time: 'sejam yang lalu',
		message: 'pesan ada disini nih',
		autohide: 'false',
	}
	$('#render-toast').append(createToast(param));
	$('.toast').toast('show');
});

function createToast(param){

	const { img, title, time, message, autohide } = param;

	let Image = '';
	if (img == ''){
		Image = `<img src="img/avatar.svg" class="rounded mr-2 img-20" alt="...">`;
	}
	let html = `<div class="toast animated bounceIn" role="alert" aria-live="assertive"  aria-atomic="true" style="width:300px;" data-autohide="${autohide}">
				<div class="toast-header">
					${Image}
					<strong class="mr-auto">${title}</strong>
					<small class="text-muted">${time}</small>
					<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="toast-body">
					${message}
				</div>
			</div>`;
	return html;
}