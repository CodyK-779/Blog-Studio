"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/post-actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Categories } from "@/lib/generated/prisma";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState<Categories>();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsPosting(true);

    try {
      const results = await createPost(content, title, subTitle, selectedValue);

      if (results?.success) {
        setContent("");
        setTitle("");
        setSubTitle("");

        toast.success("Post created successfully!");
      }
    } catch (error) {
      console.error("Failed to create Post", error);
      toast.error("Failed to create Post");
    } finally {
      setIsPosting(false);
      router.push("/");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Blog form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <Input
            id="title"
            name="title"
            content={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-4">
            <label htmlFor="sub-title">Sub-Title</label>
            <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
              ( Optional )
            </p>
          </div>
          <Input
            id="sub-title"
            name="sub-title"
            content={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="content">Description</label>
          <Textarea
            id="content"
            name="content"
            content={content}
            className="h-32"
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Select
          onValueChange={(value: Categories) => setSelectedValue(value)}
          value={selectedValue}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              className="font-medium"
              placeholder="Select a Category?"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Cars">Cars</SelectItem>
              <SelectItem value="Foods">Foods</SelectItem>
              <SelectItem value="Games">Games</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 font-medium"
          disabled={isPosting}
        >
          {isPosting ? (
            <>
              <Loader2Icon />
              Loading...
            </>
          ) : (
            <>
              <SendIcon />
              Create
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateForm;
