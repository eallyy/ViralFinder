import type { Metadata } from "next";
import { getWinnerReels } from "@/lib/supabase/winner_reels";
import ClientReels from "@/components/client-reels";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Create Your Coffee Recipe | SmartBrew",
  description:
    "Generate the perfect coffee recipe tailored to your beans, equipment, and taste profile.",
};

export default async function CreateRecipe() {
  const initialReels = await getWinnerReels(24, 0);

  return (
    <>
      {/* Title and Description */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent mb-2">
          Gündemi Belirleyen Moda İçerikleri
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Kadın giyimde öne çıkan hesaplardan en çok izlenen videolar
        </p>
        <div className="mt-6 space-x-1 space-y-1">
          <Button outline>elbise</Button>
          <Button outline>takım</Button>
          <Button outline>tunik</Button>
          <Button outline>bluz</Button>
          <Button outline>iç giyim</Button>
        </div>
      </div>

      <ClientReels initialReels={initialReels} />
    </>
  );
}
