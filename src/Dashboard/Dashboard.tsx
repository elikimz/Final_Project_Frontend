
//import { Container } from "lucide-react";
   import Users from "../Features/users/usersTable";
//import AddUserForm from "../Features/users/Adduser";
  import SpecsForm from "../Features/cars_specifications/specForm";

//import BookingForm from '../Pages/Booking Form'
 // import ProfileManagement from '../Features/register/Profilemanagement'
   //import Vehicle from '../Features/Vehicles/vehicle'



function Dashboard() {
    return (
     <>
    {/* <AddUserForm onUserAdded={function (): void {
                   throw new Error("Function not implemented.");
              } }/> */}
            
              <Users/>
              <SpecsForm/>
              {/* <BookingForm/> */}
              {/* <Vehicle/> */}
           
         </>
    )
  }
  
  export default Dashboard