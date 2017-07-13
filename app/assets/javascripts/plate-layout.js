require.config({
  "baseUrl": require.toUrl(""), 
  "paths": {
    "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min", 
    "jquery-ui": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min", 
    "fabric": "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.16/fabric.min", 
    "select2": "https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.min"
  }, 
  shim: {
    'jquery-ui': {
      deps: ['jquery']
    }, 
    "fabric": {
      exports: "fabric"
    }, 
    "select2": {
      deps: ['jquery']
    }
  }
});

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
loadCss(require.toUrl("../stylesheets/plate-layout.css"));
loadCss("https://cdnjs.cloudflare.com/ajax/libs/select2/3.5.4/select2.css");

define("plate-layout-components", {}); 

// So this array contains all the file names, whenever you add a new file just add it here
// Make sure you follow the syntax or return an object from the file
var fileArray = [ "plate-layout-components", "jquery", "jquery-ui", "fabric", "select2", 
"add-data-on-change", "add-data-to-tabs", "add-tab-data", "apply-well-data", "bottom-table", "canvas-circles",
"canvas", "check-box", "create-canvas-elements", "create-field", "engine", "well-area", "fabric-events", "interface", "load-plate", "menu",
"overlay", "tabs", "undo-redo-manager", "preset", "color-manager", "unit-data-field"];

define("plate-layout", fileArray, function(plateLayOutWidget, $) {

   $.widget("DNA.plateLayOut", {

    options: {
      numRows: 8,
      numCols: 12,
    },

    allTiles: [], // All tiles containes all thise circles in the canvas

    _create: function() {
      function rowKey(i) {
        var c1 = i % 26; 
        var c2 = (i - c1)/26; 
        var code = String.fromCharCode(65+c1); 
        if (c2 > 0) {
          code = String.fromCharCode(64 + c2) + code
        }
        return code; 
      }; 

      this.numRows = parseInt(this.options.numRows); 
      this.numCols = parseInt(this.options.numCols); 
      this.scaleFactor = Math.min(8/this.numRows, 12/this.numCols); 
      this.rowIndex = []; 
      for (var i = 0; i < this.numRows; i++) {
        this.rowIndex.push(rowKey(i)); 
      }

      // This is a little hack, so that we get the text of the outer container of the widget
      this.options.created = function(event, data) {
        data.target = (event.target.id) ? "#" + event.target.id : "." + event.target.className;
      };

      this._trigger("created", null, this);

      // Import classes from other files.. Here we import it using extend and add it to this
      // object. internally we add to widget.DNA.getPlates.prototype.
      // Helpers are methods which return other methods and objects.
      // add Objects to plateLayOutWidget and it will be added to this object.
      for(var component in plateLayOutWidget) {
        // Incase some properties has to initialize with data from options hash,
        // we provide it sending this object.
        $.extend(this, new plateLayOutWidget[component](this));
      }

      this.imgSrc = this.options.imgSrc || requirejs.toUrl("../images");

      this._createInterface();

      return this;
    },

    _init: function() {
      // This is invoked when the user use the plugin after _create is called.
      // The point is _create is invoked for the very first time and for all other
      // times _init is used.
    },

    addData: function() {
      alert("wow this is good");
    }
  });
});
