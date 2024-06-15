import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { hydrateRoot } from "react-dom/client";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";
import sprite from "../../public/Icons/icon/icon.svg?url";

// function preloadSprite() {
//     const link = document.createElement("link");
//     link.rel = "preload";
//     link.href = sprite;
//     link.as = "image";
//     link.type = "image/svg+xml";
//     document.head.appendChild(link);
// }

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        // const root = createRoot(el);
        // preloadSprite();
        // root.render(<App {...props} />);
        hydrateRoot(el, <App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
