import react from 'react';
import { useGetUsersQuery} from './usersAPI'



  function Users(){
    const { data:userData,isLoading,isError,error} = useGetUsersQuery();

    console.log(userData)
    return(
        <>
        <div>
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>id</th>
        <th>full_name</th>
        <th>email</th>
        <th>contact_phone</th>
        <th>address</th>
      </tr>
    </thead>
    <tbody>
    
    {
        isLoading?(<tr><td>loading</td></tr>) :(
          isError?(
            error.data.length==0 && (
              <tr><td colSpan={5}>no dat</td></tr>
            )
          ):
          userData.map((user, index) => (

            <tr key={index}>
              <td>{index+1}</td>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.contact_phone}</td>
              <td>{user.address}</td>
            </tr>
          )
          

      (
        <tr></tr>
      )
    )
  )
    }
      <tr>
     
      </tr>
  
    </tbody>
  </table>
</div>
        </div>

        </>
    )
}

export default Users