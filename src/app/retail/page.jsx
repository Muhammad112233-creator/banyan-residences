import ListingPage from '@/components/ListingPage';
import { retailUnits } from '@/lib/data';

export const metadata = { title: 'Retail Spaces | Banyan Residences' };

export default function RetailPage() {
  return (
    <ListingPage
      title="Retail spaces"
      description="A prestigious address where business feels at home. Street-level retail and hospitality units meet flexible offices above, each shaped by refined architecture, natural light and direct access to the heart of the district."
      units={retailUnits}
      kind="retail"
      image="/images/office-space.webp"
    />
  );
}
