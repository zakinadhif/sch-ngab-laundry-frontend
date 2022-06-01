import NavBar from "../../components/NavBar";

export default function TransactionList() {
  const transactions = [
    {
      customerName: "Agus Cipto",
      cashierName: "Agung",
      orderDate: "2022-05-03",
      paymentDate: "2022-05-03",
      deadlineDate: "2022-05-04",
      progressStatus: "Done",
      paymentStatus: "Paid"
    },
  ];

  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex items-start w-full max-w-5xl min-h-screen pt-16 mx-auto gap-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg grow">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              {transactions.map((transaction, index) => (
                <tr className="bg-white border-b last:border-b-0 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {transaction.customerName}
                  </th>
                  <td className="px-6 py-4">{transaction.cashierName}</td>
                  <td className="px-6 py-4">{transaction.orderDate}</td>
                  <td className="px-6 py-4">{transaction.paymentDate}</td>
                  <td className="px-6 py-4">{transaction.deadlineDate}</td>
                  <td className="px-6 py-4">{transaction.progressStatus}</td>
                  <td className="px-6 py-4">{transaction.paymentStatus}</td>
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
