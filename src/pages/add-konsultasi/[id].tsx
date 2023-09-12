import { SiteHeader } from "~/components/site-header";
import { useRouter } from "next/router";
import { TextareaForm } from "~/components/add-konsultasi";

const HomePage = () => {
  const { query } = useRouter();

  const id = query["id"];

  return (
    <>
      <SiteHeader />
      <section className="container mx-auto gap-6 pb-8 pt-4 md:py-8">
        <div className="flex justify-center  h-40 w-full space-x-4">
          <TextareaForm id={id} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
