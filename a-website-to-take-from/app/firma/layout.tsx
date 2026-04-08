import Chat from "@/components/quixyComponents/Dashboard/Chat/Chat";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Chat />
    </div>
  );
}
