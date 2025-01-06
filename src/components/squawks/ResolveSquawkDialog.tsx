import { useState } from 'react';
import { Modal } from '../Modal';
import { useResolveSquawk } from '../../hooks/useResolveSquawk';
import { useAuth } from '../../contexts/AuthContext';
import type { Squawk } from '../../types/squawk';

interface ResolveSquawkDialogProps {
  squawk: Squawk;
  isOpen: boolean;
  onClose: () => void;
}

export function ResolveSquawkDialog({ squawk, isOpen, onClose }: ResolveSquawkDialogProps) {
  const { user } = useAuth();
  const resolveSquawk = useResolveSquawk();
  const [resolution, setResolution] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await resolveSquawk.mutateAsync({
        id: squawk.id,
        resolution,
        resolved_by: user.id
      });
      onClose();
    } catch (err) {
      setError('Failed to resolve squawk');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Resolve Squawk">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900">Squawk Details</h3>
        <p className="mt-1 text-sm text-gray-600">{squawk.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resolution" className="block text-sm font-medium text-gray-700">
            Resolution
          </label>
          <textarea
            id="resolution"
            required
            rows={3}
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Describe how the issue was resolved..."
          />
        </div>

        <button
          type="submit"
          disabled={resolveSquawk.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {resolveSquawk.isPending ? 'Resolving...' : 'Resolve Squawk'}
        </button>
      </form>
    </Modal>
  );
}