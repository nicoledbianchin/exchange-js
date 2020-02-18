import React from 'react';

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
        
        if (this.cached[this.state.base] !== undefined && Date.now() - this.cached[this.state.base].timestamp < 60000) {	
            this.setState({	
                converted: this.cached[this.state.base].rates[this.state.other] * value	
            });	
            return;      	
        }

        fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(response => response.json())
        .then(data => { 
            this.cached[this.state.base] = {	
                rates: data.rates,	
                timestamp: Date.now()	
            };	
            this.setState({
                converted: data.rates[this.state.other] * value 
            });
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
