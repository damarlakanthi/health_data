import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Menu, Card, Row, Col, Select, Typography, Drawer } from "antd";
import {
  
  DashboardOutlined,
  FilterOutlined,
 
} from "@ant-design/icons";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";
import Chart from "chart.js/auto";
import Graphs from "./ReusableComponents/Graphs";
import MapView from "./ReusableComponents/MapView";
import Filters from "./Filters";

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { SubMenu } = Menu;

function App() {
  const [data, setData] = useState([]);
  const [yearStart, setYearStart] = useState("");
  const [locationAbbr, setLocationAbbr] = useState("");
  const [topic, setTopic] = useState("");
  const [totalCases, setTotalCases] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [topicCounts, setTopicCounts] = useState({});
  const [chartData, setChartData] = useState({});
  const [availableYears, setAvailableYears] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableBreakOut, setAvailableBreakOut] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [chartViewOption, setChartViewOption] = useState("pie");
  const [collapsed, setCollapsed] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    fetchUniqueValues("year", setAvailableYears);
    fetchUniqueValues("LocationAbbr", setAvailableLocations);
    fetchUniqueValues("Topic", setAvailableTopics);
    fetchUniqueValues("break_out", setAvailableBreakOut);
  }, []);
  
  const fetchUniqueValues = (field, setterFunction) => {
    axios
      .get(`http://localhost:3081/getUniqueValues/${field}`)
      .then((response) => setterFunction(response.data))
      .catch((error) => console.error(`Error fetching ${field}:`, error));
  };

  useEffect(() => {
    const params = {};
    if (yearStart) params.year = yearStart;
    if (locationAbbr) params.locationabbr = locationAbbr;
    if (topic) params.topic = topic;

    const queryString = new URLSearchParams(params).toString();
    const requestUrl = queryString
      ? `http://localhost:3081/getMedicareData?${queryString}`
      : "http://localhost:3081/getMedicareData";

    axios
      .get(requestUrl)
      .then((response) => {
        const fetchedData = response.data;
        setData(fetchedData);
        setTotalCases(calculateTotalCases(fetchedData));
        setHeatmapData(calculateHeatmapData(fetchedData));
        console.log("heatdataaa",heatmapData)
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [yearStart, locationAbbr, topic, availableBreakOut]);

  const calculateTotalCases = (data) => {
    return data.reduce((sum, item) => sum + (parseFloat(item.data_value) || 0), 0);
  };

  const calculateLocationCases = (location) => {
    return data
      .filter((item) => item.locationdesc === location)
      .reduce((sum, item) => sum + (parseFloat(item.data_value) || 0), 0);
  };

  const calculateHeatmapData = (data) => {
    return data
      .filter((item) => item.geolocation && item.geolocation.coordinates)
      .map((item) => [
        item.geolocation.coordinates[1],  
        item.geolocation.coordinates[0], 
        parseFloat(item.data_value) || 0  
      ]);
  };

  const getTopicCounts = (location) => {
    const filteredData = data.filter((item) => item.locationdesc === location);
    const topicCountMap = {};

    filteredData.forEach((item) => {
      const topicName = item.topic;
      if (topicName) {
        topicCountMap[topicName] =
          (topicCountMap[topicName] || 0) + (parseFloat(item.data_value) || 0);
      }
    });

    return topicCountMap;
  };

  const customMarker = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 45],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  const handleChartViewOption = (type) => {
    setChartViewOption(type);
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerVisible(!filterDrawerVisible);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light">
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="sub1" icon={<FilterOutlined />} title="Filters">
            <Menu.Item key="2" onClick={toggleFilterDrawer}>
              Open Filters
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "#fff" }} className="site-layout-background">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: "16px 0 0 24px" }}>CDC Health Data Visualization</Title>
            </Col>
            <Col>
              <Text strong style={{ marginRight: "24px" }}>Total Cases: {totalCases.toLocaleString()}</Text>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card title="Map View" bordered={false} style={{ height: "600px" }}>
                  <MapView
                    data={data}
                    setSelectedLocation={setSelectedLocation}
                    selectedLocation={selectedLocation}
                    getTopicCounts={getTopicCounts}
                    setTopicCounts={setTopicCounts}
                    topicCounts={topicCounts}
                    setChartData={setChartData}
                    chartData={chartData}
                    customMarker={customMarker}
                    heatmapData={heatmapData}
                  />
                </Card>
              </Col>
            </Row>
            {selectedLocation && (
              <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card title={`Cases for ${selectedLocation}`} bordered={false}>
                    <Title level={3}>{calculateLocationCases(selectedLocation).toLocaleString()}</Title>
                  </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card title="Topic Counts" bordered={false}>
                    <ul style={{ padding: 0, listStyle: "none" }}>
                      {Object.entries(topicCounts).map(([topic, count], index) => (
                        <li key={index}>
                          <Text strong>{topic}:</Text> {count.toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              </Row>
            )}
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card
                  title="Data Visualization"
                  bordered={false}
                  extra={
                    <Select defaultValue="pie" style={{ width: 120 }} onChange={handleChartViewOption}>
                      <Select.Option value="pie">Pie</Select.Option>
                      <Select.Option value="doughnut">Doughnut</Select.Option>
                      <Select.Option value="line">Line</Select.Option>
                      <Select.Option value="bar">Bar</Select.Option>
                    </Select>
                  }
                  style={{ height: "400px" }}
                >
                  <div style={{ height: "100%", width: "100%" }}>
                    <Graphs chartData={chartData} chartType={chartViewOption} />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>CDC Health Data Visualization ©2024 Created by Kanthi Kiran Damarla</Footer>
      </Layout>
      <Drawer
        title="Filters"
        placement="right"
        closable={true}
        onClose={toggleFilterDrawer}
        visible={filterDrawerVisible}
        width={300}
      >
        <Filters
          yearStart={yearStart}
          availableLocations={availableLocations}
          availableTopics={availableTopics}
          availableYears={availableYears}
          locationAbbr={locationAbbr}
          setLocationAbbr={setLocationAbbr}
          setTopic={setTopic}
          setYearStart={setYearStart}
          topic={topic}
          availableBreakOut={availableBreakOut}
          setAvailableBreakOut={setAvailableBreakOut}
        />
      </Drawer>
    </Layout>
  );
}

export default App;