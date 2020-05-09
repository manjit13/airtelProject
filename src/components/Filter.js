import React, { Component } from 'react';
import '../assets/styles/filter.scss'

class ItemCard extends Component {
    state = { filterPrice: '' }
    handleCatFilter = (value) => {

        const { handleFilter, filterCategory } = this.props
        if (filterCategory.includes(value)) {
            handleFilter(filterCategory.filter(item => item != value))
        } else {
            handleFilter([...filterCategory, value])
        }
    }
    handlePriceChange = (evt) => {
        const { handlePriceChange } = this.props
        handlePriceChange(evt.target.value)
        this.setState({
            filterPrice: evt.target.value
        })
    }

    render() {
        const { filterItems, filterCategory } = this.props;
        const { filterPrice } = this.state;
        return (
            <div className="filter-cont">
                <div className="food-cart-title">Filter on Category</div>

                {filterItems.map(filter =>
                    <div className={`filter-items ${filterCategory.includes(filter) ? 'selected' : ''}`} onClick={() => this.handleCatFilter(filter)}>{filter}</div>
                )}

                <div className="food-cart-title filt">Filter on Price</div>
                <div>selected Range : 0-{`${filterPrice.length ? filterPrice : '20'}`}</div>
                <label for="points">Price (between 0 and 20):</label>
                <input type="range" id="points" name="points" min="0" max="20" onChange={this.handlePriceChange} />
            </div>
        );
    }
}
export default ItemCard;
