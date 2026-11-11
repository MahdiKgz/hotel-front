import RecoveryCard from "@/features/account-recovery/ui/RecoveryCard";

export const metadata = { referrer: "no-referrer" } as const;

export default function Page() {
  return <RecoveryCard mode="reset" />;
}
