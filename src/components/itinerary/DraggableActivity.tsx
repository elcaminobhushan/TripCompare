import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, GripVertical, Edit2, Trash2 } from 'lucide-react';

interface DraggableActivityProps {
  id: string;
  title: string;
  time?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const DraggableActivity: React.FC<DraggableActivityProps> = ({
  id,
  title,
  time,
  onEdit,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-100 transition-colors group ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="p-1 hover:bg-gray-100 rounded-lg cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </button>
            <h4 className="font-medium text-gray-900">{title}</h4>
          </div>
          {time && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1 ml-7">
              <Clock className="h-4 w-4" />
              {time}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4 text-gray-400" />
          </button>
          <button 
            className="p-1 hover:bg-red-50 rounded-lg transition-colors"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableActivity;