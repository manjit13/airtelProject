import React, { Component } from 'react';
import '../assets/styles/itemCard.scss'

function isInclude(str1, str2) {
    return str1.toLowerCase().includes(str2.toLowerCase())
}
class ItemCard extends Component {
    checkFilters = (item) => {
        const { searchTxt, filterPriceVal } = this.props;
        if (!searchTxt.length && !filterPriceVal.length) { return true }
        if (searchTxt.length && !filterPriceVal.length) {
            return (isInclude(item.name, searchTxt)
                || isInclude(item.description, searchTxt))
        }
        if (!searchTxt.length && filterPriceVal.length) {
            return (item.price.match(/\d+/g)[0] <= filterPriceVal)
        }
        if (searchTxt.length && filterPriceVal.length) {
            return (isInclude(item.name, searchTxt)
                || isInclude(item.description, searchTxt)) && (item.price <= filterPriceVal)

        }
    }
    render() {
        const { category, items, searchTxt, filterPriceVal, handleAddItems, handleRemoveItems } = this.props
        return (
            <div className="item-card">
                <div className='item-cat food-cart-title'>{category.toUpperCase()}</div>
                <div className="item-list">
                    {items.map(item => {
                        if (this.checkFilters(item)) {
                            return (<div className="item-detail">
                                <div>{item.name}</div>
                                <div>Price: {item.price}</div>
                                <div>Ingredients: {item.description}</div>
                                <button className="item-addToCart" onClick={() => handleAddItems(item)}>ADD</button>
                                <button className="item-removeFromCart" onClick={() => handleRemoveItems(item)}>REMOVE</button>
                            </div>)
                        }

                    })}
                </div>
            </div>
        );
    }
}
export default ItemCard;
