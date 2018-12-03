import React, { Component } from 'react';

class TodaysFood extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 

     }
  }

  render() { 
    const {foodArray, onDeleteButton} = this.props;
    const totalCalories = foodArray.reduce(((total, oneFood)=> total += oneFood.calories*oneFood.quantity), 0) 

    return ( 
      <div className="todaysFood">
        <h1>Today's foods</h1>
        <ul>
          {foodArray.map((oneFood)=>{
            return(
              <li>
                <p>{oneFood.quantity} {oneFood.name} = {oneFood.quantity*oneFood.calories}</p>
                <button
                  className="button is-info"
                  onClick={() => onDeleteButton(oneFood)}
                > 
                Delete
                </button>
              </li>
            )
          })}
        </ul>
        <h2>Total calories: {totalCalories}</h2>
      </div>
     );
  }
}
 
export default TodaysFood;