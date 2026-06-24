import AuthScreen from "../../components/auth/AuthScreen";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { role?: string; next?: string };
}) {
  const role = searchParams?.role?.toLowerCase() === "client" ? "Client" : "Associate";
  const nextPath = searchParams?.next;

  return <AuthScreen mode="login" role={role} allowRoleSwitch nextPath={nextPath} />;
}
