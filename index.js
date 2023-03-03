let nos = [];
let conduct = [];
let ph = [];
let turbidez = [];
let temp = [];


// Executes when document is loaded
document.addEventListener("DOMContentLoaded", (ev) => { 
  DataObj.fetchData(); // look here
  // Recent Orders Data
  document.getElementById("recent-orders--table").appendChild(buildTableBody());

  // Updates Data
  document
    .getElementsByClassName("recent-updates")
    .item(0)
    .appendChild(buildUpdatesList());

  // Sales Analytics
  const salesAnalytics = document.getElementById("analytics");
  buildSalesAnalytics(salesAnalytics);
});

//Carrega dados do Firebase

let DataObj = {
  get: "/Pai/.json",
  fetchData : function () {
      fetch(
          "https://monitoramentoremotoico-default-rtdb.firebaseio.com"
           + this.get
      )
      .then((Response) => Response.json())
      .then((data) => this.displayData(data));
  },
  displayData: function(data) {
    
    console.log(data);
    for (const prop in data) {
      nos.push(prop);
    }
    console.log(nos)

      //const { name } = data;
      //const { icon, description } = data.weather[0];
      //const { temp, humidity } = data.Ph;
      //const { speed } = data.wind;
      //console.log(data.Ph)
      //document.querySelector(".city").innerText = "Sensor de " + name;
     // document.querySelector(".icon").src = 
     //     "https://openweathermap.org/img/wn/" + icon + ".png";
     // document.querySelector(".description").innerText = description;
     // document.querySelector(".temp").innerText = temp + "°C";
     // document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
     // document.querySelector(".wind").innerText = "Wind Speed: " + speed + "Km/h";
     // document.querySelector(".weather").classList.remove("loading");
      //document.body.style.backgroundImage = "url('https://source.unsplash.com/1700x1000/?" + name +"')"
  },
  search: function(){
      this.fetchData(document.querySelector(".search-bar").value);
  },
};


// Document Builder
const buildTableBody = () => {
  const recentOrderData = nos;

  const tbody = document.createElement("tbody");

  let bodyContent = "";
  for (let no in recentOrderData){
    ph = no["Ph"];
    turbidez = no['Turbidez'];
    conduct = no['Conduct'];
    temp = no['Temp'];
    for (const row of recentOrderData) {
      bodyContent += `
        <tr>
          <td>${row.productName}</td>
          <td>${row.productNumber}</td>
          <td>${row.payment}</td>
          <td class="${row.statusColor}">${row.status}</td>
          <td class="primary">Details</td>
        </tr>
      `;
    }
  }
  

  tbody.innerHTML = bodyContent;

  return tbody;
};

const buildUpdatesList = () => {
  const updateData = UPDATE_DATA;

  const div = document.createElement("div");
  div.classList.add("updates");

  let updateContent = "";
  for (const update of updateData) {
    updateContent += `
      <div class="update">
        <div class="profile-photo">
          <img src="${update.imgSrc}" />
        </div>
        <div class="message">
          <p><b>${update.profileName}</b> ${update.message}</p>
          <small class="text-muted">${update.updatedTime}</small>
        </div>
      </div>
    `;
  }

  div.innerHTML = updateContent;

  return div;
};

const buildSalesAnalytics = (element) => {
  const salesAnalyticsData = salesAnalyticsData;

  for (const analytic of salesAnalyticsData) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.classList.add(analytic.itemClass);

    const itemHtml = `
      <div class="icon">
        <span class="material-icons-sharp"> ${analytic.icon} </span>
      </div>
      <div class="right">
        <div class="info">
          <h3>${analytic.title}</h3>
          <small class="text-muted"> Last 24 Hours </small>
        </div>
        <h5 class="${analytic.colorClass}">${analytic.percentage}%</h5>
        <h3>${analytic.sales}</h3>
      </div>
    `;

    item.innerHTML = itemHtml;

    element.appendChild(item);
  }
};

// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change Theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});


