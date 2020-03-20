import ScanditBarcodeCapture

extension ScanditBarcodeCapture: BarcodeTrackingDeserializerDelegate {
    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingMode mode: BarcodeTracking,
                                     from JSONValue: JSONValue) {
        let JSONString = JSONValue.jsonString()

        guard let data = JSONString.data(using: .utf8),
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
            let enabled = json["enabled"] as? Bool else {
                return
        }
        mode.isEnabled = enabled

        mode.addListener(self)

        lastBarcodeTrackingSession = nil
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingMode mode: BarcodeTracking,
                                     from JSONValue: JSONValue) { }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingSettings settings: BarcodeTrackingSettings,
                                     from JSONValue: JSONValue) { }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingSettings settings: BarcodeTrackingSettings,
                                     from JSONValue: JSONValue) { }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingBasicOverlay overlay: BarcodeTrackingBasicOverlay,
                                     from JSONValue: JSONValue) {
        overlay.delegate = self
        barcodeTrackingBasicOverlay = overlay
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingBasicOverlay overlay: BarcodeTrackingBasicOverlay,
                                     from JSONValue: JSONValue) { }
}
