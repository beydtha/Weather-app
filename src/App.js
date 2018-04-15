import React from "react";

import Titles from "./components/Titles";
import Form  from "./components/Form"
import Weather from "./components/Weather";

const API_KEY = "8db73dfa8f70aae3e4f2bca4ebdce8b9";

const footerStyle = {
  backgroundColor: "purple",
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

function Footer({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>{children}</div>
    </div>
  );
}


class App extends React.Component
{

  state = {
    temparature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    e.preventDefault();

      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);  
      const data = await api_call.json(); 
     if(city && country)
     {
    

      this.setState({     
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
     } 
     else
     { 
        this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });

     } 
      
  }
  render()
  {
      return(    
        <div className="wrapper">
          <div className="main"> 
            <div className="container">
              <div className="row">  

                <div className="col-xs-5 title-container" >
                    <Titles />
                </div>
                <div className="col-xs-7 form-container" >
                    <Form getWeather={this.getWeather}/>
                    <Weather
                      temperature={this.state.temperature}
                      city= {this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}
                    />
                </div>
                <div> 
                <Footer>    <span>All rights reserved. </span>    </Footer>
                </div>
              </div>
          </div>
        </div>

      </div>
      );
  }
};

export default App;





