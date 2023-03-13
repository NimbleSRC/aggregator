var g=Object.defineProperty;var f=(a,s,t)=>s in a?g(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t;var e=(a,s,t)=>(f(a,typeof s!="symbol"?s+"":s,t),t);class w{constructor(){e(this,"button",null);e(this,"items",null);e(this,"mapWrapper",null);e(this,"shopsData",null);e(this,"shopList",null);e(this,"markCollection",null);e(this,"classes",{show:"show",hide:"hidden"});e(this,"map",!1);e(this,"mapAdd",!1);this.button=document.getElementById("change-display"),this.items=document.querySelectorAll("[data-shop-target]"),this.mapWrapper=document.getElementById("shops-map"),this.shopList=document.getElementById("shop_list"),this.shopsData=Array.from(document.querySelectorAll('input[name="shop_coord"]')).map(s=>({path:s.dataset.shopPath,coords:JSON.parse(s.value)})),this.button.addEventListener("click",this.toggle.bind(this)),this.addMap(this.shopsData)}addMarkCollection(s){this.markCollection=s}getMapCenter(){let s=0,t=0;for(var h=0;h<this.shopsData.length;h++)s+=this.shopsData[h].coords.lat,t+=this.shopsData[h].coords.long;return{lat:s/this.shopsData.length,long:t/this.shopsData.length}}scrollToShop(s){const t=document.getElementById(`anchor_${s}`).offsetTop-this.shopList.offsetTop;this.shopList.scrollTo({top:t,behavior:"smooth"})}addMap(s){if(this.mapAdd)return;const t=this.getMapCenter(),h=this.hideAllItems.bind(this),p=this.showShop.bind(this),m=this.scrollToShop.bind(this),r=this.items;ymaps.ready(function(){for(var c=new ymaps.Map("shops-map",{center:[t.lat,t.long],zoom:10},{searchControlProvider:"yandex#search"}),d=new ymaps.GeoObjectCollection(null,{iconColor:"#6c757d"}),i=0,u=s.length;i<u;i++){const l=new ymaps.Placemark([s[i].coords.lat,s[i].coords.long],{path:s[i].path});l.events.add("click",(n=>function(){h(),p(n),m(n.path),d.each(function(o){o.options.set("iconColor","#6c757d")}),l.options.set("iconColor","#1eafed")})(s[i])),d.add(l)}r.forEach(l=>l.addEventListener("click",n=>{r.forEach(o=>o.classList.remove("show")),d.each(function(o){o.options.set("iconColor","#6c757d"),n.target.dataset.shopTarget==o.properties.get("path")&&(n.target.classList.add("show"),c.setCenter(o.geometry.getCoordinates()),o.options.set("iconColor","#1eafed"))})})),c.geoObjects.add(d)}),this.mapAdd=!0}hideMap(){this.mapWrapper.classList.remove(this.classes.show)}showMap(){this.mapWrapper.classList.add(this.classes.show)}showShop(s){const t=document.querySelector(`[data-shop-target="${s.path}"]`);t.classList.remove(this.classes.hide),t.classList.add(this.classes.show)}hideAllItems(){this.button.textContent="Список",this.items.forEach(s=>s.classList.add(this.classes.hide)),this.items.forEach(s=>s.classList.remove(this.classes.show)),this.showMap(),this.map=!0}showAllItems(){this.button.textContent="Карта",this.items.forEach(s=>s.classList.add(this.classes.show)),this.items.forEach(s=>s.classList.remove(this.classes.hide)),this.hideMap(),this.map=!1}toggle(){return this.map?this.showAllItems():this.hideAllItems()}}document.addEventListener("DOMContentLoaded",()=>{new w});
