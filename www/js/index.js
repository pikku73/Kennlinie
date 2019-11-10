var x_e_toggled = 0;

var x_e_positions = [
  ["4%", "22%"],
  ["60%", "85%"]
];

var x_e_unit_positions = [
  ["42%", "5%"],
  ["82%", "47%"]
];

var e_items = [
  ["U", "V"],
  ["I", "A"],
  ["f", "Hz"],
  ["τ", "s"]
];

var e_unit_items = [
  ["U", "kV", "V", "mV", "μV"],
  ["I", "kA", "A", "mA"],
  ["f", "GHz", "MHz", "kHz", "Hz"],
  ["τ", "s", "ms", "μs"]
];

var x_items = [
  ["s", "m"],
  ["v", "m/s"],
  ["φ", "°"],
  ["ω", "°/s"],
  ["T", "°C"],
  ["p", "bar"],
  ["F", "N"],
  ["M", "Nm"],
  ["a", "g"]
];

var x_unit_items = [
  ["s", "km", "m", "mm", "μm"],
  ["v", "km/s", "m/s", "mm/s", "μm/s"],
  ["φ", "°", "\'", "\"", "rad"],
  ["ω", "°/s", "\'/s", "\"/s"],
  ["T", "°C", "°F", "K"],
  ["p", "bar", "mbar", "Pa"],
  ["F", "kN", "N", "mN"],
  ["M", "Nm"],
  ["a", "g"]
];

var x_min = NaN;
var x_max = NaN;
var e_min = NaN;
var e_max = NaN;
var e = NaN;
var my_x_unit = "";
var my_y_unit = "";
var actual_result = NaN;

function refresh_button() {
  window.location.reload(false);
}

function get_unit(items, unit) {
  var ret = "?";
  for(var i=0; i < items.length; i++) {
    var s = items[i][0];

    if(unit == s) ret = items[i][1];
  }
  return ret;
}

function get_units(measurement, items) {
  var ret = [];

  for(var i=0; i < items.length; i++) {
    var s = items[i][0];

    if(measurement == s) {
      for(var j=0; j < items[i].length-1; j++) {
        ret[j] = items[i][j+1];
      }
    }
  }
  return ret;
}

function rescale_image() {
  var image = document.getElementById('valuepic');
  var scale = (e-e_min) * 100.0 / (e_max-e_min);
  var resultscale = "" + scale * .63 + "%";
  image.style.width = resultscale;
  resultscale = "" + scale * .61 + "%";
  image.style.height = resultscale;
}

function calc_result() {
  var resultText = document.getElementById('formula_text_2_2');

//  if(x_min >= 0 && x_max >= 0 && e_min >= 0 && e_max >= 0 && e >= 0) {
  if(!isNaN(x_min)  && !isNaN(x_max) && !isNaN(e_min) && !isNaN(e_max) && !isNaN(e)) {
    var result = (x_max-x_min)/(e_max-e_min) * (e-e_min);
    result = parseFloat(result);
    result = result + parseFloat(x_min);
    actual_result = result;

    result = parseFloat(result).toFixed(3);
    result = result.replace(".", ",");
    resultText.innerHTML = result + " " + my_y_unit;

    if((parseFloat(e) >= parseFloat(e_min)) &&
       (parseFloat(e) <= parseFloat(e_max))) {
      rescale_image();
    }
  }
  else {
    resultText.innerHTML = "";
  }
}

function toggle_z() {
  var pic_elements = document.getElementsByClassName('pic_frame');
  if(pic_elements[0].style.zIndex == -1) {
    pic_elements[0].style.zIndex = 1;
  }
  else {
    pic_elements[0].style.zIndex = "-1";
  }
}

