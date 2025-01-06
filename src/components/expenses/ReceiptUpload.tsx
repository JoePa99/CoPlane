import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useUploadReceipt } from '../../hooks/useUploadReceipt';

interface ReceiptUploadProps {
  existingUrl: string | null;
  onUpload: (url: string | null) => void;
}

export function ReceiptUpload({ existingUrl, onUpload }: ReceiptUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const uploadReceipt = useUploadReceipt();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadReceipt.mutateAsync(file);
      onUpload(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Receipt
      </label>
      
      {existingUrl ? (
        <div className="flex items-center gap-2">
          <a
            href={existingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm"
          >
            View Receipt
          </a>
          <button
            type="button"
            onClick={() => onUpload(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="receipt"
                className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                <span>{isUploading ? 'Uploading...' : 'Upload a receipt'}</span>
                <input
                  id="receipt"
                  name="receipt"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}