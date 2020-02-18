import React from 'react';
import api from '../../services/source/api'

export default class Calculator extends React.Component{

    constructor(props){
        super(props);
        this.currencies = ["AUD", "CAD", "CHF", "CNY", "INR", "USD", "EUR", "GBP", "JPY", "NZD"];
        this.cached = {}
        this.state = {
            base: "USD",
            other: "EUR",
            value: 0,
            converted: 0
        };
    }

    makeSelection = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, this.recalculate)
    }

    changeValue = (event) => {
        this.setState({
            value: event.target.value,
            converted: null
        }, this.recalculate)
    }

    recalculate = () => {
        const value = parseFloat(this.state.value);
        if (isNaN(value)) {
            return;
        }
        this.setState({
            converted: api.getRates(this.state.other) * value 
        });
    }

    render(){
        return(
            <div>
                <div>
                    <select onChange={this.makeSelection} name="base" value={this.state.base}>
                        {this.currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                    </select>
                    <input onChange={this.changeValue} value={this.state.value}/>
                </div>

                <div>
                    <select onChange={this.makeSelection} name="other" value={this.state.other}>
                        {this.currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                    </select>
                    <input disabled={true} value={this.state.converted === null ? "Calculating..." : this.state.converted}/>
                </div>
            </div>
        );
    }
}
