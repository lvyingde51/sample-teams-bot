// static class to get site url
class SiteUrl {
    static set(url) {
        this.siteUrl = url;
    }
    static get() {
        return this.siteUrl.origin;
    }
}
exports.SiteUrl = SiteUrl;
