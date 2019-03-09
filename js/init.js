
/**
 * ===========================================================================
 * File: Init.js 
 * Author: Antonio Faienza
 * This file load all necessary for the correct executions of Javascript/Jquery
 * functions
 * ===========================================================================
 */

$(document).ready(function () {


  // setting the Chosen Plugin
  chosenPlugin();

  // retrieve result of query and then show into view
  refreshExperiments();

  // Setting navbar
  navbar();

  // Setting the sidebar
  sidebar();

  // The first function set the app: 
  // - Define layers 
  // - Define filter 
  // Then we Create for the first time the map
  settingMap();
  createMap(); 

  // destroy session
  logout();


  // Definition of view of Partials
  definePartialsMaps();
  definePartialsForms();
  definePartialsExperiments();
  definePartialsSettings();


  

  // Informations alerts
  $('.selected-informations').on("click", function (event) {
    event.preventDefault();
    bootbox.alert({
      message: "<span style='width: 100%; text-align: center'>" +
        "<img style='width: 150px; height: 150px;' src='../img/openlayersLogo.png'> </br>" +
        "<b>University of Bologna - Alma Mater Studiorum</b> </br>" +
        "Mobile Systems (MSc, Semester II) </br>" +
        "<i>Antonio Faienza</i>" +
        "</span>",
      backdrop: true,
    });
    return false;
  });

  /**
   * Search Experiment Form
   */
  $('#searchExperiment').on('submit', function (event) {
    event.preventDefault();

    var selectExperiment = $('#selectExperiment').chosen().val();
    for (var i = 0; i < selectExperiment.length; i++) {
      selectExperiment[i] = JSON.parse(selectExperiment[i])
    }
    experiments = selectExperiment;

    // get the active value from dropdown inside navbar
    var actualValueView = $('.selected-view.active').attr("value");   
    setMarkersView(actualValueView);

    // no experiment filter selected
    if (selectExperiment.length === 0) {      
      $("#selectExperiment option").each(function (index) {
        selectExperiment.push(JSON.parse($(this).val()));
      });
      experiments = selectExperiment;
      var actualValueView = $('.selected-view.active').attr("value");
      setMarkersView(actualValueView);
    }

    return false;
  });



});



/**
 * Config the Chosen Plugin
 * @method chosenPlugin
 */
function chosenPlugin() {

  var config = {
    '.chosen-select': {},
    '.chosen-select-deselect': { allow_single_deselect: true },
    '.chosen-select-no-single': { disable_search_threshold: 10 },
    '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
    '.chosen-select-rtl': { rtl: true },
    '.chosen-select-width': { width: '200%' }
  }
  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }
}



/**
 * This function add value to Chosen Plugin.
 * 
 * @param id - The id of element
 * @param value - the value that will be displayed on select
 * @method appendToChosen
 */
function appendToChosen(id, value) {
  $('#selectExperiment')
    .append($('<option></option>')
      .val(id)
      // .attr('selected', 'selected')
      .html(value)).trigger('chosen:updated');
}

/**
* Handle the Navbar
*/
function navbar() {
  // When click on the hamburger icon (Thanks the appropriate library) it open and close the 
  // sidebar
  $('#hambergerButton').click(function () {
    $(this).toggleClass('is-active');
    var checkClass = $("#hambergerButton").hasClass('is-active');
    if (checkClass) {
      // $("body").css("backgroundColor", "rgba(0,0,0,0.4)");
      $('#sidebar').toggleClass('active');


    } else {
      // $("body").css("backgroundColor", "white");
      $('#sidebar').toggleClass('active');


    }
  });

  var lastClickedFilter;
  var filter = $('.dropdown-menu').find('a');
  lastClickedFilter = filter;
  filter.click(function () {
    if (lastClickedFilter != undefined) {
      lastClickedFilter.removeClass('active');
    }
    $(this).addClass('active');
    lastClickedFilter = $(this);
  });
}


/**
 * Handle the Sidebar
 */
function sidebar() {
  var lastClicked;
  var a = $('.select-specific > li');
  lastClicked = a;
  a.click(function () {
    if (lastClicked !== undefined) {
      lastClicked.removeClass('active');
    }
    $(this).addClass('active');
    lastClicked = $(this);
  });
}


/**
 * This function define the view of Partials for differents map
 */
