import ListingPage from '@/components/ListingPage';
import { residenceUnits } from '@/lib/data';

export const metadata = { title: 'Residences | Banyan Residences' };

export default function ResidencesPage() {
  return (
    <ListingPage
      title="Residences"
      description="Look farther with a fuller palette of possibilities. A bold architectural expression, with a facade inspired by tree canopies — studios to four-bedroom homes, each shaped by light and proportion."
      units={residenceUnits}
      kind="residence"
      image="/images/interior-living.webp"
    />
  );
}
