export default function root({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      Layout
      {children}
    </div>
  );
}
