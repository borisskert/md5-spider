const cleanup = require("../src/cleanup");

const settings = require('../src/settings');
jest.mock('../src/settings');

describe('store', () => {
    beforeEach(() => {
        const allAllowedCharacters = `A-Za-z0-9"' :/\\.=\\-\\|\\n\\*\\!;,\\/\\_\\s\\[\\]{}`;
        const ignoreReqexp = `<script[${allAllowedCharacters}]*>([${allAllowedCharacters}]*(<!\\[CDATA\\[)[${allAllowedCharacters}]+(\\]\\]>)?[${allAllowedCharacters}]*)?<\\/script>`;
        console.log(ignoreReqexp);

        settings.read.mockImplementation(() => ({
            ignores: [
                ignoreReqexp
            ],
        }));
    });

    it('should replace script block', () => {
        const htmlText = `<!DOCTYPE html> <html lang="en"> <!--[if IE 6]>
    <link href="ie6.min.css" rel="stylesheet">
<![endif]--> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=9" /> <meta name="keywords" content="register,signup,registration,my_site, ds, slug" /> <meta name="description" content="Register" /> <title>Register - DS</title> <link href="/themes/shared/css/posterwall.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/libs/font-awesome-4.5.x/css/font-awesome.min.css" rel="stylesheet" type="text/css" /> <link href="/themes/Gamma/styles/extra.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/jquery.pnotify.default.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/style.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap.cyborg.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap-fixes.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/css/jquery.qtip.css" rel="stylesheet" media="screen" /> <link rel="search" type="application/opensearchdescription+xml" href="/opensearch" title="DS" /> <link rel="shortcut icon" type="image/ico" href="/themes/shared/img/favicon.ico" /> <script src="/themes/shared/libs/jquery-2.2.x/dist/jquery.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/shared/libs/jquery-migrate-1.4.x/jquery-migrate.min.js"></script> <script src="/themes/shared/libs/colorbox-1.6.x/jquery.colorbox-min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script src="/themes/shared/js/jquery.qtip.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/Gamma/scripts/utils.js"></script> <script src="/themes/shared/libs/autosize-3.0.x/dist/autosize.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/shared/js/sorttable.js"></script> <script src="/themes/shared/libs/bootstrap-3.3.x/dist/js/bootstrap.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/shared/libs/bootstrap-hover-dropdown-2.2.x/bootstrap-hover-dropdown.min.js"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/Gamma/scripts/jquery.pnotify.js"></script> <script type="1e60f352bfd336e1da963671-text/javascript">
\t/* <![CDATA[ */
\t\tvar WWW_TOP = "";
\t\tvar SERVERROOT = "/";
\t\tvar UID = "";
\t\tvar RSSTOKEN = "";
\t/* ]]> */
\t</script> </head> <body> <div class="navbar navbar-inverse navbar-fixed-top"> <div class="navbar-inner"> <div class="container"> <ul class="nav pull-right"> <li class=""> <a href="/login">Login</a> </li> </ul> </div> </div> </div> </br> </br> </br> <div class="container-fluid"> <div class="row-fluid"> <div class="span2"> <ul class="nav nav-list"> <a href="https://my_site.com"><img src="/themes/shared/img/welcome.png" /></a> <a href="https://my_site.com/browse"><li class="nav-header">DS</li></a> <li class="nav-header">Menu</li> <li> <a title="Login." href="https://my_site.com/login">Login</a> <li> <a title="Register." href="https://my_site.com/register">Register</a> </li> </ul> </div> <div class="span6 offset1"> <h3><font color="orange">my_site</font></h3> </div> <div class="span10"> <div class="span6 offset2" style="padding:40px; border: 1px solid #e1e1e8;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    "> <h3>Register</h3><br />
Sorry! The Bar is closed.<br /> <br> Please don't contact us asking for invites.<br /> <br> <script src="https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js" data-cf-settings="1e60f352bfd336e1da963671-|49" defer=""></script></body> </html>`;
        const actual = cleanup(htmlText);
        const expected = `<!DOCTYPE html> <html lang="en"> <!--[if IE 6]>
    <link href="ie6.min.css" rel="stylesheet">
<![endif]--> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=9" /> <meta name="keywords" content="register,signup,registration,my_site, ds, slug" /> <meta name="description" content="Register" /> <title>Register - DS</title> <link href="/themes/shared/css/posterwall.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/libs/font-awesome-4.5.x/css/font-awesome.min.css" rel="stylesheet" type="text/css" /> <link href="/themes/Gamma/styles/extra.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/jquery.pnotify.default.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/style.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap.cyborg.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap-fixes.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/css/jquery.qtip.css" rel="stylesheet" media="screen" /> <link rel="search" type="application/opensearchdescription+xml" href="/opensearch" title="DS" /> <link rel="shortcut icon" type="image/ico" href="/themes/shared/img/favicon.ico" />            </head> <body> <div class="navbar navbar-inverse navbar-fixed-top"> <div class="navbar-inner"> <div class="container"> <ul class="nav pull-right"> <li class=""> <a href="/login">Login</a> </li> </ul> </div> </div> </div> </br> </br> </br> <div class="container-fluid"> <div class="row-fluid"> <div class="span2"> <ul class="nav nav-list"> <a href="https://my_site.com"><img src="/themes/shared/img/welcome.png" /></a> <a href="https://my_site.com/browse"><li class="nav-header">DS</li></a> <li class="nav-header">Menu</li> <li> <a title="Login." href="https://my_site.com/login">Login</a> <li> <a title="Register." href="https://my_site.com/register">Register</a> </li> </ul> </div> <div class="span6 offset1"> <h3><font color="orange">my_site</font></h3> </div> <div class="span10"> <div class="span6 offset2" style="padding:40px; border: 1px solid #e1e1e8;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    "> <h3>Register</h3><br />
Sorry! The Bar is closed.<br /> <br> Please don't contact us asking for invites.<br /> <br> </body> </html>`;

        expect(actual).toEqual(expected);
    });

    it('should replace every script block', () => {
        const htmlText = `<!DOCTYPE html> <html lang="en"> <!--[if IE 6]>
    <link href="ie6.min.css" rel="stylesheet">
<![endif]--> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=9" /> <meta name="keywords" content="register,signup,registration,my_site, ds, slug" /> <meta name="description" content="Register" /> <title>Register - DS</title> <link href="/themes/shared/css/posterwall.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/libs/font-awesome-4.5.x/css/font-awesome.min.css" rel="stylesheet" type="text/css" /> <link href="/themes/Gamma/styles/extra.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/jquery.pnotify.default.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/style.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap.cyborg.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap-fixes.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/css/jquery.qtip.css" rel="stylesheet" media="screen" /> <link rel="search" type="application/opensearchdescription+xml" href="/opensearch" title="DS" /> <link rel="shortcut icon" type="image/ico" href="/themes/shared/img/favicon.ico" /> <script src="/themes/shared/libs/jquery-2.2.x/dist/jquery.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/shared/libs/jquery-migrate-1.4.x/jquery-migrate.min.js"></script> <script src="/themes/shared/libs/colorbox-1.6.x/jquery.colorbox-min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script src="/themes/shared/js/jquery.qtip.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/Gamma/scripts/utils.js"></script> <script src="/themes/shared/libs/autosize-3.0.x/dist/autosize.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/shared/js/sorttable.js"></script> <script src="/themes/shared/libs/bootstrap-3.3.x/dist/js/bootstrap.min.js" type="1e60f352bfd336e1da963671-text/javascript"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/shared/libs/bootstrap-hover-dropdown-2.2.x/bootstrap-hover-dropdown.min.js"></script> <script type="1e60f352bfd336e1da963671-text/javascript" src="/themes/Gamma/scripts/jquery.pnotify.js"></script> <script type="1e60f352bfd336e1da963671-text/javascript">
\t/* <![CDATA[ */
\t\tvar WWW_TOP = "";
\t\tvar SERVERROOT = "/";
\t\tvar UID = "";
\t\tvar RSSTOKEN = "";
\t/* ]]> */
\t</script> </head> <body> <div class="navbar navbar-inverse navbar-fixed-top"> <div class="navbar-inner"> <div class="container"> <ul class="nav pull-right"> <li class=""> <a href="/login">Login</a> </li> </ul> </div> </div> </div> </br> </br> </br> <div class="container-fluid"> <div class="row-fluid"> <div class="span2"> <ul class="nav nav-list"> <a href="https://my_site.com"><script type="text/javascript" style="display:none">
//<![CDATA[
window.__mirage2 = {petok:"ab5bad3e1c1ebfd92e1925e8f5dbec1f4d99c5f4-1607421880-1800"};
//]]>
</script><img src="/themes/shared/img/welcome.png" /></a> <a href="https://my_site.com/browse"><li class="nav-header">DS</li></a> <li class="nav-header">Menu</li> <li> <a title="Login." href="https://my_site.com/login">Login</a> <li> <a title="Register." href="https://my_site.com/register">Register</a> </li> </ul> </div> <div class="span6 offset1"> <h3><font color="orange">my_site</font></h3> </div> <div class="span10"> <div class="span6 offset2" style="padding:40px; border: 1px solid #e1e1e8;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    "> <h3>Register</h3><br />
Sorry! The Bar is closed.<br /> <br> Please don't contact us asking for invites.<br /> <br> <script src="https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js" data-cf-settings="1e60f352bfd336e1da963671-|49" defer=""></script><script defer src=\"https://static.cloudflareinsights.com/beacon.min.js\" data-cf-beacon='{\"rayId\":\"5fe6a46deeb73319\",\"version\":\"2020.11.6\",\"si\":10}'></script></body> </html>`;
        const actual = cleanup(htmlText);
        const expected = `<!DOCTYPE html> <html lang="en"> <!--[if IE 6]>
    <link href="ie6.min.css" rel="stylesheet">
<![endif]--> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=9" /> <meta name="keywords" content="register,signup,registration,my_site, ds, slug" /> <meta name="description" content="Register" /> <title>Register - DS</title> <link href="/themes/shared/css/posterwall.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/libs/font-awesome-4.5.x/css/font-awesome.min.css" rel="stylesheet" type="text/css" /> <link href="/themes/Gamma/styles/extra.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/jquery.pnotify.default.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/style.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap.cyborg.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/Gamma/styles/bootstrap-fixes.css" rel="stylesheet" type="text/css" media="screen" /> <link href="/themes/shared/css/jquery.qtip.css" rel="stylesheet" media="screen" /> <link rel="search" type="application/opensearchdescription+xml" href="/opensearch" title="DS" /> <link rel="shortcut icon" type="image/ico" href="/themes/shared/img/favicon.ico" />            </head> <body> <div class="navbar navbar-inverse navbar-fixed-top"> <div class="navbar-inner"> <div class="container"> <ul class="nav pull-right"> <li class=""> <a href="/login">Login</a> </li> </ul> </div> </div> </div> </br> </br> </br> <div class="container-fluid"> <div class="row-fluid"> <div class="span2"> <ul class="nav nav-list"> <a href="https://my_site.com"><img src="/themes/shared/img/welcome.png" /></a> <a href="https://my_site.com/browse"><li class="nav-header">DS</li></a> <li class="nav-header">Menu</li> <li> <a title="Login." href="https://my_site.com/login">Login</a> <li> <a title="Register." href="https://my_site.com/register">Register</a> </li> </ul> </div> <div class="span6 offset1"> <h3><font color="orange">my_site</font></h3> </div> <div class="span10"> <div class="span6 offset2" style="padding:40px; border: 1px solid #e1e1e8;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    "> <h3>Register</h3><br />
Sorry! The Bar is closed.<br /> <br> Please don't contact us asking for invites.<br /> <br> </body> </html>`;

        expect(actual).toEqual(expected);
    });
});
