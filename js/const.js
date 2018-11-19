/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza
 * Desc: This scritp is module that define the constant that can be called 
 * from other file 
 * https://stackoverflow.com/questions/130396/are-there-constants-in-javascript 
 * ===========================================================================
 */

 /**
  * Global Map
  */
 var map;

 /**
  * Key for use Bing Map
  * Your Bing Maps Key from http://www.bingmapsportal.com/ here
  */
var KEY_BING = 'ApzktDln-AM3Y2dIraRcxlKXiQwFmIOgrAZAO5ArG1pnynfl2rzoM61YXmAwxWuc';

/**
 * Define an Bing Style Array
 */
var bingStyles = [
    'Road',
    'RoadOnDemand',
    'Aerial',
    'AerialWithLabels',
    'collinsBart',
    'ordnanceSurvey'
  ];


  var kernels = {
    none: [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0
    ],
    sharpen: [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ],
    sharpenless: [
      0, -1, 0,
      -1, 10, -1,
      0, -1, 0
    ],
    blur: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ],
    shadow: [
      1, 2, 1,
      0, 1, 0,
      -1, -2, -1
    ],
    emboss: [
      -2, 1, 0,
      -1, 1, 1,
      0, 1, 2
    ],
    edge: [
      0, 1, 0,
      1, -4, 1,
      0, 1, 0
    ]
  };

