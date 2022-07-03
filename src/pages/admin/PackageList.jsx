import NavBar from "../../components/NavBar";
import { useGetPackagesQuery, useUpdatePackageMutation, useDeletePackageMutation, useAddNewPackageMutation } from "../../store/slices/apiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function EditablePackageTableRow({ paket, onFinish }) {
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    setName(paket.name);
    setPrice(paket.price);
  }, [paket]);

  function handleNameChange(event) {
    event.preventDefault();

    setName(event.target.value);
  }

  function handlePriceChange(event) {
    event.preventDefault();

    setPrice(event.target.value);
  }

  async function onSave() {
    if (!name || !price) {
      console.error("Ref elements isn't initialized");
      return;
    }

    const newPackage = {
      name,
      price
    };

    if (!isLoading) {
      try {
        const updatePackagePromise = updatePackage({
          id: paket.id,
          newPackage: newPackage
        }).unwrap();

        toast.promise(
          updatePackagePromise, {
          "pending": "Updating package",
          "success": "Package updated",
          "error": "Failed to update package"
        });

        await updatePackagePromise;

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
      >
        <input value={name} onChange={handleNameChange} type="text" className="w-full bg-transparent" />
      </th>
      <td className="px-6 py-4">
        <input value={price} onChange={handlePriceChange} type="number" pattern="[0-9]*" inputMode="numeric" className="w-full bg-transparent" />
      </td>
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

function FrozenPackageTableRow({ paket, onEdit }) {
  const MySwal = withReactContent(Swal);

  const [deletePackage, { isLoading }] = useDeletePackageMutation();

  async function handlePackageDeletion(id) {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(
          deletePackage(paket.id).unwrap(),
          {
            pending: "Deleting package",
            success: "Package deletion successful",
            error: "Failed to delete package"
          }
        );
      }
    })
  }

  return (
    <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {paket.name}
      </th>
      <td className="px-6 py-4">{paket.price}</td>
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
          onClick={handlePackageDeletion}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

function PackageTableRow({ paket }) {
  const [isOnEdit, setIsOnEdit] = useState(false);

  return isOnEdit ? <EditablePackageTableRow paket={paket} onFinish={() => setIsOnEdit(false)} />
    : <FrozenPackageTableRow paket={paket} onEdit={() => setIsOnEdit(true)} />
}

function PackageTable({ packages }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 table-fixed dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit or Remove</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {packages.map((paket) => (
          <PackageTableRow paket={paket} key={paket.id} />
        ))}
      </tbody>
    </table>
  );
}

function PackageForm() {
  const [addPackage, { isLoading }] = useAddNewPackageMutation();

  const TextInput = (props) => <Field {...props} className={`dark:bg-gray-700 rounded-md py-1 px-2 bg-gray-200 ${props.className}`} />

  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <Formik
        initialValues={{
          name: "",
          price: 0
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const addPackagePromise = addPackage({
              name: values.name,
              price: values.price
            });

            toast.promise(
              addPackagePromise.unwrap(),
              {
                pending: "Submitting package",
                success: "Package submitted",
                error: "Failed to submit package"
              }
            );

            await addPackagePromise;
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="text-sm text-gray-500 dark:text-gray-400">
          <h2 className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Add New Package</h2>
          <div className="px-6 py-3 bg-white dark:bg-gray-800 dark:border-gray-700 grid grid-cols-2 gap-x-6 gap-y-3">
            <label htmlFor="name">Name</label>
            <TextInput className="lg:row-start-2" name="name" type="text" />
            <ErrorMessage name="name" />

            <label htmlFor="price">Price</label>
            <TextInput className="lg:row-start-2" name="price" type="number" pattern="[0-9]*" inputMode="numeric" />
            <ErrorMessage name="price" />

            <button type="submit" className="px-5 py-2 mt-1 mb-2 font-medium bg-purple-600 text-slate-100 rounded-md hover:ring place-self-start">
              {isLoading && (<i className="ri-loader-4-line animate-spin"></i>)} Submit
            </button>
          </div>
        </Form>
      </Formik>

    </div>
  );
}

export default function PackageList() {
  const { data: packages, error, isLoading } = useGetPackagesQuery();

  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex flex-col items-center w-full max-w-4xl min-h-screen pt-16 mx-auto gap-5">
        <h1 className="text-xl text-center">Packages List</h1>
        <PackageForm />
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          {error ? (<p>Error!</p>) : isLoading ? (<p>Loading...</p>) : (
            <PackageTable packages={packages} />
          )}
        </div>
      </div>
    </div>
  );
}
