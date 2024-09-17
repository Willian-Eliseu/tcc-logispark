$('#btn-tutorial').on('click', function(){
    window.location.href = './tutorial.html';
});

function fase(){
    window.alert('O modo fase estará disponível em breve!');
}

$('#btn-fase').on('click', fase);

function aleatorio(){
    window.alert('O modo aleatório estará disponível em breve!');
}

$('#btn-aleatorio').on('click', aleatorio);