/*
 * ===========================================================================
 * File: Filter.js 
 * Author: Antonio Faienza
 * Desc: Layer rendering can be manipulated in precompose and postcompose event listeners. 
 * These listeners get an event with a reference to the Canvas rendering context. 
 * In this example, the postcompose listener applies a filter to the image data.
 * REF: https://openlayers.org/en/latest/examples/image-filter.html
 * ===========================================================================
 */


/**
 * Normalization of vector
 * 
 * @method normalize
 */
function normalize(kernel) {
  var len = kernel.length;
  var normal = new Array(len);
  var i, sum = 0;
  for (i = 0; i < len; ++i) {
    sum += kernel[i];
  }
  if (sum <= 0) {
    normal.normalized = false;
    sum = 1;
  } else {
    normal.normalized = true;
  }
  for (i = 0; i < len; ++i) {
    normal[i] = kernel[i] / sum;
  }
  return normal;
}


/**
 * Apply a convolution kernel to canvas.  This works for any size kernel, but
 * performance starts degrading above 3 x 3.
 * @param {CanvasRenderingContext2D} context Canvas 2d context.
 * @param {Array<number>} kernel Kernel.
 */
function convolve(context, kernel) {
  var canvas = context.canvas;
  var width = canvas.width;
  var height = canvas.height;

  var size = Math.sqrt(kernel.length);
  var half = Math.floor(size / 2);

  context.crossOrigin = "Anonymous";
  var inputData = context.getImageData(0, 0, width, height).data;

  var output = context.createImageData(width, height);
  var outputData = output.data;

  for (var pixelY = 0; pixelY < height; ++pixelY) {
    var pixelsAbove = pixelY * width;
    for (var pixelX = 0; pixelX < width; ++pixelX) {
      var r = 0, g = 0, b = 0, a = 0;
      for (var kernelY = 0; kernelY < size; ++kernelY) {
        for (var kernelX = 0; kernelX < size; ++kernelX) {
          var weight = kernel[kernelY * size + kernelX];
          var neighborY = Math.min(
            height - 1, Math.max(0, pixelY + kernelY - half));
          var neighborX = Math.min(
            width - 1, Math.max(0, pixelX + kernelX - half));
          var inputIndex = (neighborY * width + neighborX) * 4;
          r += inputData[inputIndex] * weight;
          g += inputData[inputIndex + 1] * weight;
          b += inputData[inputIndex + 2] * weight;
          a += inputData[inputIndex + 3] * weight;
        }
      }
      var outputIndex = (pixelsAbove + pixelX) * 4;
      outputData[outputIndex] = r;
      outputData[outputIndex + 1] = g;
      outputData[outputIndex + 2] = b;
      outputData[outputIndex + 3] = kernel.normalized ? a : 255;
    }
  }
  context.putImageData(output, 0, 0);
}