import CreateForm from "@/components/CreateForm";

export default function CreatePage() {
  return (
    <div className="pt-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
          Create your Blog post here
        </h1>
        <h3 className="text-2xl md:text-3xl font-semibold text-center">
          Share your{" "}
          <span className="text-red-500 dark:text-blue-600 font-bold">
            creativity
          </span>
        </h3>
      </div>
      <div className="mt-10 max-w-2xl w-full mx-auto">
        <CreateForm />
      </div>
    </div>
  );
}
