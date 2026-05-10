import { useGetAdminReportQuery } from "@/entities/Report/services/report.service";

export default function useGetAdminReport() {
  const { data: adminReport } = useGetAdminReportQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return {
    adminReport,
  };
}
