import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Link from 'ol/interaction/Link';
import DragAndDrop from 'ol/interaction/DragAndDrop';

const data = window.Mapping = {};
window.Mapping.create_map = function (type = 'OSM') {
	let map;
	mClear('map-container');
	if (type == 'geo') {
		map = new Map({
			target: 'map-container',
			layers: [
				new VectorLayer({
					source: new VectorSource({
						format: new GeoJSON(),
						url: './data/countries.json',
					}),
				}),
			],
			view: new View({ center: [0, 0], zoom: 2, }),
		});
	} else if (type == 'OSM') {
		map = new Map({
			target: 'map-container',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({ center: fromLonLat([0, 0]), zoom: 2, }),
		});

	}
	map.addInteraction(new Link()); //jetzt bleibt center immer gleich wenn andere source reloade!
	return map;
}
