function definePartialsMaps() {

  // OSM
  $('#osm').click(function (event) {
    $.get('/map?map=OSM&type=osm').then(function (data) {
      $('#main').html(data);
    });
  });

  // HERE
  $('#normal-day').click(function (event) {
    $.get('/map?map=Here&type=normal.day').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#normal-day-transit').click(function (event) {
    $.get('/map?map=Here&type=normal.day.transit').then(function (data) {
      $('#main').html(data);
    });
  });


  $('#pedestrian-day').click(function (event) {
    $.get('/map?map=Here&type=pedestrian.day').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#terrain-day').click(function (event) {
    $.get('/map?map=Here&type=terrain.day').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#satellite-day').click(function (event) {
    $.get('/map?map=Here&type=satellite.day').then(function (data) {
      $('#main').html(data);
    });
  });



  $('#hybrid-day').click(function (event) {
    $.get('/map?map=Here&type=hybrid.day').then(function (data) {
      $('#main').html(data);
    });
  });

  // BING


  $('#aerial').click(function (event) {
    $.get('/map?map=Bing&type=Aerial').then(function (data) {
      $('#main').html(data);
    });
  });



  $('#aerial-with-labels').click(function (event) {
    $.get('/map?map=Bing&type=AerialWithLabels').then(function (data) {
      $('#main').html(data);
    });
  });



  $('#road').click(function (event) {
    $.get('/map?map=Bing&type=Road').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#road-on-demand').click(function (event) {
    $.get('/map?map=Bing&type=RoadOnDemand').then(function (data) {
      $('#main').html(data);
    });
  });

  // STAMEN  
  $('#watercolor').click(function (event) {
    $.get('/map?map=Stamen&type=watercolor').then(function (data) {
      $('#main').html(data);
    });
  });

  $('#toner').click(function (event) {
    $.get('/map?map=Stamen&type=toner').then(function (data) {
      $('#main').html(data);
    });
  });


  $('#toner-lite').click(function (event) {
    $.get('/map?map=Stamen&type=toner-lite').then(function (data) {
      $('#main').html(data);
    });
  });


  $('#terrain').click(function (event) {
    $.get('/map?map=Stamen&type=terrain').then(function (data) {
      $('#main').html(data);
    });
  });

  // DEBUG
  // $('#debug').click(function (event) {      
  //   $.get('/map?map=Debug&type=debug').then(function (data) {     
  //     $('#main').html(data);
  //   });    
  // });



}


/**
 * This function define the view of Partials for different Form
 */
function definePartialsForms() {

  // Add new User
  $('#add-new-user').click(function (event) {
    $.get('/adduser').then(function (data) {
      $('#main').html(data);
    });
  });


  // Update Existing User
  $('#update-user').click(function (event) {
    $.get('/updateuser').then(function (data) {
      $('#main').html(data);
    });
  });

  // Delete Existing User
  $('#delete-user').click(function (event) {
    $.get('/deleteuser').then(function (data) {
      $('#main').html(data);
    });
  });

  // Show all Users
  $('#show-user').click(function (event) {
    $.get('/showuser').then(function (data) {
      $('#main').html(data);
    });
  });
};

/**
 * Execute logout
 */
function logout(){
  $('#makeLogout').click(function(event){
    $('#logout').submit();    
  });
}



/**
 * This function define the view of Partials Experiment
 */
function definePartialsExperiments() {
  // Add new Experiment
  $('#add-new-experiment').click(function (event) {
    $.get('/addexperiment').then(function (data) {
      $('#main').html(data);
    });
  });


  // Update Existing Experiment
  $('#update-experiment').click(function (event) {
    $.get('/updateexperiment').then(function (data) {
      $('#main').html(data);
    });
  });

  // Delete Existing Experiment
  $('#delete-experiment').click(function (event) {
    $.get('/deleteexperiment').then(function (data) {
      $('#main').html(data);
    });
  });

  // Show All Experiment
  $('#show-experiment').click(function (event) {
    $.get('/showexperiment').then(function (data) {
      $('#main').html(data);
    });
  });
}

/**
 * This function define the view of Partials Setting
 */
function definePartialsSettings(){
  
  // Define Setting Markers
  $('#setting-markers').click(function (event) {
    $.get('/settingMarkers').then(function (data) {
      $('#main').html(data);
    });
  });

  // Define Partials of Configuration Metrics
  $('#setting-metrics').click(function (event) {
    $.get('/settingMetrics').then(function (data) {
      $('#main').html(data);
    });
  });
}

/**
 * Define a value of Search Bar using Chose Plugin. In this context
 * there is a AJAX call to the server that retrieve the value 
 * of experiment. Then we appen the reult to Search Bar
 * 
 * @method getExperiments
 */
function getExperiments() {

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/getexperiments',
      method: 'GET',
      success: function (res) {       
          resolve(res);       
      },
      error: function (err) {
        bootstrapAlert(err, "Error", "danger", false);
      }
    });
  });
}


function refreshExperiments() {
  // Define value of Search Bar using Chosen Plugin
  // getExperiments();
  queryExperiments().then(function (exp) {

    experiments = exp;

    if(exp.length > 0){
      $('#selectExperiment').empty();
    }else{
      $('#selectExperiment').empty();
      $('#selectExperiment').trigger("chosen:updated");
    }
    
    $.each(exp, function (index, element) {
      // the value will be JSON String
      appendToChosen(JSON.stringify(element), element.name);

    });

    // select the correct markers
    var actualValueView = $('.selected-view.active').attr("value");
    setMarkersView(actualValueView);

    

  });
}

function queryExperiments() {
  return getExperiments();
}