/* empty css                                   */
import { a as createAstro, c as createComponent, m as maybeRenderHead, s as spreadAttributes, d as addAttribute, r as renderTemplate, b as renderComponent, F as Fragment, u as unescapeHTML } from '../../chunks/astro/server_OcGr0KEC.mjs';
import { $ as $$Layout, l as lang_es } from '../../chunks/Layout_DV1peyq8.mjs';
import { A as Api, i as imageUrl } from '../../chunks/tina_YnfrB-oI.mjs';
export { renderers } from '../../renderers.mjs';

const icons = {"local":{"prefix":"local","lastModified":1748312326,"icons":{"bathtub":{"body":"<path fill=\"currentColor\" d=\"M1664 1088v192q0 169-128 286v194q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-118q-63 22-128 22H512q-65 0-128-22v110q0 17-9.5 28.5T352 1792h-64q-13 0-22.5-11.5T256 1752v-186q-128-117-128-286v-192zM704 672q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m128 0q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m1088 512v64q0 14-9 23t-23 9H32q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h96V256q0-106 75-181T384 0q108 0 184 78 46-19 98-12t93 39l22-22q11-11 22 0l42 42q11 11 0 22L531 461q-11 11-22 0l-42-42q-11-11 0-22l22-22q-36-46-40.5-104T472 163q-37-35-88-35-53 0-90.5 37.5T256 256v640h1504q14 0 23 9t9 23M896 480q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m192 64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m192 64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m-64-64q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23m128 0q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23\"/>","width":1792,"height":1792},"bed":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"><path d=\"M21 4v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2\"/><path d=\"M3 8h8V6m10 2h-8V6\"/></g>"},"bus-fill":{"body":"<g fill=\"none\" fill-rule=\"evenodd\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M11.022 3H18a3 3 0 0 1 3 3 1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7a2 2 0 0 1-1 1.732v.768a1.5 1.5 0 0 1-3 0V19H7v.5a1.5 1.5 0 0 1-3 0v-.768A2 2 0 0 1 3 17v-7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1 3 3 0 0 1 3-3zm.596 2h2.764l-1.276 2.553a1 1 0 1 0 1.788.894L16.618 5H18a1 1 0 0 1 1 1v5H5V6a1 1 0 0 1 1-1h3.382L8.106 7.553a1 1 0 0 0 1.788.894zM6 15a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m9 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1\"/></g>"},"bus-tour":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12 2C8.229 2 6.343 2 5.172 3.172 4.108 4.235 4.01 5.886 4 9H3a1 1 0 0 0-1 1v1a1 1 0 0 0 .4.8L4 13c.01 3.114.108 4.765 1.172 5.828.242.243.514.435.828.587V21a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-1.018C10.227 20 11.054 20 12 20s1.773 0 2.5-.018V21a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-1.585a3 3 0 0 0 .828-.587C19.892 17.765 19.991 16.114 20 13l1.6-1.2a1 1 0 0 0 .4-.8v-1a1 1 0 0 0-1-1h-1c-.01-3.114-.108-4.765-1.172-5.828C17.657 2 15.771 2 12 2M5.5 9.5c0 1.414 0 2.121.44 2.56.439.44 1.146.44 2.56.44h7c1.414 0 2.121 0 2.56-.44.44-.439.44-1.146.44-2.56V7c0-1.414 0-2.121-.44-2.56C17.622 4 16.915 4 15.5 4h-7c-1.414 0-2.121 0-2.56.44C5.5 4.878 5.5 5.585 5.5 7zm.75 6.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75m11.5 0a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 .75-.75\" clip-rule=\"evenodd\"/>"},"flat-tv":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M3.2 5.2v12.6h17.6V5.2zM2 5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm6 15.9c0-.331.266-.6.601-.6H15.4c.332 0 .601.278.601.6v.6H8zm3.665-12.004H9.81V15H8.716V8.896H6.558v-.942h5.958l1.919 5.816h.029l1.924-5.816h1.167L15.04 15h-1.196z\"/>"},"jacuzzi":{"body":"<path fill=\"currentColor\" d=\"M7 9q-.825 0-1.412-.587T5 7t.588-1.412T7 5t1.413.588T9 7t-.587 1.413T7 9M5 22q-.425 0-.712-.288T4 21q-.825 0-1.412-.587T2 19v-6h3v-.75q0-.95.65-1.6t1.6-.65q.5 0 .925.2t.775.55l1.4 1.55q.2.2.388.375t.412.325H18V4.85q0-.35-.25-.6t-.6-.25q-.15 0-.288.063t-.262.187L15.35 5.5q.125.425.05.838t-.3.762l-2.75-2.8q.35-.225.75-.288t.8.088l1.25-1.25q.4-.4.913-.625T17.15 2q1.2 0 2.025.825T20 4.85V13h2v6q0 .825-.587 1.413T20 21q0 .425-.288.713T19 22zm-1-3h16v-4H4zm0 0h16z\"/>"},"streaming":{"body":"<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M15.41 6.788c.15.18.37.28.59.28h.01a.743.743 0 0 0 .59-1.21c-1.16-1.45-2.83-2.28-4.59-2.28s-3.44.83-4.59 2.28a.748.748 0 0 0 1.17.93c.86-1.09 2.11-1.72 3.41-1.72s2.54.63 3.41 1.72M7 22.068h10c2 0 3 0 3.88-.5.59-.34 1.05-.81 1.37-1.37.5-.87.5-1.88.5-3.87s0-3-.5-3.87q-.495-.855-1.38-1.38c-.87-.5-1.87-.5-3.87-.5H7c-2 0-3 0-3.88.5-.59.34-1.05.81-1.37 1.37-.5.87-.5 1.88-.5 3.87s0 3 .5 3.87q.495.855 1.38 1.38c.87.5 1.87.5 3.87.5m-3.13-9.7c.53-.3 1.4-.3 3.13-.3h10c1.74 0 2.61 0 3.12.3.36.21.64.49.83.83.3.53.3 1.4.3 3.13s0 2.6-.3 3.13c-.19.34-.47.61-.82.82-.53.3-1.4.3-3.13.3H7c-1.74 0-2.61 0-3.12-.3-.36-.21-.64-.49-.83-.83-.3-.53-.3-1.4-.3-3.13s0-2.6.3-3.13c.19-.34.47-.61.82-.82m10.129-3.3c-.22 0-.44-.1-.59-.28-.73-.91-2.1-.91-2.83 0-.26.32-.73.37-1.05.12a.75.75 0 0 1-.12-1.05c.65-.81 1.59-1.28 2.59-1.28s1.93.47 2.59 1.28c.26.32.21.8-.12 1.05-.14.11-.3.16-.47.16m3.001 10h2c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-1.25v-.5h.75c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-.75v-.5H19c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-2c-.41 0-.75.34-.75.75v4c0 .41.34.75.75.75m-4.7-.49c.11.3.39.49.7.49h.02c.31 0 .59-.2.7-.49l1.5-4a.76.76 0 0 0-.44-.97.75.75 0 0 0-.97.44l-.8 2.13-.8-2.13a.75.75 0 0 0-.97-.44.75.75 0 0 0-.44.97zm-4.05-.26c0 .41.34.75.75.75s.75-.34.75-.75v-4c0-.41-.34-.75-.75-.75s-.75.34-.75.75zm-4 0c0 .41.34.75.75.75h1.5c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-.75v-3.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75z\" color=\"currentColor\"/>"},"tour-bus":{"body":"<g fill=\"none\"><path stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"4\" d=\"M9 23h30v11a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2zM9 8a2 2 0 0 1 2-2h26a2 2 0 0 1 2 2v15H9z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"4\" d=\"M15 42a3 3 0 0 1-3-3v-3h6v3a3 3 0 0 1-3 3m18 0a3 3 0 0 1-3-3v-3h6v3a3 3 0 0 1-3 3\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"4\" d=\"M6 12v4m36-4v4\"/><circle cx=\"15\" cy=\"30\" r=\"2\" fill=\"currentColor\"/><circle cx=\"33\" cy=\"30\" r=\"2\" fill=\"currentColor\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"4\" d=\"m31 6-9 10m16-9-5 6\"/></g>","width":48,"height":48},"vending-machine":{"body":"<path fill=\"currentColor\" d=\"M100 29v454h312V29zm18 18h210v338H118zm226 16h50v66h-50zm18 18v30h14V81zm-203 7v23h-16v18h160v-18h-64V80l-16 6-6 25h-26V88zm194 55h32v18h-32zm-90 10.8c-5.4 0-10.1 3-12.8 6.7-2.9 4.9-4.5 9.6-4.1 14.5H143v18h160v-18h-23.1c.3-5.1-1.6-11-4.1-14.5-2.7-3.7-7.4-6.7-12.8-6.7m90 21.2h32v18h-32zm-194 41v23h-16v18h160v-18h-24v-23h-24v23h-32v-31h-16v31h-32v-15zm8 61.4c-6.1 0-10.8 3.9-13.3 8-3.2 6.1-4 11.5-3.5 17.6H143v18h160v-18h-64v-23h-32v23h-23.2c.6-6-.7-13-3.5-17.6-2.5-4.1-7.2-8-13.3-8M353 351h32v18h-32zm-235 52h210v62H118zm18 18v26h174v-26z\"/>","width":512,"height":512},"water-hot":{"body":"<path fill=\"currentColor\" d=\"M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.23.1-.47.04-.66-.12a.6.6 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5.14.6.41 1.2.71 1.73 1.08 1.73 2.95 2.97 4.96 3.22 2.14.27 4.43-.12 6.07-1.6 1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6-1.12.4-2.24-.16-2.9-.82 1.19-.28 1.9-1.16 2.11-2.05.17-.8-.15-1.46-.28-2.23-.12-.74-.1-1.37.17-2.06.19.38.39.76.63 1.06.77 1 1.98 1.44 2.24 2.8.04.14.06.28.06.43.03.82-.33 1.72-.93 2.27\"/>"},"wifi":{"body":"<path fill=\"currentColor\" d=\"M12 21q-1.05 0-1.775-.725T9.5 18.5t.725-1.775T12 16t1.775.725.725 1.775-.725 1.775T12 21m-5.65-5.65-2.1-2.15q1.475-1.475 3.463-2.337T12 10t4.288.875 3.462 2.375l-2.1 2.1q-1.1-1.1-2.55-1.725T12 13t-3.1.625-2.55 1.725M2.1 11.1 0 9q2.3-2.35 5.375-3.675T12 4t6.625 1.325T24 9l-2.1 2.1q-1.925-1.925-4.462-3.012T12 7 6.563 8.088 2.1 11.1\"/>"}},"width":24,"height":24}};

