let datosJson = []
const dataJson = async ()=>{
  const response = await fetch('../data/contactData.json');
  const data = await response.json();
  datosJson = data
  localStorage.setItem("people", JSON.stringify(datosJson));
}
dataJson()
var form = `<div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Introduce tu nombre">
  </div>
  <div class="form-group mt-3">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Introduce tu correo">
  </div>
  <div class="form-group mt-3">
  <label for="address">Dirección</label>
  <input type="text" class="form-control" id="address" placeholder="Introduce tu dirección">
</div>
  <button type="submit" class="btn btn-primary mt-3" onclick="save()">Guardar</button>
</div>`;
function table() {
    let table = `<table class="table">
  <thead>
    <tr>
      <th clsaa="col-1">NO</th>
      <th clsaa="col-3">Nombre</th>
      <th clsaa="col-4">Correo</th>
      <th clsaa="col-4">Dirección</th>
      <th clsaa="col-2">Editar</th>
      <th clsaa="col-2">Eliminar</th>
    </tr>
  </thead>
  <tbody id="tbody">`;
    for (let i = 0; i < people.length; i++){
        table = table + `<tr>
      <td>${i + 1}</td>
      <td>${people[i].name}</td>
      <td>${people[i].email}</td>
      <td>${people[i].address}</td>
      <td><button type="button" class="btn btn-warning" onclick="edit(${i})">Editar</button></td>
      <td><button type="button" class="btn btn-danger" onclick="deleteData(${i})">Eliminar</button></td>
    </tr> `;
    };
    table = table+`</tbody>
    </table>
  `;
    document.getElementById("table").innerHTML = table;
};
document.getElementById("form").innerHTML = form;
people = [];
const cargando = document.getElementById('cargando');
cargando.hidden = false;
setTimeout(() => {
cargando.hidden = true;
  getData();
  table();
}, 2000);
function getData(){
    let Data = localStorage.getItem("people");
    if (Data) {
        people = JSON.parse(Data);
    } else {
        setData();
    };
};
function setData() {
  localStorage.setItem("people", JSON.stringify(people));
};
function validateEmail(email) {
  var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  return expReg.test(email);
}
function save() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    if (name.value === "" ) {
      Toastify({
        text: "Campo Nombre Vacío",
        className: "info",
        close: true,
        style: {
          background: "red",
        }
      }).showToast();
        return
    }
    if (email.value == "") {
      Toastify({
        text: "Campo Correo Vacío",
        className: "info",
        close: true,
        style: {
          background: "red",
        }
      }).showToast();
      return
    }
    if (address.value == "") {
      Toastify({
        text: "Campo Dirección Vacío",
        className: "info",
        close: true,
        style: {
          background: "red",
        }
      }).showToast();
      return
    }
    let data = {
        name: name.value,
        email: email.value,
        address: address.value
    };
    if (!validateEmail(email.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Por favor ingrese un correo válido',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      people.push(data);
      setData();
      table();
      Swal.fire({
        icon: 'success',
        title: 'Almacenado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      name.value = "";
      email.value = "";
      address.value = "";
    }
};
function deleteData(index) {
  Swal.fire({
    title: 'Esta seguro que desea eliminar?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminalo!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
      )
      people.splice(index, 1);
      setData();
      table();
    }
  })
};
function edit(index) {
    let editForm = `<div>
  <div class="form-group">
    <label for="name">Update Name</label>
    <input type="text" value="${people[index].name}" class="form-control" id="newName" aria-describedby="emailHelp" placeholder="Update Your Name">
  </div>
  <div class="form-group mt-3">
    <label for="email">Email</label>
    <input type="email" value="${people[index].email}" class="form-control" id="newEmail" placeholder="Update Your email">
  </div>
  <div class="form-group mt-3">
  <label for="email">Email</label>
  <input type="email" value="${people[index].address}" class="form-control" id="newAddress" placeholder="Update Your email">
</div>
  <button type="submit" class="btn btn-primary mt-3" onclick="update(${index})">Actualizar</button>
</div>`;
    document.getElementById("form").innerHTML = editForm;
    // console.log('edit work');
};
function update(index) {
    let newName = document.getElementById('newName');
    let newEmail = document.getElementById('newEmail');
    let newAddress = document.getElementById('newAddress');

    people[index] = {
        name: newName.value,
        email: newEmail.value,
        address: newAddress.value,
    };
    if (!validateEmail(newEmail.value)){
      Swal.fire({
        icon: 'error',
        title: 'Por favor ingrese un correo válido',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Editado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      setData();
      table();
      document.getElementById("form").innerHTML = form;
    }
}


