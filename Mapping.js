import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Link from 'ol/interaction/Link';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import Modify from 'ol/Interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';

const data = window.Mapping = {};
var source = null;

window.Mapping.clear_source = () => {
	if (source) source.clear();
}
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

	source = new VectorSource();
	const layer = new VectorLayer({
		source: source,
	});
	map.addLayer(layer);

	map.addInteraction(
		new DragAndDrop({
			source: source,
			formatConstructors: [GeoJSON],
		})
	);

	map.addInteraction(
		new Modify({
			source: source,
		})
	);

	map.addInteraction(
		new Draw({
			type: 'Polygon',
			source: source,
		})
	);

	map.addInteraction(
		new Snap({
			source: source,
		})
	);

	const format = new GeoJSON({ featureProjection: 'EPSG:3857' });
	const download = document.getElementById('dDownload');
	source.on('change', function () {
		const features = source.getFeatures();
		const json = format.writeFeatures(features);
		download.href =
			'data:application/json;charset=utf-8,' + encodeURIComponent(json);
	});

	return map;
}
















