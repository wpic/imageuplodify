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
 
  // Prevent issues about browser opening file by dropping it.
  window.addEventListener("dragover", function(e) {
    e = e || event;
    e.preventDefault();
  }, false);
  window.addEventListener("drop", function(e) {
    e = e || event;
    e.preventDefault();
  }, false);


  // Define the plugin imageuploadify.
  $.fn.imageuploadify = function(opts) {

    // Override default option with user's if exist.
    const settings = $.extend( {}, $.fn.imageuploadify.defaults, opts);

    // Initialize every element.
    this.each(function() {
      // Save the current element to self to avoid conflict.
      const self = this;
      // Array containing all files add by dialog box or drag'n drop.
      let totalFiles = [];
      // Count the number of time a "dragenter" enter the box.
      let counter = 0;

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
      dragbox.css("min-width", "250px");
      dragbox.css("max-width", "1000px");
      dragbox.css("margin", "auto");
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

      // Upload icon CSS
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
      addIcon.css("margin-top", "0.5em");
      addIcon.css("padding-bottom", "12px");

      // Add message CSS
      addMsg.css("font-size", "24px");
      addMsg.css("border-top", "1px solid #3AA0FF");
      addMsg.css("border-bottom", "1px solid #3AA0FF");
      addMsg.css("padding", "10px");
      addMsg.css("display", "inline-block");

      // Open dialog box button CSS
      button.css("display", "block");
      button.css("color", "#3AA0FF");
      button.css("border-color", "#3AA0FF");
      button.css("border-radius", "1em");
      button.css("margin", "25px auto");
      button.css("width", "100%");
      button.css("max-width", "500px");


      // Define the function to read a file.
      const readingFile = (file) => {
        const fReader = new FileReader();

        // Compute the number of box that could fit in the dragbox and the
        // margin according to it.
        const width = dragbox.width();
        const boxesNb = Math.floor(width / 100);
        const marginSize = Math.floor((width - (boxesNb * 100)) / (boxesNb + 1));

        // Create the preview file container box.
        let container = $("<div class='containerBox'></div>");

        // Preview file container box CSS
        container.css("width", "100px");
        container.css("height", "100px");
        container.css("position", "relative");
        container.css("overflow", "hidden");
        container.css("margin-left", marginSize + "px");
        container.css("margin-bottom", "1em");
        container.css("float", "left");
        container.css("border-radius", "12px");
        container.css("box-shadow", "0 0 4px 0 #888888");

        // If the given file in the parameter is an image.
        if (file.type && file.type.search(/image/) != -1) {
          // Associated function to a ending load
          fReader.onloadend = function (e) {
            // Create the image tag for preview.
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
            // Append the image to its container and then the container to the
            // list of files.
            container.append(image);
            imagesList.append(container);

            // Apply left margin to first container of each row and right to last.
            imagesList.find(".containerBox:nth-child(" + boxesNb + "n+4)").css("margin-left", marginSize + "px");
            imagesList.find(".containerBox:nth-child(" + boxesNb + "n+3)").css("margin-right", marginSize + "px");
          };

        }
        else if (file.type) {
          // Create the generic icon for unknown type file.
          let type = "<i class='fa fa-file'></i>";

          // If the file is an audio file, replace the icon by an audio file icon.
          if (file.type.search(/audio/) != -1) {
            type = "<i class='fa fa-file-audio-o'></i>";
          }
          // If the file is an video file, replace the icon by an video file icon.
          else if (file.type.search(/video/) != -1) {
            type = "<i class='fa fa-file-video-o'></i>"; 
          }

          // Associated function to a ending load
          fReader.onloadend = function (e) {
            // Create the span tag for the file type.
            let span = $("<span>" + type + "</span>");

            // Span CSS.
            span.css("font-size", "5em");

            // Append the span to its container and then the container to the
            // list of files.
            container.append(span);
            imagesList.append(container);

            // Apply left margin to first container of each row and right to last.
            imagesList.find(".containerBox:nth-child(" + boxesNb + "n+4)").css("margin-left", marginSize + "px");
            imagesList.find(".containerBox:nth-child(" + boxesNb + "n+3)").css("margin-right", marginSize + "px");
          };
        }

        // Use the FileReader to read the content of a File.
        fReader.readAsDataURL(file);
      };

      // Change the color background of the button according to the mouse.
      button.mouseenter(function onMouseEnter(event) {
        button.css("background", "#3AA0FF").css("color", "white");
      }).mouseleave(function onMouseLeave() {
        button.css("background", "white").css("color", "#3AA0FF");
      });


      // When click on the button, simulate click on the original input.
      button.on("click", function onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        $(self).click();
      });

      // Manage events to display an overlay when dragover files.
      dragbox.on("dragenter", function onDragenter(event) {
        event.stopPropagation();
        event.preventDefault();

        // Increment the counter.
        counter++;

        // Display the overlay and change the dragbox border color.
        overlay.css("display", "flex");
        dragbox.css("border-color", "#3AA0FF");

        // Enable back pointer events to capture click, hover...
        button.css("pointer-events", "none");
        addMsg.css("pointer-events", "none");
        addIcon.css("pointer-events", "none");
        imagesList.css("pointer-events", "none");
      });

      // Manage events to hide the overlay when dragout files.
      dragbox.on("dragleave", function onDragLeave(event) {
        event.stopPropagation();
        event.preventDefault();

        // Decrease the counter.
        counter--;

        // If the counter is equal to 0 (means that the files are entirely out
        // of the dragbox).
        if (counter === 0) {
          // Hide the overlay and put back the dragbox border color.
          overlay.css("display", "none");
          dragbox.css("border-color", "rgb(210, 210, 210)");

          // Disable pointer events to avoid miscapture dragexit children's events. 
          button.css("pointer-events", "initial");
          addMsg.css("pointer-events", "initial");
          addIcon.css("pointer-events", "initial");
          imagesList.css("pointer-events", "initial");
        }
      });

      // Manage events when dropping files.
      dragbox.on("drop", function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        // Hide the overlay and put back the dragbox border color.
        overlay.css("display", "none");
        dragbox.css("border-color", "rgb(210, 210, 210)");

        // Enable back pointer events to capture click, hover...
        button.css("pointer-events", "initial");
        addMsg.css("pointer-events", "initial");
        addIcon.css("pointer-events", "initial");
        imagesList.css("pointer-events", "initial");

        // Retrieve the dragged files.
        const files = event.originalEvent.dataTransfer.files;
        
        // Read all files (to add them to the preview and push them to the files
        // list to submit).
        for(let index = 0; index < files.length; ++index) {
          readingFile(files[index]);
          totalFiles.push(files[index]);
        }
      });

      // Binding resize event to the window.
      $(window).bind("resize", function(e) {
        window.resizeEvt;
        $(window).resize(function () {
          // Delete the timeout as long as the window is still resizing.
          clearTimeout(window.resizeEvt);
          // Compute and change the margin according to the size of the window after
          // 0.5 seconds after resizing.
          window.resizeEvt = setTimeout(function() {
            // Compute the number of box that could fit in the dragbox and the
            // margin according to it.
            const width = dragbox.width();
            const boxesNb = Math.floor(width / 100);
            const marginSize = Math.floor((width - (boxesNb * 100)) / (boxesNb + 1));

            // Reset all margins of containers boxes.
            let containers = imagesList.children(".containerBox");
            for (let index = 0; index < containers.length; ++index) {
              $(containers[index]).css("margin-right", "0px");
              $(containers[index]).css("margin-left", marginSize + "px");
            }

            // Apply left margin to first container of each row and right to last.
            imagesList.find(".containerBox:nth-child(" + boxesNb + "n+4)").css("margin-left", marginSize + "px");
            imagesList.find(".containerBox:nth-child(" + boxesNb + "n+3)").css("margin-right", marginSize + "px");

          }, 500);
        });
      })

      // Detect when adding files through the dialog box to preview those files
      // and add them to the array.
      $(self).on("change", function onChange() {
        const files = this.files;

        for(let index = 0; index < files.length; ++index) {
          readingFile(files[index]);
          totalFiles.push(files[index]);
        }
      });

      // When submitting the form.
      $(self).closest("form").on("submit", function(event) {
        // Stop the first submit.
        event.stopPropagation();
        event.preventDefault();
        // Retrieve all form inputs.
        const inputs = this.querySelectorAll("input, textarea, select, button");
        // Create a form.
        const formData = new FormData();

        // Add all data to the form (selected options, checked inputs, etc...).
        for (let index = 0; index < inputs.length; ++index) {
          if (inputs[index].tagName === "SELECT" && inputs[index].hasAttribute("multiple")) {
            const options = inputs[index].options;
            for (let i = 0; options.length > i; ++i) {
              if (options[i].selected) {
                formData.append(inputs[index].getAttribute("name"), options[i].value);
              }
            }
          }
          else if (!inputs[index].getAttribute("type") || ((inputs[index].getAttribute("type").toLowerCase()) !== "checkbox" && (inputs[index].getAttribute("type").toLowerCase()) !== "radio") || inputs[index].checked) {
            formData.append(inputs[index].name, inputs[index].value);
          }
          else if ($(inputs[index]).getAttribute("type") != "file") {
            formData.append(inputs[index].name, inputs[index].value);  
          }
        }

        // Add all files get from the dialog box or drag'n drop,
        for (var i = 0; i < totalFiles.length; i++) {
          formData.append(self.name, totalFiles[i]);
        }

        // Create an request and post all data.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $(this).attr("action"), true);
        xhr.send(formData);        
      });

      // Hide the original input.
      $(self).hide();

      // Insert the dragbox after the original hidden input.
      dragbox.insertAfter(this);

    });

    // Return "this" to ensure that chaining methods can be called.
    return this;
  };


  // Default configuraiton of the plugin.
  $.fn.imageuploadify.defaults = {

  };

}(jQuery, window, document));