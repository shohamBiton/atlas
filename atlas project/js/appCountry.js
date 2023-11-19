import Country from "./countryClass.js";
import { declareEvents } from "./countryEvents.js"

const firstCountries = [
    "israel",
    "united states",
    "france",
    "thailand",
    "united kingdom"
];

let allCountries_ar = [];

window.onload = async () => {
    createNav();
    await doApi();
    presentFirstCountries();
    declareEvents(doApiByName, presentFirstCountries);

}

const presentFirstCountries = () => {
    let tmp = [];
    console.log("allCountries_ar");
    console.log(allCountries_ar);
    tmp = allCountries_ar.filter((item) => item);
    presentCountrys(tmp);
}
const createNav = () => {
    let nav_ul = document.querySelector("#nav_ul");
    firstCountries.forEach(countryName => {
        let nav_li = document.createElement("li");
        nav_li.className = "nav-item";
        nav_li.innerHTML += `
        <a class="nav-link" aria-current="page">${countryName}</a>
        `;
        nav_ul.append(nav_li);
        nav_li.addEventListener("click", () => {
            console.log(111);
            doApiByName(countryName);
        }
        )
    });

}


const doApi = async () => {
    let url = "https://restcountries.com/v3.1/all?fields=name,capital,cca3,languages,population,borders,flags,latlng,region"
    let resp = await fetch(url);
    let data = await resp.json();
    allCountries_ar = data;
    presentCountrys(data);
    fillSelectBox(data);

}

export const doApiByName = async (cName) => {
    let url = `https://restcountries.com/v3.1/name/${cName}`;
    let resp = await fetch(url);
    let data = await resp.json();
    presentCountrys1(data);
}
// export const doApiByCca3 = async (cca3) => {
//     let url = `https://restcountries.com/v3.1/alpha/${cca3}`;
//     let resp = await fetch(url);
//     let data = await resp.json();
//     console.log(data);
//     return data.name.common;
// }
export const doApiByCca3 = (_arg) => {
    let myitem = allCountries_ar
    let cca3
    for (let item of myitem) {
        if (item.cca3 == _arg)
            cca3 = item.name.common
    }
    return cca3
}
const presentCountrys1 = (country_ar) => {
    let errSpan = document.querySelector("#nFoundSpan");
    document.querySelector("#id_parent").innerHTML = ""
    if (country_ar.length > 0) {
        errSpan.style.display = "none";
        country_ar.forEach(countryItem => {
            createCountry(countryItem);
        });
    }
    else {
        errSpan.style.display = "block";
    }
}
const presentCountrys = (country_ar) => {
    allCountries_ar = country_ar;
    let filted = [];
    filted = allCountries_ar.filter((item) =>
        firstCountries.includes(item.name.common.toLowerCase())
    );
    presentCountrys1(filted);

}

const createCountry = (newCountry) => {
    let country = new Country("#id_parent", newCountry);
    country.render();
}

export const fillSelectBox = (country_ar) => {
    allCountries_ar = country_ar;

    let select = document.querySelector("#id_select_country");
    allCountries_ar.forEach((item) => {
        select.innerHTML += `
      <option value="${item.name.common}">${item.name.common}</option>`;
    });
};


