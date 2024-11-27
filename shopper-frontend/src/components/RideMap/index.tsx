'use client'
import CustomMap from '@/components/CustomMap';
import DriverList from '@/components/DriverList';


export default function RideMap() {

  return (
    <div className={" h-lvh"}>
      <div className="h-1/2">
        <CustomMap />
      </div>

      <div className="overflow-y-auto h-1/2 w-full">
        <DriverList/>
      </div>

    </div>
  )
}