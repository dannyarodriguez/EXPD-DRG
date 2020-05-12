// JavaScript Document

function parseURL() {
    var urls = new Array;
    var temp = new Array;

    var text = $('#inUrls').val();
    var regexp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    while (matches = regexp.exec(text)) {
        url = matches[0];


        var code = domain_to_code(url);
        temp.code = code;
        temp.url = url;

        if (urls[code]) {
            urls[code].push(url);
        } else {
            urls[code] = new Array;
            urls[code].push(url);
        }
        //console.log(code  +  " -> " + " -> "  + url);

    }

    return urls;
}

function parseCL() {
    var cln = new Array;

    $('#clList .clnumber').each(function(index) {
        cln.push($(this).text());
    });

    return cln;
}

function testing_to_live(str) {
    str = str.replace('.pubtesting.sb.karmalab.net', '');
    str = str.replace('www.travelocity.com', 'www.travelocity.com');
    str = str.replace('www.travelocity.ca', 'www.travelocity.ca');
    return str;
}

function live_to_testing(str) {
    if (str.indexOf(".pubtesting.sb.karmalab.net/p/") <= -1) {
        str = str.replace('/p/', '.pubtesting.sb.karmalab.net/p/');
    }
    str = str.replace('www.travelocity.com', 'www.travelocity.com');
    str = str.replace('www.travelocity.ca', 'www.travelocity.ca');
    return str;
}

function force_hcom(url, code) {
    var newurl = "";

    if (url.indexOf("?pos=") > -1) {
        console.log("ya esta");
        return url;
    }

    if (url.slice(-1) === "/") {
        url = url.slice(0, -1);
    };

    if (code === "HCOM_US") {
        newurl = url + "/?pos=HCOM_US&locale=en_US";
    } else if (code === "HCOM_UK") {
        newurl = url + "/?pos=HCOM_UK&locale=en_GB";
    } else if (code === "HCOM_DE") {
        newurl = url + "/?pos=HCOM_DE&locale=de_DE";
    } else if (code === "HCOM_BR") {
        newurl = url + "/?pos=HCOM_BR&locale=pt_BR";
    } else if (code === "HCOM_CN") {
        newurl = url + "/?pos=HCOM_CN&locale=zh_CN";
    } else if (code === "HCOM_NO") {
        newurl = url + "/?pos=HCOM_NO&locale=no_NO";
    } else if (code === "HCOM_NL") {
        newurl = url + "/?pos=HCOM_NL&locale=nl_NL";
    } else if (code === "HCOM_SV") {
        newurl = url + "/?pos=HCOM_SV&locale=sv_SE";
    } else if (code === "HCOM_FI") {
        newurl = url + "/?pos=HCOM_FI&locale=fi_FI";
    } else if (code === "HCOM_FR") {
        newurl = url + "/?pos=HCOM_FR&locale=fr_FR";
    } else if (code === "HCOM_IT") {
        newurl = url + "/?pos=HCOM_IT&locale=it_IT";
    } else if (code === "HCOM_JP") {
        newurl = url + "/?pos=HCOM_JP&locale=ja_JP";
    } else if (code === "HCOM_DA") {
        newurl = url + "/?pos=HCOM_DA&locale=da_DK";
    } else if (code === "HCOM_KR") {
        newurl = url + "/?pos=HCOM_KR&locale=ko_KR";
    } else {
        newurl = url;
    }

    console.log(url + " " + code + " " + newurl);

    return newurl;
}

function domain_to_code(url) {

    str = testing_to_live(parse_url(url, 'host'));

    if (str.substring(0, 12) === 'www.expedia.' || str.substring(0, 16) === 'www.travelocity.') {
        str = str.replace('www.', '');
        pos = str.substring(str.lastIndexOf(".") + 1, 99999);
        return str[0].toLowerCase() + pos.toUpperCase();
    } else if (str.indexOf("travel-assets") > -1) {
        return "IMAGES URL";
    } else if (str.indexOf("amazonaws") > -1) {
        return "IMAGES URL";
    } else if (str.indexOf("hoteis") > -1) {
        return "HCOM_BR";
    } else if (str.indexOf("hoteles") > -1) {
        return "HCOM_LATAM";
    } else if (str.indexOf("hotels") > -1) {
        pos = str.substring(0, str.indexOf("."));
        if (url.indexOf("HCOM_UK") > -1) {
            return "HCOM_UK";
        }
        if (pos == 'www') {
            return "HCOM_US";
        }
        return "HCOM_" + pos.toUpperCase();
    } else if (str.indexOf("wotif") > -1) {
        return "WOTIF_US";
    } else if (str.indexOf("hotwire") > -1) {
        return "HOTW_US";
    } else if (str.indexOf("orbitz") > -1) {
        return "ORB_US";
    } else if (str.indexOf("cheaptickets") > -1) {
        return "CHEAP_US";
    }
    return 'unk';
}