const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) {
    return internalGetIconData(data, name, []);
  }
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}

const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$1 = createAstro("https://www.harmonyhotelgroup.com");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
      this.hint = "";
    }
  }
  const req = Astro2.request;
  const { name = "", title, desc, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  const { viewBox } = normalizedProps;
  if (includeSymbol) {
    delete normalizedProps.viewBox;
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${desc && renderTemplate`<desc>${desc}</desc>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}${addAttribute(viewBox, "viewBox")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "href")}></use> ` })}`} </svg>`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/node_modules/.pnpm/astro-icon@1.1.5/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro = createAstro("https://www.harmonyhotelgroup.com");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const { lang } = Astro2.props;
  const api = new Api();
  const hoteles = await api.hotels();
  const hotel = hoteles.find((item) => item.hotel_id === Number(id));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "lang": lang_es, "title": `${hotel?.name}` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="relative h-[70vh]"> ${hotel?.coverImage && renderTemplate`<img${addAttribute(imageUrl({ url: hotel.coverImage, back: 1 }), "src")}${addAttribute(hotel?.name, "alt")} class="w-full h-full object-cover">`} <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-8 text-white"> <div class="container"> <h1 class="mb-4">${hotel?.name}</h1> <p class="text-xl mb-6">${hotel?.description_hotel}</p> <div class="flex items-center text-lg"> <span class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2"> <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd"></path> </svg> ${hotel?.location} </span> </div> </div> </div> </div>  <div class="bg-primary-500/10 dark:bg-primary-500/5 py-8"> <div class="container"> <div class="text-center mb-6"> <h2 class="text-2xl font-semibold">Book Your Stay</h2> <p class="text-neutral-600 dark:text-neutral-400">
