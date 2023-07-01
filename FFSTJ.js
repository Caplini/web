let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });

html5QrcodeScanner.render(onScanSuccess, onScanFailure);

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Scan result: ${decodedText}`, decodedResult);
}

function onScanFailure(error) {
    // Handle scan failure, usually better to ignore and keep scanning.
    console.warn(`QR code scan failed: ${error}`);
}
