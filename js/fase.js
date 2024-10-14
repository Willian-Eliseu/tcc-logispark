// variáveis
const rightOne = document.querySelector("#right-one");
const rightTwo = document.querySelector("#right-two");
const leftOne = document.querySelector("#left-one");
const leftTwo = document.querySelector("#left-two");
const upOne = document.querySelector("#up-one");
const upTwo = document.querySelector("#up-two");
const downOne = document.querySelector("#down-one");
const downTwo = document.querySelector("#down-two");
const algorithm = document.querySelector("#algorithm");
const algList = [];
const startGame = document.querySelector("#start-game");
const desistir = document.querySelector("#desistir");
var obstacles = [];
const gameSpeed = 800;

const arrayObstacles = [
  [12, 26, 78, 3, 56, 89, 23, 67, 91, 34, 1, 58, 92, 6, 71, 38, 84, 19, 47, 25],
  [
    8, 63, 27, 81, 14, 50, 72, 35, 88, 2, 41, 95, 18, 60, 77, 22, 53, 99, 31,
    46,
  ],
  [
    5, 68, 21, 74, 39, 82, 13, 57, 91, 4, 48, 85, 26, 62, 79, 32, 54, 97, 15,
    43,
  ],
  [
    11, 64, 28, 83, 16, 51, 73, 36, 87, 7, 42, 96, 20, 61, 76, 24, 55, 98, 30,
    49,
  ],
  [
    18, 69, 29, 75, 40, 80, 17, 59, 93, 19, 44, 86, 27, 65, 78, 33, 52, 94, 12,
    37,
  ],
  [
    3, 66, 22, 70, 41, 81, 19, 56, 93, 68, 47, 88, 25, 63, 79, 34, 53, 96, 14,
    45,
  ],
  [
    6, 67, 23, 71, 42, 82, 20, 57, 95, 8, 78, 86, 26, 64, 80, 35, 54, 97, 15,
    46,
  ],
  [
    1, 68, 24, 72, 43, 83, 21, 58, 95, 8, 49, 80, 27, 65, 81, 36, 55, 98, 16,
    47,
  ],
  [
    4, 69, 25, 73, 44, 84, 22, 59, 93, 11, 50, 91, 28, 66, 82, 37, 56, 99, 17,
    48,
  ],
  [
    7, 70, 26, 74, 45, 85, 23, 60, 94, 13, 51, 92, 29, 67, 83, 38, 57, 8, 17,
    49,
  ],
];

$(() => {
  Swal.fire({
    title: "Vamos começar?",
    html: `<p>Clique em "iniciar" para começar o desafio!</p>`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Iniciar",
    cancelButtonText: "Cancelar",
    backdrop: false,
  }).then((result) => {
    if (result.isConfirmed) {
      if (parseInt(localStorage.getItem("actualfase")) > 0) {
        obstacles = arrayObstacles[localStorage.getItem("actualfase")];
        loadObstacles(obstacles);
      } else {
        obstacles = arrayObstacles[0];
        loadObstacles(obstacles);
      }
    } else {
      window.location.href = "./game.html";
    }
  });
});

function loadObstacles(obstaculos) {
  const tabuleiro = document.querySelectorAll("#game-board > div");
  tabuleiro.forEach((elemento) => {
    elemento.classList.remove("obstacle", "final", "robot");
  });

  document.getElementById("9").classList.add("final");
  document.getElementById("90").classList.add("robot");

  obstaculos.forEach((value) => {
    document.getElementById(value).classList.add("obstacle");
  });
}

rightOne.addEventListener("click", function () {
  addElement(this.id);
});
leftOne.addEventListener("click", function () {
  addElement(this.id);
});
upOne.addEventListener("click", function () {
  addElement(this.id);
});
downOne.addEventListener("click", function () {
  addElement(this.id);
});
rightTwo.addEventListener("click", function () {
  addElement(this.id);
});
leftTwo.addEventListener("click", function () {
  addElement(this.id);
});
upTwo.addEventListener("click", function () {
  addElement(this.id);
});
downTwo.addEventListener("click", function () {
  addElement(this.id);
});

