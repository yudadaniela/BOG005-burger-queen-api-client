import React from "react";
import Header from "../../components/Header";
import { getOrders, getToken, editOrder } from "../../functions/requests";
import { useState, useEffect } from "react";
import { VscBell } from "react-icons/vsc";

const OrderState = () => {
  const [currentOrders, setcurrentOrders] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedDone, setCheckedDone] = useState(true);
  const[totalOrders, setTotalOrders] = useState([]);

  useEffect(() => {
    getOrders(getToken())
      .then((response) => response.json())
      .then((data) => {
        setcurrentOrders(data);
        setTotalOrders(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [checked]);


  const ordersDone = currentOrders.filter(order => order.status === "Listo para servir")


  const doneOrder = (event)=>{

  console.log(event.currentTarget.value, 'es el target clickeado');
  console.log(event.currentTarget.checked, 'es el check');
  setChecked(event.currentTarget.checked)
  console.log(checked,'es el hook')
  if(checked=== true){
  editOrder(event.currentTarget.value, getToken(), 'Listo para servir' )
  }else{
  editOrder(event.currentTarget.value, getToken(), 'Entregado' )
     }

  }


  console.log('checked ----', checked)
  const OrderDoneHandle =(e)=>{
    
    console.log('done')
    setChecked(true)
   
  }

  const reverseOrderDoneHandle =(e)=>{
    setChecked(false)
    console.log('reverse')
  }
  const stateHandle=(e)=>{
    console.log(e.currentTarget.value, 'es el target clickeado');
   // const array =[...currentOrders]
   if(e.currentTarget.value==='Selecciona categoría'){
    setcurrentOrders(totalOrders)
   }else{
    const ordersFilter = totalOrders.filter(order => order.status === e.currentTarget.value )
    console.log(ordersFilter);
    setcurrentOrders(ordersFilter)
    console.log(totalOrders)
   }
    
  }

  return (
    <div>
      <Header
        path1={"/waiter/MenuView"}
        title1={"Crear Pedido"}
        path2={"/waiter/orderState"}
        title2={"Estado de Pedidos"}
      />
      <div className="subHeader">
        <h1 className="title">Estados de Pedido</h1>
        <p>
          {" "}
          Listos Para servir <VscBell />{ordersDone.length}
        </p>
        {/* Falta agregar selector para filtrar */}
       
                <select
                className="inputsCreateUsers"
                required
                onChange={stateHandle}
                >
                <option value="Selecciona categoría">Filtra por estado</option> 
                <option value="Listo para servir">Listo para servir</option>    
                <option value="Entregado">Entregado</option>  
                <option value="Enviado a cocina">Enviado a cocina</option>  
                <option value="Selecciona categoría">Ver todas las ordenes</option> 

                </select>
      </div>

      <div className="tableContainerMain">
        <div className="tableContainer">
          <table className="headerTable">
            <thead key={1} className="dataTable">
              <tr key={1} className="titleTable">
                Código
              </tr>
              <tr key={2} className="titleTable">
                Fecha
              </tr>
              <tr key={3} className="titleTable">
                Cliente
              </tr>
              <tr key={4} className="titleTable">
                Total
              </tr>
              <tr key={4} className="titleTable">
                Estado
              </tr>
            </thead>
          </table>

          {currentOrders.map((order, i) => {
            return (
              <table key={i}>
                <tbody key={i} className="dataTable">
                  <tr key={i}> {order.id} </tr>
                  <tr> {order.dataEntry} </tr>
                  <tr> {order.client} </tr>
                  <tr> {order.total} </tr>
                  <tr>
                    {" "}
                    {order.status}
                    {" "}
                    {order.status === "Listo para servir" || order.status === "Entregado" ? (
                      <input key={i}
                        type="checkbox"
                        value={order.id}
                        //checked={order.status === "Entregado" ? true : false }
                        onChange={doneOrder}
                        //checked={checked}
                        //onChange={()=> checked ? doneOrder(): noDoneOrder() }
                      />
                    ) : (
                      ""
                    )}
                  </tr>
                </tbody>
              </table>
            );
          })}
          
        </div>
      </div>
    </div>
  );
};

export default OrderState;
