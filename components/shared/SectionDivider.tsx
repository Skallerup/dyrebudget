import { PawPrint } from "lucide-react";

// Sort sektions-skillebånd i Adoption Pets-stil — tyk afrundet bjælke
// med en pote-badge i midten. Bruges mellem creme-sektioner.
export function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-center py-6">
        <div className="h-1.5 w-full rounded-full bg-navy-900" />
        <div className="absolute w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center ring-4 ring-background">
          <PawPrint className="w-4 h-4 text-mint-400" />
        </div>
      </div>
    </div>
  );
}
