import Introduction from '@/components/home/Introduction';
import Location from '@/components/home/Location';
import Around from '@/components/home/Around';
import Residences from '@/components/home/Residences';
import Business from '@/components/home/Business';
import Roots from '@/components/home/Roots';
import Amenities from '@/components/home/Amenities';
import Horizontal from '@/components/home/Horizontal';
import Installment from '@/components/home/Installment';

export default function Home() {
  return (
    <>
      <Introduction />
      <Location />
      <Around />
      <Residences />
      <Business />
      <Roots />
      <Amenities />
      <Horizontal />
      <Installment />
    </>
  );
}