Find your perfect room and make a reservation
</p> </div> </div> </div>  <section class="py-16"> <div class="container"> <h2 class="text-3xl font-semibold mb-8">Available Rooms</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> ${hotel?.rooms?.map((room) => renderTemplate`<div class="card overflow-hidden group"> <!-- Room Image Slider --> <div class="relative h-64"> <img${addAttribute(room?.images?.[0], "src")}${addAttribute(room?.name, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"> <div class="absolute top-4 right-4 bg-white dark:bg-neutral-800 rounded-full py-1 px-3 text-sm font-semibold text-primary-500">
From $${room?.price}/night
</div> </div> <div class="p-6"> <h3 class="text-xl font-semibold mb-2">${room?.name}</h3> <p class="text-neutral-600 dark:text-neutral-400 mb-4">${room?.description}</p> <div class="grid grid-cols-2 gap-4 mb-6"> <div> <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">Room Size</span> <p class="text-neutral-800 dark:text-neutral-200">${room?.size} m2</p> </div> <div> <span class="text-sm font-medium text-neutral-500 dark:text-neutral-400">Occupancy</span> <p class="text-neutral-800 dark:text-neutral-200">${room?.occupancy}</p> </div> </div> <div class="flex flex-wrap gap-2 mb-6"> ${room?.amenities?.map((amenity) => renderTemplate`<span class="inline-flex items-center text-sm bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-full"> ${amenity} </span>`)} </div> <div class="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700"> <div> <span class="text-2xl font-bold">$${room?.price}</span> <span class="text-neutral-600 dark:text-neutral-400"> / night</span> </div> <button class="btn btn-primary">Book Now</button> </div> </div> </div>`)} </div> </div> </section>  <section class="py-16 bg-neutral-50 dark:bg-neutral-800"> <div class="container"> <h2 class="text-3xl font-semibold mb-8">Hotel Amenities</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"> ${hotel?.amenities?.map((amenity) => {
    return renderTemplate`<div class="text-center"> <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500"> ${renderComponent($$result2, "Icon", $$Icon, { "name": amenity?.amenities?.icon, "size": "40" })} </div> <h3 class="font-medium">${amenity?.amenities?.name}</h3> </div>`;
  })} </div> </div> </section>  <section class="py-16"> <div class="container"> <h2 class="text-3xl font-semibold mb-8">Photo Gallery</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${hotel?.gallery?.map((image) => renderTemplate`<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"> ${image && renderTemplate`<img${addAttribute(imageUrl({ url: image, back: 1 }), "src")} alt="Hotel gallery image" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">`} </div>`)} </div> </div> </section> ` })} <!--
<style define:vars={{
    primaryColor: hotel.theme.primary,
    secondaryColor: hotel.theme.secondary,
    accentColor: hotel.theme.accent
}}>
    :root {
        --color-primary: var(--primaryColor);
        --color-secondary: var(--secondaryColor);
       --color-accent: var(--accentColor);
}
</style>
-->`;
}, "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/hotels/[id].astro", void 0);

const $$file = "/home/runner/work/harmonyhotelgroup_website/harmonyhotelgroup_website/src/pages/hotels/[id].astro";
const $$url = "/hotels/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
