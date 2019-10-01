var x_e_toggled = 0;

var x_e_positions = [
  ["4%", "22%"],
  ["60%", "85%"]
];

var e_items = [
  ["U", "V"],
  ["I", "mA"],
  ["f", "kHz"],
  ["τ", "ms"]
];

var x_items = [
  ["s", "m"],
  ["v", "m/s"],
  ["φ", "°"],
  ["ω", "°/sec"],
  ["T", "°C"],
  ["p", "bar"],
  ["F", "N"],
  ["M", "Nm"],
  ["a", "g"]
];

var x_min = -1.0;
var x_max = -1.0;
var e_min = -1.0;
var e_max = -1.0;
var e = -1;
var my_x_unit = "";
var my_y_unit = "";
var actual_result = -1;

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

function calc_result() {
  var resultText = document.getElementById('formula_text_2_2');

  if(x_min >= 0 && x_max >= 0 && e_min >= 0 && e_max >= 0 && e >= 0) {

    var result = (x_max-x_min)/(e_max-e_min) * (e-e_min);
    result = parseFloat(result);
    result = result + parseFloat(x_min);
    actual_result = result;

    result = parseFloat(result).toFixed(4);
    result = result.replace(".", ",");
    resultText.innerHTML = result + " " + my_y_unit;
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
  var pic_elements2 = document.getElementsByClassName('diagram_frame2');
  if(pic_elements2[0].style.zIndex == -1) {
    pic_elements2[0].style.zIndex = 1;
  }
  else {
    pic_elements2[0].style.zIndex = "-1";
  }
}

function toggle_e_x() {
  var x = document.getElementById('x_achse_main');
  var y = document.getElementById('y_achse_main');

  var e;
  var temp;

  if(x_e_toggled == 0) {
    x.style.top = x_e_positions[0][0];
    x.style.left = x_e_positions[0][1];
    y.style.top = x_e_positions[1][0];
    y.style.left = x_e_positions[1][1];
    x_e_toggled = 1;
  }
  else {
    x.style.top = x_e_positions[1][0];
    x.style.left = x_e_positions[1][1];
    y.style.top = x_e_positions[0][0];
    y.style.left = x_e_positions[0][1];
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
    e = document.getElementById('y_button');  // e
  else e = document.getElementById('x_button');  // e

  temp = x.innerHTML;
  x.innerHTML = e.innerHTML;
  x = document.getElementById('formula_text_2_1');  // x
  x.innerHTML = e.innerHTML;

  e = document.getElementById('formula_text_7');  // e
  e.innerHTML = temp;

  x = document.getElementById('formula_text_2');  // xmin
  e = document.getElementById('formula_text_6');  // emin
  temp = x.innerHTML;
  if(x_min >= 0)
    x.innerHTML = e.innerHTML + " " + my_y_unit;
  else x.innerHTML = e.innerHTML;
  x = document.getElementById('formula_text_4');  // xmin
  x.innerHTML = e.innerHTML;
  if(e_min >= 0)
    e.innerHTML = temp.substring(0, temp.indexOf(' '));
  else e.innerHTML = temp;
  e = document.getElementById('formula_text_8');  // emin
  if(e_min >= 0)
    e.innerHTML = temp.substring(0, temp.indexOf(' '));
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
  this.e = actual_result;

  if(actual_result >= 0) {
    x = document.getElementById('formula_text_7');
    e = document.getElementById('e_main_input');

    temp = parseFloat(actual_result).toFixed(2);
    e.value = temp;
    temp = temp.replace(".", ",");
    x.innerHTML = temp;
  }

  x = document.getElementById('x_unit_text');
  e = document.getElementById('e_unit_text');
  x.innerHTML = my_y_unit;
  e.innerHTML = my_x_unit;

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
    show = document.getElementById('formula_text_2');
    show.innerHTML = valtext + " " + my_y_unit;
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
//  t.innerHTML = "      ";
  t.style.display = "none";
}

function e_changed(val) {
  e = val;
  var show = document.getElementById('formula_text_7');
  show.innerHTML = val;

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

function handle_dropdown(id) {
  var btn = document.getElementById(id);
  var menu_elements = document.getElementsByClassName("dropdown-element");

  for (var i = 1; i <= menu_elements.length; i++) {
    var element_name = id + '_' + i;

    if(event.target.id == element_name) {
      var menu_element = document.getElementById(element_name);
      btn.innerHTML = menu_element.innerHTML;

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
      setFormulaText(prefix, btn.innerHTML);
    }
  }
}

function setFormulaText(prefix, measurement) {

    if(prefix == "e") {

      if(x_e_toggled == 0) units = e_items;
      else units = x_items;

      e_min = -1;
      e_max = -1;
      my_x_unit =  get_unit(units, measurement);
      var formula_text_6c = document.getElementById("formula_text_6c");
      formula_text_6c.innerHTML = my_x_unit;
      var formula_text_9 = document.getElementById("formula_text_9");
      formula_text_9.innerHTML = my_x_unit;
    }
    else if(prefix == "x") {

      if(x_e_toggled == 0) units = x_items;
      else units = e_items;

      x_min = -1;
      x_max = -1;
      my_y_unit =  get_unit(units, measurement);
      var formula_text_6b = document.getElementById("formula_text_6b");
      formula_text_6b.innerHTML = my_y_unit;
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
    var unit = document.getElementById(prefix + "_unit_text");
    unit.innerHTML = get_unit(units, measurement);

    var formula_text_2_1 = document.getElementById("formula_text_2_2");
    formula_text_2_1.innerHTML = "";
    e = -1;

    if(prefix.startsWith("x")) {
      var formula_text_1 = document.getElementById("formula_text_1");
      formula_text_1.innerHTML = measurement;
      var formula_text_2 = document.getElementById("formula_text_2");
      formula_text_2.innerHTML = measurement + '<sub>min</sub>';
      var formula_text_3 = document.getElementById("formula_text_3");
      formula_text_3.innerHTML = measurement + '<sub>max</sub>';
      var formula_text_4 = document.getElementById("formula_text_4");
      formula_text_4.innerHTML = measurement + '<sub>min</sub>';
      var formula_text_2_1 = document.getElementById("formula_text_2_1");
      formula_text_2_1.innerHTML = measurement;
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
  if (!event.target.matches('.dropbtn')) {
    var pic_elements = document.getElementsByClassName("pic_frame");
    pic_elements[0].style.zIndex="1";

    var diagram2_elements = document.getElementsByClassName("diagram_frame2");
    diagram2_elements[0].style.zIndex="1";

    handle_dropdown("x_button");
    handle_dropdown("y_button");

    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
