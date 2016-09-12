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

    var dragbox = $(`
    <div>
      <i class='glyphicon glyphicon-plus'></i>
      <div>
        <span>Drag your file(s) here...</span>
      </div>
    </div>
    `);
    var icon = dragbox.find("i");
    var imagesList = dragbox.find("div");
    var span = dragbox.find("span");

    // Dropbox CSS
    dragbox.css("border", "2px dashed");
    dragbox.css("min-height", "350px");
    dragbox.css("text-align", "center");
    dragbox.css("width", "500px");
    dragbox.css("display", "flex");
    dragbox.css("flex-direction", "column");
    dragbox.css("justify-content", "350px");
    dragbox.css("background-color", "rgba(242, 242, 242, 0.7)");

    // Add icon CSS
    icon.css("display", "block !important");
    icon.css("font-size", "3em");
    icon.css("text-align", "center");
    icon.css("margin-top", "1em");

    // Image list CSS
    imagesList.css("display", "inline-block");
    imagesList.css("padding", "1em 0");
    dragbox.find("div div:nth-child(4n+1)").css("margin-right", "1.5em");
    dragbox.find("div div:nth-child(4n+2)").css("margin-left", "1.5em");    


    const readingFile = (file) => {

      var fReader = new FileReader();

      // Associated function to a ending load
      fReader.onloadend = function (e) {
        var imageCtn = $("<div><img><div>");
        var image = imageCtn.find("img");

        // Image container CSS
        imageCtn.css("width", "100px");
        imageCtn.css("height", "100px");
        imageCtn.css("position", "relative");
        imageCtn.css("overflow", "hidden");
        imageCtn.css("margin-left", "1em");
        imageCtn.css("margin-bottom", "1em");
        imageCtn.css("float", "left");
        imageCtn.css("border-radius", "1em");

        // Image CSS
        image.css("height", "100px");
        image.css("left", "50%");
        image.css("position", "absolute");
        image.css("top", "50%");
        image.css("transform", "translate(-50%, -50%)");
        image.css("width", "auto");

        image.attr("src", e.target.result);
        span.hide();
        imagesList.append(imageCtn);
      };

      fReader.readAsDataURL(file);
    };

    // Manage click event.
    icon.on("click", function onClick(event) {
      $(self).click();
    });

    dragbox.on("dragenter", function onDrop(event) {

      // TODO: Debug log.
      console.log("Dragenter event");

      event.stopPropagation();
      event.preventDefault();

      // Montrer la fenetre et les autres elements.

    });

    dragbox.on("dragleave", function onDrop(event) {

      // TODO: Debug log.
      console.log("Dragleave event");

      event.stopPropagation();
      event.preventDefault();

      // Cacher la fenetre et les autres elements.

    });

    dragbox.on("drop", function onDrop(event) {

      // TODO: Debug log.
      console.log("Drop event");

      event.stopPropagation();
      event.preventDefault();
      var files = event.originalEvent.dataTransfer.files; // || event.originalEvent.target.files;
      
      for(var index = 0; index < files.length; ++index) {
        readingFile(files[index]);
      }
    });


    self.on("change", function() {

      // TODO: Debug log.
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