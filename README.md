# Introduction
[//]: <> (think to update badges [version, licence] when needed because they are static)
[//]: <> (todo : think to change these badges to refer to the official plate-map github repo)
![version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg?style=flat-square&v=1.0)
[![licence ISC](https://img.shields.io/badge/licence-ISC-green.svg?style=flat-square&v=1.0)](https://www.isc.org/downloads/software-support-policy/isc-license/)
[![GitHub issues](https://img.shields.io/github/issues/Zahen/plate-map.svg?style=flat-square&v=1.0)](https://github.com/Zahen/plate-map/issues)
[![dependencies Status](https://david-dm.org/Zahen/plate-map/status.svg?style=flat-square&v=1.0)](https://david-dm.org/Zahen/plate-map)
[![devDependencies Status](https://david-dm.org/Zahen/plate-map/dev-status.svg?style=flat-square&v=1.0)](https://david-dm.org/Zahen/plate-map?type=dev)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

**JavaScript Plate Layout** is an open source tool developed collaboratively by [Chai Biotechnologies](www.chaibio.com) 
and [New England Biolabs](www.neb.com) for visualizing and editing the layout of scientific assay plates.

Many scientific instruments such as PCR thermocyclers, DNA sequencers, and microplate readers use plates ranging from 8 
to 1536 wells, with 96 well plates being particularly common. It is usually necessary to set data attributes for each of
the wells, both so that the instrument can properly configure itself, and so that results can be properly analyzed. 
Correctness of the layout is critical for the integrity of results, but not always easy to obtain given the number of 
wells and data attributes to be assigned.

JavaScript Plate Layout provides a tool for visualizing the plate layout using a few dimensions at a time, to better 
comprehend the layout they have created. It provides extensive plate editing capabilities and is designed to be easily 
utilized in the context of a larger scientific software application.

# Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [How to start](#how-to-start)
- [Usage](#usage)
- [User-Provided Callback Functions](#user-provided-callback-functions)
- [Major Functions](#major-functions)
- [Data Types](#data-types)
- [Exemple 1](#example-1-multiplex-field-without-sub-field-multiplex-units)
- [Exemple 2](#example-2-multiplex-field-with-multiplex-unit-sub-fields)

# Features
- Assign and edit up to roughly 25 data attributes to plates ranging from 8 to 96 wells
- Incrementially save plate layouts to server via JavaScript callback interface
- Colorfully visualize the layout using user-selected data dimensions
- Assign attributes to multiple wells at once
- Supports multiple units of measure for numeric attributes
- Undo / redo support
- Import plate templates
- Plate and well completion status indication
- Read only plate map
- Edit only mode to disable add new wells and delete existing wells.

# Project Structure
This project has the following structure : 
```
plate-map
    ├── src
    |   ├── css
    |   │   └── *.css
    |   └── js
    |       └── *.js
    ├── index.html
    ├── gulpfile.js
    └── package.json
```

# How to start
## Installation
This project requires _Node_ and _NPM_ to be installed on your machine. Download a pre-built installer for your 
platform from  [nodejs.org](https://nodejs.org/en/download/) and install it before starting. **Note** that this 
project was tested on an environment with _Node_ v9.10.1 and _NPM_ v5.6.0.

> If you're new to _NPM_, you can get to know it better from 
[What-Is-NPM?](https://docs.npmjs.com/getting-started/what-is-npm).

The project requires also the libraries _gif_lib_ and _jpeg_lib_ to be installed on your machine. **Note** that these 
libraries are used by the _NPM_ package _Canvas_ which the project depends-on. To install those libraries : 

- For Linux/Ubuntu :
    ```bash
    sudo apt install libgif-dev
    sudo apt install libjpeg-dev
    ```
- For Mac OS :
    ```bash
    brew install giflib
    brew install libjpeg
    ```
   
## Automatic Workflow
The project uses _Gulp_ to automate and enhance the workflow. So the application can run custom 
defined repetitious tasks and manages process automation.

> For more information about _Gulp_, see [Gulp Website](https://gulpjs.com/).

All _Gulp_ configuration goes in `gulpfile.js` in the root of the project. This file contains all the tasks we created
to build and serve the application in both development and production environments. 

A pattern for writing tasks is that you first load a package you're about to use and then define a task which is based 
on that package. **Note** that you should install the package you're about to use it before load it. 

Here is an example about using _Gulp_:

- In your terminal:
    ```bash
    # install `gulp` if you don't have it
    npm install gulp
    ```
- In a `gulpfile.js`:
    ```js
    // load gulp
    var gulp = require('gulp');
    
    // basic syntax of a gulp task
    // task-name would be used whenever you want to run a task in Gulp.
    gulp.task('task-name', function() {
      // stuff here
    });
    ```
- In your terminal:
    ```bash
    # you can run this task in the command line by writing
    gulp task-name
    ```

> _NPM_ can be also used as a tasks runner, you can easily run tasks by adding them to the 'scripts' field in 
`package.json` and run them with `npm run <task-name>`. Run `npm run` to see available tasks.

Please, have a look at `gulpfile.js` for more details about the available tasks of this projects.

## Dev Environment
This development environment creates a directory called `dist/dev` to stuff all JS, CSS and HTML files. The environment 
is served by _BrowserSync_ (an _NPM_ package) that allows live reloads (change your code and the page will be 
auto-reloaded) and interaction synchronization (all your actions are mirrored across every browser). So developers can 
modify the source code under the directory `src`, and the application will be updated automatically across every browser. 

> For more details about _BrowserSync_, see [BrowserSync Website](https://browsersync.io/). 

To run the application in development mode : 
```bash
# if this is your first time here, install all needed dependencies in `node_modules` in the root of the project
npm install
# compile the development application in `dist/dev` and serve it
npm start # or npm run serve.dev
```
Please have a look at `package.json` for more tasks.

## Prod Environment
This production environment concatenates both CSS files in one minified file and JS files in one uglified file. 

> For more details about 'Minification', see [Minification Wiki](https://en.wikipedia.org/wiki/Minification_(programming)).

The production environment creates also a directory called `dist/prod` to stuff the JS, CSS and HTML minified files. 
**Note** that this environment uses a simple server to serve the application instead of _BrowserSync_.

To run the application in production mode : 
```bash
# compile the production application in `dist/prod` and serve it
npm run serve.prod
```
Again, please see `package.json` for more flavors of tasks.

## Package Build
We also created an _NPM_ package which can be used by others projects. This package contains :
- main.min.css (minified CSS file that concatenates all CSS source files)
- main.min.js (uglified JS file that concatenates all JS source files)
- package.json (JSON file that mainly defines all the required dependencies and tasks af the package)

[//]: <> (todo : this package is available on [NPM_Link])

To build this package on your machine : 
```bash
# compile the package in `dist/pack`
npm run build.package
```

# Usage
The source file `src/js/main.js` (showed below) initializes the plate layout tool. See Configurations Options
for all available settings.
```js
  window.onload = function() {
    //Define fields to hold data
    var fields = {
      Volume: {
        required: true,
        id:       'volume',
        name:     'Volume',
        type:     'numeric',
        placeholder: "Volume",
        units: ["uL", "mL"], 
        defaultUnit: "uL"
      },
      Polymerase: {
        required: true,
        id: 'pol',
        name: 'Polymerase',
        type: 'multiselect',
        placeHolder: "Polymerase",
        options: {
          'Taq 1': {
                id:   '234',
                name: 'Taq 1'
          },
          'Taq 2': {
                id:   '123',
                name: 'Taq 2'
          }
        }
      }
    }; 

    // Define presentation attributes
    var attributes = {
      presets: {// Define quick pick of different combinations of checked fields
        "preset 1": ['volume', 'pol'],
        "preset 2": ["pol"]
      },
      tabs: [
        {
          name: "Settings",
          fields: fields 
        }
      ], 
    };

    // Main function
    $("#my-plate-layout").plateLayOut({
      numRows: 8,
      numCols: 12,
      imgSrc:  "css",
      readOnly: false,  // optional
      attributes: attributes,
      updateWells: function(event, data) {
        //Run when data state changes
      },
      selectedWells: function(event, selectedWell) {
        //output the selected wells in the console, can also add other methods upon mouse up events
        console.log('selected: ' + selectedWell.selectedAddress);
      }
    });
    //You can trigger the load of plateData at any time, 
    //including initializing, using the getPlates method
    $("#my-plate-layout").plateLayOut("getPlates", plateData);
  }
```

# User-Provided Callback Functions
The following callback function must be implemented by the user and provided to the init function.

## updateWells(event, data)
Anytime the user makes changes, this callback will be invoked with the current state of the data, 
allowing the developer to respond to changes.

## selectedWells: function(event, selectedWell)
Every time after mouse up event on canvas, selectedWells function will be triggered and output the addresses of selectedWell

# Major Functions
The following functions may be called at any time to interact with the UI.  
Typically you will invoke these functions using `$("#mylayout").plateLayOut("function", ...args)` form. 

## getPlates(data)
This function may be called at any time to load data. Well data should be passed in the following form:
```js
{
  derivative: {
    "0": { //row-major index of well
      wellData: {
        field_1: "value 1",
        field_2: "value 2",
        field_3: {value: xxx, unit: "unit1"},       // field with unit
        field_4: "value 4 id",                      // single select field
        field_5: ["value 5 id1", "value 5 id2"],    // multiselect field
        field_6: [                                  // multiplex field with no multiplex unit sub fields
                  {
                    multiplex_field1: "multiplex field1 id1",
                    subfield_1: "value 1",
                    subfield_2: "value 2"
                  },
                  {
                    multiplex_field: "multiplex field1 id2",
                    subfield_1: "value 3"
                    subfield_2: "value 4"
                  }
                 ],
        field_7: [                                  // multiplex field with multiplex unit sub fields(subfield_4)
                  {
                    multiplex_field2: "multiplex field2 id1",
                    subfield_3: "value 1",
                    subfield_4: {value: "value 2", unit: "unit1"}    // numeric field with multiplex units
                  },
                  {
                    multiplex_field: "multiplex field2 id2",
                    subfield_3: "value 3",
                    subfield_4: {value: "value 2", unit: "unit1"}    // numeric field with multiplex units
                  }
                 ]


      }
    }
  }, 
  checkboxes: [ //activation of checkboxes
    "field_1", 
    "field_2",
    "field_3",
    "field_4",
    "field_5",
    "field_6",
    "field_7",
  ], 
  selectedAreas: [ //min and max rows and columns, inclusive
    {
      minRow: 0, 
      maxRow: 3, 
      minCol: 2, 
      maxCol: 3
    }
  ], 
  focalWell: { // position of current focal well
    row: 0,
    col: 2
  }
}
```

## isReadOnly()
This function will disable editing of the plates, set `flag` to true for read only mode and set `flag` to false to disable read only mode
```js
$("#mylayout").plateLayOut("isReadOnly", flag)
```

## isDisableAddDeleteWell()
This function will disable adding and removing the existing wells. Set `flag` to true will set the current state of the plate as reference and remove the ability to add and remove wells. `defaultFields` can be specified for setting default values to existing empty wells (`defaultFields` format: `{fieldId1: val1, fieldId2: val2, ...}`)
```js
$("#mylayout").plateLayOut("isDisableAddDeleteWell", flag, defaultFields)
```

## getSelectedObject()
Calling this function will return the derivative of the current selected wells on the plate
```js
$("#my-plate-layout").plateLayOut("getSelectedObject")
```

## setSelectedWell()
Calling this function will set the input address as selected wells on the plate, `address_list` is a list of addresses
 (example: ['A1', 'A2', ...])
```js
$("#my-plate-layout").plateLayOut("setSelectedWell", address_list)
```

# Data Types
We have four data types which can be used to initialize tabs in the right hand side. They are text, numeric, boolean and 
multichoice.

## Text
Text field are the normal and basic text field which holds a text value inside. Nothing specific.

## Numeric
Numeric fields only allow numeric values. If a non-numeric value is entered, the field will be rendered in red and not 
save the value. 
Numeric fields may optionally allow for units. You can specify the default unit if desired, otherwise the first unit 
will be used. 
```js
Volume: {
  required: true,
  id:       'volume',
  name:     'Volume',
  type:     'numeric',
  placeholder: "Volume",
  units: ["uL", "mL"], 
  defaultUnit: "uL"
}
```
see the units in the above object. Units will be a seperate dropdown and will be placed over the text box where we enter 
speed data.
when numeric field is used as a sub field for multiplex field, if the numeric field has multiplex units, the set up of 
the field will become:
```js
condition_amt: {
  required: false,
  id: 'raw_value',
  name: 'Amount',
  type: 'numeric',
  hasMultiplexUnit: true,
  units: ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6"]
}
```
Note that `units` attribute is a list of all the possible options for `condition_amt` field.
More examples at the end of the page

## Boolean Field
Name says it all, Just brought the select2 to show it.

## Select
Selected single option using select2 dropdown.Options field lists options in order. 
```js
Polymerase: {
  required: true,
  id: 'pol',
  name: 'Polymerase',
  type: 'select',
  placeHolder: "Polymerase",
  options: [
    {
      id:   '234',
      name: 'Taq 1'
    },
    {
      id:   '123',
      name: 'Taq 2'
    }
  ]
}
```

## Multiselect
Select multiple options using select2 picker. Options field lists options in order. 
```js
Polymerase: {
  required: true,
  id: 'pol',
  name: 'Polymerase',
  type: 'multiselect',
  placeHolder: "Polymerase",
  options: [
    {
      id:   '234',
      name: 'Taq 1'
    },
    {
      id:   '123',
      name: 'Taq 2'
    }
  ]
}
```

## Multiplex
A special field type used to handle fields which contain multiple sub fields
creating a multiplex field will automatically generate a single select field with display name `Select to edit`, the 
single select field is for user to choose one multiplex value to inspect or update. multiplexFields can be used to 
specify sub fields, components of multiplexFields can be any of the basic field type shown above.

### Example 1: multiplex field without sub field multiplex units
```js
Amplicon: {
  required: true,
  id: 'amplicon_id',
  name: "Amplicon",
  type: "multiplex",
  options: [
    {
      id: 'a',
      text: 'amplicon_a'
    },
    {
      id: 'b',
      text: 'amplicon_b'
    }
  ],
  multiplexFields: {
    template_ngul: {
      required: true,
      id: 'template_ngul',
      name: 'template conc',
      type: 'numeric',
      defaultUnit: 'ng/ul'
    },
    primer_umolarity: {
      required: true,
      id: 'primer_umolarity',
      name: 'Primer conc',
      type: 'numeric',
      placeHolder: "Primer",
      units: ['uM (final)', "unit1"],
      defaultUnit: 'uM (final)'
    },
    probe_umolarity: {
      required: true,
      id: 'probe_umolarity',
      name: 'Probe conc',
      type: 'numeric',
      placeHolder: "Probe",
      defaultUnit: 'uM (final)'
    },
    dilution_factor: {
      required: true,
      id: 'dilution_factor',
      name: 'Dilution factor',
      type: 'numeric',
      placeHolder: "Dilution factor",
      defaultUnit: 'X'
   }
  }
}
```
see the example above, Amplicon is a multiplex field contains sub fields: template concentration, primer concentration, 
probe concentration and dilution factor.

### Example 2: multiplex field with multiplex unit sub fields
```js
experimental_conditions: {
  required: false,
  id: 'experimental_conditions',
  name: "Experimental Conditions",
  type: "multiplex",
  placeHolder: "Experimental Conditions",
  options: [
    {
      id: "a",
      unitOptions: {raw_value: ["unit1", "unit2"]},
      text: "experimental condition1"
    },
    {
      id: "b",
      unitOptions: {raw_value: ["unit3", "unit4"]},
      text: "experimental condition2"
    },
    {
      id: "c",
      unitOptions: {raw_value: ["unit5", "unit6"]},
      text: "experimental condition3"
    }
  ],
  multiplexFields: {
    condition_amt: {
      required: false,
      id: 'raw_value',
      name: 'Amount',
      type: 'numeric',
      units: ["unit1", "unit2", "unit3", "unit4", "unit5", "unit6"]
      hasMultiplexUnit: true
    },
    is_modulator: {
      required: false,
      id: 'is_modulator',
      name: 'Is Additive',
      type: 'select',
      options:[
        {id:'a',text: 'Is Modulator'},
        {id:'b',text: 'Not Modulator'}
      ]
    }
  }
}
```
In this case `experimental_conditions` is a multiplex field with subfields `condition_amt` and `is_modulator`. 
`condition_amt` is a subfield with multiplex units. In `experimental_conditions` field options, for each experimental 
condition there is a corresponding `unitOptions`. `unitOptions` is used to filter units upon choosing an experimental 
condition. For instance, if the user chooses option "a" in the single select field, the corresponding list of unit 
options for subfield id `raw_value` will be `["unit1", "unit2"]` , which is used to filter the unit options in the 
`condition_amt` field. `condition_amt` will only have unit options `["unit1", "unit2"]` after the filtering.
