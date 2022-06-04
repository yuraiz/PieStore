import React, { useEffect, useState, useLayoutEffect } from "react";
import { cartService } from "./shared";
import { cakesService } from "./shared";

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
};

function Counter({ count, setCount }) {
    const dec = () => setCount(count - 1);
    const inc = () => setCount(count + 1);

    return (
        <div className="Counter">
            <button onClick={dec}>-</button>
            <p>{count}</p>
            <button onClick={inc}>+</button>
        </div>
    );
}

function CartItem({ item }) {
    const [cake, setCake] = useState({});

    const [count, setCount] = useState(item.quantity);
    const [price, setPrice] = useState(item.total_price);

    const setItemCount = (newCount) => {
        cartService.updateCart(cake, newCount).then((item) => {
            // let delta = -price;
            // setTotalPrice(totalPrice - price + item.total_price);
            setPrice(item.total_price);
        });
        setCount(newCount);
    };

    useLayoutEffect(() => {
        cakesService.getCake(item.item).then((result) => setCake(result));
    }, []);

    if (count === 0) return null;
    return (
        <table className="CartItem">
            <tr>
                <td>
                    <img src={cake.image} alt={cake.name} />
                </td>
                <tr>
                    <td>
                        <h5>{cake.name}</h5>
                    </td>
                </tr>
                <tr>
                    <td>{cake.description}</td>
                </tr>
            </tr>
            <tr>
                <td>${price}</td>
                <td>
                    <Counter count={count} setCount={setItemCount} />
                </td>
            </tr>
        </table>
    );
}

export function CartDetail({ sharedItem, setCount }) {
    const [info, setInfo] = useState([]);

    // const [totalPrice, setTotalPrice] = useState(0);

    useLayoutEffect(() => {
        cartService.getCart().then((data) => {
            setInfo(data);
            setCount(
                data?.reduce((partialSum, a) => partialSum + a.quantity, 0)
            );
            // setTotalPrice(
            //     data?.reduce((partialSum, a) => partialSum + a.total_price, 0)
            // );
            console.log(JSON.stringify(data));
        });
    }, [sharedItem]);

    return (
        <div>
            {/* <h4>Total price: ${totalPrice}</h4> */}
            {info?.map((el, i) => (
                <CartItem
                    key={generateKey(i)}
                    item={el}
                    // totalPrice={totalPrice}
                    // setTotalPrice={setTotalPrice}
                />
            ))}
        </div>
    );
}
