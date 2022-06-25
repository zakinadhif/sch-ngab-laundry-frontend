import NavBar from "../../components/NavBar";
import { useGetMembersQuery, useAddNewMemberMutation, useDeleteMemberMutation } from "../../store/slices/apiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";

function MemberTable({ members }) {
  const [deleteMember, { isLoading }] = useDeleteMemberMutation();

  return (
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
        {members.map((member) => (
          <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700" key={member.id}>
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
                onClick={(e) => {e.preventDefault(); deleteMember(member.id)}}
              >
                Remove
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MemberForm() {
  const [addMember, { isLoading }] = useAddNewMemberMutation();

  const TextInput = (props) => <Field {...props} className={`dark:bg-gray-700 rounded-md py-1 px-2 bg-gray-200 ${props.className}`} />

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <Formik
        initialValues={{
          name: "",
          address: "",
          gender: "",
          phone: ""
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const result = await addMember({
              name: values.name,
              address: values.address,
              gender: values.gender,
              phoneNumber: values.phone
            }).unwrap();
          } catch (err) {
            window.alert("Failed to add member");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="text-sm text-gray-500 dark:text-gray-400">
          <h2 className="bg-gray-50 dark:bg-gray-700 px-6 py-3 text-gray-700 uppercase dark:text-gray-400 text-xs font-bold">Add New Member</h2>
          <div className="dark:bg-gray-800 dark:border-gray-700 bg-white px-6 py-3 grid grid-cols-2 gap-x-6 gap-y-3">
            <label htmlFor="name">Name</label>
            <TextInput className="lg:row-start-2" name="name" type="text" />
            <ErrorMessage name="name" />
            
            <label htmlFor="address">Address</label>
            <TextInput className="lg:row-start-2" name="address" type="text" />
            <ErrorMessage name="address" />

            <label htmlFor="gender">Gender</label>
            <TextInput className="lg:row-start-4 " name="gender" type="text" />
            <ErrorMessage name="gender" />
            
            <label htmlFor="phone">Phone Number</label>
            <TextInput className="lg:row-start-4 " name="phone" type="text" />
            <ErrorMessage name="phone" />

            <button type="submit" className="text-slate-100 bg-purple-600 rounded-md py-2 px-5 hover:ring mb-2 mt-1 place-self-start font-medium">
              {isLoading && (<i className="ri-loader-4-line animate-spin"></i>)} Submit
            </button>
          </div>
        </Form>
      </Formik>

    </div>
  );
}

export default function MemberList() {
  const { data: members, error, isLoading } = useGetMembersQuery();

  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex flex-col w-full max-w-4xl min-h-screen pt-16 mx-auto gap-5 items-center">
        <h1 className="text-xl text-center">Members List</h1>
        <MemberForm />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          {error ? (<p>Error!</p>) : isLoading ? (<p>Loading...</p>) : (
            <MemberTable members={members} />
          )}
        </div>
      </div>
    </div>
  );
}
