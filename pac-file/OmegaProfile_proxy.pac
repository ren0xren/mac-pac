var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+proxy", {
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        switch (scheme) {
          case "http":
            return "PROXY 127.0.0.1:7889";

          case "https":
            return "HTTPS 127.0.0.1:7890";

          default:
            return "SOCKS5 127.0.0.1:7891; SOCKS 127.0.0.1:7891";
        }
    }
});