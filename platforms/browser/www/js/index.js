
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
var my_unit = "";


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

    var result = +x_min + +(x_max-x_min)/(e_max-e_min)*(e-e_min);
    result = parseFloat(result).toFixed(4);
    result = result.replace(".", ",");
    resultText.innerHTML = result + " " + my_unit;
  }
  else {
    resultText.innerHTML = "";
  }
}

function toggle_z() {
  var pic_elements = document.getElementsByClassName("pic_frame");
  if(pic_elements[0].style.zIndex == -1) {
    pic_elements[0].style.zIndex = 1;
  }
  else {
    pic_elements[0].style.zIndex = "-1";
  }
  var pic_elements2 = document.getElementsByClassName("diagram_frame2");
  if(pic_elements2[0].style.zIndex == -1) {
    pic_elements2[0].style.zIndex = 1;
  }
  else {
    pic_elements2[0].style.zIndex = "-1";
  }
}

function min_max_changed(name, val) {
  var show;
  var valtext = "" + val;
  valtext = valtext.replace(".", ",");

  if(name.startsWith("x_min")) {
    x_min = val;
    show = document.getElementById('formula_text_2');
    show.innerHTML = valtext;
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
      if(element_name.startsWith("x_button")) {
        prefix = "e";
        units = e_items;
        e_min = -1;
        e_max = -1;
      }
      else if(element_name.startsWith("y_button")) {
        prefix = "x";
        units = x_items;
        x_min = -1;
        x_max = -1;
        my_unit =  get_unit(units, menu_element.innerHTML);
      }
      var max_input = document.getElementById(prefix + "_max_main_input");
      var max_text = document.getElementById(prefix + "_max_main_text");
      max_text.innerHTML = menu_element.innerHTML + '<sub>max</sub>';
      max_text.style.display = "block";
      max_input.value = "";

      var min_input = document.getElementById(prefix + "_min_main_input");
      var min_text = document.getElementById(prefix + "_min_main_text");
      min_text.innerHTML = menu_element.innerHTML + '<sub>min</sub>';
      min_text.style.display = "block";
      min_input.value = "";
      var unit = document.getElementById(prefix + "_unit_text");
      unit.innerHTML = get_unit(units, menu_element.innerHTML);


      var formula_text_2_1 = document.getElementById("formula_text_2_2");
      formula_text_2_1.innerHTML = "";
      e = -1;

      if(prefix.startsWith("x")) {
        var formula_text_1 = document.getElementById("formula_text_1");
        formula_text_1.innerHTML = menu_element.innerHTML;
        var formula_text_2 = document.getElementById("formula_text_2");
        formula_text_2.innerHTML = menu_element.innerHTML + '<sub>min</sub>';
        var formula_text_3 = document.getElementById("formula_text_3");
        formula_text_3.innerHTML = menu_element.innerHTML + '<sub>max</sub>';
        var formula_text_4 = document.getElementById("formula_text_4");
        formula_text_4.innerHTML = menu_element.innerHTML + '<sub>min</sub>';
        var formula_text_2_1 = document.getElementById("formula_text_2_1");
        formula_text_2_1.innerHTML = menu_element.innerHTML;
      }
      else if (prefix.startsWith("e")) {
        var formula_text_5 = document.getElementById("formula_text_5");
        formula_text_5.innerHTML = menu_element.innerHTML + '<sub>max</sub>';
        var formula_text_6 = document.getElementById("formula_text_6");
        formula_text_6.innerHTML = menu_element.innerHTML + '<sub>min</sub>';
        var formula_text_7 = document.getElementById("formula_text_7");
        formula_text_7.innerHTML = menu_element.innerHTML;
        formula_text_7.style.display = "block";
        var e_main_input = document.getElementById("e_main_input");
        e_main_input.value = "";
        var formula_text_8 = document.getElementById("formula_text_8");
        formula_text_8.innerHTML = menu_element.innerHTML + '<sub>min</sub>';
      }
    }
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
