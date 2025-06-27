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
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "./upload/single-image";
import { UploaderProvider, type UploadFn } from "./upload/uploader-provider";
import * as React from "react";

const CreateForm = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState<Categories>();

  const [uploadImage, setUploadImage] = useState("");

  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim() || !uploadImage || !title.trim()) {
      toast.error("Please fill in all required fields before posting.");
      return;
    }

    setIsPosting(true);

    try {
      const results = await createPost(
        content,
        title,
        subTitle,
        selectedValue,
        uploadImage
      );

      if (results?.success) {
        setContent("");
        setTitle("");
        setSubTitle("");
        setUploadImage("");

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

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });

      setUploadImage(res.url);

      return res;
    },
    [edgestore]
  );

  return (
    <Card className="mx-4">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Blog form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title">Title</label>
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
            className="h-36"
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center py-4">
          <UploaderProvider uploadFn={uploadFn} autoUpload>
            <SingleImageDropzone
              height={200}
              width={200}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1 MB
              }}
            />
          </UploaderProvider>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
          <p className="text-sm font-medium text-gray-400 dark:text-gray-200">
            ( Optional )
          </p>
        </div>
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