function toggle_e_x() {
  var e;
  var temp;

  // toggle measurement buttons
  var x = document.getElementById('x_achse_main');
  var y = document.getElementById('y_achse_main');

  if(x_e_toggled == 0) {
    x.style.top = x_e_positions[0][0];
    x.style.left = x_e_positions[0][1];
    y.style.top = x_e_positions[1][0];
    y.style.left = x_e_positions[1][1];
//    x_e_toggled = 1;
  }
  else {
    x.style.top = x_e_positions[1][0];
    x.style.left = x_e_positions[1][1];
    y.style.top = x_e_positions[0][0];
    y.style.left = x_e_positions[0][1];
//    x_e_toggled = 0;
  }

  // toggle unit buttons
  x = document.getElementById('x_achse_unit');
  y = document.getElementById('y_achse_unit');

  if(x_e_toggled == 0) {
    x.style.top = x_e_unit_positions[0][0];
    x.style.left = x_e_unit_positions[0][1];
    y.style.top = x_e_unit_positions[1][0];
    y.style.left = x_e_unit_positions[1][1];
    x_e_toggled = 1;
  }
  else {
    x.style.top = x_e_unit_positions[1][0];
    x.style.left = x_e_unit_positions[1][1];
    y.style.top = x_e_unit_positions[0][0];
    y.style.left = x_e_unit_positions[0][1];
    x_e_toggled = 0;
  }

  temp = my_x_unit;
  my_x_unit = my_y_unit;
  my_y_unit = temp;

  x = document.getElementById('x_min_main_text');  // xmin
  e = document.getElementById('e_min_main_text');  // emin
  temp = x.innerHTML;
  x.innerHTML = e.innerHTML;
  e.innerHTML = temp;

  x = document.getElementById('x_min_main_input');  // xmin
  e = document.getElementById('e_min_main_input');  // emin
  temp = x.value;
  x.value = e.value;
  e.value = temp;


  x = document.getElementById('x_max_main_text');  // xmax
  e = document.getElementById('e_max_main_text');  // emax
  temp = x.innerHTML;
  x.innerHTML = e.innerHTML;
  e.innerHTML = temp;

  x = document.getElementById('x_max_main_input');  // xmin
  e = document.getElementById('e_max_main_input');  // emin
  temp = x.value;
  x.value = e.value;
  e.value = temp;

  x = document.getElementById('formula_text_1');  // x

  if(x_e_toggled == 0)
    e = document.getElementById('y_button');      // e
  else e = document.getElementById('x_button');   // e

  temp = x.innerHTML;
  x.innerHTML = e.innerHTML;

  /*
  x = document.getElementById('formula_text_2_1');  // x
  x.innerHTML = e.innerHTML;
  */
  if(isNaN(actual_result)) {
    e = document.getElementById('formula_text_7');  // e
    e.innerHTML = temp;
  }


  x = document.getElementById('formula_text_2');  // xmin
  e = document.getElementById('formula_text_6');  // emin
  temp = x.innerHTML;
  if(!isNaN(x_min))
    x.innerHTML = e.innerHTML; // + " " + my_y_unit;
  else x.innerHTML = e.innerHTML;

  x = document.getElementById('formula_text_4');  // xmin
  x.innerHTML = e.innerHTML;
  if(!isNaN(e_min))
    e.innerHTML = temp; //.substring(0, temp.indexOf(' '));
  else e.innerHTML = temp;
  e = document.getElementById('formula_text_8');  // emin
  if(!isNaN(e_min))
    e.innerHTML = temp; //.substring(0, temp.indexOf(' '));
  else e.innerHTML = temp;

  x = document.getElementById('formula_text_3');  // xmax
  e = document.getElementById('formula_text_5');  // emax
  temp = x.innerHTML;
  x.innerHTML = e.innerHTML;
  e.innerHTML = temp;

  temp = x_min;
  x_min = e_min;
  e_min = temp;

  temp = x_max;
  x_max = e_max;
  e_max = temp;

//  this.e = -1;
  if(!isNaN(actual_result)) {
    this.e = actual_result;
//    x = document.getElementById('formula_text_7');
    e = document.getElementById('e_main_input');

    temp = parseFloat(actual_result).toFixed(3);
    e.value = temp;
    temp = temp.replace(".", ",");
//    x.innerHTML = temp;
  }
  else {

  }



//  x = document.getElementById('x_unit_text');
//  e = document.getElementById('e_unit_text');
//  x.innerHTML = my_y_unit;
//  e.innerHTML = my_x_unit;

  x = document.getElementById('formula_text_2b');
  x.innerHTML = my_y_unit;
  x = document.getElementById('formula_text_6b');
  x.innerHTML = my_y_unit;
  e = document.getElementById('formula_text_6c');
  e.innerHTML = my_x_unit;
  e = document.getElementById('formula_text_9');
  e.innerHTML = my_x_unit;

  calc_result();
}

