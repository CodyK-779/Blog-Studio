import { Categories } from "@/lib/generated/prisma";
import ghostRider from "../public/ghostRunner.jpg";
import valorant1 from "../public/valorant1.jpg";
import valorant2 from "../public/valorant2.jpg";
import valorant3 from "../public/valorant3.jpg";
import avatar from "@/public/avatar.png";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { FilterType } from "./FilterSection";

interface Props {
  selectedCategory?: Categories;
  selectedFilter: FilterType;
}

const dummyData = [
  {
    name: "Jimmy",
    userImg: avatar,
    postDate: "October 1 2025",
    image: ghostRider,
    title: "Ghost Runner",
    subTitle: "PC, Ps, Console",
    content: "This is a parkour like game kinda fun ngl",
    category: "Cars",
  },
  {
    name: "Tom",
    userImg: avatar,
    postDate: "December 1 2025",
    image: valorant1,
    title: "Valorant 1",
    subTitle: "PC, Ps, Console",
    content:
      "This is a unique counter-strike like shooter game with powers and made by Riot games",
    category: "Games",
  },
  {
    name: "David",
    userImg: avatar,
    postDate: "April 1 2025",
    image: valorant2,
    title: "Valorant2",
    content:
      "This is a unique counter-strike like shooter game with powers and made by Riot games",
    category: "Games",
  },
  {
    name: "Cody",
    userImg: avatar,
    postDate: "April 4 2005",
    image: valorant3,
    title: "Valorant3",
    subTitle: "PC, Ps, Console",
    content: "This is a parkour like game kinda fun ngl",
    category: "Games",
  },
];

const badgeType = (category: string) => {
  if (category === "Cars") {
    return (
      <Badge variant="secondary" className="bg-blue-600 text-white">
        Cars
      </Badge>
    );
  } else if (category === "Foods") {
    return (
      <Badge variant="secondary" className="bg-green-500 text-white">
        Foods
      </Badge>
    );
  } else if (category === "Games") {
    return (
      <Badge variant="default" className="bg-red-500 text-white">
        Games
      </Badge>
    );
  } else {
    return <Badge>Random Shit</Badge>;
  }
};

const BlogSection = ({ selectedFilter, selectedCategory }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyData.map((data) => (
        <div
          key={data.name}
          className="border shadow-lg rounded dark:bg-neutral-800 cursor-pointer"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Image
                src={data.userImg}
                alt={data.name}
                className="size-10 rounded-full"
              />
              <div className="flex flex-col text-sm">
                <p>{data.name}</p>
                <p>{data.postDate}</p>
              </div>
            </div>
            {data.category && badgeType(data.category)}
          </div>
          {data.image && (
            <Image src={data.image} alt="image" className="object-cover" />
          )}
          <div className="p-4">
            <p className="text-2xl font-semibold mb-1 text-red-500 dark:text-blue-600">
              {data.title}
            </p>
            {data.subTitle && (
              <p className="font-medium mb-1 text-blue-600 dark:text-red-600">
                {data.subTitle}
              </p>
            )}
            <p className="text-sm">{data.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;
