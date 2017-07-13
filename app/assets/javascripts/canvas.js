define(["plate-layout-components", "jquery", "fabric"], function(plateLayOutWidget, $, fabric) {

  plateLayOutWidget.canvas = function() {
    //
    return {

      allSelectedObjects: null, // Contains all the selected objets, when click and drag.

      allPreviouslySelectedObjects: null,

      colorPointer: 0,

      goldenRatio: 0.618033988749895,

      _createCanvas: function() {

        this.normalCanvas = this._createElement("<canvas>").attr("id", "DNAcanvas");
        $(this.canvasContainer).append(this.normalCanvas);
      },

      _initiateFabricCanvas: function() {

        this.mainFabricCanvas = new fabric.Canvas('DNAcanvas', {
          backgroundColor: '#f5f5f5',
          selection: false,
          stateful: true,
          hoverCursor: "pointer",
          renderOnAddRemove: false,
        })
        .setWidth(632)
        .setHeight(482);
      },

    };
  }
});
