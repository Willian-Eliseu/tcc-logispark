$('#btn-tutorial').on('click', function(){
    window.location.href = './tutorial.html';
});

function fase(){
    //window.alert('O modo fase estará disponível em breve!');
    window.location.href = './fase.html';
}

$('#btn-fase').on('click', fase);

function limpaTentativas(){
    localStorage.clear();
    Swal.fire('Limpo!!!','Todas as tentativas foram removidas!','success');
}

$('#btn-tentativas').on('click', limpaTentativas);