import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TagBanner from '../tag/TagBanner';

interface SortableTagProps {
  id: string;
  tag: string;
}

export default function SortableTag({ id, tag }: SortableTagProps) {
  const { attributes, setActivatorNodeRef, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className='flex' ref={setNodeRef} style={style}>
      <div
        ref={setActivatorNodeRef}
        className='group flex items-center justify-center rounded-sm bg-slate-200 px-1 transition-colors dark:bg-slate-800'
        {...attributes}
        {...listeners}
      >
        <span className='i-tabler-arrows-sort bg-blue-500 transition-colors group-hover:bg-blue-600 dark:group-hover:bg-blue-400' />
      </div>
      <TagBanner isSmall={true} tag={tag} />
    </div>
  );
}
