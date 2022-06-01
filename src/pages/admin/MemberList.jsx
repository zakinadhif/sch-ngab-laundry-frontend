import NavBar from "../../components/NavBar";

export default function MemberList() {
  const members = [
    {
      name: "Agus Cipto",
      address: "Jl. Danau Magma IV",
      gender: "Male",
      phoneNumber: "+62 89520201321",
    },
    {
      name: "Agus Budoyo",
      address: "Jl. Danau AAAAAA",
      gender: "Male",
      phoneNumber: "+62 89520201221",
    },
    {
      name: "Agus Suprapto",
      address: "Jl. Danau Amazon",
      gender: "Male",
      phoneNumber: "+62 89520201521",
    },
    {
      name: "Agus Cipto",
      address: "Jl. Laut Api",
      gender: "Male",
      phoneNumber: "+62 89520201621",
    },
  ];

  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex items-start w-full max-w-4xl min-h-screen pt-16 mx-auto gap-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg grow">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit or Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {member.name}
                  </th>
                  <td className="px-6 py-4">{member.address}</td>
                  <td className="px-6 py-4">{member.gender}</td>
                  <td className="px-6 py-4">{member.phoneNumber}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="mr-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
