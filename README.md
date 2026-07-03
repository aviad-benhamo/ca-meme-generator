# Ultimate Meme Generator (Memester)

Memester is a lightweight, client-side meme generator built with vanilla HTML, CSS, and JavaScript. It lets users browse a gallery of images, upload their own images, add and edit text or stickers, and save or download the resulting memes. The project stores saved memes locally using `localStorage` and optionally uploads images to Cloudinary for sharing.

## Features
- Responsive image gallery
- Upload your own images and edit them
- Add multiple text lines with full editing support (font, color, size, alignment)
- Add emoji stickers
- Drag or click on the canvas to select lines and edit them
- Save memes to browser `localStorage`
- Download or share memes (sharing uses Cloudinary upload and then opens a Facebook share dialog)

## Quick Start
Requirements: a modern browser such as Chrome, Firefox, Edge, or Safari with JavaScript enabled. No build step is required.

1. Open the project directory.
2. Open `index.html` in your browser, or serve the folder using a small development server.

PowerShell example:

```powershell
# Using http-server from npm
npx http-server -c-1

# Or with Python 3
python -m http.server 8080
```

Visit `http://localhost:8080` after starting the server.

## How to Use
1. Click `Gallery` to browse stock images or click `I'm Feeling Lucky` to pick a random image.
2. Use `Upload Image` to bring your own photo.
3. When an image is selected, the editor appears. Type text, change color, fonts, size, and alignment.
4. Add emoji stickers and move lines up or down. You can click a text line or sticker on the canvas to select it.
5. Save your meme to the local gallery or download it as a JPG.
6. Use `Share` to upload the image to Cloudinary and open the Facebook share dialog on success.

## Project Structure
- `index.html` - Main HTML file and app entry point
- `css/` - Main styles, split into setup, basics, and components
- `js/` - Application logic, controllers, services, and utilities
- `img/` - Bundled gallery images and favicon
- `fonts/` - Local font assets used by the editor

## Important Notes
- The sharing feature (`uploadImg` in `js/utils.js`) posts the generated image to Cloudinary. The project currently uses `CLOUD_NAME = 'webify'` and `UPLOAD_PRESET = 'webify'`. For production use, replace these values with your own Cloudinary cloud name and an unsigned upload preset that you control.
- Saved memes use `localStorage`, so they are stored per browser and will be lost if local browser storage is cleared.

## License
This project is licensed under the [MIT License](LICENSE).

## Security
If you discover a security issue, please follow the private reporting process described in [SECURITY.md](SECURITY.md).

## Changelog
Project history and pending changes are tracked in [CHANGELOG.md](CHANGELOG.md).

## Contribution
Contributions are welcome. Suggested steps:

1. Fork and clone this repository.
2. Create a feature branch for your work.
3. Run and test your changes locally.
4. Open a pull request with a clear description of the change.

## Contact
Created by Aviad Ben Hamo - Coding Academy

If you want to add features or have questions about the implementation, open an issue or a pull request.
