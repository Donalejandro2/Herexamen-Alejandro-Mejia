"use strict";


import Project from "./Project.js";

const app = {

  measurements: [],
  filtered: [],
  selectedMeasurement: "all",
  init: async function () {
    console.log('Start conding %s! ', ' YAAI!!!!');
    fetch('https://thecrew.cc/herexamen/measurements.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        let originalMeting = data;
        originalMeting.measurements.forEach(element => {
          // console.log(element);
          let meting = new Project(element.value, element.type, element.timestamp);
          this.measurements.push(meting);
        });
        this.filtered = this.measurements;
        this.render();
      });
    this.anotherFilter();
  },
  anotherFilter() {
    console.log(this.filter);
    document.getElementById("typeFilter").addEventListener("change", () => {
      let select = document.getElementById('typeFilter');
      let value = select.options[select.selectedIndex].value;
      this.filter(value);
    })
    this.renderChart();
  },
  filter: function (value) {
    console.log(value);
    const filter = [];
    this.measurements.forEach(element => {
      console.log(element.unit);
      if (value == "all") {
        filter.push(element);
      } else if (element.unit == value) {
        filter.push(element);
      }
    })
    this.filtered = filter;
    this.render();
  },

  renderChart() {

    var context = document.getElementById('chart');
    var labelList = [];
    var dataList = [];
    let select = document.getElementById('typeFilter');
    let value = select.options[select.selectedIndex].value;
    var toFilterLabel = value;

    this.filtered.forEach(element => {
      labelList.push(element.timestamp);
      dataList.push(element.value);
    })
    console.log(labelList);
    console.log(dataList);

    var data = {
      labels: labelList,
      datasets: [{
        label: toFilterLabel,
        fill: true,
        lineTension: 2,
        backgroundColor: "black",
        borderColor: "yellow",
        pointBorderColor: "black",
        pointHoverBackgroundColor: "lightblue",
        pointHoverBorderColor: "",
        data: dataList,
      }]
    };

    var theLineCharts = new Chart(context, {
      type: 'line',
      data: data,
    });
    Chart.update();
  },

  render: function () {
    let htmlMeasurements = document.getElementById("measurements");
    let allTheString = "";
    this.filtered.forEach(element => {
      let measurementObject = element;
      allTheString += measurementObject.htmlString;
    });
    htmlMeasurements.innerHTML = allTheString;
  }
}

app.init();