import { useState } from 'react';
import { Modal } from '../Modal';
import { useUpdateSquawk } from '../../hooks/useUpdateSquawk';
import { AttachmentUpload } from './AttachmentUpload';
import type { Squawk, SquawkPriority } from '../../types/squawk';

interface EditSquawkDialogProps {
  squawk: Squawk;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSquawkDialog({ squawk, isOpen, onClose }: EditSquawkDialogProps) {
  const updateSquawk = useUpdateSquawk();
  const [title, setTitle] = useState(squawk.title);
  const [description, setDescription] = useState(squawk.description);
  const [priority, setPriority] = useState<SquawkPriority>(squawk.priority);
  const [attachmentUrl, setAttachmentUrl] = useState(squawk.attachment_url);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSquawk.mutateAsync({
        id: squawk.id,
        title,
        description,
        priority,
        attachment_url: attachmentUrl
      });
      onClose();
    } catch (err) {
      setError('Failed to update squawk');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Squawk">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as SquawkPriority)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <AttachmentUpload
          existingUrl={attachmentUrl}
          onUpload={setAttachmentUrl}
        />

        <button
          type="submit"
          disabled={updateSquawk.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {updateSquawk.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </Modal>
  );
}