function code_to_jiracode(code) {

    if (code === "eSG" || code === "eMY" || code === "eKR" || code === "eTH" || code === "eHK" || code === "eIN" || code == "eJP" || code == "eID" || code == "eTW" || code == "ePH" || code == "eVN" || code == "eAU") {
        return "ECOM_APAC";
    } else if (code == "eCA") {
        return "ECOM_CA";
    } else if (code == "eUK" || code == "eDE" || code == "eIT" || code == "eES" || code == "eNL" || code == "eFR" || code == "eIE" || code == "eBE" || code == "eSE" || code == "eNO" || code == "eDK" || code == "eFI" || code == "eAT") {
        return "ECOM_EMEA";
    } else if (code == "eMX" || code == "eBR" || code == "eAR") {
        return "ECOM_LATAM";
    } else if (code == "eCOM") {
        return "ECOM_US";
    } else if (code == "tCOM") {
        return "TRAVEL_US";
    } else if (code == "tCA") {
        return "TRAVEL_CA";
    } else if (code == "HCOM_UK" || code == "HCOM_DE" || code == "HCOM_CN" || code == "HCOM_HK" || code == "HCOM_TW" || code == "HCOM_NO" || code == "HCOM_NL" || code == "HCOM_SE" || code == "HCOM_FI" || code == "HCOM_FR" || code == "HCOM_IT" || code == "HCOM_JP" || code == "HCOM_DK" || code == "HCOM_KR") {
        return "HCOM_EMEA";
    } else if (code == "HCOM_BR" || code == "HCOM_LATAM") {
        return "HCOM_LATAM";
    } else if (code == "HCOM_US") {
        return "HCOM_US";
    } else if (code == "HCOM_CA") {
        return "HCOM_CA";
    } else if (code === "WOTIF_US") {
        return "WOTIF_US";
    } else if (code === "HOTW_US") {
        return "HOTW_US";
    } else if (code === "ORB_US") {
        return "ORB_US";
    } else if (code === "CHEAP_US") {
        return "CHEAP_US ";
    }
    return '';
}


function parse_url(str, component) {
    //       discuss at: http://phpjs.org/functions/parse_url/
    //      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //         input by: Lorenzo Pisani
    //         input by: Tony
    //      improved by: Brett Zamir (http://brett-zamir.me)
    //             note: original by http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    //             note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    //             note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    //             note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
    //             note: a seriously malformed URL.
    //             note: Besides function name, is essentially the same as parseUri as well as our allowing
    //             note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    //        example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    //        returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
    //        example 2: parse_url('http://en.wikipedia.org/wiki/%22@%22_%28album%29');
    //        returns 2: {scheme: 'http', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}
    //        example 3: parse_url('https://host.domain.tld/a@b.c/folder')
    //        returns 3: {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}
    //        example 4: parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar');
    //        returns 4: { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }

    try {
        this.php_js === this.php_js || {};
    } catch (e) {
        this.php_js = {};
    }

    var query;
    var ini = (this.php_js && this.php_js.ini) || {};
    var mode = (ini['phpjs.parse_url.mode'] && ini['phpjs.parse_url.mode'].local_value) || 'php';
    var key = [
        'source',
        'scheme',
        'authority',
        'userInfo',
        'user',
        'pass',
        'host',
        'port',
        'relative',
        'path',
        'directory',
        'file',
        'query',
        'fragment'
    ];
    var parser = {
        php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
    };

    var m = parser[mode].exec(str);
    var uri = {};
    var i = 14;

    while (i--) {
        if (m[i]) {
            uri[key[i]] = m[i];
        }
    }

    if (component) {
        return uri[component.replace('PHP_URL_', '').toLowerCase()];
    }

    if (mode !== 'php') {
        var name = (ini['phpjs.parse_url.queryKey'] &&
            ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        query = uri[key[12]] || '';
        query.replace(parser, function($0, $1, $2) {
            if ($1) {
                uri[name][$1] = $2;
            }
        });
    }

    delete uri.source;
    return uri;
}