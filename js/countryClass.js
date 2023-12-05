import {doApiByName,doApiByCca3} from "./appCountry.js"
export default class Country {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.code = _item.cca3;
        this.region = _item.region;
        this.languages = _item.languages ? Object.values(_item.languages) : "none";
        this.capital = _item.capital;
        this.pop = _item.population;
        this.currencies = _item.currencies;
        this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lan = _item.latlng[1];
        this.borders=_item.borders;
        this.borders?this.borders=Object.values(this.borders):this.borders=null
        this.borderDiv = document.createElement("div");
        this.borderDiv.innerHTML+=`<strong class="fw-bold">Borders:</strong> `
        this.borderDiv.className="ms-3 d-flex"
        if(this.borders)
      { for (let i = 0; i < this.borders.length; i++) {
           let a = document.createElement("div")
           a.style.cursor="pointer"
           a.className="fw-light"
           a.innerHTML= doApiByCca3(this.borders[i])
          this.borders[i]=a.innerHTML
           i==this.borders.length-1?a.innerHTML+=" .":a.innerHTML+=" ,"        
           a.addEventListener("click",async () => {
            await doApiByName(this.borders[i])
            document.querySelector(".modal").style.display="none";
            document.querySelector(".modal-backdrop").style.display="none";
           })
          this.borderDiv.append(a)
       }}
       else{
       let a = document.createElement("div")
         a.innerHTML="no borders"
         this.borderDiv.append(a)
       }
   
    }
    // <img class="w-100 h-100" img src="${this.flag}" alt="${this.name}">

    render() {
        let countryDiv = document.createElement("div");
        countryDiv.className = "singleCountry border border-dark col-lg-3 col-sm-12 mb-5 me-1 pb-5 text-center"
        let imgDiv = document.createElement("div");
        imgDiv.className = "img_div"
        imgDiv.style=`background-image: url("${this.flag}");`;
        countryDiv.append(imgDiv);
        let titleDiv = document.createElement("div");
        titleDiv.className = "titel_div"
        titleDiv.innerHTML=`<hr><h1>${this.name}</h1>`;
        countryDiv.append(titleDiv);
        // countryDiv.innerHTML += `<div>

 
        // </div>`
        let parant = document.querySelector(this.parent);
        parant.append(countryDiv);
        countryDiv.addEventListener("click", () => {
            showModal(countryDiv, this);
        });
    }

    singleCountryRender() {
        let countryDiv = document.createElement("div");
        countryDiv.className = "modalCountry";
        let informDiv = document.createElement("div");
        informDiv.className = "informCountry mb-5";
        informDiv.style.color ="white"
        informDiv.innerHTML = `<div class="row justify-content-between">
        <div class="modal_img img_box col-6">
        <img class="w-100 h-100" img src="${this.flag}" alt="${this.name}">
        </div>
        <div class="col-6 mt-3">
        <h1>${this.name}</h1>
        <p>Region: ${this.region}</p>
        <p>Population: ${this.pop}</p>
        <p>languages: ${this.languages}</p>
        <p>Coin: ${this.currencies}</p>
        <p>Capital: ${this.capital}</p>
        </div>
        </div>`
        informDiv.append(this.borderDiv);
        let map = document.createElement("div");
        map.className = "modalCountry"
        map.innerHTML = `
        <div class="Mymap" style="height: 300px;" >
        <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${this.lat},${this.lan}&hl=es&z=4&amp;output=embed">
        </iframe>
        </div>`;
        countryDiv.append(informDiv);
        countryDiv.append(map);
        let parant = document.querySelector("#modal-body");
        parant.innerHTML = "";
        parant.append(countryDiv);
    }
}

const showModal = async (countryDiv, country) => {
    country.singleCountryRender();
    countryDiv.setAttribute("data-toggle", "modal");
    countryDiv.setAttribute("data-target", "#exampleModal");
}
