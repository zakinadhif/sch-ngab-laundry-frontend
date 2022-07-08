import NavBar from "../../components/NavBar";
import {
  useGetTransactionsQuery,
  useAddNewTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionDetailsQuery,
  useAddNewTransactionDetailMutation,
  useUpdateTransactionDetailMutation,
  useDeleteTransactionDetailMutation,
  useGetMembersQuery,
  useGetUsersQuery
} from "../../store/slices/apiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

function formatDate(date) {
  let newDate = new Date(date)
  let day = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
}

function getMemberSelectOptions({ data: members, error, isLoading }) {
  return isLoading ? (<option value="">"Loading..."</option>)
    : error ? (<option value="">Error!</option>)
    : members ? (
      [
        <option value=""></option>,
        ...members.map(member => <option value={member.id}>{member.name}</option>)
      ]
    )
    : null;
}

function getUserSelectOptions({ data: users, error, isLoading }) {
  return isLoading ? (<option value="">"Loading..."</option>)
    : error ? (<option value="">Error!</option>)
    : users ? (
      [
        <option value=""></option>,
        ...users.map(user => <option value={user.id}>{user.username}</option>)
      ]
    )
    : null;
}

function getPaymentStatusOptions() {
  return (<>
    <option value=""></option>
    <option value="already_paid">Paid</option>
    <option value="not_paid_yet">Not Yet Paid</option>
  </>)
}

function getProgressStatusOptions() {
  return (<>
    <option value=""></option>
    <option value="new">New</option>
    <option value="in_progress">In Progress</option>
    <option value="done">Done</option>
    <option value="picked_up">Picked Up</option>
  </>)
}

function getProgressStatusString(progressStatus) {
  switch (progressStatus) {
    case "new": return "New";
    case "in_progress": return "In Progress";
    case "done": return "Done";
    case "picked_up": return "Picked Up";
  }
}

function getPaymentStatusString(paymentStatus) {
  switch (paymentStatus) {
    case "already_paid": return "Paid";
    case "not_paid_yet": return "Pending";
  }
}

function EditableTransactionTableRow({ transaction, onFinish }) {
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();
  const usersQuery = useGetUsersQuery();
  const membersQuery = useGetMembersQuery();
  const [formState, setFormState] = useState({});

  useEffect(() => {
    setFormState({
      ...transaction
    })
  }, [transaction])

  function handleFormChange(event) {
    event.preventDefault();

    setFormState((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }));
  }

  async function onSave() {
    const newTransaction = {
      memberId: formState.memberId,
      userId: formState.userId,
      date: formatDate(formState.date),
      paymentDate: formatDate(formState.paymentDate),
      deadline: formatDate(formState.deadline),
      progressStatus: formState.progressStatus,
      paymentStatus: formState.paymentStatus
    };

    console.log(newTransaction);

    if (!isLoading) {
      try {
        const updateTransactionPromise = updateTransaction({
          id: transaction.id,
          newTransaction: newTransaction
        }).unwrap();

        toast.promise(
          updateTransactionPromise, {
          "pending": "Updating transaction",
          "success": "Transaction updated",
          "error": "Failed to update transaction"
        }
        )

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
        <select
          value={formState.memberId}
          name="memberId"
          onChange={handleFormChange}
          className="dark:bg-gray-800 bg-gray-200"
          >
          {getMemberSelectOptions(membersQuery)}
        </select>
      </th>
      <td className="px-6 py-4">
        <select
          name="userId"
          onChange={handleFormChange}
          value={formState.userId}
          className="dark:bg-gray-800 bg-gray-200"
          >
          {getUserSelectOptions(usersQuery)}
        </select>
      </td>
      <td className="px-6 py-4">
        <input
          type="date"
          name="date"
          onChange={handleFormChange}
          value={formatDate(formState.date)} 
          className="dark:bg-gray-800 bg-gray-200"
          />
      </td>
      <td className="px-6 py-4">
        <input
          type="date"
          name="paymentDate"
          onChange={handleFormChange}
          value={formatDate(formState.paymentDate)}
          className="dark:bg-gray-800 bg-gray-200"
          />
      </td>
      <td className="px-6 py-4">
        <input
          type="date"
          name="deadline"
          onChange={handleFormChange}
          value={formatDate(formState.deadline)}
          className="dark:bg-gray-800 bg-gray-200"
          />
      </td>
      <td className="px-6 py-4">
        <select
          name="progressStatus"
          onChange={handleFormChange}
          value={formState.progressStatus}
          className="dark:bg-gray-800 bg-gray-200"
          >
          {getProgressStatusOptions()}
        </select>
      </td>
      <td className="px-6 py-4">
        <select
          name="paymentStatus"
          onChange={handleFormChange}
          value={formState.paymentStatus}
          className="dark:bg-gray-800 bg-gray-200"
          >
          {getPaymentStatusOptions()}
        </select>
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

function FrozenTransactionTableRow({ transaction, onEdit }) {
  const MySwal = withReactContent(Swal);

  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  async function handleTransactionDeletion(id) {
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
          deleteTransaction(transaction.id).unwrap(),
          {
            pending: "Deleting transaction",
            success: "Transaction deletion successful",
            error: "Failed to delete transaction"
          }
        );
      }
    })
  }

  return (
    <>
      <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {transaction.member.name}
        </th>
        <td className="px-6 py-4">{transaction.cashier.username}</td>
        <td className="px-6 py-4">{formatDate(transaction.date)}</td>
        <td className="px-6 py-4">{formatDate(transaction.paymentDate)}</td>
        <td className="px-6 py-4">{formatDate(transaction.deadline)}</td>
        <td className="px-6 py-4">{getProgressStatusString(transaction.progressStatus)}</td>
        <td className="px-6 py-4">{getPaymentStatusString(transaction.paymentStatus)}</td>
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
            onClick={handleTransactionDeletion}
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
}