function min_max_changed(name, val) {
  var show;
  var valtext = "" + val;
  valtext = valtext.replace(".", ",");

  if(name.startsWith("x_min")) {
    x_min = val;
    if(val < 0) valtext = "(" + valtext + ")";
    show = document.getElementById('formula_text_2');
    show.innerHTML = valtext;// + " " + my_y_unit;
    show = document.getElementById('formula_text_4');
    show.innerHTML = valtext;
  }
  else if(name.startsWith("x_max")) {
    x_max = val;
    show = document.getElementById('formula_text_3');
    show.innerHTML = valtext;
  }
  else if(name.startsWith("e_min")) {
    e_min = val;
    if(val < 0) valtext = "(" + valtext + ")";
    show = document.getElementById('formula_text_6');
    show.innerHTML = valtext;
    show = document.getElementById('formula_text_8');
    show.innerHTML = valtext;
  }
  else if(name.startsWith("e_max")) {
    e_max = val;
    show = document.getElementById('formula_text_5');
    show.innerHTML = valtext;
  }

  calc_result();
}

function e_clicked() {
  var t = document.getElementById('formula_text_7');
  t.innerHTML = "";
  t.style.display = "none";

}

function e_changed(val) {
  e = val;
  var show = document.getElementById('formula_text_7');
  show.innerHTML = ""; //val;

  calc_result();
}

function min_max_clicked(name) {
  var t = document.getElementById(name + '_main_text');
//  t.innerHTML = "      ";
  t.style.display = "none";
}

function x_axis_button() {
  toggle_z();
  document.getElementById("x_axis_dropdown").classList.toggle("show");
}

function y_axis_button() {
  toggle_z();
  document.getElementById("y_axis_dropdown").classList.toggle("show");
}

function x_axis_unit_button() {
  toggle_z();
  document.getElementById("x_axis_unit_dropdown").classList.toggle("show");
}

function y_axis_unit_button() {
  toggle_z();
  document.getElementById("y_axis_unit_dropdown").classList.toggle("show");
}

function handle_dropdown(id) {
  var btn = document.getElementById(id);    // get the button element
  var menu_elements = document.getElementsByClassName("dropdown-element");

  for (var i = 1; i <= menu_elements.length; i++) { // iterate through all drop-downs
    var element_name = id + '_' + i;

    if(event.target.id == element_name) {     // a menu item has been clicked
      var menu_element = document.getElementById(element_name);
      btn.innerHTML = menu_element.innerHTML; // set button value to item value

      var prefix;
      var units;

      if(x_e_toggled == 0) {
        if(element_name.startsWith("x_button")) {
          prefix = "e";
        }
        else if(element_name.startsWith("y_button")) {
          prefix = "x";
        }
      }
      else {
        if(element_name.startsWith("x_button")) {
          prefix = "x";
        }
        else if(element_name.startsWith("y_button")) {
          prefix = "e";
        }
      }

      if(element_name.includes('unit')) {
        setUnitText(prefix, btn.innerHTML);
      }
      else {
        setFormulaText(prefix, btn.innerHTML);
      }
    }
  }
}

function setUnitText(prefix, unit) {
  if(prefix == "e") {
    var formula_text_6c = document.getElementById("formula_text_6c");
    formula_text_6c.innerHTML = unit;
    var formula_text_9 = document.getElementById("formula_text_9");
    formula_text_9.innerHTML = unit;
    my_x_unit = unit;
  }
  else if(prefix == "x") {
    var formula_text_2b = document.getElementById("formula_text_2b");
    formula_text_2b.innerHTML = unit;
    var formula_text_6b = document.getElementById("formula_text_6b");
    formula_text_6b.innerHTML = unit;
    my_y_unit = unit;
  }
}

