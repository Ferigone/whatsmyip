import React, {useEffect, useState} from 'react';

function App() {

  const [info, setInfo] = useState();
  const [copy, setCopy] = useState(false);

  useEffect(()=>{
    fetch('https://ipv4.oxro.io/ip?v4=1').then(res=> res.json()).then(res=>setInfo(res))
  },[])

  const copyIcon = ()=> <svg height="512pt" viewBox="-40 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m271 512h-191c-44.113281 0-80-35.886719-80-80v-271c0-44.113281 35.886719-80 80-80h191c44.113281 0 80 35.886719 80 80v271c0 44.113281-35.886719 80-80 80zm-191-391c-22.054688 0-40 17.945312-40 40v271c0 22.054688 17.945312 40 40 40h191c22.054688 0 40-17.945312 40-40v-271c0-22.054688-17.945312-40-40-40zm351 261v-302c0-44.113281-35.886719-80-80-80h-222c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h222c22.054688 0 40 17.945312 40 40v302c0 11.046875 8.953125 20 20 20s20-8.953125 20-20zm0 0"/></svg>
  const checkIcon = ()=> <svg height="512pt" viewBox="-40 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7C514.5,101.703,514.499,85.494,504.502,75.496z"/></svg>

  const copyIP = (ip)=>{
    var inp =document.createElement('input');
    document.body.appendChild(inp)
    inp.value = ip
    inp.select();
    document.execCommand('copy',false);
    inp.remove();

    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 3000);
  }

  return (
    <div className="container">
      <h1 className="title">What's my ip?</h1>
        {info ? (
          <div className="card">
            <div className="ip cardInfo">
              <p>IP Address</p>
        <p className="address">{info.ip_address} {copy?(checkIcon()):(<button className="copyButton" onClick={()=>{copyIP(info.ip_address)}}>{copyIcon()}</button>)}</p>
            </div>
            <div className="location cardInfo">
              <p className="locationName">Location: {info.country.name.EN} - {info.country.capital}</p>
              <p>ISP: {info.as.org}</p>
            </div>
          </div>
        ):(<h2 className="loading">Loading data...</h2>)}
    </div>
  );
}

export default App;
