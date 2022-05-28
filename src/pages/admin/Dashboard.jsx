import NavBar from "../../components/NavBar";

function Card({ title, rightTitle, children }) {
  return (
    <div className="p-6 bg-white rounded shadow basis-3 dark:bg-slate-800 dark:text-slate-100">
      <div className="flex items-center justify-between pb-3 mb-3 leading-none border-b border-slate-200">
        <h4 className="mb-1">{title}</h4>
        <div className="text-sm text-slate-400">{rightTitle}</div>
      </div>
      {children}
    </div>
  );
}

function MemberCard({ name, phoneNumber }) {
  return (
    <div className="flex justify-between p-2 dark:bg-white/5 rounded-md bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10">
      <div>{name}</div>
      <div>{phoneNumber}</div>
    </div>
  );
}

function TransactionCard({ customerName, cashierName, total, paymentStatus }) {
  function getPaymentBadgeElement() {
    const isPaid = (paymentStatus === "already_paid");

    return isPaid ? (
      <span className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2 py-0.5 rounded dark:bg-green-300 dark:text-green-900">Paid</span>
    ) : (
      <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2 py-0.5 rounded dark:bg-yellow-300 dark:text-yellow-900">Pending</span>
    );
  }

  return (
    <div className="flex justify-between p-2 dark:bg-white/5 rounded-md bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10">
      <div>{customerName}</div>
      <div className="flex items-center">
        {getPaymentBadgeElement()}
        <div>{total}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex w-full max-w-4xl min-h-screen pt-16 mx-auto gap-5">
        <div className="flex flex-col gap-5 grow basis-0">
          <Card title="Pemasukan" rightTitle="28 Mei 2022">
            <div className="mb-1 font-sans text-2xl font-bold tracking-wide">
              IDR 120,000
            </div>
            <div className="flex items-center text-green-500 gap-1">
              <i className="text-xl ri-arrow-up-line" />
              <span>26.8%</span>
              <span className="ml-1 text-xs text-gray-400">dari minggu sebelumnya</span>
            </div>
          </Card>
          <Card title="Transaksi Terkini">
            <div className="flex flex-col gap-2">
              <TransactionCard customerName="Sebastian Smith" cashierName="Joko Budoyo" total="Rp 20.000,00" paymentStatus="already_paid" />
              <TransactionCard customerName="Sebastian Smith" cashierName="Joko Budoyo" total="Rp 20.000,00" paymentStatus="not_yet_paid" />
              <TransactionCard customerName="Sebastian Smith" cashierName="Joko Budoyo" total="Rp 20.000,00" paymentStatus="already_paid" />
              <TransactionCard customerName="Sebastian Smith" cashierName="Joko Budoyo" total="Rp 20.000,00" paymentStatus="already_paid" />
              <TransactionCard customerName="Sebastian Smith" cashierName="Joko Budoyo" total="Rp 20.000,00" paymentStatus="already_paid" />
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-5 grow basis-0">
          <Card title="Order" rightTitle="28 Mei 2022">
            <p><span class="font-bold">Total</span>: 100</p>
            <p><span class="font-bold">Paid</span>: 80</p>
            <p><span class="font-bold">Unpaid</span>: 20</p>
            <p><span class="font-bold">New</span>: 8</p>
            <p><span class="font-bold">In Progress</span>: 20</p>
            <p><span class="font-bold">Finished</span>: 72</p>
          </Card>
          <Card title="Members">
            <div className="flex flex-col gap-2">
              <MemberCard name="Joko Budoyo" phoneNumber="+6289520191531" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
