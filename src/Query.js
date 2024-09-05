import React from 'react'
import { useState }  from 'react'
import { Button, Input, Select, Space } from 'antd';




const { Option } = Select;

export const Query = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [search, setSearch] = useState(null)

    const handleChange = value => {
        setSelectedValue(value);
        console.log(`Selected: ${value}`);
      };

      const handleSearch = event=>{
            setSearch(event.target.value);
            
      }


      return (
        <div style={{ margin: '20px' }}>
          <Space direction="vertical">
            <Select
              defaultValue="Select an option"
              style={{ width: 200 }}
              onChange={handleChange}
              allowClear
            >
              <Option value="locationabbr">locationabbr</Option>
              <Option value="locationdesc">locationdesc</Option>
              <Option value="datasource">datasource</Option>
              <Option value="priorityarea1">priorityarea1</Option>
              <Option value="category">category</Option>
              <Option value="topic">topic</Option>
              <Option value="data_value_type">data_value_type</Option>
              <Option value="break_out_category">break_out_category</Option>
              <Option value="break_out">break_out</Option>
              <Option value="categoryid">categoryid</Option>
              <Option value="topicid">topicid</Option>
              <Option value="indicatorid">indicatorid</Option>
              <Option value="data_value_typeid">data_value_typeid</Option>
              <Option value="breakoutcategoryid">breakoutcategoryid</Option>
              <Option value="breakoutid">breakoutid</Option>
              <Option value="locationid">locationid</Option>
              

            </Select>
            <div>
              Selected Value: {selectedValue}
            </div>
            <Input type='text' onChange={handleSearch}/>
            <Button>Search</Button>

          </Space>
        </div>
      );
}