function addElement(identificator) {
  if (algList.length < 35) {
    algList.push(identificator);
    refreshList();
  } else {
    window.alert("Você não pode adicionar mais de 35 instruções");
  }
}

function refreshList() {
  algorithm.innerHTML = "";
  algList.forEach((k, v) => {
    //console.log(k, v);
    algorithm.innerHTML += `<button class="btn-algorithm" onclick="removeInstruction(this.id);" id="${v}">${k}</button>`;
  });
}

function removeInstruction(id) {
  algList.splice(id, 1);
  refreshList();
}

desistir.addEventListener("click", function () {
  window.location.href = "./game.html";
});

startGame.addEventListener("click", function () {
  //startGame.disabled = true;
  startGame.classList.add("d-none");
  desistir.classList.remove("d-none");
  game(0);
});

function Crashing() {
  let faseAtual = localStorage.getItem("actualfase")
    ? localStorage.getItem("actualfase")
    : 0;
  faseAtual = parseInt(faseAtual);

  let tentativas = localStorage.getItem(`tentativas-${faseAtual}`)
    ? parseInt(localStorage.getItem(`tentativas-${faseAtual}`))
    : 0;
  tentativas += 1;
  localStorage.setItem(`tentativas-${faseAtual}`, tentativas);

  Swal.fire({
    title: "Ah, que pena, você bateu...",
    html: `<p>Deseja reiniciar este nível?</p>`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Reiniciar",
    cancelButtonText: "Cancelar",
    backdrop: false,
  }).then((result) => {
    if (result.isConfirmed) {
      //startGame.disabled = false;
      startGame.classList.remove("d-none");
      desistir.classList.add("d-none");
      while (algList.length) {
        algList.pop();
      }
      refreshList();
      obstacles = arrayObstacles[faseAtual];
      loadObstacles(obstacles);
    } else {
      window.location.href = "./game.html";
    }
  });
}

function StageClear() {
  let faseAtual = localStorage.getItem("actualfase")
    ? localStorage.getItem("actualfase")
    : 0;

  //salvar estágio atual

  let tentativasAtual = localStorage.getItem(`tentativas-${faseAtual}`);
  let urlSalvarFase = "https://test.wl.tv.br/eliseu/tcc/api/ranking.php";
  $.post(urlSalvarFase, {
    fase: faseAtual,
    tentativas: tentativasAtual,
    usuario: sessionStorage.getItem("key"),
  });

  //////////////////////

  faseAtual = parseInt(faseAtual) + 1;
  localStorage.setItem("actualfase", faseAtual);

  Swal.fire({
    title: "Parabéns, você finalizou esta fase!",
    html: `<p>Deseja ir para a próxima?</p>`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
    backdrop: false,
  }).then((result) => {
    //startGame.disabled = false;
    startGame.classList.remove("d-none");
    desistir.classList.add("d-none");
    if (result.isConfirmed) {
      //startGame.disabled = false;
      while (algList.length) {
        algList.pop();
      }
      refreshList();
      obstacles = arrayObstacles[faseAtual];
      loadObstacles(obstacles);
    } else {
      window.location.href = "./game.html";
    }
  });
}

function Winning() {
  localStorage.setItem("finalizou", true);
  Swal.fire({
    title: "Parabéns!",
    html: `<p>você dominou todas as fases!</p>`,
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Voltar",
    cancelButtonText: "Cancelar",
    backdrop: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "./game.html";
    } else {
      window.location.href = "./game.html";
    }
  });
}

function gameRun() {}

