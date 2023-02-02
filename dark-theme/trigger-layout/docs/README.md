# Trigger Layout

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

This app allow change the class from active to inactive of a block by clicking in a trigger component.

## Configuration

### Step 1 - Adding the Expandable Drawer app to your theme's dependencies

In your theme's `manifest.json`, add the Expandable Drawer app as a dependency:

```json
    "dependencies": {
        "dockerscl.trigger-layout": "0.x"
    }
```

Now you are able to use all the blocks exported by the `trigger-layout` app. Check out
 the full list below:

|Block Name|Description|
|-----------|----------|
|`trigger`| This app doesn't render by itself, but render the children which when they are pressed send the event to activate or deactivate the layout |
|`trigger-layout`| This app doesn't render by itself, but render the children on it wrapped by a div element that change the classes to active or inactive |
|`trigger-intersection`| This component trigger an event when the children are in the viewport, changing the class in the trigger layout from active to inactive|

### Step 2 - Adding the Trigger Layout to page templates

You have to define the Trigger Layout as shown below. This example show a `trigger#search-trigger` that has a menu item as child element and when is clicked will change the style class of the `trigger-layout#search` from active to inactive and viceversa.

```json
{
    "trigger#search-trigger": {
        "children": [
            "menu-item#search"
        ]
    },
    "trigger-layout#search": {
        "children": [
            "search-bar"
        ]
    }
}
```

Then you can customize the css styles, for example to show or hide the search bar you have to write the code in the file `dockerscl.trigger-layout.css`: 

```css
    .layoutContainer--active {
        display: block;
    }

    .layoutContainer--inactive {
        display: none;
    }
```

### `trigger` props

| Prop name | Type     | Description | Default value |
| --------- | -------- | ----------- | ------------- |
| `defaultState`   | `boolean` | Indicates the default state of the trigger layout (true for active and false for inactive) | `false` |
| `customPixelEventId` | `string` | Indicate a custom pixel event id in the case you have two trigger layouts | `trigger-event` |

### `trigger-layout` props

| Prop name | Type     | Description | Default value |
| --------- | -------- | ----------- | ------------- |
| `customPixelEventId` | `string` | Indicate a custom pixel event id in the case you have two trigger layouts | `trigger-event` |

### `trigger-intersection` props

| Prop name | Type     | Description | Default value |
| --------- | -------- | ----------- | ------------- |
| `customPixelEventId` | `string` | Indicate a custom pixel event id in the case you have two trigger layouts | `trigger-intersection-event` |
| `rootMargin` | `string` | Intersection observer rootMargin property | `0px` |
| `threshold` | `number` | Intersection observer threshold property | `0` |
| `inverted` | `boolean` | If is inverted will hide the element when is in viewport | `false` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

Thereafter, you should add a single column table with the available CSS handles for the app, like the one below. Note that the Handles must be ordered alphabetically.

| CSS Handles |
| ----------- |
| `layoutContainer` |
| `layoutContainer--active` |
| `layoutContainer--inactive` |

You can define a blockClass in the trigger-layout to customize an specific element, in that case the handler will be like:

| CSS Handles with blockClass |
| ----------- |
| `layoutContainer--blockClass--active` |
| `layoutContainer--blockClass--inactive` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

---
