globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, a as HTTPError, t as toEventHandler, b as defineLazyEventHandler, H as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/Jisoo_Jang_Resume.pdf": {
    "type": "application/pdf",
    "etag": '"33bc2-oi5P/JrdJGpn7+EkB1J2DcGw7+8"',
    "mtime": "2026-05-23T23:23:49.723Z",
    "size": 211906,
    "path": "../public/Jisoo_Jang_Resume.pdf"
  },
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": '"1804-3y++sUAKzaCQmjLBz2v0kvESHgc"',
    "mtime": "2026-05-23T23:23:49.719Z",
    "size": 6148,
    "path": "../public/.DS_Store"
  },
  "/Scaffold/01_visual01.png": {
    "type": "image/png",
    "etag": '"3c748-zMUe3XY2udRAeBL8oBPbS6JIJz4"',
    "mtime": "2026-05-23T23:23:49.699Z",
    "size": 247624,
    "path": "../public/Scaffold/01_visual01.png"
  },
  "/Scaffold/03_visual03.png": {
    "type": "image/png",
    "etag": '"35fbc-aYaLYaIWQiLtS2AvpfQ1spfon9c"',
    "mtime": "2026-05-23T23:23:49.699Z",
    "size": 221116,
    "path": "../public/Scaffold/03_visual03.png"
  },
  "/Scaffold/04_visual04.png": {
    "type": "image/png",
    "etag": '"2d6e3-7N1K5A2tN1Tj2MCS+Op0CE0JcE0"',
    "mtime": "2026-05-23T23:23:49.704Z",
    "size": 186083,
    "path": "../public/Scaffold/04_visual04.png"
  },
  "/Scaffold/07_user_flow.webp": {
    "type": "image/webp",
    "etag": '"28f54-/oeSy1R9sT3DsQ1tQV0JCw9fVSI"',
    "mtime": "2026-05-23T23:23:49.699Z",
    "size": 167764,
    "path": "../public/Scaffold/07_user_flow.webp"
  },
  "/Scaffold/02_visual02.png": {
    "type": "image/png",
    "etag": '"3a5e3-BwBFKsje1QdYlBdtsYYEdm4UNlQ"',
    "mtime": "2026-05-23T23:23:49.709Z",
    "size": 239075,
    "path": "../public/Scaffold/02_visual02.png"
  },
  "/Scaffold/05_research.webp": {
    "type": "image/webp",
    "etag": '"5c7da-tIuVCOQ8KZTaZpv5X8HmrHwzruc"',
    "mtime": "2026-05-23T23:23:49.700Z",
    "size": 378842,
    "path": "../public/Scaffold/05_research.webp"
  },
  "/Scaffold/15_storytelling01.webp": {
    "type": "image/webp",
    "etag": '"6ce82-4+nyRXURXCdoBOmFHd4ZSMJlaa8"',
    "mtime": "2026-05-23T23:23:49.710Z",
    "size": 446082,
    "path": "../public/Scaffold/15_storytelling01.webp"
  },
  "/Scaffold/20_showcase02.jpeg": {
    "type": "image/jpeg",
    "etag": '"5b69b-1mtdPcOim4pRKwwt2Rsd5VQayPc"',
    "mtime": "2026-05-23T23:23:49.717Z",
    "size": 374427,
    "path": "../public/Scaffold/20_showcase02.jpeg"
  },
  "/Scaffold/22_showcase04.jpeg": {
    "type": "image/jpeg",
    "etag": '"7624b-tttVD1uLOtv21kfQw65iYWO4rJA"',
    "mtime": "2026-05-23T23:23:49.718Z",
    "size": 483915,
    "path": "../public/Scaffold/22_showcase04.jpeg"
  },
  "/Scaffold/17_storytelling03.jpg": {
    "type": "image/jpeg",
    "etag": '"5f100-0wkT9+cLtwU7tvbTW7Q3xnP6mLQ"',
    "mtime": "2026-05-23T23:23:49.713Z",
    "size": 389376,
    "path": "../public/Scaffold/17_storytelling03.jpg"
  },
  "/Scaffold/21_showcase03.jpeg": {
    "type": "image/jpeg",
    "etag": '"5412d-e/pNr9lP4YepjNTAmOBvV6Tv810"',
    "mtime": "2026-05-23T23:23:49.723Z",
    "size": 344365,
    "path": "../public/Scaffold/21_showcase03.jpeg"
  },
  "/assets/index-BIvVssdI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"592da-+SzMNYXd+pYVPDDiB5Ccp12OzvU"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 365274,
    "path": "../public/assets/index-BIvVssdI.js"
  },
  "/Scaffold/12_feature02.mp4": {
    "type": "video/mp4",
    "etag": '"d5bd1-xoCLcMOWWPghuCyVl/yK+sjG8+w"',
    "mtime": "2026-05-23T23:23:49.713Z",
    "size": 875473,
    "path": "../public/Scaffold/12_feature02.mp4"
  },
  "/Scaffold/09_lofis.webp": {
    "type": "image/webp",
    "etag": '"a484a-fsaqHaU07RbIkKLNK956dDGC5So"',
    "mtime": "2026-05-23T23:23:49.705Z",
    "size": 673866,
    "path": "../public/Scaffold/09_lofis.webp"
  },
  "/Scaffold/08_brand_guidelines.webp": {
    "type": "image/webp",
    "etag": '"bd7b6-T8ZUTy5thewGdiJMXQBdI+IxtJg"',
    "mtime": "2026-05-23T23:23:49.704Z",
    "size": 776118,
    "path": "../public/Scaffold/08_brand_guidelines.webp"
  },
  "/Scaffold/14_print.png": {
    "type": "image/png",
    "etag": '"83227-EgTTF10owgxwkUhK1iyFysYCHtM"',
    "mtime": "2026-05-23T23:23:49.719Z",
    "size": 537127,
    "path": "../public/Scaffold/14_print.png"
  },
  "/Scaffold/16_storytelling02.png": {
    "type": "image/png",
    "etag": '"9a468-Px3kf2qPOzfiPk379/FsKG2wcNM"',
    "mtime": "2026-05-23T23:23:49.714Z",
    "size": 631912,
    "path": "../public/Scaffold/16_storytelling02.png"
  },
  "/Scaffold/06_personas.webp": {
    "type": "image/webp",
    "etag": '"148bc0-wPODoBBlUgv7Dx5t4oJjxvL7gOc"',
    "mtime": "2026-05-23T23:23:49.702Z",
    "size": 1346496,
    "path": "../public/Scaffold/06_personas.webp"
  },
  "/Scaffold/10_hifis.webp": {
    "type": "image/webp",
    "etag": '"168c30-CJK26v72wl3r/m+bK1cUJj0ZNuQ"',
    "mtime": "2026-05-23T23:23:49.709Z",
    "size": 1477680,
    "path": "../public/Scaffold/10_hifis.webp"
  },
  "/Scaffold/19_showcase01.jpg": {
    "type": "image/jpeg",
    "etag": '"110a99-ZoTFOiLKz+SZimryxq8n3RKTBOM"',
    "mtime": "2026-05-23T23:23:49.716Z",
    "size": 1116825,
    "path": "../public/Scaffold/19_showcase01.jpg"
  },
  "/assets/index-CGgaULlz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5204-FKc4iDIT+4Qx927siGRF8rwU4uQ"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 20996,
    "path": "../public/assets/index-CGgaULlz.js"
  },
  "/assets/styles-C7lVrY8a.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"15de0-pm0o6W4XbdX3E0UtKVLduEW77hM"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 89568,
    "path": "../public/assets/styles-C7lVrY8a.css"
  },
  "/assets/work._slug-B6PQQf8P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"203-kHDysJCO0E18Dt897l1ApR6lI+I"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 515,
    "path": "../public/assets/work._slug-B6PQQf8P.js"
  },
  "/assets/proxy-CqWufbue.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"257f6-twfa+zzZkmNGAXbzhPK6Or+0af0"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 153590,
    "path": "../public/assets/proxy-CqWufbue.js"
  },
  "/assets/work._slug-DNXbbFbx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fb-EP2NY9vwGeCLkak7qspEqQmY5n4"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 251,
    "path": "../public/assets/work._slug-DNXbbFbx.js"
  },
  "/assets/work._slug-BdtrYXeP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16d7f-zVh/qRxmdBcWYwNMsGEg92Sbj6U"',
    "mtime": "2026-05-23T23:23:49.379Z",
    "size": 93567,
    "path": "../public/assets/work._slug-BdtrYXeP.js"
  },
  "/Scaffold/13_feature03.mp4": {
    "type": "video/mp4",
    "etag": '"24977d-lj3kXcQmCrmD+R64wudZ2LVPFVw"',
    "mtime": "2026-05-23T23:23:49.708Z",
    "size": 2398077,
    "path": "../public/Scaffold/13_feature03.mp4"
  },
  "/Scaffold/11_feature01.mp4": {
    "type": "video/mp4",
    "etag": '"212f3d-hLazGLWyzaAG8u6nb1RMpKBDgc0"',
    "mtime": "2026-05-23T23:23:49.708Z",
    "size": 2174781,
    "path": "../public/Scaffold/11_feature01.mp4"
  },
  "/Scaffold/18_promo_vid.mp4": {
    "type": "video/mp4",
    "etag": '"453232a-UDTLi4fZ/i/iVciuSejebOWEE4c"',
    "mtime": "2026-05-23T23:23:49.808Z",
    "size": 72557354,
    "path": "../public/Scaffold/18_promo_vid.mp4"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _df64QY = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_uVKkH7 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_uVKkH7 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_df64QY)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
