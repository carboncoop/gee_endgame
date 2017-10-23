var gen_min = 10.;
var cost_budget = 10.;
var co2_budget = 10.;

var game_params = {
  "wind": {
    "gen": 1,
    "cost": 0.6,
    "co2": 0.12
  },
  "solarPV": {
    "gen": 1,
    "cost": 0.8,
    "co2": 0.48
  },
  "hydro": {
    "gen": 1,
    "cost": 1.5,
    "co2": 0.24
  },
  "gas": {
    "gen": 1,
    "cost": 0.7,
    "co2": 4.9
  },
  "tidal": {
    "gen": 1,
    "cost": 0.9,
    "co2": 0.2
  },
  "coal": {
    "gen": 1,
    "cost": 1.3,
    "co2": 8
  },
  "biomass": {
    "gen": 1,
    "cost": 0.7,
    "co2": 2.3
  },
  "smartGrids": {
    "gen": -1,
    "cost": 2,
    "co2": 0
  },
  "smartMeters": {
    "gen": -1,
    "cost": 1,
    "co2": 0
  },
  "energyEfficiency": {
    "gen": -1,
    "cost": 1,
    "co2": 0
  }
};

var totals = {
  "wind": 0,
  "solarPV": 0,
  "hydro": 0,
  "gas": 0,
  "tidal": 0,
  "coal": 0,
  "biomass": 0,
  "smartGrids": 0,
  "smartMeters": 0,
  "energyEfficiency": 0
};

var increment = function(name, totals) {
  totals[name] += 1;
  return totals[name];
};

var decrement = function(name, totals) {
  totals[name] -= 1;
  return totals[name];
};

var reset_totals = function(totals) {
  for (gen_type in totals.keys()) {
    totals[gen_type] = 0;
  }
  return;
};

var evaluate = function(game_params, totals) {
  var gen = 0;
  var cost = 0;
  var co2 = 0;
  $('#gen_success').hide();
  $('#gen_failure_low').hide();
  $('#gen_failure_high').hide();
  $('#co2_success').hide();
  $('#co2_failure').hide();
  $('#cost_success').hide();
  $('#cost_failure').hide();

  for (var key in totals) {
    gen += totals[key] * game_params[key]["gen"];
    cost += totals[key] * game_params[key]["cost"];
    co2 += totals[key] * game_params[key]["co2"];
  }

  if (gen < gen_min) {
    $('#gen_failure_low').show();
  } else if (gen > gen_min) {
    $('#gen_failure_high').show();
  } else {
    $('#gen_success').show();
  }

  if (cost < cost_budget) {
    $('#cost_success').show();
  } else {
    $('#cost_failure').show();
  }

  if (co2 < co2_budget) {
    $('#co2_success').show();
  } else {
    $('#co2_failure').show();
  }

};

$(function() {

  evaluate(game_params, totals);

  $.each(game_params, function(key, value) {
    $("#" + key + "-dd li a").click(function() {

      $(this).parents(".btn-group").find('.selection').text($(this).text());
      $(this).parents(".btn-group").find('.selection').val($(this).text());
      totals[key] = number($(this).text());
      evaluate(game_params, totals);

    })
  });

  $.each(game_params, function(key, value) {
    $("#" + key + "-up").click(function() {
      var total = totals[key]

      $(this).parents(".btn-group").find('.selection').text(increment(key, totals));

      evaluate(game_params, totals);

    })
  });

  $.each(game_params, function(key, value) {
    $("#" + key + "-down").click(function() {
      var total = totals[key]
      if (total >= 1) {
        $(this).parents(".btn-group").find('.selection').text(decrement(key, totals));
      }
      evaluate(game_params, totals);

    })
  });

});
