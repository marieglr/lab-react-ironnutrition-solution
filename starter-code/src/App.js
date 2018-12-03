import React, { Component } from 'react';
import FoodBox from "./Components/FoodBox"
import AddFood from "./Components/AddFood"
import './App.css';
import 'bulma/css/bulma.css';
import foods from './foods.json'
import Search from './Components/Search';
import TodaysFood from './Components/TodaysFood';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      myFoods : [...foods],
      isAddingFood: false,
      searchString: '',
      todaysFood: []
     }
  }

  addFood = () => {
    this.setState({isAddingFood : true})
  }

  hideFormAndAddFood=(food) => {
    const foodsNew = [...this.state.myFoods];
    foodsNew.push(food);
    
    this.setState({
      isAddingFood: false,
      myFoods: foodsNew,
    })
  }

  handleSearch = (event)=> {
    const {value} = event.target;
    const filteredFoods = foods.filter(oneFood => oneFood.name.toLowerCase().includes(value.toLowerCase()))
    this.setState({
      myFoods: filteredFoods,
      searchString: value
    })
  }

  addToTodaysFood = (food) => {
    const {todaysFood} = this.state;
    const todaysFoodCopy = [...todaysFood];
    const newFood = todaysFoodCopy.find((oneFood)=> oneFood.name === food.name)
    newFood ? newFood.quantity = food.quantity : todaysFoodCopy.push(food);
    this.setState ({todaysFood : todaysFoodCopy})
  }

  handleQuantityChange = (event) => {
    const {value, name} = event.target;
    const myFoodsCopy = [...this.state.myFoods]
    const updatedFood = myFoodsCopy.find((oneFood)=> oneFood.name === name);
    updatedFood.quantity = value;
    this.setState({myFoods: myFoodsCopy})
  }

  deleteFood = food => {
    const {todaysFood} = this.state;
    const todaysFoodCopy = [...todaysFood];
    const index = todaysFoodCopy.indexOf(food)
    todaysFoodCopy.splice(index, 1)
    this.setState ({todaysFood : todaysFoodCopy})
  }

  render() { 
    const {myFoods, isAddingFood, searchString, todaysFood} = this.state;
    return ( 
      <div>
        <Search searchString={searchString} handleSearch={this.handleSearch}/>
        {
          isAddingFood ?
           <AddFood onSubmit={food => this.hideFormAndAddFood(food)} /> 
             :
           <button onClick={this.addFood}>Add a food</button> 
        }
        {myFoods.map((oneFood, i) => <FoodBox 
                                        food={oneFood} 
                                        key={i}
                                        onPlusButton={food => this.addToTodaysFood(food)}
                                        onQuantityChange={event => this.handleQuantityChange(event)}
                                      />)}
        <TodaysFood foodArray={todaysFood} onDeleteButton={food => this.deleteFood(food)}/>
      </div>
     );
  }
}
 
export default App;
