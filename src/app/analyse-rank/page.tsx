"use client";
import React, { useState, useEffect } from "react";
import { Flex, Radio, Card, Space, Select, Button, Table, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
// Import JSON file (adjust path as needed)
import data from "./2_ALL INDIA QUOTA AYUSH ROUND-1 ALLOTMENTS.json";

const App: React.FC = () => {
  // State for filters
  const [filters, setFilters] = useState({
    allottedQuota: [],
    allottedInstitute: undefined,
    course: [],
    allottedCategory: undefined,
    candidateCategory: undefined,
    maxRank: undefined, // New state for max rank
  });

  // State for filtered data
  const [filteredData, setFilteredData] = useState(data);

  // Extract unique values for each field
  const uniqueValues = {
    allottedQuota: [...new Set(data.map((item) => item["Allotted Quota"]))],
    allottedInstitute: [
      ...new Set(data.map((item) => item["Allotted Institute"])),
    ],
    course: [...new Set(data.map((item) => item["Course"]))],
    allottedCategory: [
      ...new Set(data.map((item) => item["Alloted Category"])),
    ],
    candidateCategory: [
      ...new Set(data.map((item) => item["Candidate Category"])),
    ],
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply filters to data
  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        (filters.allottedQuota.length === 0 ||
          filters.allottedQuota.includes(item["Allotted Quota"])) &&
        (filters.allottedInstitute === undefined ||
          filters.allottedInstitute === item["Allotted Institute"]) &&
        (filters.course.length === 0 ||
          filters.course.includes(item["Course"])) &&
        (filters.allottedCategory === undefined ||
          filters.allottedCategory === item["Alloted Category"]) &&
        (filters.candidateCategory === undefined ||
          filters.candidateCategory === item["Candidate Category"]) &&
        (filters.maxRank === undefined || item.Rank <= filters.maxRank) // Add max rank condition
      );
    });
    setFilteredData(filtered);
  }, [filters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      allottedQuota: [],
      allottedInstitute: undefined,
      course: [],
      allottedCategory: undefined,
      candidateCategory: undefined,
      maxRank: undefined, // Reset max rank
    });
  };

  // Define table columns
  const columns: ColumnsType<typeof data[0]> = [
    { title: "SNo", dataIndex: "SNo", key: "SNo" },
    { title: "Rank", dataIndex: "Rank", key: "Rank" },
    { title: "Allotted Quota", dataIndex: "Allotted Quota", key: "Allotted Quota" },
    { title: "Allotted Institute", dataIndex: "Allotted Institute", key: "Allotted Institute" },
    { title: "Course", dataIndex: "Course", key: "Course" },
    { title: "Alloted Category", dataIndex: "Alloted Category", key: "Alloted Category" },
    { title: "Candidate Category", dataIndex: "Candidate Category", key: "Candidate Category" },
    { title: "Remarks", dataIndex: "Remarks", key: "Remarks" },
  ];

  return (
    <div className="p-5">
      <Flex gap="middle" vertical>
        {/* Filters Card */}
        <Card title="Available Filters & Data Tweaks">
          <div className="flex flex-col md:flex-row gap-2 pb-5">
            <Space direction="vertical" style={{ width: "100%", overflowX: "auto" }}>
              {/* Max Rank Input */}
              <div className="choice-01 flex items-center gap-2">
                <p className="font-bold pr-5 md:pr-10">Max Rank:</p>
                <InputNumber
                  placeholder="Enter Max Rank"
                  value={filters.maxRank}
                  onChange={(value) => handleFilterChange("maxRank", value)}
                  min={1} // Minimum rank is 1


                />
              </div>

              {/* Allotted Quota */}
              <div className="choice-01 flex items-center gap-2">
                <p className="font-bold pr-5 md:pr-10">Quota:</p>
                <Select
                  allowClear
                  placeholder="Select Allotted Quota"
                  value={filters.allottedQuota}
                  onChange={(value) => handleFilterChange("allottedQuota", value)}
                  options={uniqueValues.allottedQuota.map((quota) => ({
                    value: quota,
                    label: quota,
                  }))}
                />
              </div>

              {/* Allotted Institute */}
              <div className="choice-01 flex items-center gap-2">
                <p className="font-bold pr-5 md:pr-10">College:</p>
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Allotted Institute"
                  value={filters.allottedInstitute}
                  onChange={(value) => handleFilterChange("allottedInstitute", value)}
                  options={uniqueValues.allottedInstitute.map((institute) => ({
                    value: institute,
                    label: institute,
                  }))}
                  style={{ width: "100%" }}
                />
              </div>

              {/* Course */}
              <div className="choice-01 flex items-center gap-2">
                <p className="font-bold pr-5 md:pr-10">Course:</p>
                <Select
                  allowClear
                  placeholder="Select Course"
                  value={filters.course}
                  onChange={(value) => handleFilterChange("course", value)}
                  options={uniqueValues.course.map((course) => ({
                    value: course,
                    label: course,
                  }))}
                />
              </div>
            </Space>

            <Space direction="vertical" style={{ width: "100%", overflowX: "auto" }}>
              {/* Allotted Category */}
              <div className="choice-01 flex items-center gap-2">
                <p className="font-bold pr-5 md:pr-10">Category:</p>
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Allotted Category"
                  value={filters.allottedCategory}
                  onChange={(value) => handleFilterChange("allottedCategory", value)}
                  options={uniqueValues.allottedCategory.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  style={{ width: "100%" }}
                />
              </div>

              {/* Candidate Category */}
              <div className="choice-01 flex items-center gap-2">
                <p className="font-bold pr-5 md:pr-10">Candidate_Category:</p>
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Candidate Category"
                  value={filters.candidateCategory}
                  onChange={(value) => handleFilterChange("candidateCategory", value)}
                  options={uniqueValues.candidateCategory.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  style={{ width: "100%" }}
                />
              </div>
            </Space>
          </div>

          <Button danger type="primary" onClick={clearFilters} style={{ marginBottom: 16 }}>
            Clear All Filters
          </Button>

        <div className="flex flex-col w-full"> 
          <div className="pt-5 pb-5 border-black border-2 "> <p> s x s</p> </div> 
          
          </div>       
         

        </Card>

        {/* Data Table Card */}
        <Card>
          <div style={{ overflowX: "auto" }}>
            <Table
              dataSource={filteredData}
              columns={columns}
              rowKey="SNo"
              pagination={{ pageSize: 10 }}
              style={{ minHeight: 100 }}
            />
          </div>
        </Card>
      </Flex>
    </div>
  );
};

export default App;