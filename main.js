// API key and base URL for fetching weather data using OpenWeatherMap API
const weatherAPIKey = "61dc3c43c7feb5dc96ce01dd69024da0";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

// Array containing gallery images with their source paths and alt text for displaying as thumbnails
const galleryImgs = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"   
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"   
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 30"   
    },
];

// Array of product objects, each containing title, author, price, and image path
const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
];

// Handles opening and closing of the navigation menu when respective buttons are clicked
function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open"); // Opens the menu
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open"); // Closes the menu
    });
}

// Converts a given temperature from Celsius to Fahrenheit
function celsiusToFahr(temperature){
    let fahr = (temperature * 9/5) + 32;  // Formula to convert Celsius to Fahrenheit
    return fahr;
}

// Displays greeting message based on the current time of day (morning, afternoon, evening)
function greetingHandler(){
    let currentHour = new Date().getHours();  // Get the current hour
    let greentingText = "";

    // Set greeting text based on the time of day
    if(currentHour < 12){
        greentingText = "Bom dia!";
    }else if(currentHour < 18){
        greentingText = "Boa tarde!";
    }else if (currentHour >= 18){
        greentingText = "Boa noite!";
    }

    document.querySelector("#greeting").innerHTML = greentingText;
}

// Fetches weather information based on the user's current location and displays it in both Celsius and Fahrenheit
function weatherHandler(){
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        
        // Construct the URL with the user's latitude, longitude, and API key
        let url = weatherAPIURL
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);

        // Fetch weather data from the OpenWeatherMap API
        fetch(url)
        .then(response => response.json()).then(data => {
            const condition = data.weather[0].description;
            const location = data.name;
            const temperature = data.main.temp;

            // Generate the weather description in Celsius and Fahrenheit
            let celsiusText = `The weather is ${condition} in ${location}, it's ${temperature.toFixed(1)}°C outside`;
            let fahrText = `The weather is ${condition} in ${location}, it's ${celsiusToFahr(temperature).toFixed(1)}°F outside`;

            // Display the initial weather data in Celsius
            document.querySelector("p#weather").innerHTML = celsiusText;

            // Toggle between Celsius and Fahrenheit when the user clicks on the weather group
            document.querySelector(".weather-group").addEventListener("click", function(e){
                if(e.target.id == "celsius"){
                    document.querySelector("p#weather").innerHTML = celsiusText; // Display Celsius
                }else if(e.target.id == "fahr"){
                    document.querySelector("p#weather").innerHTML = fahrText; // Display Fahrenheit
                }
            });
        }).catch(function(err){
            document.querySelector("p#weather").innerHTML = `Unable to get weather info<br> Try again later`;  // Error message
        })
    });
}

// Updates the clock on the page every second, displaying the current hours, minutes, and seconds
function clockHandler(){
    setInterval(function(){
        let localTime = new Date();  // Get the current time

        // Update the time elements with formatted hours, minutes, and seconds
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");

    }, 1000);  // Update every second
}

// Handles the gallery by displaying the main image and updating it when a thumbnail is clicked
function galleryHandler(){
    // Select the main image element and set its initial source and alt text
    let mainImg = document.querySelector("#gallery > img");
    mainImg.src = galleryImgs[0].src;
    mainImg.alt = galleryImgs[0].alt;

    // Select the thumbnail container
    let thumbnails = document.querySelector("#gallery .thumbnails");

    // Create thumbnail elements for each image in the gallery
    galleryImgs.forEach(function(img, i){
        let thumb = document.createElement("img");  // Create a thumbnail image element
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.dataset.arrayI = i;  // Store the index of the image for future reference
        thumb.dataset.selected = i === 0;  // Mark the first thumbnail as selected

        // Change the main image when a thumbnail is clicked
        thumb.addEventListener("click", function(e){
            let selectedI = e.target.dataset.arrayI;  // Get the index of the clicked thumbnail
            let selectedImg = galleryImgs[selectedI];  // Select the corresponding image
            mainImg.src = selectedImg.src;  // Update the main image's source and alt text
            mainImg.alt = selectedImg.alt;

            // Mark all thumbnails as unselected
            thumbnails.querySelectorAll("img").forEach(img => img.dataset.selected = false);
            e.target.dataset.selected = true;  // Mark the clicked thumbnail as selected
        });

        thumbnails.appendChild(thumb);  // Add the thumbnail to the DOM
    });
}

// Dynamically creates and displays product items in the products section
function populateProducts(productL){
    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";  // Clear any existing content

    // Loop through the list of products and create an item for each
    productL.forEach(function(product, i){
        let productElmt = document.createElement("div");  // Create the product container element
        productElmt.classList.add("product-item");

        let productImg = document.createElement("img");  // Create the product image element
        productImg.src = product.image;
        productImg.alt = product.title;

        let productDetails = document.createElement("div");  // Create the container for product details
        productDetails.classList.add("product-details");

        // Create and append the product title and author elements
        let productTitle = document.createElement("h3");
        productTitle.textContent = product.title;
        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        // Create and append the price title and product price elements
        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";
        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");

        // Display the product price or "Free" if the price is 0
        if(product.price > 0){
            productPrice.textContent = "R$ " + product.price.toFixed(2);
        }else {
            productPrice.textContent = "Free";
        }

        // Append the product details to the container
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        productElmt.append(productImg);  // Append the product image
        productElmt.append(productDetails);  // Append the product details

        productsSection.append(productElmt);  // Append the product to the section
    });  
}

// Handles filtering products by price: all, paid, or free
function productsHandler(){
    // Filter products that are free
    let freeProducts = products.filter(function(item){
        return !item.price || item.price <= 0;
    });

    // Filter products that have a price greater than 0
    let paidProducts = products.filter(function(item){
        return item.price > 0;
    });

    populateProducts(products);  // Display all products initially

    // Update product counts for each filter
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    // Event listener for filtering products based on user selection
    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        if (e.target.id === "all"){
            populateProducts(products);  // Show all products
        } else if (e.target.id === "paid"){
            populateProducts(paidProducts);  // Show only paid products
        } else if (e.target.id === "free"){
            populateProducts(freeProducts);  // Show only free products
        }
    });
}

// Footer: dynamically sets the current year in the footer
function footerHandler(){
    let currentYear = new Date().getFullYear();  // Get the current year
    document.querySelector("footer").textContent = `@${currentYear} - Todos os direitos reservados a Tiago William Vidão de Freitas`;
}

// Initialize all page handlers on page load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
