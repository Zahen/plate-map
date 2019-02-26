var plateLayOutWidget = plateLayOutWidget || {};

(function ($, fabric) {

    plateLayOutWidget.interface = function () {
        // interface holds all the methods to put the interface in place
        return {

            _createWellsContainer: function () {
                var divIdentifier = '<div></div>';
                this.wellsContainer = this.element.find('#wells-container');
                this.wellsContainer.addClass("plate-setup-wells-container");
                this.overLayContainer = this._createElement(divIdentifier).addClass("plate-setup-overlay-container");
                this.canvasContainer = this._createElement(divIdentifier).addClass("plate-setup-canvas-container");
                this._createOverLay();
                $(this.wellsContainer).append(this.overLayContainer);
                this._createCanvas();
                $(this.wellsContainer).append(this.canvasContainer);
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

            _createTabsContainer: function () {
                this.tabsContainer = this.element.find('#tabs-container');
                // NB: the #tabs-container element may not exist in the DOM, but '.addClass()' below will not raise any error !
                this.tabsContainer.addClass("plate-setup-tabs-container");
                this._createTabAtRight();
                this._createTabs();
                this._placePresetTabs();
            },

            _createGroupsContainer: function () {
                this.bottomContainer = this.element.find('#groups-container');
                this.bottomContainer.addClass("plate-setup-groups-container");
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