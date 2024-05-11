"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  dialogContentClasses?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  dialogContentClasses = "",
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};