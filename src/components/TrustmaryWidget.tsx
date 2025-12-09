// components/TrustmaryWidget.jsx
import { useEffect, useRef } from 'react';

function TrustmaryWidget() {
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        // Carica lo script Trustmary solo una volta
        if (!scriptLoadedRef.current) {
            const script = document.createElement('script');
            script.src = "https://widget.trustmary.com/W8baFB8ieF";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            scriptLoadedRef.current = true;
        }
    }, []);

    // The widget script injects UI into the page; this component itself renders nothing.
    return null;
}

export default TrustmaryWidget;
