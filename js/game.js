$(() => {
  if (localStorage.getItem("finalizou")) {
    $("#escolherfase").removeClass("d-none");
  }
});

$("#btn-tutorial").on("click", function () {
  window.location.href = "./tutorial.html";
});

$("#btn-fase").on("click", function () {
  window.location.href = "./fase.html";
});

$("#btn-tentativas").on("click", function () {
  localStorage.clear();
  Swal.fire("Limpo!!!", "Todas as tentativas foram removidas!", "success");
});

$("#btn-escolherfase").on("click", function () {
  window.location.href = "./phasechoice.html";
});
