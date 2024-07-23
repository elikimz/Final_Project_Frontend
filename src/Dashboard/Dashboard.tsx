
//import { Container } from "lucide-react";
  import Users from "../Features/users/usersTable";
//import AddUserForm from "../Features/users/Adduser";
  //import SpecsForm from "../Features/cars_specifications/specForm";

//import BookingForm from '../Features/Bookings/booking'
  //import ProfileManagement from '../Features/register/Profilemanagement'
   import Vehicle from '../Features/Vehicles/vehicle'
  //  import CreateLocationForm from "../Features/locations/location"
  import AdminDashboard from "../Features/AdminDashboard/AdminDashboard"



function Dashboard() {
    return (
     <>
    {/* <AddUserForm onUserAdded={function (): void {
                   throw new Error("Function not implemented.");
              } }/> */}
            
              <Users/>
              {/* <SpecsForm/> */}
              {/* <BookingForm/> */}
               <Vehicle/>
             
{/*             
             <CreateLocationForm/>  */}
             < AdminDashboard />
           
         </>
    )
  }
  
  export default Dashboard