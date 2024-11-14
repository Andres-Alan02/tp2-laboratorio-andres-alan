// Para el formulario
const form = document.getElementById("contactoForm");
const tableRows = document.querySelectorAll(".tabla tbody tr");

function actualizarTabla(campo, valor) {
  tableRows.forEach((row) => {
    const campoTabla = row.children[0].textContent.trim();
    if (campoTabla === campo) {
      row.children[1].textContent = valor;
    }
  });
}

form.addEventListener("input", (event) => {
  const target = event.target;

  switch (target.id) {
    case "nombre":
      actualizarTabla("Nombre", target.value);
      break;
    case "apellido":
      actualizarTabla("Apellido", target.value);
      break;
    case "email":
      actualizarTabla("Email", target.value);
      break;
    case "telefono":
      actualizarTabla("Telefono", target.value);
      break;
    case "edad":
      actualizarTabla("Edad", target.value);
      break;
    case "direccion":
      actualizarTabla("Direccion", target.value);
      break;
    case "provincia":
      actualizarTabla("Provincia", target.value);
      break;
    case "codigo_postal":
      actualizarTabla("Codigo Postal", target.value);
      break;
    case "contact_email":
    case "contact_postal":
    case "contact_telefono":
      const metodoContacto = form.metodo_contacto.value;
      actualizarTabla("Metodo de contacto", metodoContacto);
      break;
    case "noticias":
    case "promociones":
    case "alertas":
    case "eventos":
      const tiposSuscripcion = Array.from(
        form.querySelectorAll('input[name="tipo_suscripcion"]:checked')
      )
        .map((checkbox) => checkbox.labels[0].textContent)
        .join(", ");
      actualizarTabla("Tipo de suscripcion", tiposSuscripcion);
      break;
  }
});

// Para acerca.html
function mostrarOcultarCV() {
  const cvCompleto = document.getElementById("cv-completo");
  const cvAbreviado = document.getElementById("cv-abreviado");
  const boton = event.target;

  if (cvCompleto.style.display === "none") {
    cvCompleto.style.display = "block";
    cvAbreviado.style.display = "none";
    boton.textContent = "Leer menos";
  } else {
    cvCompleto.style.display = "none";
    cvAbreviado.style.display = "block";
    boton.textContent = "Leer más";
  }
}
