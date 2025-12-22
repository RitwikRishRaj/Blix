import CraftingCanvas from "@/components/CraftingCanvas";

export default function Home() {
  return (
    <div className="min-h-screen h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-10 h-full">
        <CraftingCanvas />
      </div>
    </div>
  );
}
