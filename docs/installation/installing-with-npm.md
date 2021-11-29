
# Inštalácia ID-SK Frontend pomocou Node Package Manager (NPM)**

  

## Požiadavky

Aby ste mohli používať ID-SK Frontend pomocou NPM:

1. Nainštalujte si verziu [Node.js](https://nodejs.org/en/) s dlhodobou podporou (LTS), ktorá obsahuje NPM. Minimálna požadovaná verzia Node je 4.2.0. (Na správu verzií Node odporúčame použiť [nvm](https://github.com/creationix/nvm).)

2. Vytvorte [package.json](https://docs.npmjs.com/files/package.json) súbor, ak ho ešte nemáte. Môžete vytvoriť predvolený súbor spustením `npm init` z koreňovej zložky vašej aplikácie.

3. Ak chcete použiť ID-SK Frontend Nunjucks makrá, nainštalujte Nunjucks. Minimálna požadovaná verzia je 3.0.0.

```
npm install nunjucks --save
```

## Inštalácia

Pre inštaláciu spustite:  

```
npm install --save govuk-frontend
```

Po skončení inštalácie ID-SK Frontend, balík govuk-frontend sa objaví v súbore
```
node_modules
```
  

## Importovanie štýlov

Štýly ID-SK Frontend musíte importovať do hlavného súboru Sass vo vašom projekte. Ak chcete nahradiť ID-SK Frontend vlastnými štýlmi, mali by ste umiestniť nasledujúci kód pred svoje vlastné Sass pravidlá (alebo Sass importy).

  

1. Pre import všetkých komponentov, do svojho Sass súboru pridajte:
```SCSS
@import  '@id-sk/frontend/idsk/all';
```
2. Pre import individuálneho GOVUK komponentu (napríklad tlačidla), do svojho Sass súboru pridajte:
```SCSS
@import  "node_modules/@id-sk/frontend/govuk/components/button/button";
```
3. Pre import individuálneho ID-SK komponentu (napríklad hlavičky), do svojho Sass súboru pridajte:
```SCSS
@import  "node_modules/@id-sk/frontend/idsk/components/header/header";
```

### Voliteľné: Ošetrenie SCSS importovacích ciest

Ak chcete ošetriť vyššie uvedené `@import` cesty vo vašej zostave (aby ste sa vyhli prefixovaniu ciest s `node_modules`), pridajte `node_modules` do [Sass include paths](https://github.com/sass/node-sass#includepaths) (v Ruby ich treba pridať do [assets paths](http://guides.rubyonrails.org/asset_pipeline.html#search-paths)).

Napríklad, ak váš projekt používa Gulp, pridali by ste [Sass include paths](https://github.com/sass/node-sass#includepaths) do Gulp konfiguračného súboru (napríklad `gulpfile.js`) s [gulp-sass](https://www.npmjs.com/package/gulp-sass).

```JS
gulp.task('sass', function () {
  return  gulp.src('./sass/**/*.scss')
    .pipe(sass({
      includePaths:  'node_modules'
    }))
    .pipe(gulp.dest('./css'));
});
```
Ak už vo svojom projekte kompilujete Sass do CSS, pravdepodobne máte podobnú Gulp úlohu ako v príklade vyššie. V takom prípade iba zahrňte cestu do `includePaths`.

Po ošetrení importovacích ciest môžete importovať ID-SK Frontend použitím:
```SCSS
@import  "govuk-frontend/govuk/components/button/button";
```

### Global Styles

ID-SK Frontend sa vyhýba globálnemu aplikovaniu štýlov na prvky HTML, ako napríklad `body`; namiesto toho sú štýly aplikované používaním tried.

Predíde sa tým riziku konfliktu globálnych štýlov s akýmikoľvek existujúcimi globálmi, napríklad v ID-SK Elements alebo ID-SK Template alebo s akýmkoľvek CSS špecifickým pre aplikáciu.  

Tieto [globálne štýly](../../src/govuk/core/_global-styles.scss) nie sú predvolene zahrnuté v ID-SK Frontend. Ak ich chcete zahrnúť do svojej aplikácie, pred importom štýlov ID-SK Frontend do aplikácie môžete nastaviť premennú `$govuk-global-styles` na `true`:

```SCSS
// application.scss
  
$govuk-global-styles: true;  
@import  '@id-sk/frontend/idsk/all';
```

### Používanie ID-SK Frontend so starými frameworkami

Ako nakonfigurovať [ID-SK Frontend for compatibility](https://github.com/id-sk/id-sk-frontend/blob/master/docs/installation/compatibility.md) s ID-SK Frontend Toolkit, ID-SK Template alebo ID-SK Elements.

## JavaScript

JavaScript obsiahnutý v ID-SK frontend zlepšuje použiteľnosť a prístupnosť komponentov.

JavaScript napríklad:

- umožňuje linky, ktoré sú dizajnované ako tlačidlá, spúšťať medzerníkom pri focuse, čo zodpovedá správaniu natívnych tlačidiel a spôsobu, akým sú tlačidlá opísané pri používaní asistenčných technológií.
- rozširuje komponent Details, aby mohli používatelia asistenčných technológií pochopiť, či je zbalený alebo rozbalený a zaistiť, aby sa komponent správal správne pre používateľov prehliadača Internet Explorer 8.

Môžete zahrnúť alebo [import](https://github.com/id-sk/id-sk-frontend/blob/master/docs/installation/installing-with-npm.md#option-2-import-javascript)ovať ID-SK Frontend JavaScript a následne script inicializovať vo svojej aplikácii aby ste sa uistili, že všetci používatelia ho dokážu použiť.

Upozorňujeme, že ID-SK Frontend defaultne neinicializuje žiadne skripty; aby fungovali všetky skripty, musia byť inicializované.
  

### Možnosť 1: Zahrnúť JavaScript

Zahrňte script `node_modules/govuk-frontend/govuk/all.js` na vašu stránku. Možno budete chcieť súbor skopírovať do svojho projektu alebo naň odkazovať cez `node_modules`.

Pre inicializáciu všetkých komponentov použite funkciu `initAll`.

JavaScript v ID-SK Frontend vyžaduje, aby bolo HTML predtým, ako sa inicializuje analyzované prehliadačom. Z tohto dôvodu sa uistite, že ste script zahrnuli pred `</body>` tag. Zahrnutie skriptu na iné miesto zabráni správnemu fungovaniu komponentov alebo ich zobrazeniu.

```html
    <script  src="path-to-assets/govuk-frontend/govuk/all.js"></script>
    <script>window.GOVUKFrontend.initAll()</script>
  </body>
</html>
```

#### Inicializácia ID-SK Frontend iba v určitých sekciách stránky

Funkcia `initAll` z ID-SK Frontend predvolene inicializuje všetky komponenty s rozsahom na celú stránku pomocou objektu `document` .

Zmeniť to môžete presunutím parametra `scope` do funkcie `initAll`.

Napríklad, ak máte modálne dialógové okno, ktoré sa otvára s novým markupom, môžete urobiť nasledovné:

```js
var  $modal = document.querySelector('.modal')
window.GOVUKFrontend.initAll({
  scope:  $modal
})
```

#### Inicializácia individuálnych zahrnutých komponentov

ID-SK Frontend komponenty s JavaScript správaním majú vo svojom markupe nastavený atribút `data-module`.

Tento atribút môžete použiť na manuálnu inicializáciu komponentu. Môže to byť užitočné, ak pridávate markup na stránku po jej načítaní.  

Na inicializáciu prvého radio-komponentu na stránke použite:

```js
var  Radios = window.GOVUKFrontend.Radios
var  $radio = document.querySelector('[data-module="govuk-radios"]')
if ($radio) {
  new  Radios($radio).init()
}
```

  

### Možnosť 2: Importovať JavaScript

Ak používate balík ako napríklad Webpack, na import všetkých komponentov použite syntax `import`. Pre ich inicializáciu použite funkciu `initAll`:  

```JS
import { initAll } from  'govuk-frontend'
initAll()
```
 
Ak používate balík ako napríklad napríklad [Browserify](http://browserify.org/), možno budete musieť použiť požiadavku CommonJS `require`:  

```JS
const  GOVUKFrontend = require('govuk-frontend')
GOVUKFrontend.initAll()
```

#### Import individual components

Ak používate balík ako napríklad Webpack, pre importovanie komponentu použite syntax `import`:

```JS
import { Radios } from  'govuk-frontend'
```

**Ak používate balík ako napríklad napríklad [Browserify](http://browserify.org/), možno budete musieť použiť požiadavku CommonJS require:**  

```JS
const  GOVUKFrontend = require('govuk-frontend')
const  Radios = GOVUKFrontend.Radios
```

ID-SK Frontend (GOV.UK) komponenty s JavaScript správaním majú vo svojom markupe nastavený atribút data-module.

Tento atribút môžete použiť na manuálnu inicializáciu komponentu. Môže to byť užitočné, ak pridávate markup na stránku po jej načítaní.

Na inicializáciu prvého rádiového komponentu na stránke použite:

```js
var  $radio = document.querySelector('[data-module="govuk-radios"]')
if ($radio) {
  new  Radios($radio).init()
}
```

  

### Polyfills


Polyfill JavaScript poskytuje funkčnosť v starších prehliadačoch alebo podporných technológiách, ktoré ju natívne nepodporujú.

Účelom polyfillov poskytovaných s ID-SK Frontend je vyriešiť problémy s použiteľnosťou a prístupnosťou. Ak je v adresári komponentov JavaScript, je dôležité ho importovať a inicializovať vo vašom projekte, aby ste zaistili, že ho môžu všetci používatelia správne používať (pozri [Polyfilling](/docs/contributing/polyfilling.md)).

### Ako je ID-SK Frontend zabalený

JavaScript zahrnutý v ID-SK Frontend komponentoch je v [UMD (Universal Module Definition)](https://github.com/umdjs/umd) formáte, čo zabezpečuje kompatibilitu s AMD (Asynchronous module definition) a CommonJS.

Viac o tom, ako je JavaScript použitý v projekte: [JavaScript Coding Standards](https://github.com/id-sk/id-sk-frontend/blob/master/docs/contributing/coding-standards/js.md)

#### Použitie ID-SK Frontend s Webpack 4
To je príklad, ako nastaviť [webpack.config.js](https://github.com/id-sk/id-sk-frontend/blob/master/docs/installation/examples/webpack/webpack.config.js) do vášho projektu.

## Importovanie assetov

Ak chcete do svojho projektu importovať obrázky a písma z ID-SK Frontend, mali by ste nakonfigurovať svoju aplikáciu tak, aby odkazovala alebo kopírovala príslušné ID-SK Frontend assety.

Držte sa bud’ [Odporúčaného riešenia](#recommended-solution) alebo [Alternatívneho riešenia](#alternative-solution).

### Odporúčané riešenie  

Sprístupnite `/node_modules/govuk-frontend/assets` pre váš projekt smerovaním požiadaviek na priečinok s assetmi.

Napríklad, ak váš projekt využíva [express.js](https://expressjs.com/), nižšie je ukážka kódu, ktorú môžete pridať do svojej konfigurácie: 

```JS
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/assets')))
```

### Alternatívne riešenie

Obrázky a fonty skopírujte manuálne z `/node_modules/govuk-frontend/assets` do verejného adresára vo vašom projekte. V ideálnom prípade by kopírovanie súborov do vášho projektu malo byť automatizovanou úlohou alebo súčasťou pipeline, aby sa zaistilo, že ID-SK Frontend assety zostanú aktuálne.

Predvolené cesty pre assety sú `assets/images` a `assets/fonts`. **Ak majú vaše priečinky assetov takúto štruktúru, nebudete musieť robiť nasledujúce kroky.**

Ak chcete použiť iné cesty assetov, vykonajte tiež nasledovné kroky:

1. Nastavte `$idsk-assets-path, $idsk-images-path` a `$idsk-fonts-path` do vášho projektového Sass súboru tak, aby odkazoval na príslušné adresáre v projekte (prepíše sa tým predvolené nastavenie v /node_modules/govuk-frontend/settings/_assets.scss). Uistite sa, že ste tak urobili pred importovaním govuk-frontend do vášho projektu – pozri [Importing styles](https://github.com/id-sk/id-sk-frontend/blob/master/docs/installation/installing-with-npm.md#importing-styles).

Príklad 1:
``` SCSS
// Include images from /application/assets/images and fonts from /application/assets/fonts
$idsk-assets-path: '/application/assets';
@import  "govuk-frontend/govuk/all";
```
Príklad 2:

``` SCSS
// Include images from /images/govuk-frontend and fonts from /fonts
$idsk-images-path: "/images/govuk-frontend/";
$idsk-fonts-path: "/fonts/";
@import  "govuk-frontend/govuk/all";
```

2. Nepovinné: Môžete tiež prepísať pomocníkov, ktorí sa používajú na generovanie url adries assetov, napríklad ak používate sass-rails asset-pipeline. Môžete to urobiť nastavením `$idsk-image-url-function` na názov funkcie (funkcií), ktoré chcete použiť. Ďalšie informácie a príklady nájdete na stránke `src/govuk/settings/_assets.scss`.
 
## Zahrnutie CSS a JavaScript

Pridajte CSS a JavaScript kód do vašej HTML šablóny:

```html
<!DOCTYPE  html>
  <head>
    <title>Example</title>
    <link  rel="stylesheet"  href="assets/application.css">
  </head>
  <body>
    <!-- Copy and paste component HTML-->
    <button  class="govuk-button">This is a button component</button>
    <script  src="assets/application.js"></script>
  </body>
</html>
```

Ak vaša služba podporuje Internet Explorer 8, budete musieť vygenerovať a zahrnúť aj osobitnú šablónu so štýlmi.
