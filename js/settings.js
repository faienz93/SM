$(document).ready(function () {

    var intervalSegmentPDR = ['pdr-x0x1-color', 'pdr-x1x2-color', 'pdr-x2x3-color', 'pdr-x3x4-color'];
    var pdr_slider_string = $('#PDR-slider');
    // is a div. Therefore for access to the value, you can use the "attr" method
  
    var pdr_slider_json =  $.parseJSON(pdr_slider_string.attr('value'));
    console.log(pdr_slider_string.attr('value'));
    // console.log(pdr_slider_json);
  
  
   
    var color = [];
    var threashold = [];
    $.each(pdr_slider_json, function(key_interval, interval) {
      $.each(interval, function(k, v) {
        if(v.color!=undefined) color.push(v.color);
        if(v.threashold!=undefined)  threashold.push(v.threashold);     
      });
    });
  
    var palettePDR = $('.setting-color');  
  
    /**
     * Using HTML5 input elements
     * REF: https://refreshless.com/nouislider/examples/#section-html5
     */
    var inputNumberPDR = $('.PDR-segment-value');
  
    // TODO aggiunger threashold
    var slider = createSlider('#PDR-slider', color, threashold, palettePDR, inputNumberPDR, intervalSegmentPDR);

});


function createSlider(inputSlider, defaultValue, threashold, palette, inputNumber, intervalSegment){      

    var slider = $(inputSlider);
    
     /**
     * TODO gli start devono essere letti da database
     */
    noUiSlider.create(slider[0], {
        start: threashold, 
        connect: [true, true, true, true],
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 3
        }),
        pips: { mode: 'count', values: 5 },
        tooltips: true
    });
  
    /**
     * Add color to segment 
     * https://refreshless.com/nouislider/examples/#section-colored-connect
     */
    var connect = slider[0].querySelectorAll('.noUi-connect');
    for (var i = 0; i < connect.length; i++) {
        connect[i].classList.add(intervalSegment[i]);
    }  
  
    /**
     * ***************************************************
     * TODO qui deve legere il colore dal database
     * ***************************************************
     */
    for(var i = 0; i < intervalSegment.length; i++){
        $('.'+intervalSegment[i]).css("background",defaultValue[i])
    }  

    /**
     * UPDATE COLOR
     */
    palette.on('change', function (i) {
       
        console.log(this.value);
        var index = palette.index(this);      
        $('.'+intervalSegment[index]).css("background",this.value)
    });
  
  
    slider[0].noUiSlider.on('update', function (values, handle) {

        // cycle all input number with the same class
        [].slice.call(inputNumber).forEach(function (obj, index) {
  
            if (handle == index) {
                var value = values[handle];
                obj.value = value;
            }
        });
  
    });
  
    inputNumber.on('change', function (i) {        
        var index = inputNumber.index(this);    
        if(index===0){
            slider.noUiSlider.set([this.value, null,null]);
        }else if (index === 1){
            slider.noUiSlider.set([null, this.value, null]);
        }else if(index == 2){
            slider.noUiSlider.set([null, null, this.value]);
        }
        
    });   
  
    return slider;
  }