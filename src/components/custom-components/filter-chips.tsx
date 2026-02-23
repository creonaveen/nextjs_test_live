import { Button } from 'investtech/external-components';
import { X } from 'lucide-react';

interface FilterChipsProps {
  id: string;
  label: string;
  onIconClick: () => void;
  onClick?: () => void;
}

export default function FilterChips({ id, label, onIconClick, onClick }: FilterChipsProps) {
  return (
    <div
      key={id}
      className="border-grey-200 text-grey-900 inline-flex cursor-pointer items-center gap-2 rounded-full border bg-white px-2 py-1 text-xs leading-none font-normal"
      onClick={onClick}
    >
      {label}
      <Button
        variant="ghost"
        size="icon"
        className="text-grey-500 hover:text-grey-600 h-5 w-5"
        onClick={(e) => {
          e.stopPropagation();
          onIconClick();
        }}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
