let totals = 0

function addtotals() {
    let toadd = document.getElementById("count").value;
    let name = document.getElementById("itemname").value;

    totals += eval(toadd);
    document.getElementById("total").innerHTML = `${name}: ${totals}`;
}

function startScan(deviceId) {
    document.getElementById('barcode').innerText = '';
    document.getElementById('product-name').innerText = '';

    Quagga.init({
        inputStream: {
            name: "Live",
            type : "LiveStream",
            target: document.querySelector('#interactive'), // The HTML element to apply the stream to
            constraints: {
                deviceId: deviceId,
                width: 640,
                height: 480,
                facingMode: "environment"
            }
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 4,
        decoder: {
            readers : ["ean_reader"]
        },
        locate: true,
        area: { // defines rectangle of the detection/localization area
            top: "0%",    // top offset
            right: "0%",  // right offset
            left: "0%",   // left offset
            bottom: "0%"  // bottom offset
        },
        singleChannel: false, // true: only the red color-channel is read
        controls: {
            zoom: {
                maxOpticalZoom: 10,
                pinching: true
            }
        },
        tracking: true,
        debug: { // Visualization of located and decoded barcodes
            drawScanline: true,
            showPattern: true
        }
    }, function(err) {
        if (err) {
            return console.log(err);
        }
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        var barcode = data.codeResult.code;
        document.getElementById('barcode').innerText = barcode;

        fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
            .then(response => response.json())
            .then(data => {
                if (data.product && data.product.product_name) {
                    var productName = data.product.product_name;
                    document.getElementById('product-name').innerText = productName;
                    Quagga.stop();
                }
            })
            .catch(error => console.error(error));
    });
}

document.getElementById('new-scan').addEventListener('click', function() {
    Quagga.stop();
    startScan(document.getElementById('deviceSelection').value);
});

// Initiate camera selection
Quagga.CameraAccess.enumerateVideoDevices()
    .then(function(devices) {
        var $deviceSelection = document.getElementById("deviceSelection");
        while ($deviceSelection.firstChild) {
            $deviceSelection.removeChild($deviceSelection.firstChild);
        }
        devices.forEach(function(device) {
            var $option = document.createElement("option");
            $option.value = device.deviceId || device.id;
            $option.appendChild(document.createTextNode(device.label || device.deviceId || device.id));
            $deviceSelection.appendChild($option);
        });

        // Start scanning with the first camera in the list
        startScan($deviceSelection.value);
    });

// Update camera when the selected option changes
document.getElementById('deviceSelection').addEventListener('change', function() {
    Quagga.stop();
    startScan(this.value);
});