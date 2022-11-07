const container = $("#container");
const resultDiv = $("#result");
const button = $("#btn");
const button4 = $("#btn4");
let button3;

// Event to get clents Machine Info
button.click(() => {
  changeCss(container,"display", "none");
  const obj = api("http://localhost/api/whoami");
  obj.then((data) => {
    resultDiv.html(`<div>
            <h3><span>IPv6 Address: </span>${data.ipaddress}</h3> 
             <h3><span>Langugae: </span>${data.language}</h3>
             <h3><span>Software: </span>${data.software}</h3>
             <button id="btn3">Return</button>
             </div>
             `);
    button3 = $("#btn3");
    button3.click(()=>{
        changeCss(container,"display", "block")
        changeCss(resultDiv,"display", "none")
    })
  });

  changeCss(resultDiv,"display", "block");
  changeCss(resultDiv,"Animation", "increaser .25s linear 1 normal forwards");
});

// Event to get Ip Address Location
button4.click(()=>{
    const ipdiv = $("#ipinfodiv");
    const form = $("#form");
    const ip = $("#ip").val();

    const ipinfo = api(`http://localhost/getipinfo/${ip}`)  
    ipinfo.then(data=>{
      if(data.hasOwnProperty("success")){
         $("#err").text("Enter Valid IP Address")
      }
      else{ ipdiv.html(
            `<h3><span>IP Address:</span> ${data.ip}</h3>
            <h3><span>Continent-Name:</span> ${data.continentName}</h3>
            <h3><span>Country-Name:</span> ${data.countryName}</h3>
            <h3><span>Capital: </span>${data.capital}</h3>
            <h3><span>City: </span>${data.city}</h3>
            <h3><span>Region: </span>${data.regionName}</h3>
            <h3><span>Phone-code:</span> ${data.phoneCode}</h3>
            <h3><span>Top Level Domains:</span> ${data.topLevelDomains.join(",")}</h3>
            <h3><span>Borders:</span> ${data.borders.join(",")}</h3>
            <button id="btn5">Return</button>`
           
        )  
        changeCss(form,"display", "none")
        changeCss(ipdiv, "display", "block")
        changeCss(ipdiv,"Animation", "increaser .25s linear 1 normal forwards"); 
        const button5 = $("#btn5");
        button5.click(()=>{
         changeCss(ipdiv,"display", "none");
         changeCss(form, "display", "block");
         $.get("/") 
       
      })
      }
   }) 
})

// Function to make request to APIs
async function api(url) {
  const response = await fetch(url);
  return response.json();
}

// Function to change css
function changeCss(elem, prop, val){
    elem.css(prop,val);
}
