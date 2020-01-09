import React from 'react';
import Context from "./context";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bikes: [
        { id: 1, name: "Ukraina", type: "highway", price: "$" },
        { id: 2, name: "Aist", type: "mountain", price: "$" },
        { id: 3, name: "Turist", type: "speed", price: "$" }
      ],
      inputValues: { id: "", name: "", type: "", price: "" },
      pageTitle: "React components",
      showBikes: false,
      newBike: {}
    };
  }

  onChangeHandler = e => {
    this.setState({
      inputValues: {...this.state.inputValues, [e.target.name]: e.target.value}
    })
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      bikes: [...this.state.bikes, {id: Date.now(), name: this.state.inputValues.name, type: this.state.inputValues.type, price: this.state.inputValues.price}]
    })
  };

  onRemoveElement(index) {
    const bikes = this.state.bikes.concat()
    bikes.splice(index, 1)
    this.setState({bikes})
  };

  render() {
    console.log(this.state.bikes);
    return (
      <Context.Provider value="removeElement">
      <div className="wrapper">
      <h1>Awesome rent bicycle new</h1>
        <form style={{ background: 'lightgrey', padding: 10, marginBottom: 10 }} onSubmit={this.onSubmitHandler}>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label>Bike name</label>
                    <input type="text" className="form-control" name="name" onChange={this.onChangeHandler} />
                </div>

                <div className="form-group col-md-4">
                    <label>Bike type</label>
                    <select className="form-control" name="type" onChange={this.onChangeHandler}>
                        <option defaultValue>...</option>
                        <option>highway</option>
                        <option>mountain</option>
                        <option>speed</option>
                    </select>
                </div>
        
                <div className="form-group col-md-2">
                    <label>Rent Price</label>
                    <input type="number" className="form-control" name="price" onChange={this.onChangeHandler} />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary form-group col-md-2" 
                  style={{ marginTop: 33 }}
                >
                    Submit rent
                </button>
            </div>
        </form>

        <ul className="list-group" >
          <h5>Total bikes for rent:&nbsp;<strong>{this.state.bikes.length}</strong></h5>
          
                {this.state.bikes.map((bike, index) => {
                    return (
                      <div className="form-row list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          {bike=bike.name + ' / ' + bike.type + ' / ' + bike.price}
                          <span>
                              <button className='btn btn-success' >
                                Rent
                              </button>
                              &nbsp;
                              <button className='btn btn-danger' onClick={this.onRemoveElement.bind(this, index)}>
                                Delete
                              </button>
                          </span>
                        </li>                        
                      </div>
                    )
                })}
        </ul>
              
      </div>
      </Context.Provider>
    );
  }
}

export default App;