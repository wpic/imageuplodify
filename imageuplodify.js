/*!
 * Imageuploadify - jQuery plugin
 * Allow to change input file to a box allowing drag'n drop and preview images before
 * updloading them.
 */

// Semi-colon to protect against concatened scripts, etc...
// Ensure that $ is referencing to jQuery.
// window and document to slightly quicken the process.
// To be sure that undefined is truly undefined (For ES3)
;(function($, window, document, undefined) {

  /*
  Options:
  - Submit (auto, manual, form (default))

  */
 
  window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
  },false);

  window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
  },false);

  // Define the plugin.
  $.fn.imageuplodify = function(opts) {

    // Override default option with user's if exist.
    var settings = $.extend( {}, $.fn.imageuplodify.defaults, opts);
    var self = this;

    /* TEST */
    function drag(event) {
      event.dataTransfer.setData("text", event.target.id);
    }

    function previewFile(input) {
      if (input.files && input.files[0]) {
        var fReader = new FileReader();
        reader.onload = function(e) {
          // Disable the writing span...
          // Create element with the image and append it to the code.
        }
      }
    }

    var dragbox = $("<div><i class='glyphicon glyphicon-plus'></i><span>Drag your file(s) here...</span></div>");
    var icon = dragbox.children("i");
    var span = dragbox.children("span");

    /*
    icon.on("click", function onClick(event) {
      console.log("Click icon");
      $(self).click();
    });
    */
   
    dragbox.on("drop", function onDrop(event) {
      console.log("plop");  
      event.stopPropagation();
      event.preventDefault();
      var files = event.originalEvent.dataTransfer.files; // || event.originalEvent.target.files;
      var thumbnails = [];
      var fReader = new FileReader();
      fReader.onload = function (e) {
        var image = $("<img height='100' width='100'>");
        image.attr("src", e.target.result);
        thumbnails.push(image);
      };

      for(var index = 0; index <= files.length; ++index) {
        fReader.readAsDataURL(file);
      }

      dragbox.children("span").replaceWith(thumbnails);
    });

    this.replaceWith(dragbox);

    /* END TEST */

    // Initialize every element.
    /*
    this.each(function() {


    });
    */
   
    // Return "this" to ensure that chaining methods can be called.
    return this;
  };


  // Default configuraiton of the plugin.
  $.fn.imageuplodify.defaults = {

  };

}(jQuery, window, document));