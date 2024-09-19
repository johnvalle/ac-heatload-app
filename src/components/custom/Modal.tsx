import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { ReactNode } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

type Props = {
  title: string
  showModal: boolean
  handleClose: () => void
  triggerButton: {
    name: string
    onClick: () => void
  }
  icon: ReactNode
  content: ReactNode
  footer: ReactNode
}

export const Modal = ({
  title,
  icon,
  content,
  showModal,
  footer,
  triggerButton,
  handleClose,
}: Props) => {
  return (
    <Dialog open={showModal} onOpenChange={(val) => !val && handleClose()}>
      <DialogTrigger asChild>
        <Button type="submit" className="mr-8" onClick={triggerButton.onClick}>
          {triggerButton.name}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={handleClose}
      >
        <VisuallyHidden.Root>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex flex-col justify-center items-center">
          {icon}
          <div className="flex flex-col gap-4 text-center justify-center items-center">
            {content}
          </div>
        </div>
        <DialogFooter className="flex justify-center items-center">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
