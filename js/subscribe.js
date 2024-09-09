const formulary = document.getElementById('subscribe-form');
const url = "https://test.wl.tv.br/eliseu/tcc/api/cadastro.php";

formulary.onsubmit = (e) => {
    e.preventDefault();
    $('#submit-btn').prop('disabled', true);

    $.post(url,
        $('#subscribe-form').serialize()
    ).done(function(data){

        if(data.user_active == "y"){
            
            sessionStorage.setItem('nome', data.user_name);
            sessionStorage.setItem('email', data.user_email);
            sessionStorage.setItem('key', data.user_key);
            sessionStorage.setItem('nivel', data.user_level);
            sessionStorage.setItem('active', data.user_active);

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
            Swal.fire('Erro','Não foi possível realizar o cadastro, por favor entre em contato conosco.','error');
        }

    }).fail(function(){
        Swal.fire('Erro','Não foi possível realizar a operação desejada','error');
    }).always(function(){
        formulary.reset();
        $('#submit-btn').prop('disabled', false);
    });
}

$('#btn-view-password').on('click', function(){
    if($('#form_password').attr('type') == "password"){
        //text
        $('#form_password').attr('type', "text");
        $('#btn-view-password').html('<i class="fas fa-eye-slash"></i>');
    }else{
        //password
        $('#form_password').attr('type', "password");
        $('#btn-view-password').html('<i class="fas fa-eye"></i>');
    }
});