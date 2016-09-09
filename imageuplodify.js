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
    var thumbnails = [];

    /*
      


    */

    var dragbox = $("<div class='ctn'><i class='glyphicon glyphicon-plus add'></i><div class='img'><span>Drag your file(s) here...</span></div></div>");
    var icon = dragbox.find("i");
    var span = dragbox.find("span");


    icon.on("click", function onClick(event) {
      $(self).click();
    });

    const readingFile = (file) => {

      var fReader = new FileReader();

      fReader.onloadend = function (e) {
        var image = $("<div class='crop'><img><div>");
        image.find("img").attr("src", e.target.result);
        thumbnails.push(image);
        dragbox.find("span").hide();
        dragbox.find(".img").append(image);
      };
      fReader.readAsDataURL(file);
    };

    dragbox.on("drop", function onDrop(event) {
      console.log("Drop event");
      event.stopPropagation();
      event.preventDefault();
      var files = event.originalEvent.dataTransfer.files; // || event.originalEvent.target.files;
      
      for(var index = 0; index < files.length; ++index) {
        readingFile(files[index]);
      }
    });


    self.on("change", function() {
      console.log("Change event");
      var files = this.files;

      for(var index = 0; index < files.length; ++index) {
        readingFile(files[index]);
      }
    });

    this.hide();
    dragbox.insertAfter(this);

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