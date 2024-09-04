const url = "https://test.wl.tv.br/eliseu/tcc/api/contato.php";
const formulary = document.getElementById('contact-form');

formulary.onsubmit = (e) => {
    e.preventDefault();
    $('#submit-btn').prop('disabled', true);

    $.post(url, 
        $('#contact-form').serialize()
    ).done(function(data){
        if(data == 1){
            formulary.reset();
            Swal.fire('Sucesso','Sua mensagem foi enviada com sucesso','success');
        }else{
            formulary.reset();
            Swal.fire('Erro','Não foi possível enviar a mensagem','error');
        }
    }).fail(function(){
        Swal.fire('Erro','Não foi possível enviar a mensagem','error');
    }).always(function(){
        $('#submit-btn').prop('disabled', false);
    });
}