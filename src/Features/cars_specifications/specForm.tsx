import {useGetVehicleSpecificationsQuery} from "./spectAPI";


function SpecificatiosForm() {
  const { data:vehicalspecification,isLoading, isError } =useGetVehicleSpecificationsQuery();

 console.log(vehicalspecification)
console.log(isLoading)
console.log(isError)

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>#</th>
            <th>Vehicle Specs ID</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year</th>
            <th>Fuel Type</th>
            <th>Engine Capacity</th>
            <th>Transmission</th>
            <th>Seating Capacity</th>
            <th>Color</th>
            <th>Features</th>
          </tr>
        </thead>
        <tbody>

        
        </tbody>
      </table>
    </div>
  );
}

export default SpecificatiosForm;
