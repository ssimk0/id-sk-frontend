# Inštalácia ID-SK Frontend z dist

## Obmedzenia

Pri inštalácii z `dist` sa používajú kompilované a minifikované verzie šablóny so štýlmi. To znamená, že nebudete môcť:

- selektívne zahrnúť CSS alebo JavaScript pre jednotlivé komponenty
- zostaviť si vlastné štýly alebo komponenty na základe palety alebo typografických či medzerových kombinácií.
- prispôsobiť zostavu (napríklad prepísať farby alebo povoliť globálne štýly)
- Použiť komponenty z Nunjucks šablón.

Ak požadujete niektorú z týchto funkcií, je výhodnejšie nainštalovať ID-SK Frontend pomocou [node package manager](https://github.com/id-sk/id-sk-frontend/blob/master/docs/installation/installing-with-npm.md).


## Kroky k inštalácii

### 1. Stiahnite si zdroje


Stiahnite si najnovšie kompilované a minifikované verzie šablón štýlov, JavaScript a assetov:

- [CSS a JS](https://github.com/id-sk/id-sk-frontend/tree/master/dist)
- [Assety](https://github.com/id-sk/id-sk-frontend/tree/master/dist/assets)

### 2. Zahrňte zdroje

Skopírujte celý `assets` priečinok do rootu vašej služby.

Podľa nižšie uvedeného príkladu pridajte súbory CSS a JavaScript do šablóny HTML. Tento príklad predpokladá, že ste skopírovali šablóny so štýlmi a JavaScript súbory do `/stylesheets` a `/javascript`.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ukážka</title>
    <!--[if !IE 8]><!-->
      <link rel="stylesheet" href="stylesheets/govuk-frontend-[latest version].min.css">
    <!--<![endif]-->
    <!--[if IE 8]>
      <link rel="stylesheet" href="stylesheets/govuk-frontend-ie8-[latest-version].min.css">
    <![endif]-->
  </head>
  <body>
    <!-- Copy and paste component HTML-->
    <button class="govuk-button">Toto je komponent tlačidlo</button>
    <script src="javascript/govuk-frontend-[latest version].min.js"></script>
    <script>window.GOVUKFrontend.initAll()</script>
  </body>
</html>
```
