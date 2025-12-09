// components/InstagramFeed.jsx
import { useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';

function InstagramFeed() {
    const containerRef = useRef(null);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        // Carica lo script Behold solo una volta
        if (!scriptLoadedRef.current) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://w.behold.so/widget.js';
            script.async = true;
            document.head.appendChild(script);
            scriptLoadedRef.current = true;

            // Cleanup quando il componente viene smontato
            return () => {
                // Lo script rimane nel DOM per evitare ricaricamenti
            };
        }
    }, []);

    return (
        <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">
                SEGUICI SU INSTAGRAM
            </h4>

            {/* Container per il widget Behold */}
            <div
                ref={containerRef}
                className="mb-4"
                data-behold-id="5APf99FMcGS3OE3VPIFU"
            />

            <a
                href="https://www.instagram.com/cafferoma2000/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium"
            >
                <Instagram className="w-4 h-4 mr-2" />
                @cafferoma2000
            </a>
        </div>
    );
}

export default InstagramFeed;
