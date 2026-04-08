import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function Documents({
  user,
  setFormState,
  formState,
  handleUpload,
}: {
  user: any;
  setFormState: any;
  formState: any;
  handleUpload: any;
}) {
  return (
    <div className="mx-auto w-full">
      {!user?.documents?.length ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 flex items-center justify-center p-4 rounded-full bg-gradient-to-b from-blue-500 to-blue-700">
            <HiOutlineDocumentSearch className="text-5xl text-white" />
          </div>
          <p className="text-gray-600 mt-4 text-center text-sm">
            Brak dokumentów
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <select
            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => {
              const selectedDocument = user.documents.find(
                (doc: any) => doc.userFileName === e.target.value
              );
              setFormState({ ...formState, document: selectedDocument });
            }}
          >
            <option value="">Wybierz dokument</option>
            {user.documents.map((item: any, i: any) => (
              <option key={i} value={item.userFileName}>
                {item.userFileName}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-4">
        <label
          className="block text-center text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md cursor-pointer transition-all"
          htmlFor="file"
        >
          Dodaj plik
        </label>
        <input
          required
          className="hidden"
          id="file"
          type="file"
          name="file"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
