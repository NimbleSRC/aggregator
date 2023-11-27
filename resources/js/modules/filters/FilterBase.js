import { ShopListUpdate } from "../../Events";

export default class {
  api = '/api/filter/shop?';
  list = null;

  constructor(fields) {
    this.fields = fields;
    this.list = document.getElementById('shop-list');
  }

  async filterApply() {
    const urlParams = new URLSearchParams(window.location.search);
    this.removeFieldsFromURL(urlParams);
    this.setURLparams(urlParams);
    const url = `${this.api}${urlParams.toString()}`;
    const response = await fetch(url);
    const result = await response.text();
    this.updateList(result);
    this.setURL(urlParams);
  }

  updateList(result) {
    this.list.innerHTML = '';
    this.list.innerHTML = result;
    this.list.dispatchEvent(ShopListUpdate);
  }

  setURL(urlParams) {
    const url = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', url);
  }

  removeFieldsFromURL(urlParams) {
    Object.keys(this.fields).forEach(field => {
      urlParams.delete(this.fields[field]);
    });
  }

  setURLparams(urlParams) { }
}
