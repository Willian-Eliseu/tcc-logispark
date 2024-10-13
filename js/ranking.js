const url = "https://test.wl.tv.br/eliseu/tcc/api/ranking.php";

$(function(){
    $.get(url).done(function(data){
        
        $('#firstFase').html(data.fase[0].nome);
        $('#secondFase').html(data.fase[1].nome);
        $('#thirdFase').html(data.fase[2].nome);
        /*
        $('#firstRandom').html(data.random[0].nome);
        $('#secondRandom').html(data.random[1].nome);
        $('#thirdRandom').html(data.random[2].nome);
        */

        if(sessionStorage.getItem('key')){
            $('#jogaragora').removeClass('d-none');
        }
    }).fail(function(){
        console.log("a página solicitada não está funcionando");
    }).always(function(){
        console.log("Tudo certo!!!");
    });
});