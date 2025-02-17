// src/app/analyse-rank/page.tsx

"use client";
import React  from "react";
import { Flex, Card, Select, Button, Table, InputNumber } from "antd";
import type { ColumnsType } from "antd/es/table";
import useFilterLogic from "@/utils/filterNeet";
import { useEffect, useState } from "react";

const Page: React.FC = () => {
  const {
    filters,
    uniqueValues,
    handleFilterChange,
    clearFilters,
    filteredData,
  } = useFilterLogic();

  // Define table columns
  const columns: ColumnsType<typeof filteredData[0]> = [
    { title: "SNo", dataIndex: "SNo", key: "SNo" },
    { title: "Rank", dataIndex: "Rank", key: "Rank" },
    { title: "Allotted Quota", dataIndex: "Allotted Quota", key: "Allotted Quota" },
    { title: "Allotted Institute", dataIndex: "Allotted Institute", key: "Allotted Institute" },
    { title: "Course", dataIndex: "Course", key: "Course" },
    { title: "Alloted Category", dataIndex: "Alloted Category", key: "Alloted Category" },
    { title: "Candidate Category", dataIndex: "Candidate Category", key: "Candidate Category" },
    { title: "Remarks", dataIndex: "Remarks", key: "Remarks" },
  ];

  // CustomCard component defined inline
  const CustomCard: React.FC<{ title: string }> = ({ title }) => {
    // State to track if the screen is in mobile view
    const [isMobile, setIsMobile] = useState(false);

    // Effect to handle window resize events
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // Define breakpoint for mobile (e.g., 768px)
      };

      // Check if window is defined (i.e., code is running in the browser)
      if (typeof window !== 'undefined') {
        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
      }

      // Cleanup event listener on component unmount
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
      };
    }, []);

    // Dynamic grid style based on screen size
    const gridStyle: React.CSSProperties = {
      width: isMobile ? '100%' : '50%', // Full width for mobile, 2 columns for desktop
      textAlign: 'start',
      padding: 10,
      paddingLeft: 25,
      paddingRight: 25,
    };

    return (
      <Card title={title}>
        {/* First Row */}
        <Card.Grid hoverable={false} style={gridStyle}>Item 1</Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>Item 2</Card.Grid>

        {/* Second Row */}
        <Card.Grid hoverable={false} style={gridStyle}>Item 3</Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>Item 4</Card.Grid>

        {/* Third Row */}
        <Card.Grid hoverable={false} style={gridStyle}>Item 5</Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>Item 6</Card.Grid>
      </Card>
    );
  };

  return (
    <div className="p-5">
      <Flex gap="middle" vertical>
        {/* Filters Card */}
        <Card title="Available Filters & Data Tweaks">
          <div className="flex flex-col w-full">
            {/* manage_column */}
            <div className="flex flex-col md:flex-row w-full border-t-2 gap-0 md:gap-20">
              {/* column_01 */}
              <div className="pt-5 pb-5 flex flex-row items-center gap-5">
                <p className="font-bold">Max Rank:</p>
                <InputNumber
                  placeholder="Enter Max Rank"
                  value={filters.maxRank}
                  onChange={(value) => handleFilterChange("maxRank", value)}
                  min={1} // Minimum rank is 1
                />
              </div>
              {/* column_02 */}
              <div className="flex flex-row items-center gap-5">
                <p className="font-bold">NEET Quota:</p>
                <Select
                  
                  placeholder="Select Allotted Quota"
                  value={filters.allottedQuota}
                  onChange={(value) => handleFilterChange("allottedQuota", value)}
                  options={uniqueValues.allottedQuota.map((quota) => ({
                    value: quota,
                    label: quota,
                  }))}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full border-t-2 border-b-2 gap-0 md:gap-20">
              {/* column_01 */}
              <div className="pt-5 pb-5 flex flex-row items-center gap-5">
                <p className="font-bold">A-Category:</p>
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
                />
              </div>
              {/* column_02 */}
              <div className="flex flex-row items-center gap-5">
                <p className="font-bold">College:</p>
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
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row w-full border-b-2 gap-0 md:gap-20">
              {/* column_01 */}
              <div className="pt-5 pb-5 flex flex-row items-center gap-5">
                <p className="font-bold">Candidate Category:</p>
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
              {/* column_02 */}
              <div className="flex flex-row items-center gap-5">
                <p className="font-bold">Course:</p>
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
            </div>
          </div>
          <Button danger type="primary" onClick={clearFilters} style={{ marginBottom: 16 }}>
            Clear All Filters
          </Button>
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
        {/* Custom Card */}
        <CustomCard title="My Custom Card" />
      </Flex>
    </div>
  );
};

export default Page;