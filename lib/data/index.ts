import { beers } from "./beers";
import { breweries } from "./breweries";
import { packs } from "./packs";

export { beers, breweries, packs };

export function getBeerBySlug(slug: string) {
  return beers.find((b) => b.slug === slug);
}
export function getBeerById(id: string) {
  return beers.find((b) => b.id === id);
}
export function getBreweryBySlug(slug: string) {
  return breweries.find((b) => b.slug === slug);
}
export function getBreweryById(id: string) {
  return breweries.find((b) => b.id === id);
}
export function getPackBySlug(slug: string) {
  return packs.find((p) => p.slug === slug);
}
export function getPackById(id: string) {
  return packs.find((p) => p.id === id);
}
export function getBeersForBrewery(breweryId: string) {
  return beers.filter((b) => b.breweryId === breweryId);
}
