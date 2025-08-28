import UpdateCategory from "@/components/admin/categories/update/UpdateCategory";

export default async function updateCategoriesPage({params}) {
  console.log("🚀 ~ updateCategoriesPage ~ params:", params)
  const { updateId } = await params;
  return <UpdateCategory id={updateId} />;
}
