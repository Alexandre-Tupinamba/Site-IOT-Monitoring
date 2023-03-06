let nos = [];
let conduct;
let ph;
let turbidez;
let temp;
let dados;
let teste = []
// Executes when document is loaded
document.addEventListener("DOMContentLoaded", (ev) => {


});

//Carrega dados do Firebase

let DataObj = {
  get: "/Pai/.json",
  fetchData: function () {
    fetch(
      "https://monitoramentoremotoico-default-rtdb.firebaseio.com"
      + this.get
    )
      .then((Response) => Response.json())
      .then((data) => this.displayData(data));
  },
  displayData: function (data) {
    dados = data;
    for (const prop in data) {
      nos.push(prop);
    }

    console.log(nos)
    // Recent Orders Data
    document.getElementById("recent-orders--table").appendChild(buildTableBody());
    document.getElementsByClassName("insights")[0].style.display = "grid"
    // Updates Data
    document
      .getElementsByClassName("recent-updates")
      .item(0)
      .appendChild(buildUpdatesList());

    // Sales Analytics
    const salesAnalytics = document.getElementById("analytics");
    buildSalesAnalytics(salesAnalytics);

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
  search: function () {
    this.fetchData(document.querySelector(".search-bar").value);
  },
};


DataObj.fetchData();

// Document Builder
const buildTableBody = () => {
  const recentOrderData = RECENT_ORDER_DATA;

  const tbody = document.createElement("tbody");

  let bodyContent = "";
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

  tbody.innerHTML = bodyContent;

  return tbody;
};


const buildUpdatesList = () => {
  const updateData = nos;

  const div = document.createElement("div");
  div.classList.add("updates");

  console.log(Object.values(dados))
  let updateContent = "";
  for (const no of updateData) {
    console.log(no);
    conduct = Object.values(dados[no].Conduct)
    for (const update of conduct) {
      console.log(update);
      updateContent += `
      <div class="update">
        <div class="profile-photo">
          <img src="${update.imgSrc}" />
        </div>
        <div class="message">
          <p><b>Leitura:</b>${update.leitura}</p>
          <small class="text-muted">${update.hora}</small>
        </div>
      </div>
    `;
    }
  }

  div.innerHTML = updateContent;

  return div;
};

const buildSalesAnalytics = (element) => {
  const salesAnalyticsData = SALES_ANALYTICS_DATA;

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
