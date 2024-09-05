const requerimento = document.getElementById('password-form');
const troca = document.getElementById('alteration-form');
const url = "https://test.wl.tv.br/eliseu/tcc/api/requirePasswordChange.php";
const urltroca = "https://test.wl.tv.br/eliseu/tcc/api/passwordChange.php";

requerimento.onsubmit = (e) => {
    e.preventDefault();
    $('#submit-btn').prop('disabled', true);

    $.post(url,
        $('#password-form').serialize()
    ).done(function(data){

        if(data != 0){
            // ocultar o formulário de requerimento e exibir o formulário de alteração
            $('#change_id').val(data.user_id);
            $('#change_tempkey').val(data.user_tempkey);
            $('#change_email').val($('#form_email').val())

            $('#password-form').fadeOut();
            $('#alteration-form').fadeIn();
        }else{
            Swal.fire('Erro','Seu email não foi encontrado em nossa base, por favor verifique ou entre em contato conosco','error');
        }

    }).fail(function(){
        Swal.fire('Erro','Não foi possível realizar a operação desejada','error');
    }).always(function(){
        // requerimento.reset();
        $('#submit-btn').prop('disabled', false);
    });
}

troca.onsubmit = (e) => {
    e.preventDefault();
    $('#alteration-btn').prop('disabled', true);

    if($('#change_password').val() === $('#change_repeat').val()){
        $.post(troca, {
            form_email: $('#change_email').val(),
            form_password: $('#change_password').val(),
            form_id: $('#change_id').val(),
            form_tempkey: $('#change_tempkey').val()
        }).done(function(data){
            if(data == 1){
                Swal.fire({
                    title: 'Sucesso',
                    text: 'Sua senha foi alterada com sucesso!',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.value) {
                        window.location.href = "./login.html";
                    }
                });
            }else{
                Swal.fire('Erro','Não foi possível realizar a alteração de senha, por favor entre em contato conosco.','error');
            }
        }).fail(function(){
            Swal.fire('Erro','Não foi possível realizar a operação desejada','error');
        }).always(function(){
            requerimento.reset();
            $('#submit-btn').prop('disabled', false);
        })
    }else{
        Swal.fire('Erro','As senhas precisam ser iguais, por favor, verifique e tente novamente','error');
        $('#alteration-btn').prop('disabled', false);
    }
}

$('#btn-view-password').on('click', function(){
    if($('#change_password').attr('type') == "password"){
        //text
        $('#change_password').attr('type', "text");
        $('#btn-view-password').html('<i class="fas fa-eye-slash"></i>');
    }else{
        //password
        $('#change_password').attr('type', "password");
        $('#btn-view-password').html('<i class="fas fa-eye"></i>');
    }
});

$('#btn-view-change').on('click', function(){
    if($('#change_repeat').attr('type') == "password"){
        //text
        $('#change_repeat').attr('type', "text");
        $('#btn-view-change').html('<i class="fas fa-eye-slash"></i>');
    }else{
        //password
        $('#change_repeat').attr('type', "password");
        $('#btn-view-change').html('<i class="fas fa-eye"></i>');
    }
});