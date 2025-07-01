import { HeartIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Replies = () => {
  return (
    <div>
      <div className="flex gap-3 mt-2 mb-4">
        <Avatar className="size-8">
          <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
            K
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Khant Zaw Thein</p>
            <i className="ri-vip-crown-fill text-yellow-400 ml-2"></i>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
              <span className="mx-2">•</span>
              4d
            </p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
              <span className="mx-2">•</span>Authur
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start">
            <div className="flex flex-col flex-1">
              <p className="text-sm my-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                ex minima laborum, eos sunt inventore sequi sit modi nihil magni
                explicabo. Facilis iure perferendis harum officiis omnis totam
                esse laudantium dolores cum officia qui tenetur natus facere ut
                est at et reprehenderit adipisci, sequi cumque ullam similique
                enim labore earum.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:pl-12 mt-4 sm:mt-1">
              <div className="flex items-center gap-2">
                <button className="cursor-pointer">
                  <HeartIcon
                    className={`transition-colors duration-150 ease-in text-red-500 fill-red-500`}
                  />
                </button>
                <p className="text-sm">4</p>
              </div>
              <button className="cursor-pointer">
                <Trash2Icon size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-2 mb-4">
        <Avatar className="size-8">
          <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
            K
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Khant Zaw Thein</p>
            <i className="ri-vip-crown-fill text-yellow-400 ml-2"></i>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
              <span className="mx-2">•</span>
              4d
            </p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
              <span className="mx-2">•</span>Authur
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start">
            <div className="flex flex-col flex-1">
              <p className="text-sm my-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                ex minima laborum, eos sunt inventore sequi sit modi nihil magni
                explicabo. Facilis iure perferendis harum officiis omnis totam
                esse laudantium dolores cum officia qui tenetur natus facere ut
                est at et reprehenderit adipisci, sequi cumque ullam similique
                enim labore earum.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:pl-12 mt-4 sm:mt-1">
              <div className="flex items-center gap-2">
                <button className="cursor-pointer">
                  <HeartIcon
                    className={`transition-colors duration-150 ease-in text-red-500 fill-red-500`}
                  />
                </button>
                <p className="text-sm">4</p>
              </div>
              <button className="cursor-pointer">
                <Trash2Icon size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replies;
