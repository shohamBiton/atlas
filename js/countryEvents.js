export const declareEvents = (doApiByName, presentFirstCountries) => {
    let search_btn = document.querySelector("#search_btn");
    let search_input = document.querySelector("#search_input1");
    let select_box = document.querySelector("#id_select_country")
    let homeLink = document.querySelector("#homeLink")

    search_input.addEventListener("keyDown", (e) => {
        console.log(e.key)
        // e.key => מכיל על איזה מקש לחצנו במקלדת ובדקנו שזה אנטר
        if (e.key == "Enter") {
            console.log(search_input.value)
            doApiByName(search_input.value);
        }
    })

    search_btn.addEventListener("click", () => {
        console.log(search_input.value)
        doApiByName(search_input.value);
    })
    select_box.addEventListener("change", () => {
        if (select_box.value != "0") {
            parent.innerHTML = "";
            doApiByName(select_box.value);
        }
    })

    let burger_btn = document.querySelector("#burger_btn");
    let nav_open = document.querySelector("#nav_open");
    burger_btn.addEventListener("click", function () {
        console.log(555);
        if (nav_open.style.display != "block") {
            nav_open.style.display = "block";
        }
        else {
            nav_open.style.display = "none";
        }
    })
    homeLink.addEventListener("click", () => {
        presentFirstCountries();
    })


    // for (let i = 0; i < nav.length; i++) {
    //     nav[i].style.cursor = "pointer"
        // nav[i].addEventListener("click", () => {
        //     console.log(nav[i].innerHTML);
        //     console.log(nav.length);
        //     let nameCountry = nav[i].innerHTML;
        //     // doApiByName(nameCountry);
        // }
        // )
    // }


}
