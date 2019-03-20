var GET_PLATES = 'getPlates';
var IS_READ_ONLY = 'isReadOnly';
var IS_DISABLE_ADD_DELETE_WELL = 'isDisableAddDeleteWell';
var GET_SELECTED_OBJECT = 'getSelectedObject';
var SETSELECTEDWELL = 'setSelectedWell';

function plateMapImportModules() {
    var plateLayOutWidget = {};
    for (var field in plateMapModules) {
        if (field !== 'createWidget') {
            plateMapModules[field](jQuery, fabric, plateLayOutWidget);
        }
    }
    plateMapModules.createWidget(plateLayOutWidget);
}