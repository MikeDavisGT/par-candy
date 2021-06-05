export const GlobalData = {

  apiPrefix: function () {
    var sPrefix = "https://gtkcadmin.azurewebsites.net/";

    if (window.location.href.toLowerCase().includes("localhost"))
      sPrefix = "http://localhost/gts"

    return sPrefix;

  }
}