// get unit dropdown elements and replace texts
function setUnitDropdownTexts(prefix, measurement) {
  var unit_menu_elements;
  var units;
  if(prefix == "e") {
    unit_menu_elements =
      document.getElementById("x_axis_unit_dropdown").children;

    units = get_units(measurement, e_unit_items);

    var button = document.getElementById("x_button_unit");
    button.innerHTML = get_unit(e_items, measurement);
  }
  else if(prefix == "x") {
    unit_menu_elements =
      document.getElementById("y_axis_unit_dropdown").children;

    units = get_units(measurement, x_unit_items);

    var button = document.getElementById("y_button_unit");
    button.innerHTML = get_unit(x_items, measurement);
  }

  for(i=0; i < units.length; i++) {
    unit_menu_elements[i*2].innerHTML = units[i];
  }
  while(i < 4) {
    unit_menu_elements[i*2].innerHTML = "";
    i++;
  }
}

// called by the measurement buttons
function setFormulaText(prefix, measurement) {
    var units;
    if(prefix == "e") {

      if(x_e_toggled == 0) units = e_items;
      else units = x_items;

      e_min = NaN;
      e_max = NaN;
      my_x_unit =  get_unit(units, measurement);
      setUnitText(prefix, my_x_unit);
      setUnitDropdownTexts(prefix, measurement);
    }
    else if(prefix == "x") {

      if(x_e_toggled == 0) units = x_items;
      else units = e_items;

      x_min = NaN;
      x_max = NaN;
      my_y_unit =  get_unit(units, measurement);
      setUnitText(prefix, my_y_unit);
      setUnitDropdownTexts(prefix, measurement);
    }

    var max_input = document.getElementById(prefix + "_max_main_input");
    var max_text = document.getElementById(prefix + "_max_main_text");
    max_text.innerHTML = measurement + '<sub>max</sub>';
    max_text.style.display = "block";
    max_input.value = "";

    var min_input = document.getElementById(prefix + "_min_main_input");
    var min_text = document.getElementById(prefix + "_min_main_text");
    min_text.innerHTML = measurement + '<sub>min</sub>';
    min_text.style.display = "block";
    min_input.value = "";

//    var unit = document.getElementById(prefix + "_unit_text");
//    unit.innerHTML = get_unit(units, measurement);

    var formula_text_2_1 = document.getElementById("formula_text_2_2");
    formula_text_2_1.innerHTML = "";
    e = NaN;

    if(prefix.startsWith("x")) {
      var formula_text_1 = document.getElementById("formula_text_1");
      formula_text_1.innerHTML = measurement;
      var formula_text_2 = document.getElementById("formula_text_2");
      formula_text_2.innerHTML = measurement + '<sub>min</sub>';
      var formula_text_3 = document.getElementById("formula_text_3");
      formula_text_3.innerHTML = measurement + '<sub>max</sub>';
      var formula_text_4 = document.getElementById("formula_text_4");
      formula_text_4.innerHTML = measurement + '<sub>min</sub>';
//      var formula_text_2_1 = document.getElementById("formula_text_2_1");
//      formula_text_2_1.innerHTML = measurement;
    }
    else if (prefix.startsWith("e")) {
      var formula_text_5 = document.getElementById("formula_text_5");
      formula_text_5.innerHTML = measurement + '<sub>max</sub>';
      var formula_text_6 = document.getElementById("formula_text_6");
      formula_text_6.innerHTML = measurement + '<sub>min</sub>';
      var formula_text_7 = document.getElementById("formula_text_7");
      formula_text_7.innerHTML = measurement;
      formula_text_7.style.display = "block";
      var e_main_input = document.getElementById("e_main_input");
      e_main_input.value = "";
      var formula_text_8 = document.getElementById("formula_text_8");
      formula_text_8.innerHTML = measurement + '<sub>min</sub>';
    }
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn-unit')) {
    var pic_elements = document.getElementsByClassName("pic_frame");
    pic_elements[0].style.zIndex="1";

//    var diagram2_elements = document.getElementsByClassName("diagram_frame2");
//    diagram2_elements[0].style.zIndex="1";

    handle_dropdown("x_button");
    handle_dropdown("y_button");
    handle_dropdown("x_button_unit");
    handle_dropdown("y_button_unit");

    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    dropdowns = document.getElementsByClassName("dropdown-content-unit");

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
