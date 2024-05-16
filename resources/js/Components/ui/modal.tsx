"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  dialogContentClasses?: string;
  dialogTitleClasses?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  dialogContentClasses = "",
  dialogTitleClasses = ""
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return ( 
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={cn(dialogContentClasses)}>
        <DialogHeader>
          <DialogTitle
          className={cn(dialogTitleClasses)}
          >{title}</DialogTitle>
          {description && (
            <DialogDescription>
            {description}
          </DialogDescription>
          )}
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};