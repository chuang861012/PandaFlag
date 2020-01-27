import { ehApi } from './api';
import { parseCountryCode, parseLink } from './utils';

(async function () {
    const galleryTitleElements = document.querySelectorAll(".glink");
    const galleryIdentifiers = [];

    // get all request data
    galleryTitleElements.forEach(
        e => {
            while (e.tagName !== "A" && e.parentElement !== null) {
                if (e.parentElement === null) break;
                e = e.parentElement;
            }
            const link = e.getAttribute("href");
            if (link) {
                galleryIdentifiers.push(parseLink(link));
            }
        }
    );

    // get all gallery data
    const pending = await Promise.all(ehApi.get(galleryIdentifiers));
    const tags = pending.reduce((acc, val) => acc.concat(val), []);

    // add language flag
    for (let i = 0; i < galleryTitleElements.length; i++) {
        const language = tags[i].length > 0 ? tags[i][0].substring(9) : "japanese";
        const countryCode = parseCountryCode(language);
        if (!countryCode) continue;
        const link = `https://www.countryflags.io/${parseCountryCode(language)}/flat/16.png`;
        if (link) {
            const flagImage = document.createElement("img");
            flagImage.setAttribute("src", link);
            flagImage.style.verticalAlign = 'middle';
            galleryTitleElements[i].prepend(flagImage);
        }
    }

})();