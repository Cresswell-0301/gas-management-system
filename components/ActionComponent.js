import { FileDown, SquarePen, Trash2 } from "lucide-react";

const ActionComponent = ({ handleEdit, handleDelete, data, type = null, exportToPDF = null }) => {
    return (
        <div className="space-x-2 space-y-2">
            {/* Edit */}
            <button onClick={() => handleEdit(data)} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" title="Edit">
                <SquarePen width={18} />
            </button>

            {/* Delete */}
            <button onClick={() => handleDelete(data._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700" title="Delete">
                <Trash2 width={18} />
            </button>

            {/* Custom Action */}
            {type === "pdf" && (
                <button onClick={() => exportToPDF(data)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" title="Export to PDF">
                    <FileDown width={18} />
                </button>
            )}
        </div>
    );
};

export default ActionComponent;
