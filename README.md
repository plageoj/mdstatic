# mdStatic

Build a simple and lightweight static website with markdown

## Quick start

+ Clone this repository
+ Change "`Your site name`" in `index.html` and `src/js/all.js`
+ Do `npm install`
+ Then open `index.html` in your browser, the page is ready!
+ Deploy to any hosting service or gh-pages

## Change content

Your content is in `/md/[lang]/`. You may add new files and/or folders.

The URL of `/md/[lang]/path/to/content.md` will be `index.html#x/path/to/content`

When the user accesses `index.html` without suffix, `/md/[lang]/home.md` is loaded.

## Menu and languages

Top menu structure and language list is defined by `menu.json`. Here is a short example:

```json
{
    "ja": {
        "c": "日本語",
        "m": [{
            "t": "ホーム",
            "u": ""
        }, {
            "t": "プロフィール",
            "u": "about"
        }]
    },
    "en": {
        "c": "English",
        "m": [{
            "t": "Home",
            "u": ""
        }, {
            "t": "About me",
            "u": "about"
        }]
    },
    "lang-code": {
        "c": "Lang-name",
        "m": [{
            "t": "item text",
            "u": "link url"
        }]
    }
}
```
