onload = start;
var map;
function start() {

	mStyle('dMap', { w: 800, h: 780, margin: 'auto', bg:'#111' });
	map = Mapping.create_map(); //'geo');

}
function onclick_geo(){map = Mapping.create_map('geo');}
function onclick_OSM(){map = Mapping.create_map('OSM');}