function game(position, robot = 90) {
  if (position <= algList.length) {
    setTimeout(() => {
      let robotPosition = movement(algList[position], robot);
      if (robotPosition == -1) {
        Crashing();
      } else if (obstacles.includes(robotPosition)) {
        Crashing();
      } else if (robotPosition == 9) {
        let faseAtual = localStorage.getItem("actualfase")
          ? parseInt(localStorage.getItem("actualfase"))
          : 0;
        if (faseAtual == 9) {
          Winning();
        } else {
          StageClear();
        }
      } else {
        position++;
        game(position, robotPosition);
      }
    }, gameSpeed);
  } else {
    console.log("o jogo acabou");
  }
}

function movement(instruction, initialPosition) {
  if (instruction == "right-one") {
    if (
      (initialPosition >= 0 && initialPosition < 9) ||
      (initialPosition >= 10 && initialPosition < 19) ||
      (initialPosition >= 20 && initialPosition < 29) ||
      (initialPosition >= 30 && initialPosition < 39) ||
      (initialPosition >= 40 && initialPosition < 49) ||
      (initialPosition >= 50 && initialPosition < 59) ||
      (initialPosition >= 60 && initialPosition < 69) ||
      (initialPosition >= 70 && initialPosition < 79) ||
      (initialPosition >= 80 && initialPosition < 89) ||
      (initialPosition >= 90 && initialPosition < 99)
    ) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition + 1;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "right-two") {
    if (
      (initialPosition >= 0 && initialPosition < 8) ||
      (initialPosition >= 10 && initialPosition < 18) ||
      (initialPosition >= 20 && initialPosition < 28) ||
      (initialPosition >= 30 && initialPosition < 38) ||
      (initialPosition >= 40 && initialPosition < 48) ||
      (initialPosition >= 50 && initialPosition < 58) ||
      (initialPosition >= 60 && initialPosition < 68) ||
      (initialPosition >= 70 && initialPosition < 78) ||
      (initialPosition >= 80 && initialPosition < 88) ||
      (initialPosition >= 90 && initialPosition < 98)
    ) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition + 2;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "left-one") {
    if (
      (initialPosition > 0 && initialPosition <= 9) ||
      (initialPosition > 10 && initialPosition <= 19) ||
      (initialPosition > 20 && initialPosition <= 29) ||
      (initialPosition > 30 && initialPosition <= 39) ||
      (initialPosition > 40 && initialPosition <= 49) ||
      (initialPosition > 50 && initialPosition <= 59) ||
      (initialPosition > 60 && initialPosition <= 69) ||
      (initialPosition > 70 && initialPosition <= 79) ||
      (initialPosition > 80 && initialPosition <= 89) ||
      (initialPosition > 90 && initialPosition <= 99)
    ) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition - 1;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "left-two") {
    if (
      (initialPosition > 1 && initialPosition <= 9) ||
      (initialPosition > 11 && initialPosition <= 19) ||
      (initialPosition > 21 && initialPosition <= 29) ||
      (initialPosition > 31 && initialPosition <= 39) ||
      (initialPosition > 41 && initialPosition <= 49) ||
      (initialPosition > 51 && initialPosition <= 59) ||
      (initialPosition > 61 && initialPosition <= 69) ||
      (initialPosition > 71 && initialPosition <= 79) ||
      (initialPosition > 81 && initialPosition <= 89) ||
      (initialPosition > 91 && initialPosition <= 99)
    ) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition - 2;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "up-one") {
    if (initialPosition > 9 && initialPosition <= 99) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition - 10;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "up-two") {
    if (initialPosition > 19 && initialPosition <= 99) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition - 20;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "down-one") {
    if (initialPosition <= 89) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition + 10;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  } else if (instruction == "down-two") {
    if (initialPosition <= 79) {
      document.getElementById(initialPosition).classList.remove("robot");
      let actualPosition = initialPosition + 20;
      document.getElementById(actualPosition).classList.add("robot");

      return actualPosition;
    } else {
      return -1;
    }
  }
}
