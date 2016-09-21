Imageuploadify
==============

A simple plugin [jQuery](http://jquery.com/) to convert file (images) input to drag'n drop box with preview.

![imageuploadify screenshot](screenshot.png)

Dependencies
============

* [jQuery](http://jquery.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Font Awesome](http://fontawesome.io/)

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
