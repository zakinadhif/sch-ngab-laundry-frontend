import NavBar from "../../components/NavBar";
import { useGetMembersQuery, useAddNewMemberMutation, useDeleteMemberMutation, useUpdateMemberMutation } from "../../store/slices/apiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";

function EditableMemberTableRow({ member, onFinish }) {
  const [updateMember, { isLoading }] = useUpdateMemberMutation();
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const [gender, setGender] = useState(null);
  const phoneNumberRef = useRef(null);

  useEffect(() => {
    setGender(member.gender);
  }, [member])

  function handleGenderChange(event) {
    event.preventDefault();

    setGender(event.target.value);
  }

  async function onSave() {
    if (!nameRef || !addressRef || !gender || !phoneNumberRef) {
      console.error("Ref elements isn't initialized");
      return;
    }

    const newMember = {
      name: nameRef.current.innerText,
      address: addressRef.current.innerText,
      gender: gender,
      phoneNumber: phoneNumberRef.current.innerText,
    };

    if (!isLoading) {
      try {
        await updateMember({
          id: member.id,
          newMember: newMember
        });

        onFinish();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        contentEditable
        suppressContentEditableWarning
        ref={nameRef}
      >
        {member.name}
      </th>
      <td className="px-6 py-4" contentEditable suppressContentEditableWarning ref={addressRef}>{member.address}</td>
      <td className="px-6 py-4">
        <select name="gender" value={gender} onChange={handleGenderChange} className="bg-transparent">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </td>
      <td className="px-6 py-4" contentEditable suppressContentEditableWarning ref={phoneNumberRef}>{member.phoneNumber}</td>
      <td className="px-6 py-4 text-right">
        <button
          href="#"
          className="mr-1 font-medium text-gray-600 dark:text-gray-500 hover:underline"
          onClick={onFinish}
        >
          Cancel
        </button>
        <button
          href="#"
          className="mr-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={onSave}
        >
          Save
        </button>
      </td>
    </tr>
  );
}

function FrozenMemberTableRow({ member, onEdit }) {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {member.name}
      </th>
      <td className="px-6 py-4">{member.address}</td>
      <td className="px-6 py-4">{capitalize(member.gender)}</td>
      <td className="px-6 py-4">{member.phoneNumber}</td>
      <td className="px-6 py-4 text-right">
        <button
          href="#"
          className="mr-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => onEdit()}
        >
          Edit
        </button>
        <button
          href="#"
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
          onClick={() => deleteMember(member.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

function MemberTableRow({ member }) {
  const [isOnEdit, setIsOnEdit] = useState(false);

  return isOnEdit ? <EditableMemberTableRow member={member} onFinish={() => setIsOnEdit(false)} />
    : <FrozenMemberTableRow member={member} onEdit={() => setIsOnEdit(true)} />
}

function MemberTable({ members }) {
  const [deleteMember, { isLoading }] = useDeleteMemberMutation();

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
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
          <MemberTableRow member={member} key={member.id} />
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
