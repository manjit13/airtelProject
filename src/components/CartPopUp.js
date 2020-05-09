import React, { Component } from 'react';
import Popup from "reactjs-popup";
import '../assets/styles/CartPopUp.scss'

class CartPopUp extends Component {
    state = {
    }
    closeModal = () => {
        const { handleShowCart } = this.props
        handleShowCart(false)
    }
    submitCart = () => {
        const { handleShowCart, submitCart } = this.props
        handleShowCart(false)
        submitCart()
    }
    render() {
        const { itemCart, submitCart } = this.props
        console.log(itemCart)
        return (
            <Popup
                open={true}
                closeOnDocumentClick
                onClose={this.closeModal}
            >
                <div className="modal">
                    <a className="close" onClick={this.closeModal}>
                        &times;
                    </a>
                    <div className="billContainer">
                        <div className="grid-container">
                            <div className="grid-item">Item Name</div>
                            <div className="grid-item">Item Quantity</div>
                            <div className="grid-item">Item Price</div>
                            {Object.keys(itemCart).map(item => {
                                return (<React.Fragment><div className="grid-item">{itemCart[item].name}</div>
                                    <div className="grid-item">{itemCart[item].price}</div>
                                    <div className="grid-item">{itemCart[item].count}</div>
                                </React.Fragment>)
                            })}
                        </div>
                        <button onClick={this.submitCart}>PAY</button>
                    </div>
                </div>
            </Popup>)
    }
}
export default CartPopUp;

