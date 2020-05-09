import React, { Component } from 'react';
import CartPopUp from './CartPopUp'
import ItemCard from './ItemCard'
import Filter from './Filter'
import { fetchFoodData } from './actions.js'

class App extends Component {
  state = {
    foodData: [],
    searchTxt: '',
    filterCatVal: [],
    filterPriceVal: '',
    itemCart: {}
  }
  componentDidMount() {
    fetchFoodData()
      .then(resp => {
        this.setState({
          foodData: resp
        })
      })
  }

  handleSearch = (evt) => {
    this.setState({
      searchTxt: evt.target.value
    })
  }
  getCategoryList = () => {
    const { foodData } = this.state;
    let categoryList = [];
    foodData.map(items => {
      categoryList.push(items.category)
    })
    return categoryList
  }
  handleFilter = (filterVal) => {
    this.setState({
      filterCatVal: filterVal
    })
  }
  handleAddItems = (item) => {
    const { itemCart } = this.state
    if (Object.keys(itemCart).includes(item.name)) {
      this.setState({
        itemCart: { ...itemCart, [item.name]: { ...itemCart[item.name], count: itemCart[item.name].count + 1 } }
      })
    } else {
      this.setState({
        itemCart: { ...itemCart, [item.name]: { ...item, count: 1 } }
      })
    }
  }
  submitCart = () => {
    this.setState({
      showSuccessMsg: true
    })
    handleShowCart(false)
  }
  handleRemoveItems = (item) => {
    const { itemCart } = this.state
    const itemName = item.name
    if (Object.keys(itemCart).includes(itemName)) {
      if (itemCart[itemName].count > 1) {
        this.setState({
          itemCart: { ...itemCart, [itemName]: { ...itemCart[itemName], count: itemCart[itemName].count - 1 } }
        })
      }
      if (itemCart[itemName].count == 1) {
        let newCart = {}
        Object.keys(itemCart).map(val => { if (val != itemName) newCart[val] = itemCart[val] })
        this.setState({
          itemCart: { ...newCart }
        })
      }
    }
  }
  handleShowCart = (toShow) => {
    const { showCart } = this.state
    if (toShow) {
      this.setState({
        showCart: toShow
      })
    } else {
      // toggle
      this.setState({
        showCart: !showCart
      })
    }
  }
  handlePriceChange = (val) => {
    this.setState({
      filterPriceVal: val
    })
  }
  submitCart = () => {
    this.setState({ showSuccessMsg: true }, () => {
      setTimeout(() => {
        this.setState({
          showSuccessMsg: false
        })
      }, 5000)
    })
  }
  getCartLength = () => {
    const { itemCart } = this.state;
    let cartVal = 0;
    Object.values(itemCart).map((item) => {
      cartVal += item.count
    })
    return cartVal
  }
  render() {
    const { foodData, searchTxt, filterCatVal, itemCart, showCart, filterPriceVal, showSuccessMsg } = this.state
    const categoryList = this.getCategoryList()
    return (
      <div className="food-order-app">
        <header>Search
          <input className='search-items' onChange={this.handleSearch} placeholder='search on food name' />
          <div className="food-order-cart" onClick={this.handleShowCart}>
            Cart Checkout : {this.getCartLength()}
          </div>
        </header>
        {showSuccessMsg && <div className="success">Your order has been placed :)</div>}
        {showCart &&
          <CartPopUp itemCart={itemCart} foodData={foodData} handleShowCart={this.handleShowCart} submitCart={this.submitCart} />}
        <div className="order-food-wrapper">
          <aside>
            <Filter filterItems={categoryList}
              filterCategory={filterCatVal}
              handleFilter={this.handleFilter}
              handlePriceChange={this.handlePriceChange} />
          </aside>
          <div className='order-food-container'>
            {foodData.map(menu => {
              if (filterCatVal.length && filterCatVal.includes(menu.category) || !filterCatVal.length)
                return (
                  <ItemCard
                    category={menu.category}
                    items={menu.items}
                    searchTxt={searchTxt}
                    filterPriceVal={filterPriceVal}
                    handleAddItems={this.handleAddItems}
                    handleRemoveItems={this.handleRemoveItems}
                  />)
            })

            }
          </div>
        </div>

      </div>
    );
  }
}
//http://demo9859925.mockable.io
export default App;
