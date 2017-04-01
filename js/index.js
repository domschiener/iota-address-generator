$(document).ready(function() {

    var iota = new IOTA({
        // Host and provider are only needed if the user intends to generate the address deterministically
        'host': 'http://localhost',
        'port': 14265
    })

    var seed;

    //
    //  Properly formats the seed, replacing all non-latin chars with 9's
    //  And extending it to length 81
    //
    function setSeed(value) {

        seed = "";
        var value = value.toUpperCase();

        for (var i = 0; i < value.length; i++) {
            if (("9ABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(value.charAt(i)) < 0) {
                seed += "9";
            } else {
                seed += value.charAt(i);
            }
        }
    }


    //
    // Save Seed
    //
    $("#saveSeed").on("click", function() {

        // We modify the entered seed to fit the criteria of all uppercase and only latin letters
        setSeed($("#userSeed").val());

        // Set the modified seed value as placeholder
        $('#userSeed').prop('value', seed);

        // Disable the seed input
        $('#userSeed').prop('disabled', true);

        // Then we remove the warning
        $("#seedInputForm").removeClass('has-warning').addClass('has-success');

    })

    //
    // Save Seed
    //
    $("#generateAddress").on("click", function() {

        var options = {}

        // Get all the respective values from the user
        options.index = parseInt($("#keyIndex").val());
        options.security = parseInt($("#security :selected").text());
        options.checksum = $("#checksum:checked").val() === 'on';
        var deterministic = $("#deterministic:checked").val() === 'on';

        // If the user does not want to generate the address deterministically
        // generate a total of 1 addresses
        if (!deterministic) {
            options.total = 1;
        }

        // if no seed, negative key index, return
        if ( !seed ||  options.index < 0 )
            return

        console.log("YOUR CHOSEN OPTIONS: ", options)

        // Generate a new address according to the user inputs
        iota.api.getNewAddress( seed, options, function( e, address ) {

            if (e) {
                throw e;
            }

            // Set the address as placeholder 
            $('#finalAddress').prop( 'value', address );

        })
    })

})