function TransactionTableRow({ transaction }) {
  const [isOnEdit, setIsOnEdit] = useState(false);

  return isOnEdit ? <EditableTransactionTableRow transaction={transaction} onFinish={() => setIsOnEdit(false)} />
    : <FrozenTransactionTableRow transaction={transaction} onEdit={() => setIsOnEdit(true)} />
}

function TransactionTable({ transactions }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 table-fixed dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Customer
          </th>
          <th scope="col" className="px-6 py-3">
            Cashier
          </th>
          <th scope="col" className="px-6 py-3">
            Order Date
          </th>
          <th scope="col" className="px-6 py-3">
            Payment Date
          </th>
          <th scope="col" className="px-6 py-3">
            Deadline
          </th>
          <th scope="col" className="px-6 py-3">
            Progress Status
          </th>
          <th scope="col" className="px-6 py-3">
            Payment Status
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit or Remove</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionTableRow transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
}

function TransactionForm() {
  const [addTransaction, { isLoading }] = useAddNewTransactionMutation();
  const membersQuery = useGetMembersQuery();
  const user = useSelector(selectUser);

  const TextInput = (props) => <Field {...props} className={`dark:bg-gray-700 rounded-md py-1 px-2 bg-gray-200 ${props.className}`} />

  return (
    <div className="relative w-full overflow-x-auto bg-white shadow-md col-span-1 dark:bg-gray-800">
      <Formik
        initialValues={{
          customerId: "",
          orderDate: "",
          paymentDate: "",
          deadlineDate: "",
          progressStatus: "",
          paymentStatus: ""
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const addTransactionPromise = addTransaction({
              userId: user.data?.id,
              memberId: values.customerId,
              date: values.orderDate,
              paymentDate: values.paymentDate,
              deadline: values.deadlineDate,
              progressStatus: values.progressStatus,
              paymentStatus: values.paymentStatus
            });

            toast.promise(
              addTransactionPromise.unwrap(),
              {
                pending: "Submitting transaction",
                success: "Transaction submitted",
                error: "Failed to submit transaction"
              }
            );

            await addTransactionPromise;
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="text-sm text-gray-500 dark:text-gray-400">
          <h2 className="px-6 py-3 text-xs font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Add New Transaction</h2>
          <div className="px-6 py-3 bg-white dark:bg-gray-800 dark:border-gray-700 grid grid-cols-2 gap-x-6 gap-y-3">
            <label htmlFor="customerId">Customer</label>
            <TextInput className="lg:row-start-2" name="customerId" as="select">
              {getMemberSelectOptions(membersQuery)}
            </TextInput>
            <ErrorMessage name="customerId" />

            <label htmlFor="orderDate">Order Date</label>
            <TextInput className="lg:row-start-2" name="orderDate" type="date" />
            <ErrorMessage name="orderDate" />

            <label htmlFor="paymentDate">Payment Date</label>
            <TextInput className="lg:row-start-4" name="paymentDate" type="date" />
            <ErrorMessage name="paymentDate" />

            <label htmlFor="deadlineDate">Deadline</label>
            <TextInput className="lg:row-start-4" name="deadlineDate" type="date" />
            <ErrorMessage name="deadlineDate" />

            <label htmlFor="progressStatus">Progress Status</label>
            <TextInput className="lg:row-start-6" name="progressStatus" as="select">
              {getProgressStatusOptions()}
            </TextInput>
            <ErrorMessage name="progressStatus" />

            <label htmlFor="paymentStatus">Payment Status</label>
            <TextInput className="lg:row-start-6" name="paymentStatus" as="select">
              {getPaymentStatusOptions()}
            </TextInput>
            <ErrorMessage name="paymentStatus" />

            <button type="submit" className="px-5 py-2 mt-1 mb-2 font-medium bg-purple-600 text-slate-100 rounded-md hover:ring place-self-start">
              {isLoading && (<i className="ri-loader-4-line animate-spin"></i>)} Submit
            </button>
          </div>
        </Form>
      </Formik>

    </div>
  );
}

export default function TransactionList() {
  const { data: transactions, error, isLoading } = useGetTransactionsQuery();

  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="w-full min-h-screen pt-12 grid grid-cols-4">
        <div className="p-3 col-span-3">
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            {error ? (<p>Error!</p>) : isLoading ? (<p>Loading...</p>) : (
              <TransactionTable transactions={transactions} />
            )}
          </div>
        </div>
        <TransactionForm />
      </div>
    </div>
  );
}
