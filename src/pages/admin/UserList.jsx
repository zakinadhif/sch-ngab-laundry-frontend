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

export default function UserList() {
  return (
    <div className="bg-slate-100 text-slate-800 dark:text-white dark:bg-slate-900">
      <NavBar />
      <div className="flex w-full max-w-4xl min-h-screen pt-16 mx-auto gap-5">
        <div className="flex flex-col gap-5 grow basis-0">
          <Card title="Members">
            <div className="flex flex-col gap-2">
              <MemberCard name="Joko Budoyo" phoneNumber="+6289520191531" />
              <MemberCard name="Joko Budoyo" phoneNumber="+6289520191531" />
              <MemberCard name="Joko Budoyo" phoneNumber="+6289520191531" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
