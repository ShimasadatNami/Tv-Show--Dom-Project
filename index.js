
const url="https://api.tvmaze.com/shows/7/episodes"

let container=document.querySelector(".container")
let listMovies=document.querySelector("#listMovies") 
let search=document.querySelector("#search")

const card=(data)=>{
    for(let movie of data){
        let div=document.createElement("div")
        div.classList.add("myImages")
        let p=document.createElement("p");
        p.classList.add("para")
        p.innerText=movie.name;
        let p2=document.createElement("p")
        p2.classList.add("Summery")
        p2.innerText=movie.summary.replace("<p>", "").replace("</p>", "");
        let img=document.createElement("img");
        img.src=movie.image.medium;
        let i=document.createElement("i")
        i.classList.add("bi","bi-play","button")
        let a=document.createElement("a")
        a.href=movie.url;
        let season=movie.season;
        if(season<10)
            season="0"+season;
        let number=movie.number;
        if(number<10)
            number="0"+number;
        a.innerText=`S${season}E${number}`;
        i.append(a);
        let i2=document.createElement("i")
        i2.classList.add("bi","bi-clock","button")
        i2.innerText=`   ${movie.runtime}`;
        div.append(img);
        div.append(p);
        div.append(p2);
        div.append(i);
        div.append(i2);

        container.append(div);
        // container.append(p);

    }
}

const list=(data)=>{
    for(let movie of data){
        let option=document.createElement("option")
        option.innerText=movie.name;
        listMovies.append(option);
    }
}

let removeCard=()=>{
    container.innerHTML="";
}

axios.get(url).then((Response)=>{
    let movies=Response.data;

    card(movies);
    list(movies);

    listMovies.addEventListener("change",()=>{
        console.log(listMovies.value);
        if(listMovies.value==="All episods"){
            removeCard();
            card(movies);
        }else{
            let myMovie=movies.filter((el)=>{
                return el.name===listMovies.value
            })
                removeCard();
                card(myMovie);
            }
        })
        search.addEventListener("input",()=>{
            console.log(search.value)
            if(search.value===""){
                removeCard();
                card(movies);
            }else{
                let myMovie=movies.filter((el)=>{
                    console.log(el);
                    return el.summary.includes(search.value)
                })
                removeCard();
                card(myMovie);
            }
        })
    })
    .catch((e)=>{
        console.log("Error!!!");
    })