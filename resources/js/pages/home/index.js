import "./hero";
import "../../layouts/similar-categories";
import "../../layouts/similar-locations";
import FiltersUIController from "./FiltersUIController";
import Location from "../../modules/filters/Location";
import YandexMapWorker from "../../modules/YandexMapWorker";
import Categories from "../../modules/filters/Categories";
import Rating from "../../modules/filters/Rating";

document.addEventListener("DOMContentLoaded", () => {
  new YandexMapWorker();
  new Location({area: 'areas[]', subway: 'subways[]'});
  new Categories({subCategories: 'sub_categories[]'});
  new Rating({rating: 'rating'});
  new FiltersUIController();
});
