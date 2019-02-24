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
var globalMap;

/**
 * Array of Experiments
 */
var experiments = [];

/**
 * LONGITUDE - LATITUDE of BOLOGNA
 */
var initialCoordinatesMap = [11.327591, 44.498955];  

/**
 * Array that contains all layers
 */
var groupsMap = [];

/**
 * Markers Slider Value
 */

var sliderCluster; 
var sliderHeatmapRadius;
var sliderHeatmapBlur;

/**
 * Metrics slider value
 */
var sliderPDR; 
var intervalSegmentPDR = ['pdr-x0x1-color', 'pdr-x1x2-color', 'pdr-x2x3-color', 'pdr-x3x4-color'];

var sliderDelay; 
var intervalSegmentDelay = ['delay-x0x1-color', 'delay-x1x2-color', 'delay-x2x3-color', 'delay-x3x4-color'];

var sliderThroughput; 
var intervalSegmentThroughput = ['throughput-x0x1-color', 'throughput-x1x2-color', 'throughput-x2x3-color', 'throughput-x3x4-color'];

/**
 * Key for use Bing Map
 * Your Bing Maps Key from http://www.bingmapsportal.com/ here
 */
var KEY_BING = 'ApzktDln-AM3Y2dIraRcxlKXiQwFmIOgrAZAO5ArG1pnynfl2rzoM61YXmAwxWuc';

/**
 * Jey for use Here WeGO Maps
 * Your Here Maps key from https://developer.here.com/
 */
var appId = '3LeDvRPCXiNLMRHsJWKS';
var appCode = 'w5aqGLGSlSUouTQ1p7Fjug';

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

/**
 * Define Stamen Map Layers
 */
var stamenStyles = [
  'watercolor',
  'toner',
  'toner-lite',
  'terrain',
  'terrain-labels'
];

/**
 * Define Here Map Layers
 */
var hereStyles = [
  {
    base: 'base',
    type: 'maptile',
    scheme: 'normal.day',
    app_id: appId,
    app_code: appCode
  },
  {
    base: 'base',
    type: 'maptile',
    scheme: 'normal.day.transit',
    app_id: appId,
    app_code: appCode
  },
  {
    base: 'base',
    type: 'maptile',
    scheme: 'pedestrian.day',
    app_id: appId,
    app_code: appCode
  },
  {
    base: 'aerial',
    type: 'maptile',
    scheme: 'terrain.day',
    app_id: appId,
    app_code: appCode
  },
  {
    base: 'aerial',
    type: 'maptile',
    scheme: 'satellite.day',
    app_id: appId,
    app_code: appCode
  },
  {
    base: 'aerial',
    type: 'maptile',
    scheme: 'hybrid.day',
    app_id: appId,
    app_code: appCode
  }
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

