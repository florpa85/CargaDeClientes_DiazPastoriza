
class Item {

        titular; 
        codigo; 
        saldo; 
        zona; 
        cantidad; 
   
    constructor(titular,codigo,saldo,zona) {
        this.titular = titular.toLowerCase(); 
        this.codigo = codigo;
        this.saldo = saldo;
        this.zona = zona;
    }

    //Funcion Agregar Dinero
    depositarDinero(cantidad) {
        if (cantidad && cantidad > 0) { 
            this.saldo -= cantidad; 
            return true;
        } else return false;
    }

    //Funcion para obtener Saldo de la cuenta
    consultar() {
        return this.saldo;
    }
}
