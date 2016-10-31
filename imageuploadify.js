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
 
  // Prevent issues about browser opening file by drop.
  window.addEventListener("dragover", function(e) {
    e = e || event;
    e.preventDefault();
  }, false);

  window.addEventListener("drop", function(e) {
    e = e || event;
    e.preventDefault();
  }, false);

  // Define the plugin.
  $.fn.imageuploadify = function(opts) {

    // Override default option with user's if exist.
    const settings = $.extend( {}, $.fn.imageuploadify.defaults, opts);

    // Initialize every element.
    this.each(function() {
      // Save the current element to self to avoid conflict.
      const self = this;

      console.log(self);

      // Define the dragbox layout.
      let dragbox = $(`
      <div class="well">
        <div class="overlay">
        <i class="fa fa-picture-o"></i>
        </div>
        <div class="images-list text-center">
          <i class="fa fa-cloud-upload"></i>
          <span>Drag & Drop Your File(s) Here To Upload</span>
          <button type="button" class="btn btn-default">or select file to upload</button>
        </div>
      </div>
      `);

      // Save all elements of the dragbox.
      let overlay = dragbox.find(".overlay");
      let uploadIcon = dragbox.find(".overlay i");

      let imagesList = dragbox.find(".images-list");
      let addIcon = dragbox.find(".images-list i");
      let addMsg = dragbox.find(".images-list span");
      let button = dragbox.find(".images-list button");

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
      dragbox.css("color", "#3AA0FF");

      // Overlay CSS
      overlay.css("z-index", "10");
      overlay.css("width", "100%");
      overlay.css("height", "100%");
      overlay.css("position", "absolute");
      overlay.css("flex-direction", "column");
      overlay.css("top", "0");
      overlay.css("left", "0");
      overlay.css("display", "none");
      overlay.css("font-size", "7em");
      overlay.css("background-color", "rgba(242, 242, 242, 0.7)");
      overlay.css("text-align", "center");
      overlay.css("pointer-events", "none");

      uploadIcon.css("z-index", "10");
      uploadIcon.css("position", "absolute");
      uploadIcon.css("top", "50%");
      uploadIcon.css("left", "50%");
      uploadIcon.css("transform", "translate(-50%, -50%)");
      uploadIcon.css("pointer-events", "none");

      // Image list CSS
      imagesList.css("display", "inline-block");

      // Add icon CSS
      addIcon.css("display", "block");
      addIcon.css("font-size", "7em");
      addIcon.css("text-align", "center");
      addIcon.css("margin-top", "0.6em");
      addIcon.css("padding-bottom", "12px");


      addMsg.css("font-size", "1.7em");
      addMsg.css("border-top", "1px solid #3AA0FF");
      addMsg.css("border-bottom", "1px solid #3AA0FF");
      addMsg.css("padding", "10px");

      button.css("display", "block");
      button.css("color", "#3AA0FF");
      button.css("border-color", "#3AA0FF");
      button.css("border-radius", "1em");
      button.css("margin", "25px auto");

      // Define the function to read a file.
      const readingFile = (file) => {
        const fReader = new FileReader();
        let container = $("<div></div>");

        container.css("width", "100px");
        container.css("height", "100px");
        container.css("position", "relative");
        container.css("overflow", "hidden");
        container.css("margin-left", "1em");
        container.css("margin-bottom", "1em");
        container.css("float", "left");
        container.css("border-radius", "12px");
        container.css("box-shadow", "0 0 4px 0 #888888");

        if (file.type && file.type.search(/image/) != -1) {
          // Associated function to a ending load
          fReader.onloadend = function (e) {
            let image = $("<img>");

            // Image CSS
            image.css("height", "100px");
            image.css("left", "50%");
            image.css("position", "absolute");
            image.css("top", "50%");
            image.css("transform", "translate(-50%, -50%)");
            image.css("width", "auto");

            // Paste the image source to display the image preview.
            image.attr("src", e.target.result);
            container.append(image);
            imagesList.append(container);

            imagesList.find(":nth-child(4n+4)").css("margin-left", "1.9em"); 
            imagesList.find(":nth-child(4n+7)").css("margin-right", "1.9em");
          };

        }
        else if (file.type) {

          let type = "<i class='fa fa-file'></i>";

          if (file.type.search(/audio/) != -1) {
            type = "<i class='fa fa-file-audio-o'></i>";
          }
          else if (file.type.search(/video/) != -1) {
            type = "<i class='fa fa-file-video-o'></i>"; 
          }

          // Associated function to a ending load
          fReader.onloadend = function (e) {
            let span = $("<span>" + type + "</span>");

            span.css("font-size", "5em");

            container.append(span);
            imagesList.append(container);

            imagesList.find(":nth-child(4n+4)").css("margin-left", "1.9em"); 
            imagesList.find(":nth-child(4n+7)").css("margin-right", "1.9em");
          };
        }


        fReader.readAsDataURL(file);
      };

      // Manage click event.
      button.on("click", function onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        $(self).click();
      });

      button.mouseenter(function onMouseEnter(event) {
        button.css("background", "#3AA0FF").css("color", "white");
      }).mouseleave(function onMouseLeave() {
        button.css("background", "white").css("color", "#3AA0FF");
      });

      // Manage events to display an overlay when dragover files.
      dragbox.on("dragenter", function onDragenter(event) {
        event.stopPropagation();
        event.preventDefault();

        overlay.css("display", "flex");
        dragbox.css("border-color", "#3AA0FF");

        // Enable back pointer events to capture click, hover...
        button.css("pointer-events", "none");
        addMsg.css("pointer-events", "none");
        addIcon.css("pointer-events", "none");
        imagesList.css("pointer-events", "none");
      });

      dragbox.on("dragexit", function onDragexit(event) {
        event.stopPropagation();
        event.preventDefault();

        overlay.css("display", "none");
        dragbox.css("border-color", "rgb(210, 210, 210)");

        // Disable pointer events to avoid miscapture dragexit children's events. 
        button.css("pointer-events", "initial");
        addMsg.css("pointer-events", "initial");
        addIcon.css("pointer-events", "initial");
        imagesList.css("pointer-events", "initial");
      });

      // Manage events when dropping files.
      dragbox.on("drop", function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        overlay.css("display", "none");
        dragbox.css("border-color", "rgb(210, 210, 210)");

        // Enable back pointer events to capture click, hover...
        button.css("pointer-events", "initial");
        addMsg.css("pointer-events", "initial");
        addIcon.css("pointer-events", "initial");
        imagesList.css("pointer-events", "initial");

        const files = event.originalEvent.dataTransfer.files;
        
        for(let index = 0; index < files.length; ++index) {
          readingFile(files[index]);
        }
      });

      $(self).on("change", function onChange() {
        const files = this.files;

        for(let index = 0; index < files.length; ++index) {
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
  $.fn.imageuploadify.defaults = {

  };

}(jQuery, window, document));