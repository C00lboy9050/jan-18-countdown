# January 18, 2028 Countdown

## Publish with GitHub Pages
1. Create a **public** GitHub repository named `jan-18-countdown`.
2. Upload all files in this folder to the repository root (not inside another folder).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then Save.
6. Wait for GitHub Pages to publish. The address will be `https://YOUR-USERNAME.github.io/jan-18-countdown/`.

## Pages
- `/` — clean countdown view for OBS Browser Source.
- `/watch.html` — embedded YouTube livestream.
- `/setup.html` — save the YouTube video URL and read broadcast setup steps.

## YouTube + OBS
The countdown site itself does not transmit video to YouTube. In OBS, add a Browser Source using the published homepage URL and set it to 1920×1080. Use YouTube Studio's Go Live setup to obtain the stream settings, then configure OBS there. Never put your YouTube stream key or Google password in this website.

The Watch Live page uses browser-local storage for the video ID. Set the URL on the same browser/device where you want the Watch Live page configured. GitHub Pages is static hosting, so settings are not shared between visitors.
