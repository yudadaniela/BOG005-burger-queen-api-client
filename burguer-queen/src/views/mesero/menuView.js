import React from "react";
import Header from "../../components/Header";
import { getProducts, getToken } from "../../functions/requests";
import { useState, useEffect } from "react";
import CardOrder from "./cardOrder";
import "./mesero.css";
import { BiPlus } from "react-icons/bi";

const MenuView = () => {
  const [currentProducts, setcurrentProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(false); // por ahora se omite el uso del hook
  const [productsListOrder, setproductsListOrder] = useState([]); // array de productos de orden
  const [typeMenu, setTypeMenu] = useState([]);

  useEffect(() => {
    getProducts(getToken())
      .then((response) => response.json())
      .then((data) => {
        console.log("productos get", data);
        setcurrentProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("yo aparezco cada vez que cambia currentProducts");
    if (currentProducts) {
      const breakfast = currentProducts.filter((i) => i.type === "Desayuno");
      setTypeMenu(breakfast);
    } else {
      console.log("soy un array vacio");
    }
  }, [currentProducts, setTypeMenu]);

  const addProduct = (product) => {
    const existsProduct = productsListOrder.some(
      (element) => element.product.id === product.id
    ); /// si alguno existe?

    if (!existsProduct) {
      const productToOrder = {
        qty: 1,
        price: product.price,
        product: product,
      };
      setproductsListOrder([...productsListOrder, productToOrder]); // EN VEZ DE PUSH
      setSelectedProduct(false);
    } else {
      console.log(product, "elem"); // array
      const productFined = productsListOrder.find(
        (element) => element.product.id === product.id
      );
      productFined.qty += 1;
      productFined.price =
        parseInt(product.price) + parseInt(productFined.price);
      console.log(productFined, "encontrado");
      console.log(productsListOrder, "lo pedido hasta ahora"); // array
      setproductsListOrder([...productsListOrder]);
      setSelectedProduct(true);
    }
  };

  const typeMenuHandle = (event) => {
    const breakfast = currentProducts.filter((i) => i.type === "Desayuno");
    const lunch = currentProducts.filter((i) => i.type === "Almuerzo");

    if (event.currentTarget.dataset.menu === "Almuerzo") {
      setTypeMenu(lunch);
      console.log("click almuerzo");
      console.log(typeMenu, "deberia renderizar");
    } else if (event.currentTarget.dataset.menu === "Desayuno") {
      console.log("click desayuno");
      setTypeMenu(breakfast);
      console.log(typeMenu, "deberia renderizar");
    } else if (event.currentTarget.dataset.menu === "Desayuno") {
      console.log("click desayuno");
      setTypeMenu(breakfast);
      console.log(typeMenu, "deberia renderizar");
    }
  };

  return (
    <div>
      <Header
        path1={"/waiter/MenuView"}
        title1={"Crear Pedido"}
        path2={"/waiter/orderState"}
        title2={"Estado de Pedidos"}
      />

      <section className="subHeader">
        <h1 className="titulos"> Menú y tomar pedido</h1>
        <button className="buttonAddUser">
          Añadir Pedido <BiPlus />
        </button>
      </section>

      <div className="cardContainer">
        <div className="cardContainerMenu">
          <div className="containerNav">
            <p data-menu="Desayuno" onClick={typeMenuHandle}>
              {" "}
              Desayuno{" "}
            </p>
            <p data-menu="Almuerzo" onClick={typeMenuHandle}>
              {" "}
              Almuerzo y Cena{" "}
            </p>
          </div>
          <div className="cardMenu">
            {typeMenu.map((product, i) => {
              return (
                <div className="card" key={i}>
                  <img className="imgMenu" src={product.image} />
                  <div className="descriptionProduct">
                    <p className="textProduct">{product.name}</p>
                    <p className="textPrice">{product.price}</p>
                  </div>
                  <button
                    onClick={() => addProduct(product)}
                    data-product={product.id}
                    className="buttonAddProduct"
                  >
                    {" "}
                    Añadir{" "}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="cardOrder">
          <CardOrder
            productsListOrder={productsListOrder}
            setproductsListOrder={setproductsListOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuView;
