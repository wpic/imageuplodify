Imageuploadify
==============

A simple plugin [jQuery](http://jquery.com/) to convert file (images) input to drag'n drop box with preview.

![imageuploadify screenshot](screenshot.png)

Dependencies
============

* [jQuery](http://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Font Awesome](http://fontawesome.io/)

Features
========

* Image preview.
* Responsive (tested with Firefox 49.0.2 and Chrome 54.0).
* Display file details (on mouse hover).
* Delete item before uploading (click on the cross).
* Filter files type according to the attribute "accept".

Usage
=====

Create a file input:

```
<form>
    <input name="image" type="file" multiple>
</form>
```

Then use the plugin:

`$("input[name='image']").imageuploadify();`

* To change comment, add `placeholder` to input.
* To support multiple file upload, add `multiple` to input.
(The drag'n drop box support multiple files no matter if the attribute "multiple" is present or not. To avoid issues, it is better to add it.)

Todo
====

* Video preview.
* Test with a more complete form.
* Auto-submit option.
* Class custom option.
* Different preview views option.
* Support "multiple" attribute.
* Add a modal box before deleting a file.