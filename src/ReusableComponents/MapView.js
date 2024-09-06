import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "../App.css";
import L from "leaflet";

const { BaseLayer, Overlay } = LayersControl;

const HeatmapLayer = ({ heatmapData }) => {
  const map = useMap();

  useEffect(() => {
    if (heatmapData.length > 0) {
      const heat = L.heatLayer(heatmapData, {
        radius: 20,
        blur: 15,
        maxZoom: 17,
        max: 1.0,
      }).addTo(map);

      return () => {
        map.removeLayer(heat);
      };
    }
  }, [heatmapData, map]);

  return null;
};

const MapView = ({
  data,
  setSelectedLocation,
  selectedLocation,
  getTopicCounts,
  setTopicCounts,
  topicCounts,
  setChartData,
  chartData,
  customMarker,
  heatmapData,
}) => {
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    const topicCounts = getTopicCounts(location);
    setTopicCounts(topicCounts);

    const labels = Object.keys(topicCounts);
    const values = Object.values(topicCounts);

    const colors = labels.map(
      (_, index) =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.2)`
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Number of Cases",
          data: values,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.2", "1")),
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="map-and-content">
      <div className="map-container">
        <MapContainer
          center={[38.0902, -95.7129]}
          zoom={4}
          style={{ height: "50vh", width: "100%" }}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </BaseLayer>
            <BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
              />
            </BaseLayer>
            <BaseLayer name="Streets">
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://maps.stamen.com">Stamen</a>'
              />
            </BaseLayer>

            <Overlay checked name="Heatmap">
              <HeatmapLayer heatmapData={heatmapData} />
            </Overlay>
          </LayersControl>

          {data.length > 0 ? (
            data.map((item, index) => {
              const coordinates = item?.geolocation?.coordinates;
              if (coordinates && coordinates.length === 2) {
                const [longitude, latitude] = coordinates;
                if (latitude && longitude) {
                  return (
                    <Marker
                      key={index}
                      position={[latitude, longitude]}
                      icon={customMarker}
                      eventHandlers={{
                        click: () => {
                          handleMarkerClick(item.locationdesc);
                        },
                      }}
                    >
                      <Popup>
                        <b>Topic:</b> {item.topic}
                        <br />
                        <b>Indicator:</b> {item.indicator}
                        <br />
                        <b>Data Value:</b> {item.data_value}{" "}
                        {item.data_value_unit}
                        <br />
                        <b>Breakout:</b> {item.break_out}
                        <br />
                        <b>Location:</b> {item.locationdesc}
                        <br />
                      </Popup>
                    </Marker>
                  );
                }
              }
              return null;
            })
          ) : (
            <p>No data available for the selected filters.</p>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
