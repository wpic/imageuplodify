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
    const settings = $.extend( {}, $.fn.imageuplodify.defaults, opts);

    // Initialize every element.
    this.each(function() {

      const self = this;

      let dragbox = $(`
      <div class="well">
        <div class="overlay">
          <span class="panel panel-default"><i class="glyphicon glyphicon-cloud-upload"></i> Drop to upload</span>
        </div>
        <div class="images-list text-center">
          <i class="glyphicon glyphicon-plus"></i>
          <span>Drag your file(s) here...</span>
        </div>
      </div>
      `);

      let overlay = dragbox.find(".overlay");
      let uploadIcon = dragbox.find(".overlay span i");
      let uploadMsg = dragbox.find(".overlay span");

      let imagesList = dragbox.find(".images-list");
      let addIcon = dragbox.find(".images-list i");
      let addMsg = dragbox.find(".images-list span");

      // Dropbox CSS
      dragbox.css("border", "2px dashed rgb(210, 210, 210)");
      dragbox.css("position", "relative");
      dragbox.css("min-height", "350px");
      dragbox.css("width", "500px");
      dragbox.css("display", "flex");
      dragbox.css("padding", "0px");
      dragbox.css("flex-direction", "column");
      dragbox.css("text-align", "center");
      dragbox.css("background-color", "white");

      // Overlay CSS
      overlay.css("z-index", "10000");
      overlay.css("width", "100%");
      overlay.css("height", "100%");
      overlay.css("position", "absolute");
      overlay.css("flex-direction", "column");
      overlay.css("top", "0");
      overlay.css("left", "0");
      overlay.css("display", "none");
      overlay.css("background-color", "rgba(242, 242, 242, 0.7)");
      overlay.css("text-align", "center");

      // Uploading message CSS
      // uploadMsg.css("background-color", "rgba(30, 30, 30, 0.5)");
      uploadMsg.css("height", "100px");
      uploadMsg.css("margin", "auto");
      uploadMsg.css("padding-top", "29px");
      uploadMsg.css("width", "200px");
      uploadMsg.css("font-size", "1.1em");

      // Image list CSS
      imagesList.css("display", "inline-block");

      // Add icon CSS
      addIcon.css("display", "block");
      addIcon.css("font-size", "3em");
      addIcon.css("text-align", "center");
      addIcon.css("margin-top", "3em");
      addIcon.css("padding-bottom", "20px");


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
          image.css("border", "inset 0px 0px 40px 40px rgba(186, 235, 245, 1)");

          image.attr("src", e.target.result);
          addMsg.hide();
          imagesList.append(imageCtn);

          imagesList.find(":nth-child(4n+3)").css("margin-left", "1.7em"); 
          imagesList.find(":nth-child(4n+6)").css("margin-right", "1.7em");
        };

        fReader.readAsDataURL(file);
      };

      // Manage click event.
      addIcon.on("click", function onClick(event) {
        $(self).click();
      });

      dragbox.on("dragenter", function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        overlay.css("display", "flex");
      });

      dragbox.on("dragexit", function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        overlay.css("display", "none");
      });

      dragbox.on("dragleave", function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        overlay.css("display", "none");
      });

      dragbox.on("drop", function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        addIcon.css("margin-top", "1em");
        overlay.css("display", "none");

        var files = event.originalEvent.dataTransfer.files;
        
        for(var index = 0; index < files.length; ++index) {
          readingFile(files[index]);
        }
      });


      $(self).on("change", function() {
        var files = this.files;

        for(var index = 0; index < files.length; ++index) {
          readingFile(files[index]);
        }
      });

      $(self).hide();
      dragbox.insertAfter(this);

    });

    // Return "this" to ensure that chaining methods can be called.
    return this;
  };


  // Default configuraiton of the plugin.
  $.fn.imageuplodify.defaults = {

  };

}(jQuery, window, document));