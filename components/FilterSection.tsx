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
import { Categories } from "@/lib/generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";

export type FilterType = "asc" | "desc";

const FilterSection = () => {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (name: string, value: Categories | FilterType | "") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.push(`?${params.toString()}`);
  };

  const navigateCreate = session ? "/blog/create" : "/login";

  return (
    <>
      <div className="w-full flex flex-col cm:flex-row items-center justify-center cm:justify-between mt-32 mb-20 gap-6 px-2">
        <div className="flex items-center gap-4">
          <div>
            <Select
              onValueChange={(value: Categories | "") =>
                handleChange("category", value === "All" ? "" : value)
              }
              defaultValue={searchParams.get("category") || "All"}
            >
              <SelectTrigger className="w-[150px] sm:w-[180px] border-gray-300 dark:border-gray-700 border-2">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Cars">Cars</SelectItem>
                  <SelectItem value="Foods">Foods</SelectItem>
                  <SelectItem value="Games">Games</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              onValueChange={(value: FilterType) =>
                handleChange("filter", value)
              }
              defaultValue={searchParams.get("filter") || "desc"}
            >
              <SelectTrigger className="w-[140px] sm:w-[150px] border-gray-300 dark:border-gray-700 border-2">
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
          className="flex items-center gap-2 bg-red-500 dark:bg-blue-600 hover:bg-red-600 dark:hover:bg-blue-700 text-white"
        >
          <Link href={navigateCreate} className="font-semibold">
            <PlusCircleIcon />
            Create Blog
          </Link>
        </Button>
      </div>
    </>
  );
};

export default FilterSection;
