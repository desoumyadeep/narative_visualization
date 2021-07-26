// Parameter Selection
setButton = (page_no) => {
  pn = (Number(page_no) % 12) + 1;
  var url = "./Page_" + pn.toString() + ".html";

  var btnText = page_no == "12" ? "Start Page" : "Next Page";

  div = d3.select("#btn");
  div
    .append("a")
    .attr("href", url)
    .append("input")
    .attr("type", "button")
    .attr("class", "btn btn-outline-secondary")
    .attr("value", btnText);
};

setNav = (page_no) => {
  var nav = d3
    .select("#page_nav")
    .append("nav")
    .attr("aria-label", "Page No.")
    .append("ul")
    .attr("class", "pagination pagination-sm");

  for (i = 1; i < 13; i++) {
    li = nav.append("li");
    if (i.toString() == page_no) {
      li.attr("aria-current", "page");
      li.attr("class", "page-item active");
    } else {
      li.attr("class", "page-item disabled");
    }
    li.append("span").attr("class", "page-link").text(i.toString());
  }
};

setParameter = (page_no) => {
  var param = "";
  switch (page_no) {
    case "n":
      param = { chart_file: "../resources/data/summary_data_all.csv" };
      break;
    case "1":
      param = { chart_file: "../resources/data/details_by_age.csv" };
      break;
    case "3":
      param = { chart_file: "../resources/data/details_data_by_month.csv" };
      break;
    default:
      param = { chart_file: "../resources/data/details_data_by_month.csv" };
      break;
  }
  console.log(param);
  return param;
};

var parseNumber = d3.format(".2f");
var parseTime = d3.timeParse("%Y-%m-%d");
function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

loadAgeDDL = (page_no) => {
  var month = [
    "Totals",
    "0-9",
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "80+",
    "Unknown",
  ];
  const g = (v) => [].concat(v).map((d) => d);
  var q = month;
  const ddl = d3
    .select("#ddlContainer")
    .insert("select", "svg")
    .attr("class", "form-select form-select-sm");

  if (page_no != "12") {
    ddl.property("disabled", true);
    q = g(month[Number(page_no) - 1]);
  }
  //console.log(q)
  ddl
    .selectAll("option")
    .data(q)
    .enter()
    .append("option")
    .attr("value", function (d) {
      return d;
    })
    .text(function (d) {
      return "Age Group : " + d;
    });
  return page_no == "12" ? "Totals" : month[Number(page_no) - 1];
};
