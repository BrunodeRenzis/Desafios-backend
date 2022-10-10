
const socket = io.connect(); //Acá conectamos el cliente con el servidor
socket.on('mensajes',data=>{
    console.log(data);
    render(data);
})

socket.on('productos',data=>{
    renderProductos(data);
})

const agregarMensaje = (e)=>{
    const mensaje = {
        autor:document.getElementById('email').value,
        mensaje: document.getElementById('texto').value
    }
    socket.emit('nuevo-mensaje',mensaje);
    return false;
}

function render(data){
    const date = new Date();
    const html = data.map((elem)=>{
        return `<div>
                    <strong style="color:blue;">${elem.autor}</strong> <span style="color:brown";>${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>:
                    <em style="color:green;">${elem.mensaje}</em></div>`
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

const agregarProducto = (e)=>{
    const producto = {
        nombre: document.getElementById('nombreProducto').value,
        precio:document.getElementById('precio').value
    }
    socket.emit('nuevo-producto',producto);
    return false;
}

function renderProductos(data){
    const html = data.map((prod)=>{
        return `<div>
                    <strong>${prod.nombre}</strong>:
                    <em>${prod.precio}</em></div>`
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}

socket.on('mensajes',function(data){render(data);});
socket.on('productos',function(data){renderProductos(data);});