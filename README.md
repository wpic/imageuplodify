How to setup?
=============

First add normal upload group to your form:

    <div class="form-group">
        <label>Upload your file</label>
        <input type="file" class="form-control" name="image">
    </div>

Then use the plugin:

    $("input[name='image']").imageUploadify();

* To change comment, add `placeholder` to input.
* To support multiple file upload, add `multiple` to input.
