// Load the modules
const Patches = require('Patches');

const Time = require('Time');
const Animation = require('Animation');


// Load the modules
const Scene = require('Scene');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const Textures = require('Textures');

Promise.all([

    // Loading Textures for the buttons
    Textures.findFirst('1'),
    Textures.findFirst('2'),
    Textures.findFirst('3')

]).then(function(results){

    // First, we set the buttons for the NativeUI Picker
    const button1 = results[0];
    const button2 = results[1];
    const button3 = results[2];

    // Finally, we set the plane
    const plane = results[6];

    const configuration = {
      selectedIndex: 0,

      items: [
        {image_texture: button1},
        {image_texture: button2},
        {image_texture: button3}
      ],
    };

    // Create the NativeUI Picker
    const picker = NativeUI.picker;

    // Load our configuration
    picker.configure(configuration);

    // Show the NativeUI Picker
    picker.visible = true;

    // This is a monitor that watches for the picker to be used.
    picker.selectedIndex.monitor().subscribe(function(val) {
      Patches.inputs.setScalar("pickerNum",val.newValue);
    });

});
