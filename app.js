'use strict';
const table = document.getElementById('table');
let workHours = [
  '6:00 am',
  '7:00 am',
  '8:00 am',
  '9:00 am',
  '10:00 am',
  '11:00 am',
  '12:00 am',
  '1:00 pm',
  '2:00 pm',
  '3:00 pm',
  '4:00 pm',
  '5:00 pm',
  '6:00 pm',
  '7:00 pm',
];
/*this method generate random number*/
function randomcust(minCustomers, maxCustomers) {
  return Math.floor(
    Math.random(maxCustomers, minCustomers) *
        (maxCustomers - minCustomers + 1) +
        (maxCustomers - minCustomers)
  );
}
let cookiesPerHourAllCities = [];
let totalCookiesPerHourPerLocation = 0;
let totalOfTotal=0;
/*this is a constructor*/
function City(shopName, minCust, maxCust, avgCookiesPerCust) {
  this.name = shopName;
  this.minimumCust = minCust;
  this.maximumCust = maxCust;
  this.averageCookiesPerCust = avgCookiesPerCust;
  this.arrOfCookiesPerHour = [];
  this.dailyLocalTotal = 0;
  for (let i = 0; i < workHours.length; i++) {
    this.arrOfCookiesPerHour.push(
      Math.ceil(
        this.averageCookiesPerCust *
                randomcust(this.minimumCust, this.maximumCust)
      )
    );
    this.dailyLocalTotal += this.arrOfCookiesPerHour[i];
  }
  cookiesPerHourAllCities.push(this);
  /*This is render method ====>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  this.render = function () {
    const row = document.createElement('tr');
    table.appendChild(row);
    const dataFirst = document.createElement('td');
    row.appendChild(dataFirst);
    dataFirst.textContent = this.name + ':';
    for (let c = 0; c < workHours.length; c++) {
      const data = document.createElement('td');
      data.textContent = this.arrOfCookiesPerHour[c];
      row.appendChild(data);
    }
    const dataLast = document.createElement('td');
    dataLast.textContent = this.dailyLocalTotal;
    row.appendChild(dataLast);
  };
}
/*This is header method ====>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
City.prototype.header = function () {
  const firstRow = document.createElement('tr');
  table.appendChild(firstRow);
  const data1FiristRow = document.createElement('td');
  firstRow.appendChild(data1FiristRow);
  data1FiristRow.textContent = ' ';
  for (let a = 0; a < workHours.length; a++) {
    const dataFirstRow = document.createElement('td');
    dataFirstRow.textContent = workHours[a];
    firstRow.appendChild(dataFirstRow);
  }
  const dataLastFirstRow = document.createElement('td');
  dataLastFirstRow.textContent = 'Daily local total';
  firstRow.appendChild(dataLastFirstRow);
};
/*This is footer method ====>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
City.prototype.footer=function(){
  const lastRow = document.createElement('tr');
  table.appendChild(lastRow);
  const data1Lastrow = document.createElement('td');
  lastRow.appendChild(data1Lastrow);
  data1Lastrow.textContent = 'Total';
  for (let a = 0; a < workHours.length; a++) {
    const dataLastrow = document.createElement('td');
    lastRow.appendChild(dataLastrow);
    for (let b = 0; b < cookiesPerHourAllCities.length; b++) {
      totalCookiesPerHourPerLocation +=
                   cookiesPerHourAllCities[b].arrOfCookiesPerHour[a];
    }
    dataLastrow.textContent = totalCookiesPerHourPerLocation;
    totalOfTotal += totalCookiesPerHourPerLocation;
  }
  const lastDataLastRow = document.createElement('td');
  lastRow.appendChild(lastDataLastRow);
  lastDataLastRow.textContent = totalOfTotal;
};
City.prototype.header();
new City('tokyo', 3, 24, 1.2);
new City('seattle', 23, 65, 6.3);
new City('dubai', 11, 38, 3.7);
new City('paris', 20, 38, 2.3);
new City('lima', 2, 16, 4.6);
for(let x=0;x<cookiesPerHourAllCities.length;x++){cookiesPerHourAllCities[x].render();}
City.prototype.footer();
