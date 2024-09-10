const formulary = document.getElementById('login-form');
const url = "https://test.wl.tv.br/eliseu/tcc/api/login.php";

formulary.onsubmit = (e) => {
    e.preventDefault();
    $('#submit-btn').prop('disabled', true);

    $.post(url,
        $('#login-form').serialize()
    ).done(function(data){

        if(data.user_active == "y"){
            
            sessionStorage.setItem('nome', data.user_name);
            sessionStorage.setItem('email', data.user_email);
            sessionStorage.setItem('key', data.user_key);
            sessionStorage.setItem('nivel', data.user_level);
            sessionStorage.setItem('active', data.user_active);

            $('#login-start').addClass('d-none');
            $('#post-login').removeClass('d-none');
            $('#gamepage').removeClass('d-none');

            let fullName = data.user_name;
            let firstName = fullName.split(' ')[0];
            $('#user-name').html(firstName);

            Swal.fire({
                title: 'Bem vindo(a)!',
                text: 'Bons estudos!!!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.value) {
                    window.location.href = "./ranking.html";
                }
            });
        }else{
            Swal.fire('Erro','Não foi possível realizar o login, por favor entre em contato conosco.','error');
        }

    }).fail(function(){
        Swal.fire('Erro','Não foi possível realizar a operação desejada','error');
    }).always(function(){
        formulary.reset();
        $('#submit-btn').prop('disabled', false);
    });
}