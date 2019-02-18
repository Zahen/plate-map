var plateLayOutWidget = plateLayOutWidget || {};

(function ($, fabric) {

    plateLayOutWidget.interface = function () {
        // interface holds all the methods to put the interface in place
        return {

            _createTopLeft: function () {
                var divIdentifier = '<div></div>';
                this.topLeft = this.element.find('#top-left');
                this.topLeft.addClass("plate-setup-top-left");
                this.overLayContainer = this._createElement(divIdentifier).addClass("plate-setup-overlay-container");
                this.canvasContainer = this._createElement(divIdentifier).addClass("plate-setup-canvas-container");
                this._createOverLay();
                $(this.topLeft).append(this.overLayContainer);
                this._createCanvas();
                $(this.topLeft).append(this.canvasContainer);
                this._initiateFabricCanvas();
                // Canvas
                this._canvas();
                var that = this;
                this._setShortcuts();
                $(document.body).keyup(function (e) {
                    that._handleShortcuts(e);
                });
                this._configureUndoRedoArray();
            },

            _createTopRight: function () {
                this.topRight = this.element.find('#top-right');
                this.topRight.addClass("plate-setup-top-right");
                this._createTabAtRight();
                this._createTabs();
                this._placePresetTabs();
            },

            _createBottom: function () {
                // Bottom of the screen
                this.bottomContainer = this.element.find('#bottom');
                this.bottomContainer.addClass("plate-setup-bottom-container");
                this._bottomScreen();
                this.bottomForFirstTime();
            },

            _createElement: function (element) {
                return $(element);
            },

            _setShortcuts: function () {
                var that = this;
                window.addEventListener("cut", function (e) {
                    if (document.activeElement == document.body) {
                        that.copyCriteria();
                        that.clearCriteria();
                        e.preventDefault();
                    }
                });
                window.addEventListener("copy", function (e) {
                    if (document.activeElement == document.body) {
                        that.copyCriteria();
                        e.preventDefault();
                    }
                });
                window.addEventListener("paste", function (e) {
                    if (document.activeElement == document.body) {
                        that.pasteCriteria();
                        e.preventDefault();
                    }
                });
            },

            _handleShortcuts: function (e) {
                if (document.activeElement === document.body) {
                    if (e.keyCode == 46) {
                        this.clearCriteria();
                        e.preventDefault();
                    } else if (e.ctrlKey || e.metaKey) {
                        if (e.keyCode == 90) {
                            if (e.shiftKey) {
                                this.redo();
                            } else {
                                this.undo();
                            }
                            e.preventDefault();
                        } else if (e.keyCode == 89) {
                            this.redo();
                            e.preventDefault();
                        }
                    }
                }
            },
        };
    }
})(jQuery, fabric);