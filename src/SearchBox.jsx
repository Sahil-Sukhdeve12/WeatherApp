import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){
     let [city,setcity]=useState("");
     let [error,setError]=useState(false);

    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="767541cc51d940a3af9e5f37ba18d7c7";

    let getWeatherInfo=async()=>{
        try{
            let response=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric `);
            let jsonResponse=await response.json();
        // console.log(jsonResponse);
        let result={
            city:city,
            temp:jsonResponse.main.temp,
            tempMin:jsonResponse.main.temp_min,
            tempMax:jsonResponse.main.temp_max,
            humidity:jsonResponse.main.humidity,
            feels_like:jsonResponse.main.feels_like,
            weather:jsonResponse.weather[0].description,
        }
        console.log(result);
        return result;
        }  catch(err){
            throw(err);
        } 
    }

   
    let handleChange=(event)=>{
        setcity(event.target.value);
    }
    let handleSubmit=async(event)=>{
        try{
            event.preventDefault();
        console.log(city);
        setcity("");
        let newInfo=await getWeatherInfo();
        updateInfo(newInfo);
        }
        catch(err){
            setError(true);
        }
        
    }

    return(
        <div className='SearchBox'>
            {/* <h3>Search for the weather</h3> */}
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
            <br/><br/>
            <Button variant="contained" type="submit">Search</Button>
            {error && <p style={{color:"red"}}>No such place in out API</p>}
            </form>
        </div>
    )
}