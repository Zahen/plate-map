define(["plate-layout-components", "jquery"], function(plateLayOutWidget, $) {

  plateLayOutWidget.undoRedoManager = function(THIS) {

    return {

      undoRedoArray: [],

      actionPointer: null,

      addToUndoRedo: function(derivative) {

        if(this.actionPointer != null && this.actionPointer < (this.undoRedoArray.length - 1)) {
          this.undoRedoArray.splice(this.actionPointer + 1, this.undoRedoArray.length);
        }
        this.actionPointer = null;
        this.undoRedoArray.push($.extend(true, {}, derivative));

      },

      _configureUndoRedoArray: function() {

        var data  = {
          checkboxes: {},
          derivative: {},
          selectedAreas: [{
            minRow: 0, 
            minCol: 0, 
            maxRow: 0, 
            maxCol: 0
          }], 
          focalWell: {
            row: 0, 
            col: 0
          }
        };

        this.undoRedoArray.push($.extend({}, data));
      },

      undo: function(pointer) {

        console.log("undo");
        this.getPlates(this.undoRedoArray[pointer]);
        this.undoRedoActive = false;
      },

      callUndo: function() {

        this.undoRedoActive = true;
        if(this.actionPointer == null) {
          this.actionPointer = this.undoRedoArray.length - 2;
          this.undo(this.actionPointer);
        } else {
          this.actionPointer = (this.actionPointer) ? this.actionPointer - 1 : 0;
          this.undo(this.actionPointer);
        }
      },

      redo: function(pointer) {

        this.getPlates(this.undoRedoArray[pointer]);
        console.log("redo");
        this.undoRedoActive = false;
      },

      callRedo: function() {

        this.undoRedoActive = true;
        if(this.actionPointer != null && this.actionPointer < this.undoRedoArray.length - 1) {
          this.actionPointer = this.actionPointer + 1;
          this.redo(this.actionPointer);
        } else if(this.actionPointer == this.undoRedoArray.length - 1) {
          this.undoRedoActive = false;
        }
      }
    }
  };

});
