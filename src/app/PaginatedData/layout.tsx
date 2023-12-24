import FilterSearch from "@/app/FilterSearch/page";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <FilterSearch />

      <div style={{ minHeight: "30vh" }}>{children}</div>
    </html>
  );
}
