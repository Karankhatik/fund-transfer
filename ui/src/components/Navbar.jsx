/* eslint-disable react/prop-types */


// eslint-disable-next-line react/prop-types
const Navbar = ({user}) => {

  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div className='bg-slate-200 px-8 p-5 flex justify-between items-center'>
        <div>
            <h1 className='text-2xl font-bold'>Paytm</h1>
        </div>

        <div className="flex items-center gap-5">
            <p>Hello {user?.first_name}</p>
            <div className="font-bold bg-slate-300 border-2 shadow-md rounded-full">
              <span className="p-2 text-2xl">
              {user?.first_name.charAt(0)}
              </span>
            </div>
            <button className="bg-black text-white px-2 py-1 rounded" onClick={() => logout()}>Logout</button>
        </div>

    </div>
  )
}

export default Navbar