let Pedido ='';
const Listproducts =[];
let busqueda=[]

class Product {
 constructor(code,name,precio,categoria,descripcion,imagen) {
        this.code = code;
        this.name = name;
        this.precio = precio;
        this.categoria=categoria;
        this.descripcion=descripcion;
        this.imagen=imagen;
    }
}

class CarritoDeCompras {
    constructor() {
        this.productos = []
        this.name = ''
        this.total = 0
    }
    setName(value) {
        this.name = value
    }
   
    addProduct(product) {
        this.productos.push(product)
    }

    vaciarCarrito() {
        this.productos = [];
    }

    eliminarProducto(valor) {
            this.productos.splice(valor-1, 1);
            alert("Producto Eliminado");
      }

    eliminarUltProducto(valor) {   
            this.productos.pop()
            alert("Producto Eliminado");
      }

    getTotal() 
        {
        Pedido ='';
        let cont=0;
        this.total = 0;
         for (const A of this.productos) 
            {
            this.total = this.total + A.precio
            }
         return this.total
        }
}

const cliente = new CarritoDeCompras();

let cantidad = JSON.parse(localStorage.getItem('CantidadProductos'));
if (cantidad ==0 || cantidad == null ) cantidad=0 
var x = document.getElementById("ContadorCarrito");
x.innerHTML = parseInt(cantidad);


const almacenados = JSON.parse(localStorage.getItem("listaProductos"));

const CarritoNav = document.getElementById('carrito')

console.dir(CarritoNav)

if (almacenados !=null && almacenados.length!=0) {
        for (const objeto of almacenados)
              {          
                cliente.addProduct(objeto)                   
              }
  }
  else
  {
                    CarritoNav.disabled=true
  }

  const fetchLocalData = () => {
	fetch('./data.json').then((response) =>response.json())
	.then((result)=>{
		ListaDeProductos(result.productos)

	}).catch((err)=>{
		console.error(err)
	})
	}

const ListaDeProductos = (body) =>{
	body.forEach((producto) => {
        Listproducts.push (new Product(  producto.code, producto.name, producto.precio, producto.categoria, producto.descripcion,producto.imagen)  )                
        maceta01 = Listproducts.filter((el) => el.categoria.includes('MACETA 01'))
        maceta02 = Listproducts.filter((el) => el.categoria.includes('MACETA 02'))
        maceta03 = Listproducts.filter((el) => el.categoria.includes('MACETA 03'))
        maceta04 = Listproducts.filter((el) => el.categoria.includes('MACETA 04'))
        maceta05 = Listproducts.filter((el) => el.categoria.includes('MACETA 05'))
        maceta06 = Listproducts.filter((el) => el.categoria.includes('MACETA 06'))
        maceta07 = Listproducts.filter((el) => el.categoria.includes('MACETA 07'))
        maceta08 = Listproducts.filter((el) => el.categoria.includes('MACETA 08'))
        maceta09 = Listproducts.filter((el) => el.categoria.includes('MACETA 09'))
        maceta10 = Listproducts.filter((el) => el.categoria.includes('MACETA 10'))
        mostrarProductos2(Listproducts)
	})
}


fetchLocalData()
 

const option = document.getElementById("option");

option.addEventListener("click", () => {
     switch (option.value){
            case "opt1":
                mostrarProductos2(Listproducts)
                break;
            case "opt2":
                mostrarProductos2(maceta01)
                break;
            case "opt3":
                mostrarProductos2(maceta02)
                break;
            case "opt4":
                mostrarProductos2(maceta03)
                break;
            case "opt5":
                mostrarProductos2(maceta04)
                break;
            case "opt6":
                mostrarProductos2(maceta05)
                break;
            case "opt7":
                mostrarProductos2(maceta06)
                break;
            case "opt8":
                mostrarProductos2(maceta07)
                break;
            case "opt9":
                mostrarProductos2(maceta08)
                break;
            case "opt10":
                mostrarProductos2(maceta09)
                break;
            case "opt11":
                mostrarProductos2(maceta10)
                break;
            default:
                mostrarProductos2(Listproducts)
                break;
        }
    })   

mostrarProductos2(Listproducts)

function mostrarProductos2 (array) {
let showAllProducts = document.getElementById('showAllProducts')

showAllProducts.innerHTML = ''
        array.forEach((product) => {     
                        const tr = document.createElement('div')
                        tr.classList.add('col', 'mb-5')
                       const Content = `
                            <div class="card h-100">
                                <img class="card-img-top" src=${product.imagen} alt="..." />
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5 class="fw-bolder">${product.name}</h5>
                                       $ ${product.precio}
                                    </div>
                                </div>
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center">
                                        <button class="btn btn-outline-dark mt-auto ">Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                          `
                          
                        tr.innerHTML = Content;
                        tr.addEventListener("click",()=>{ agregarCarrito(product) } ) 
                            
                        showAllProducts.appendChild(tr)
    })
}

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

function agregarCarrito(producto) {

    cliente.addProduct(producto) ; 

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito'
      }) 

    guardarLocal("listaProductos", JSON.stringify(cliente.productos));
    guardarLocal("Totalcarrito", JSON.stringify(cliente.getTotal()));

    CarritoNav.disabled=false

    
    var x = document.getElementById("ContadorCarrito");
    x.innerHTML = parseInt(x.innerHTML)+1;
    localStorage.setItem("CantidadProductos",JSON.stringify(parseInt(x.innerHTML)))
}

function operacion(valor1, valor2, operacion) {
    switch (operacion){
            case "1":
                return valor1 + valor2;
                break;
            case "2":
                return valor1 - valor2;
                break;
            case "3":
                return valor1 * valor2;
                break;
            case "4":
                return valor1 / valor2;
                break;
            default:
            return 0;
                break;

        }
}

Search.onkeydown = () => { onkeydown
                    let showAllProducts = document.getElementById('showAllProducts')

                    showAllProducts.innerHTML = ''

                        var input, filter, ul, li, a, i, txtValue;
                        input = document.getElementById("Search")
                        filter = input.value.toUpperCase();

                            filter == '' && mostrarProductos2(Listproducts)  

                        for (let i = 0; i < Listproducts.length; i++) {
                            a=Listproducts[i].name
                            txtValue=a
                            
                        txtValue.toUpperCase().indexOf(filter) > -1 && busqueda.push (Listproducts[i]) }
                        mostrarProductos2(busqueda)
        
                        busqueda=[]
}

