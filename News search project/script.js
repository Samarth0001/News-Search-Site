const apiKey = 'ad18b994fa334f19bc8b55cf7ee0b2f4';

const blogcontainer = document.getElementById("container");

const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random news",error);
        return[];
    }
}

searchButton.addEventListener("click",async ()=>{
    const query = searchField.value.trim()
    if(query!==""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random news",error);
        return[];
    }
}

function displayBlogs(articles){
    blogcontainer.innerHTML="";
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length>30? article.title.slice(0,30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description.length>120? article.description.slice(0,120) + "...." : article.description;
        description.textContent = truncatedDes;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',() =>{
            window.open(article.url,"_blank");
        });
        blogcontainer.appendChild(blogcard);
    });
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
    }
})();