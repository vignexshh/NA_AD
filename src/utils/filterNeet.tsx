// src/utils/filterNeet.tsx

import { useState, useEffect } from "react";
import data from "@/data/2_ALL INDIA QUOTA AYUSH ROUND-1 ALLOTMENTS.json"; // Ensure the path is correct

interface Filters {
  allottedQuota: string[];
  allottedInstitute: string | undefined;
  course: string[];
  allottedCategory: string | undefined;
  candidateCategory: string | undefined;
  maxRank: number | undefined;
}

interface DataItem {
  SNo: number;
  Rank: number;
  "Allotted Quota": string;
  "Allotted Institute": string;
  Course: string;
  "Alloted Category": string;
  "Candidate Category": string;
  Remarks: string;
}

const useFilterLogic = () => {
  const [filters, setFilters] = useState<Filters>({
    allottedQuota: [],
    allottedInstitute: undefined,
    course: [],
    allottedCategory: undefined,
    candidateCategory: undefined,
    maxRank: undefined,
  });

  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [uniqueValues, setUniqueValues] = useState<{
    allottedQuota: string[];
    allottedInstitute: string[];
    course: string[];
    allottedCategory: string[];
    candidateCategory: string[];
  }>({
    allottedQuota: [],
    allottedInstitute: [],
    course: [],
    allottedCategory: [],
    candidateCategory: [],
  });

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      console.error("Data is not loaded or not an array:", data);
      return;
    }

    const uniqueValues = {
      allottedQuota: [...new Set(data.map((item) => item["Allotted Quota"] ?? ""))].filter(Boolean),
      allottedInstitute: [...new Set(data.map((item) => item["Allotted Institute"] ?? ""))].filter(Boolean),
      course: [...new Set(data.map((item) => item["Course"] ?? ""))].filter(Boolean),
      allottedCategory: [...new Set(data.map((item) => item["Alloted Category"] ?? ""))].filter(Boolean),
      candidateCategory: [...new Set(data.map((item) => item["Candidate Category"] ?? ""))].filter(Boolean),
    };

    const parsedData = data.map((item) => ({
      ...item,
      SNo: parseInt(item.SNo, 10),
      Rank: parseInt(item.Rank, 10),
    }));

    setUniqueValues(uniqueValues);
    setFilteredData(parsedData);
  }, [data]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = data.map((item) => ({
        ...item,
        SNo: parseInt(item.SNo, 10),
        Rank: parseInt(item.Rank, 10),
      })).filter((item) => {
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
          (filters.maxRank === undefined || item.Rank <= filters.maxRank)
        );
      });
      setFilteredData(filtered);
    };

    applyFilters();
  }, [filters, data]);

  const handleFilterChange = (field: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      allottedQuota: [],
      allottedInstitute:  undefined,
      course: [],
      allottedCategory: undefined,
      candidateCategory: undefined,
      maxRank: undefined,
    });
  };

  return {
    filters,
    setFilters,
    filteredData,
    uniqueValues,
    handleFilterChange,
    clearFilters,
  };
};

export default useFilterLogic;