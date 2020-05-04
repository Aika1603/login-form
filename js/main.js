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
	$('#render-toast').html('');

	$('input[type=submit]').prop('disabled', true);
	//loading toggle
	let param = {
		img: "",
		title: "Validasi Login",
		message: '<i class="fa fa-spinner fa-spin" ></i> Mengecek Akun - Silahkan Tunggu',
		autohide: 'false',
	}
	$('#render-toast').append(createToast(param));
	$('.toast').toast('show');
	
	$.ajax({
		type: 'POST',
		url: $(this).attr('action'),
		data: new FormData($(this)[0]),
		success: function (data) {

			//close loading
			$('#render-toast').html('');

			data = JSON.parse(data);
			if (data.status == 20) {
				let param = {
					img: "",
					title: "Login Berhasil",
					message: data.message,
					autohide: 'true',
					delay: '2000'
				}
				$('#render-toast').append(createToast(param));
				$('.toast').toast('show').on('hide.bs.toast', function () {
					if (data.return_url != '#') {
						document.location.href = data.return_url
					}
				})
			} else {
				let param = {
					img: "",
					title: "Login Gagal",
					message: data.message,
					autohide: 'true',
					delay: '2000'
				}
				$('#render-toast').append(createToast(param));
				$('.toast').toast('show');
			}
			$('input[type=submit]').prop('disabled', false);

		},
		cache: false,
		contentType: false,
		processData: false,
		error: function (data) {

			//close loading
			$('#render-toast').html('');

			// swal(data);
			let param = {
				img: "",
				title: "Login Gagal",
				message: data,
				autohide: 'true',
				delay: '2000'
			}
			$('#render-toast').append(createToast(param));
			$('.toast').toast('show');

			$('input[type=submit]').prop('disabled', false);
			
		}
	});
	e.preventDefault();

});

//testing toast
//for yesterday. try to add background color
$(document).ready(function () {
	// let param = {
	// 	img: "",
	// 	title: "Doe",
	// 	time: 'sejam yang lalu',
	// 	message: 'pesan ada disini nih',
	// 	autohide:  'false',
	// }
	// $('#render-toast').append(createToast(param));
	// let  param = {
	// 	img: "",
	// 	title: "Validasi Login",
	// 	time: 'sekarang',
	// 	message: '<i class="fa fa-spinner fa-spin" ></i> Mengecek Akun - Silahkan Tunggu',
	// 	autohide: 'false',
	// }
	// $('#render-toast').append(createToast(param));
	// $('.toast').toast('show');
	// setTimeout(function () {
	// 	//do what you need here
	// 	if (param.img == "") {
	// 		$('.toast').toast('hide');
	// 	}
	// }, 2000);
});

function createToast(param){
	const { img = '<img src="img/avatar.svg" class="rounded mr-2 img-20" alt="...">', title = 'title', time = '', message = 'test', autohide = 'true', delay = '10000'} = param;
	const html = `<div class="toast" role="alert" aria-live="assertive"  aria-atomic="true" style="width:300px;" data-autohide="${autohide}" data-delay="${delay}">
				<div class="toast-header" >
					${img}
					<strong class="mr-auto">${title}</strong>
					<small class="text-muted">${time}</small>
						<i class="fa fa-times ml-2  mb-1 close" style="font-size:20px;" data-dismiss="toast" aria-label="Close"></i>
				</div>
				<div class="toast-body">
					${message}
				</div>
			</div>`;
	return html;
}