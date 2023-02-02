# csv-characteristics

# CSV Characteristics

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

For use inside the Store theme.
Show the product description in two parts

- Show the product description with the `custom-product-description` interface
- Show a table of specifications with the `csv-characteristics` interface

![IMG1](csv1.png)

## Configuration

1. Add the app as a dependency in your store theme

```
"store-them.csv-characteristics": "0.x"
```

2. Declare the app block in your store inside the product page

```
{
   ...
   "children":[
      "csv-characteristics"
   ]
}
```

```
{
   ...
   "children":[
      "custom-product-description"
   ]
}
```

Note: For this to work from the catalog, the text of the description with separators must be put in the product description attribute
This separator to separate the description and the specifications: "%-!-%!"
and this to indicate newlines: "|"
Also in the characteristics part separate by commas as a csv file.

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

- Luis Fernando Bailon

<!-- DOCS-IGNORE:end -->

# Licence

MIT License

Copyright (c) 2021 Ecomsur

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
