import UpdateBook from "@/components/admin/books/update/UpdateBook";

export default async function updateBookPage({ params }) {
  const { updateId } = await params;
  return <UpdateBook bookId={updateId} />;
}
