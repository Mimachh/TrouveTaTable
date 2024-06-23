import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),

        iconsSpritesheet({
            // Defaults to false, should it generate TS types for you
            withTypes: true,
            // The path to the icon directory
            inputDir: "./resources/js/Icons", 
            // Output path for the generated spritesheet and types
            outputDir: "./public/Icons/icon",
            // Output path for the generated type file, defaults to types.ts in outputDir
            // je veux que ça soit dans mon dossier public/icons/types au dev et au prod
            // typesOutputFile: "/icons/types.ts",
            // The name of the generated spritesheet, defaults to sprite.svg
            fileName: "icon.svg",
            // The cwd, defaults to process.cwd()
            cwd: process.cwd(),
            // Callback function that is called when the script is generating the icon name
            // This is useful if you want to modify the icon name before it is written to the file
            iconNameTransformer: (iconName) => iconName
        }),
    ],
});
