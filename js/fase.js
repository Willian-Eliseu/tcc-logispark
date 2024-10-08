// variáveis
const rightOne = document.querySelector('#right-one');
const rightTwo = document.querySelector('#right-two');
const leftOne = document.querySelector('#left-one');
const leftTwo = document.querySelector('#left-two');
const upOne = document.querySelector('#up-one');
const upTwo = document.querySelector('#up-two');
const downOne = document.querySelector('#down-one');
const downTwo = document.querySelector('#down-two');
const algorithm = document.querySelector('#algorithm');
const algList = [];
const startGame = document.querySelector('#start-game');
const obstacles = [2,9,10,12,18,21];
const gameSpeed = 1000;

function loadObstacles(){
    obstacles.forEach((value)=>{
        document.getElementById(value).classList.add('obstacle');
    })
}

loadObstacles();

rightOne.addEventListener('click', function(){
    addElement(this.id);
});
leftOne.addEventListener('click', function(){
    addElement(this.id);
});
upOne.addEventListener('click', function(){
    addElement(this.id);
});
downOne.addEventListener('click', function(){
    addElement(this.id);
});
rightTwo.addEventListener('click', function(){
    addElement(this.id);
});
leftTwo.addEventListener('click', function(){
    addElement(this.id);
});
upTwo.addEventListener('click', function(){
    addElement(this.id);
});
downTwo.addEventListener('click', function(){
    addElement(this.id);
});

function addElement(identificator){
    if(algList.length < 20){
        algList.push(identificator);
        refreshList();
    }else{
        window.alert('Você pode adicionar apenas 20 instruções');
    }
}

function refreshList(){
    algorithm.innerHTML = "";
    algList.forEach((k,v) => {
        console.log(k,v);
        algorithm.innerHTML += `<button class="btn-algorithm" onclick="removeInstruction(this.id)" id="${v}">${k}</button>`;
    });
}

function removeInstruction(id){
    algList.splice(id, 1);
    refreshList();
}

startGame.addEventListener('click', function(){
    startGame.disabled = true;
    game(0);
});

function game(position, robot=20){
    if(position <= algList.length){
        //executa
        setTimeout(() => {
            let robotPosition = movement(algList[position], robot);
            if(robotPosition == -1){
                window.alert('Você bateu! Mais sorte da próxima vez');
                startGame.disabled = false;
                return false;
            }else if(obstacles.includes(robotPosition)){
                window.alert('Você bateu! Mais sorte da próxima vez');
                startGame.disabled = false;
                return false;
            }else if(robotPosition == 4){
                window.alert('Parabéns, você dominou a construção de algorítimos!');
                algorithm.innerHTML = "";
                while(algList.length){algList.pop()}
                startGame.disabled = false;
                window.location.href="./index.html";
            }
            //array de instruções
            position++;
            game(position, robotPosition);
        }, gameSpeed);
    }else{
        console.log('o jogo acabou');
    }
}

function movement(instruction, initialPosition){
    if(instruction == "right-one"){
        if(
            (initialPosition >= 0 && initialPosition < 4) ||
            (initialPosition >= 5 && initialPosition < 9) ||
            (initialPosition >= 10 && initialPosition < 14) ||
            (initialPosition >= 15 && initialPosition < 19) ||
            (initialPosition >= 20 && initialPosition < 24)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition + 1;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "right-two"){
        if(
            (initialPosition >= 0 && initialPosition < 3) ||
            (initialPosition >= 5 && initialPosition < 8) ||
            (initialPosition >= 10 && initialPosition < 13) ||
            (initialPosition >= 15 && initialPosition < 18) ||
            (initialPosition >= 20 && initialPosition < 23)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition + 2;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "left-one"){
        if(
            (initialPosition > 0 && initialPosition <= 4) ||
            (initialPosition > 5 && initialPosition <= 9) ||
            (initialPosition > 10 && initialPosition <= 14) ||
            (initialPosition > 15 && initialPosition <= 19) ||
            (initialPosition > 20 && initialPosition <= 24)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition - 1;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "left-two"){
        if(
            (initialPosition > 1 && initialPosition <= 4) ||
            (initialPosition > 6 && initialPosition <= 9) ||
            (initialPosition > 11 && initialPosition <= 14) ||
            (initialPosition > 16 && initialPosition <= 19) ||
            (initialPosition > 21 && initialPosition <= 24)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition - 2;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "up-one"){
        if(
            (initialPosition > 4 && initialPosition <= 24)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition - 5;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "up-two"){
        if(
            (initialPosition > 9 && initialPosition <= 24)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition - 10;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "down-one"){
        if(
            (initialPosition <= 19)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition + 5;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }else if(instruction == "down-two"){
        if(
            (initialPosition <= 14)
        ){
            document.getElementById(initialPosition).classList.remove('robot');
            let actualPosition = initialPosition + 10;
            document.getElementById(actualPosition).classList.add('robot');

            return actualPosition;
        }else{
            return -1;
        }
    }
}