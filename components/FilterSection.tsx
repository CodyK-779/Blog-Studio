"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusCircleIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Categories } from "@/lib/generated/prisma";
import BlogSection from "./BlogSection";

export type FilterType = "asc" | "desc";

const FilterSection = () => {
  const { data: session } = authClient.useSession();
  const [selectedCategory, setSelectedCategory] = useState<Categories>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("desc");

  const navigateCreate = session ? "/create" : "/login";

  return (
    <>
      <div className="w-full flex flex-col cm:flex-row items-center justify-center cm:justify-between mt-32 mb-20 gap-6">
        <div className="flex items-center gap-4">
          <div>
            <Select
              onValueChange={(value: Categories) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Cars">Cars</SelectItem>
                  <SelectItem value="Foods">Foods</SelectItem>
                  <SelectItem value="Games">Games</SelectItem>
                  <SelectItem value="RandomShit">RandomShit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={(value: FilterType) => setSelectedFilter(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="desc">Latest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          asChild
          className="flex items-center gap-2 bg-red-500 dark:bg-blue-600 text-white"
        >
          <Link href={navigateCreate} className="font-semibold">
            <PlusCircleIcon />
            Create Blog
          </Link>
        </Button>
      </div>
      <BlogSection
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
      />
    </>
  );
};

export default FilterSection;
